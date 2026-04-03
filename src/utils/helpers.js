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
  let months = {};
  for (let i = 0; i < transactions.length; i++) {
    let tx = transactions[i];
    let key = dayjs(tx.date).format("YYYY-MM");
    if (months[key] == null) {
      months[key] = {
        month: dayjs(tx.date).format("MMM"),
        income: 0,
        expense: 0,
      };
    }
    if (tx.type == "income") {
      months[key].income = months[key].income + tx.amount;
    }
    if (tx.type == "expense") {
      months[key].expense = months[key].expense + tx.amount;
    }
  }
  
  let result = [];
  let keys = Object.keys(months);
  keys = keys.sort();
  for (let j = 0; j < keys.length; j++) {
    let v = months[keys[j]];
    v.balance = v.income - v.expense;
    result.push(v);
  }
  return result;
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
  let totalIncome = 0;
  let totalExpense = 0;
  
  for(let i=0; i<transactions.length; i++) {
    if(transactions[i].type == "income") {
      totalIncome = totalIncome + transactions[i].amount;
    } else if(transactions[i].type == "expense") {
      totalExpense = totalExpense + transactions[i].amount;
    }
  }
  
  let balanceAmount = totalIncome - totalExpense;
  
  return { 
    income: totalIncome, 
    expense: totalExpense, 
    balance: balanceAmount 
  };
};

export const exportToCSV = (transactions) => {
  // making headers
  let csvStr = "Date,Description,Category,Type,Amount\n";
  
  // looping data
  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];
    csvStr = csvStr + t.date + "," + t.description + "," + t.category + "," + t.type + "," + t.amount + "\n";
  }

  let blob = new Blob([csvStr], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "transactions_" + dayjs().format("YYYY-MM-DD") + ".csv";
  a.click();
};

export const exportToJSON = (transactions) => {
  let jsonString = JSON.stringify(transactions, null, 2);
  let blob = new Blob([jsonString], { type: "application/json" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "transactions_" + dayjs().format("YYYY-MM-DD") + ".json";
  a.click();
};
