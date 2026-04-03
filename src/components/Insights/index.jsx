import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  EmojiEvents,
  TrendingUp,
  TrendingDown,
  Savings,
  Warning,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../store/selectors";
import {
  formatCurrency,
  getCategoryBreakdown,
  getMonthlyData,
} from "../../utils/helpers";

const InsightCard = ({ title, value, subtitle, icon, color, children }) => (
  <Card elevation={2} sx={{ height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}15`, color, width: 44, height: 44 }}>
          {icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.3 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {children}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1.5,
        boxShadow: 3,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((p) => (
        <Typography
          key={p.name}
          variant="caption"
          sx={{ display: "block", color: p.fill }}
        >
          {p.name}: {formatCurrency(p.value)}
        </Typography>
      ))}
    </Box>
  );
};

export default function Insights() {
  const transactions = useSelector(selectTransactions);
  const monthly = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const topCategory = categoryBreakdown[0];

  const currentMonth = dayjs().format("YYYY-MM");
  const prevMonth = dayjs().subtract(1, "month").format("YYYY-MM");
  const currentExpense = transactions
    .filter((t) => t.date.startsWith(currentMonth) && t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const prevExpense = transactions
    .filter((t) => t.date.startsWith(prevMonth) && t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const monthChange =
    prevExpense > 0
      ? Math.round(((currentExpense - prevExpense) / prevExpense) * 100)
      : 0;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
  const avgDaily = Math.round(expense / 180);

  const deltaData = monthly.map((m) => ({
    month: m.month,
    surplus: m.income - m.expense,
  }));

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Insights
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Smart observations from your financial data
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InsightCard
            title="Top Spending"
            value={topCategory?.name || "—"}
            subtitle={
              topCategory ? formatCurrency(topCategory.value) + " total" : ""
            }
            icon={<EmojiEvents />}
            color="#FFAB00"
          >
            {topCategory && (
              <LinearProgress
                variant="determinate"
                value={
                  totalExpenses > 0
                    ? (topCategory.value / totalExpenses) * 100
                    : 0
                }
                sx={{
                  borderRadius: 4,
                  height: 6,
                  bgcolor: "#FFAB0020",
                  "& .MuiLinearProgress-bar": { bgcolor: "#FFAB00" },
                }}
              />
            )}
          </InsightCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InsightCard
            title="Monthly Change"
            value={`${monthChange > 0 ? "+" : ""}${monthChange}%`}
            subtitle={`vs ${dayjs().subtract(1, "month").format("MMMM")}`}
            icon={monthChange > 0 ? <TrendingUp /> : <TrendingDown />}
            color={monthChange > 0 ? "#FF5630" : "#36B37E"}
          >
            <Typography variant="caption" color="text.secondary">
              Current: {formatCurrency(currentExpense)} | Prev:{" "}
              {formatCurrency(prevExpense)}
            </Typography>
          </InsightCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InsightCard
            title="Savings Rate"
            value={`${savingsRate}%`}
            subtitle="of total income saved"
            icon={<Savings />}
            color={savingsRate >= 20 ? "#36B37E" : "#FFAB00"}
          >
            <LinearProgress
              variant="determinate"
              value={Math.max(0, Math.min(100, savingsRate))}
              sx={{
                borderRadius: 4,
                height: 6,
                bgcolor: savingsRate >= 20 ? "#36B37E20" : "#FFAB0020",
                "& .MuiLinearProgress-bar": {
                  bgcolor: savingsRate >= 20 ? "#36B37E" : "#FFAB00",
                },
              }}
            />
          </InsightCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <InsightCard
            title="Avg Daily Spend"
            value={formatCurrency(avgDaily)}
            subtitle="over last 6 months"
            icon={<Warning />}
            color="#00B8D9"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Monthly Surplus / Deficit
              </Typography>
              <Typography variant="caption" color="text.secondary">
                How much you saved each month
              </Typography>
              <Box sx={{ mt: 2 }}>
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={deltaData} barSize={36}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(0,0,0,0.06)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="surplus" name="Surplus" radius={[6, 6, 0, 0]}>
                      {deltaData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.surplus >= 0 ? "#36B37E" : "#FF5630"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Spending by Category
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ranked breakdown
              </Typography>
              <Box sx={{ mt: 2 }}>
                {categoryBreakdown.slice(0, 6).map((cat) => (
                  <Box key={cat.name} sx={{ mb: 1.8 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: cat.color,
                          }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {cat.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        {formatCurrency(cat.value)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={
                        totalExpenses > 0
                          ? (cat.value / totalExpenses) * 100
                          : 0
                      }
                      sx={{
                        borderRadius: 4,
                        height: 5,
                        bgcolor: `${cat.color}20`,
                        "& .MuiLinearProgress-bar": {
                          bgcolor: cat.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            💡 Key Observations
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                emoji: "🍽️",
                title: "Food is your biggest variable expense",
                desc: `${topCategory?.name} accounts for ${topCategory ? Math.round((topCategory.value / totalExpenses) * 100) : 0}% of total spending.`,
                color: "#FF6B6B",
              },
              {
                emoji: savingsRate >= 20 ? "✅" : "⚠️",
                title:
                  savingsRate >= 20
                    ? "Healthy savings rate"
                    : "Savings rate needs attention",
                desc:
                  savingsRate >= 20
                    ? `You're saving ${savingsRate}% of income — above the recommended 20%.`
                    : `You're saving only ${savingsRate}% — try to reach 20% of income.`,
                color: savingsRate >= 20 ? "#36B37E" : "#FFAB00",
              },
              {
                emoji: monthChange <= 0 ? "📉" : "📈",
                title:
                  monthChange <= 0
                    ? "Spending decreased"
                    : "Spending increased",
                desc:
                  monthChange <= 0
                    ? `Great job! Expenses dropped by ${Math.abs(monthChange)}% vs last month.`
                    : `Expenses rose by ${monthChange}% this month. Review discretionary spending.`,
                color: monthChange <= 0 ? "#36B37E" : "#FF5630",
              },
              {
                emoji: "📅",
                title: "Daily spending pace",
                desc: `You spend about ${formatCurrency(avgDaily)} per day on average.`,
                color: "#00B8D9",
              },
            ].map((obs) => (
              <Grid size={{ xs: 12, md: 6 }} key={obs.title}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: `${obs.color}30`,
                    bgcolor: `${obs.color}08`,
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ fontSize: "1.4rem" }}>
                    {obs.emoji}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: obs.color }}
                    >
                      {obs.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {obs.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
