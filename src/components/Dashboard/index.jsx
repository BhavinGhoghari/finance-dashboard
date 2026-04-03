import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../store/selectors";
import SummaryCards from "./SummaryCards";
import BalanceTrendChart from "./BalanceTrendChart";
import SpendingBreakdown from "./SpendingBreakdown";
import RecentTransactions from "./RecentTransactions";

export default function Dashboard() {
  const transactions = useSelector(selectTransactions);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Your financial overview at a glance
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <SummaryCards transactions={transactions} />
      </Box>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <BalanceTrendChart transactions={transactions} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SpendingBreakdown transactions={transactions} />
        </Grid>
      </Grid>
      <RecentTransactions transactions={transactions} />
    </Box>
  );
}
