import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close, TrendingUp, TrendingDown } from "@mui/icons-material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addTransaction, updateTransaction } from "../../store/financeSlice";
import { CATEGORIES } from "../../data/mockData";

const defaultForm = {
  date: dayjs().format("YYYY-MM-DD"),
  description: "",
  category: "Food & Dining",
  type: "expense",
  amount: "",
};

export default function TransactionModal({ open, onClose, editTx }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTx) setForm({ ...editTx, amount: String(editTx.amount) });
    else setForm(defaultForm);
    setErrors({});
  }, [editTx, open]);

  const validate = () => {
    let e = {};
    if (form.description.trim() == "") {
      e.description = "Description is required";
    }
    if (
      form.amount == null ||
      form.amount == "" ||
      isNaN(form.amount) == true
    ) {
      e.amount = "Valid amount required";
    } else {
      if (Number(form.amount) <= 0) {
        e.amount = "Valid amount required";
      }
    }
    if (form.date == null || form.date == "") {
      e.date = "Date is required";
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const tx = { ...form, amount: Number(form.amount) };
    if (editTx) dispatch(updateTransaction({ id: editTx.id, updates: tx }));
    else dispatch(addTransaction(tx));
    onClose();
  };

  let expenseCats = [];
  for (let i = 0; i < CATEGORIES.length; i++) {
    if (
      CATEGORIES[i] == "Salary" ||
      CATEGORIES[i] == "Freelance" ||
      CATEGORIES[i] == "Investment"
    ) {
      // skip
    } else {
      expenseCats.push(CATEGORIES[i]);
    }
  }
  let incomeCats = ["Salary", "Freelance", "Investment"];
  let cats = [];
  if (form.type == "income") {
    cats = incomeCats;
  } else {
    cats = expenseCats;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
          {editTx ? "Edit Transaction" : "Add Transaction"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 1,
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              TYPE
            </Typography>
            <ToggleButtonGroup
              value={form.type}
              exclusive
              fullWidth
              size="small"
              onChange={(event, v) => {
                if (v != null) {
                  let newCategory = "";
                  if (v == "income") {
                    newCategory = "Salary";
                  } else {
                    newCategory = "Food & Dining";
                  }
                  setForm(function (f) {
                    let newForm = Object.assign({}, f);
                    newForm.type = v;
                    newForm.category = newCategory;
                    return newForm;
                  });
                }
              }}
              sx={{
                "& .MuiToggleButton-root": {
                  fontWeight: 600,
                  borderRadius: "8px !important",
                },
              }}
            >
              <ToggleButton
                value="expense"
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#FF563015",
                    color: "error.main",
                    borderColor: "error.main",
                  },
                  gap: 1,
                }}
              >
                <TrendingDown fontSize="small" /> Expense
              </ToggleButton>
              <ToggleButton
                value="income"
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#36B37E15",
                    color: "success.main",
                    borderColor: "success.main",
                  },
                  gap: 1,
                }}
              >
                <TrendingUp fontSize="small" /> Income
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              fullWidth
              size="small"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Amount (₹)"
              type="number"
              fullWidth
              size="small"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              size="small"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Category"
              select
              fullWidth
              size="small"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            >
              {cats.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            px: 3,
            bgcolor: form.type === "income" ? "success.main" : "primary.main",
          }}
        >
          {editTx ? "Update" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
