import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { getCategoryBreakdown, formatCurrency } from "../../utils/helpers";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: 13, fontWeight: 700 }}
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: 16, fontWeight: 800 }}
      >
        {formatCurrency(value, true)}
      </text>
      <text
        x={cx}
        y={cy + 30}
        textAnchor="middle"
        fill="#94A3B8"
        style={{ fontSize: 11, fontWeight: 600 }}
      >
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

export default function SpendingBreakdown({ transactions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = getCategoryBreakdown(transactions).slice(0, 7);

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
      <CardContent
        sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
          >
            Spending Breakdown
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.8 }}
          >
            By transaction category
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                animationBegin={200}
                animationDuration={1200}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke="none"
                    style={{
                      filter:
                        activeIndex === index
                          ? `drop-shadow(0 0 8px ${entry.color}40)`
                          : "none",
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            mt: 2,
            justifyContent: "center",
          }}
        >
          {data.map((entry, index) => (
            <Box
              key={entry.name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                opacity: activeIndex === index ? 1 : 0.7,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: entry.color,
                  boxShadow: `0 0 6px ${entry.color}40`,
                }}
              />
              <Typography
                variant="caption"
                color="text.primary"
                sx={{ fontSize: "0.75rem", fontWeight: 600 }}
              >
                {entry.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
