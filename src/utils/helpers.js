import dayjs from "dayjs";
import { CATEGORY_COLORS } from "../data/mockData";

export const formatCurrency = (amount, compact = false) => {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => dayjs(date).format("DD MMM YYYY");
export const formatMonth = (date) => dayjs(date).format("MMM YYYY");

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || "#94A3B8";

export const getMonthlyData = (transactions) => {
  const months = {};
  transactions.forEach((tx) => {
    const key = dayjs(tx.date).format("YYYY-MM");
    if (!months[key])
      months[key] = {
        month: dayjs(tx.date).format("MMM"),
        income: 0,
        expense: 0,
      };
    if (tx.type === "income") months[key].income += tx.amount;
    else months[key].expense += tx.amount;
  });
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, balance: v.income - v.expense }));
};

export const getCategoryBreakdown = (transactions) => {
  const cats = {};
  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      if (!cats[tx.category]) cats[tx.category] = 0;
      cats[tx.category] += tx.amount;
    });
  return Object.entries(cats)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value, color: getCategoryColor(name) }));
};

export const getSummary = (transactions) => {
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((s, tx) => s + tx.amount, 0);
  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((s, tx) => s + tx.amount, 0);
  return { income, expense, balance: income - expense };
};

export const exportToCSV = (transactions) => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((tx) => [
    tx.date,
    tx.description,
    tx.category,
    tx.type,
    tx.amount,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${dayjs().format("YYYY-MM-DD")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions) => {
  const data = JSON.stringify(transactions, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${dayjs().format("YYYY-MM-DD")}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
