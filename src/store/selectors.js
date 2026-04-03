import dayjs from "dayjs";

export const selectTransactions = (state) => state.finance.transactions;
export const selectDarkMode = (state) => state.finance.darkMode;
export const selectRole = (state) => state.finance.role;
export const selectActivePage = (state) => state.finance.activePage;
export const selectFilters = (state) => state.finance.filters;

export const selectFilteredTransactions = (state) => {
  const { transactions, filters } = state.finance;
  const today = dayjs().startOf("day");
  
  // Filter out future transactions by default
  let filtered = transactions.filter(tx => !dayjs(tx.date).isAfter(today, "day"));


  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (tx) =>
        tx.description.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        tx.amount.toString().includes(q),
    );
  }
  if (filters.type !== "all") {
    filtered = filtered.filter((tx) => tx.type === filters.type);
  }
  if (filters.category !== "all") {
    filtered = filtered.filter((tx) => tx.category === filters.category);
  }

  filtered.sort((a, b) => {
    let valA, valB;
    if (filters.sortBy === "date") {
      valA = dayjs(a.date).valueOf();
      valB = dayjs(b.date).valueOf();
    } else if (filters.sortBy === "amount") {
      valA = a.amount;
      valB = b.amount;
    } else {
      valA = a.description;
      valB = b.description;
    }
    return filters.sortDir === "asc"
      ? valA > valB
        ? 1
        : -1
      : valA < valB
        ? 1
        : -1;
  });

  return filtered;
};
