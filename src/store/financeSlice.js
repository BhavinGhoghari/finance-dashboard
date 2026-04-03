import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../data/mockData";
import dayjs from "dayjs";

const loadFromStorage = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  transactions: loadFromStorage("rtk_transactions", mockTransactions),
  darkMode: loadFromStorage("rtk_darkMode", false),
  role: loadFromStorage("rtk_role", "admin"),
  activePage: "dashboard",
  filters: {
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortDir: "desc",
  },
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("rtk_role", JSON.stringify(action.payload));
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("rtk_darkMode", JSON.stringify(state.darkMode));
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    addTransaction(state, action) {
      const tx = { ...action.payload, id: Date.now() };
      state.transactions = [tx, ...state.transactions].sort(
        (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
      );
      localStorage.setItem(
        "rtk_transactions",
        JSON.stringify(state.transactions),
      );
    },
    updateTransaction(state, action) {
      const { id, updates } = action.payload;
      state.transactions = state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updates } : tx,
      );
      localStorage.setItem(
        "rtk_transactions",
        JSON.stringify(state.transactions),
      );
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== action.payload,
      );
      localStorage.setItem(
        "rtk_transactions",
        JSON.stringify(state.transactions),
      );
    },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters = {
        search: "",
        type: "all",
        category: "all",
        sortBy: "date",
        sortDir: "desc",
      };
    },
  },
});

export const {
  setRole,
  toggleDarkMode,
  setActivePage,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  resetFilters,
} = financeSlice.actions;

export default financeSlice.reducer;
