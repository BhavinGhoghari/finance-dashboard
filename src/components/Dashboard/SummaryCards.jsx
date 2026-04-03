import React from "react";
import { Grid, Card, CardContent, Box, Typography, Chip } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { formatCurrency } from "../../utils/helpers";

const SummaryCard = ({
  title,
  amount,
  subtitle,
  icon,
  color,
  trend,
  trendLabel,
  gradientFrom,
  isPercentage = false,
}) => {
  const isPositive = trend >= 0;
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(26, 34, 54, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? `0 12px 24px -10px ${color}40`
              : `0 12px 24px -10px ${color}20`,
          borderColor: `${color}40`,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: (theme) =>
                theme.palette.mode === "dark" ? `${color}25` : `${color}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${color}20`,
            }}
          >
            <Box sx={{ color, display: "flex", fontSize: "1.5rem" }}>
              {icon}
            </Box>
          </Box>
          {trend !== undefined && (
            <Chip
              icon={
                isPositive ? (
                  <ArrowUpward
                    style={{ fontSize: "0.8rem", color: "inherit" }}
                  />
                ) : (
                  <ArrowDownward
                    style={{ fontSize: "0.8rem", color: "inherit" }}
                  />
                )
              }
              label={`${Math.abs(trend)}%`}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "0.75rem",
                bgcolor: isPositive ? "success.main" : "error.main",
                color: "#fff",
                borderRadius: "8px",
                px: 0.5,
                "& .MuiChip-icon": { color: "#fff", ml: 0.5, mr: -0.5 },
              }}
            />
          )}
        </Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mb: 0.5,
            fontWeight: 600,
            letterSpacing: "0.02em",
            opacity: 0.8,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            mb: 0.5,
            color: "text.primary",
          }}
        >
          {isPercentage ? `${amount}%` : formatCurrency(amount)}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              opacity: 0.7,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {trendLabel && (
          <Typography
            variant="caption"
            sx={{
              color: isPositive ? "success.main" : "error.main",
              display: "block",
              fontWeight: 700,
              mt: 0.5,
            }}
          >
            {isPositive ? "+" : ""}
            {trendLabel}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  return (
    <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryCard
          title="Total Balance"
          amount={balance}
          subtitle="Net across all time"
          icon={<AccountBalance />}
          color="#0052CC"
          trend={8}
          trendLabel="8% vs last month"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryCard
          title="Total Income"
          amount={income}
          subtitle="All income sources"
          icon={<TrendingUp />}
          color="#36B37E"
          trend={5}
          trendLabel="5% vs last month"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryCard
          title="Total Expenses"
          amount={expense}
          subtitle="All spending"
          icon={<TrendingDown />}
          color="#FF5630"
          trend={-3}
          trendLabel="-3% vs last month"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryCard
          title="Savings Rate"
          amount={savingsRate}
          subtitle="Percentage saved"
          icon={<AccountBalance style={{ opacity: 0.8 }} />}
          color="#FFAB00"
          isPercentage={true}
          trend={2}
          trendLabel="Improving"
        />
      </Grid>
    </Grid>
  );
}
