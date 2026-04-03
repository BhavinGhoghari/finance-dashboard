import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { CATEGORIES } from "../../data/mockData";

export default function FilterBar({
  filters,
  handleFilter,
  handleSort,
  handleReset,
  hasFilters,
}) {
  return (
    <Card elevation={1} sx={{ mb: 2.5 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search transaction by description,category and amount..."
            size="small"
            value={filters.search}
            onChange={(e) => handleFilter("search", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: filters.search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleFilter("search", "")}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{ minWidth: { xs: "100%", md: 220 }, flex: { xs: "1 1 100%", md: 1 } }}
          />
          <TextField
            select
            size="small"
            label="Type"
            value={filters.type}
            onChange={(e) => handleFilter("type", e.target.value)}
            sx={{ minWidth: 130, flex: { xs: "1 1 calc(50% - 8px)", sm: "auto" } }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Category"
            value={filters.category}
            onChange={(e) => handleFilter("category", e.target.value)}
            sx={{ minWidth: 160, flex: { xs: "1 1 calc(50% - 8px)", sm: "auto" } }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Sort By"
            value={filters.sortBy}
            onChange={(e) => handleSort("sortBy", e.target.value)}
            sx={{ minWidth: 130, flex: { xs: "1 1 calc(50% - 8px)", sm: "auto" } }}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="description">Name</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Order"
            value={filters.sortDir}
            onChange={(e) => handleSort("sortDir", e.target.value)}
            sx={{ minWidth: 110, flex: { xs: "1 1 calc(50% - 8px)", sm: "auto" } }}
          >
            <MenuItem value="desc">Newest</MenuItem>
            <MenuItem value="asc">Oldest</MenuItem>
          </TextField>
          {hasFilters && (
            <Button
              size="small"
              onClick={handleReset}
              startIcon={<Clear />}
              color="inherit"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Clear
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
