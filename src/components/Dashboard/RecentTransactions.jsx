import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../store/financeSlice";
import {
  formatCurrency,
  formatDate,
  getCategoryColor,
} from "../../utils/helpers";

export default function RecentTransactions({ transactions }) {
  const dispatch = useDispatch();
  const recent = transactions.slice(0, 6);

  return (
    <Card elevation={2}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Recent Transactions
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Latest activity
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForward />}
            size="small"
            onClick={() => dispatch(setActivePage("transactions"))}
            sx={{ fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
        <List disablePadding>
          {recent.map((tx, i) => {
            const color = getCategoryColor(tx.category);
            return (
              <ListItem
                key={tx.id}
                disablePadding
                sx={{
                  py: 1.2,
                  borderBottom: i < recent.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    fontSize: "0.8rem",
                    bgcolor: `${color}20`,
                    color,
                    border: `1.5px solid ${color}40`,
                  }}
                >
                  {tx.category[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {tx.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      mt: 0.3,
                    }}
                  >
                    <Chip
                      label={tx.category}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        bgcolor: `${color}15`,
                        color,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(tx.date)}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'DM Mono', monospace",
                    color: tx.type === "income" ? "success.main" : "error.main",
                    flexShrink: 0,
                  }}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
