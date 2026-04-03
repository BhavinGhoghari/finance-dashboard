import React, { useState } from "react";
import { Box, Typography, Button, Alert, Stack, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Add, FileDownload, Description, InsertDriveFile } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  resetFilters,
  deleteTransaction,
} from "../../store/financeSlice";
import { selectFilteredTransactions, selectFilters, selectRole } from "../../store/selectors";
import { exportToCSV, exportToJSON } from "../../utils/helpers";
import TransactionModal from "./TransactionModal";
import FilterBar from "./FilterBar";
import TransactionTable from "./TransactionTable";

export default function Transactions() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const role = useSelector(selectRole);
  const filtered = useSelector(selectFilteredTransactions);
  const isAdmin = role === "admin";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [exportAnchor, setExportAnchor] = useState(null);

  const handleExportClick = (event) => setExportAnchor(event.currentTarget);
  const handleExportClose = () => setExportAnchor(null);

  const handleExport = (format) => {
    if (format === "csv") exportToCSV(filtered);
    else exportToJSON(filtered);
    handleExportClose();
  };

  const handleEdit = (tx) => {
    setEditTx(tx);
    setModalOpen(true);
  };
  const handleAdd = () => {
    setEditTx(null);
    setModalOpen(true);
  };
  const handleFilter = (key, value) => {
    dispatch(setFilter({ key, value }));
    setPage(0);
  };
  const handleSort = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  const hasFilters =
    filters.search || filters.type !== "all" || filters.category !== "all";

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}{" "}
            found
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            onClick={handleExportClick}
            size="small"
          >
            Export
          </Button>
          <Menu
            anchorEl={exportAnchor}
            open={Boolean(exportAnchor)}
            onClose={handleExportClose}
          >
            <MenuItem onClick={() => handleExport("csv")}>
              <ListItemIcon>
                <Description fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export as CSV</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleExport("json")}>
              <ListItemIcon>
                <InsertDriveFile fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export as JSON</ListItemText>
            </MenuItem>
          </Menu>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAdd}
              size="small"
            >
              Add Transaction
            </Button>
          )}
        </Stack>
      </Box>

      {!isAdmin && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          You are in <strong>Viewer</strong> mode. Switch to Admin to add, edit,
          or delete transactions.
        </Alert>
      )}

      <FilterBar
        filters={filters}
        handleFilter={handleFilter}
        handleSort={handleSort}
        handleReset={() => dispatch(resetFilters())}
        hasFilters={hasFilters}
      />

      <TransactionTable
        filteredTransactions={filtered}
        isAdmin={isAdmin}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        onEdit={handleEdit}
        onDelete={(id) => dispatch(deleteTransaction(id))}
        onResetFilters={() => dispatch(resetFilters())}
      />

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editTx={editTx}
      />
    </Box>
  );
}
