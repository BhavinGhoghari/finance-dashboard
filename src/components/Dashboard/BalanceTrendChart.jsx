import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyData, formatCurrency } from "../../utils/helpers";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(17, 24, 39, 0.8)"
            : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        p: 1.5,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          mb: 1,
          display: "block",
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </Typography>
      {payload.map((p) => (
        <Box
          key={p.name}
          sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "3px",
              bgcolor: p.color,
              boxShadow: `0 0 8px ${p.color}60`,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {formatCurrency(p.value)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {p.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function BalanceTrendChart({ transactions }) {
  const theme = useTheme();
  const data = getMonthlyData(transactions);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          theme.palette.mode === "dark" ? "rgba(17, 24, 39, 0.4)" : "#fff",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
            >
              Balance Trend
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              Monthly income vs expenses
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#36B37E",
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Income
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#FF5630",
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Expenses
              </Typography>
            </Box>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36B37E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#36B37E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5630" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF5630" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
              vertical={false}
              opacity={0.4}
            />
            <XAxis
              dataKey="month"
              tick={{
                fill: theme.palette.text.secondary,
                fontSize: 11,
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{
                fill: theme.palette.text.secondary,
                fontSize: 10,
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: theme.palette.divider, strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#36B37E"
              strokeWidth={3}
              fill="url(#incomeGrad)"
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "#36B37E",
                boxShadow: "0 0 10px #36B37E",
              }}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#FF5630"
              strokeWidth={3}
              fill="url(#expenseGrad)"
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "#FF5630",
                boxShadow: "0 0 10px #FF5630",
              }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
