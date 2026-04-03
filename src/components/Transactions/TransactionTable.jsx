import React from "react";
import {
  Box,
  Typography,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Edit,
  Delete,
  FilterList,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import {
  formatCurrency,
  formatDate,
  getCategoryColor,
} from "../../utils/helpers";

export default function TransactionTable({
  filteredTransactions,
  isAdmin,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onResetFilters,
}) {
  const paged = filteredTransactions.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Card elevation={2}>
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{ "& th": { bgcolor: "background.default", py: 1.5 } }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              {isAdmin && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isAdmin ? 6 : 5}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <Box>
                    <FilterList
                      sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
                    />
                    <Typography color="text.secondary">
                      No transactions match your filters
                    </Typography>
                    <Button
                      size="small"
                      onClick={onResetFilters}
                      sx={{ mt: 1 }}
                    >
                      Clear Filters
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paged.map((tx) => {
                const catColor = getCategoryColor(tx.category);
                return (
                  <TableRow
                    key={tx.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "action.hover" },
                      transition: "background 0.15s",
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "'DM Mono', monospace",
                          color: "text.secondary",
                        }}
                      >
                        {formatDate(tx.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: "0.7rem",
                            bgcolor: `${catColor}15`,
                            color: catColor,
                          }}
                        >
                          {tx.category[0]}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {tx.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={tx.category}
                        size="small"
                        sx={{
                          bgcolor: `${catColor}15`,
                          color: catColor,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={
                          tx.type === "income" ? (
                            <TrendingUp
                              sx={{ fontSize: "0.8rem !important" }}
                            />
                          ) : (
                            <TrendingDown
                              sx={{ fontSize: "0.8rem !important" }}
                            />
                          )
                        }
                        label={tx.type}
                        size="small"
                        sx={{
                          bgcolor:
                            tx.type === "income" ? "#36B37E15" : "#FF563015",
                          color:
                            tx.type === "income"
                              ? "success.main"
                              : "error.main",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          textTransform: "capitalize",
                          "& .MuiChip-icon": { color: "inherit" },
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontFamily: "'DM Mono', monospace",
                          color:
                            tx.type === "income"
                              ? "success.main"
                              : "error.main",
                        }}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </Typography>
                    </TableCell>
                    {isAdmin && (
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={0.5}
                        >
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => onEdit(tx)}
                              color="primary"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(tx.id)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
}
