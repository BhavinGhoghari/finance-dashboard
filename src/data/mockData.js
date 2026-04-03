import dayjs from "dayjs";

export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Utilities",
  "Housing",
  "Salary",
  "Freelance",
  "Investment",
  "Travel",
  "Education",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#FF6B6B",
  Transport: "#4ECDC4",
  Shopping: "#45B7D1",
  Entertainment: "#96CEB4",
  Health: "#FFEAA7",
  Utilities: "#DDA0DD",
  Housing: "#98D8C8",
  Salary: "#6BCF7F",
  Freelance: "#87CEEB",
  Investment: "#F0A500",
  Travel: "#FF9F43",
  Education: "#A29BFE",
};

const generateTransactions = () => {
  const transactions = [];
  let id = 1;

  const expenseTemplates = [
    {
      description: "Swiggy Order",
      category: "Food & Dining",
      range: [150, 800],
    },
    {
      description: "Zomato Delivery",
      category: "Food & Dining",
      range: [200, 600],
    },
    { description: "Coffee Shop", category: "Food & Dining", range: [80, 250] },
    {
      description: "Restaurant Dinner",
      category: "Food & Dining",
      range: [500, 2000],
    },
    { description: "Uber Ride", category: "Transport", range: [50, 400] },
    { description: "Ola Cab", category: "Transport", range: [60, 350] },
    {
      description: "Metro Card Recharge",
      category: "Transport",
      range: [200, 500],
    },
    {
      description: "Amazon Shopping",
      category: "Shopping",
      range: [300, 5000],
    },
    { description: "Flipkart Order", category: "Shopping", range: [200, 3000] },
    {
      description: "Myntra Purchase",
      category: "Shopping",
      range: [500, 2500],
    },
    {
      description: "Netflix Subscription",
      category: "Entertainment",
      range: [149, 649],
    },
    {
      description: "Spotify Premium",
      category: "Entertainment",
      range: [119, 119],
    },
    {
      description: "Movie Tickets",
      category: "Entertainment",
      range: [200, 600],
    },
    { description: "Pharmacy", category: "Health", range: [100, 800] },
    { description: "Gym Membership", category: "Health", range: [500, 1500] },
    { description: "Doctor Visit", category: "Health", range: [300, 1000] },
    {
      description: "Electricity Bill",
      category: "Utilities",
      range: [800, 2500],
    },
    { description: "Internet Bill", category: "Utilities", range: [699, 1499] },
    {
      description: "Mobile Recharge",
      category: "Utilities",
      range: [149, 499],
    },
    { description: "Rent Payment", category: "Housing", range: [8000, 25000] },
    { description: "Hotel Booking", category: "Travel", range: [1500, 8000] },
    { description: "Flight Ticket", category: "Travel", range: [3000, 15000] },
    { description: "Udemy Course", category: "Education", range: [399, 2999] },
  ];

  const incomeTemplates = [
    {
      description: "Monthly Salary",
      category: "Salary",
      range: [45000, 45000],
    },
    {
      description: "Freelance Project",
      category: "Freelance",
      range: [5000, 20000],
    },
    {
      description: "Investment Returns",
      category: "Investment",
      range: [1000, 8000],
    },
    { description: "Bonus", category: "Salary", range: [5000, 15000] },
  ];

  // Generate 6 months of data
  const today = dayjs();
  for (let month = 5; month >= 0; month--) {
    const baseDate = dayjs().subtract(month, "month");
    const isCurrentMonth = month === 0;
    const daysInMonth = baseDate.daysInMonth();
    const maxDay = isCurrentMonth ? today.date() : daysInMonth;

    // Salary always on 1st
    transactions.push({
      id: id++,
      date: baseDate.date(1).format("YYYY-MM-DD"),
      description: "Monthly Salary",
      category: "Salary",
      type: "income",
      amount: 45000,
    });

    // Random expenses throughout month
    const expenseCount = Math.floor(Math.random() * 12) + 15;
    for (let i = 0; i < expenseCount; i++) {
      const template =
        expenseTemplates[Math.floor(Math.random() * expenseTemplates.length)];
      const amount = Math.floor(
        Math.random() * (template.range[1] - template.range[0]) +
          template.range[0],
      );
      const day = Math.floor(Math.random() * maxDay) + 1;
      transactions.push({
        id: id++,
        date: baseDate.date(day).format("YYYY-MM-DD"),
        description: template.description,
        category: template.category,
        type: "expense",
        amount,
      });
    }

    // Occasional extra income
    if (Math.random() > 0.4) {
      const template =
        incomeTemplates[
          Math.floor(Math.random() * (incomeTemplates.length - 1)) + 1
        ];
      const amount = Math.floor(
        Math.random() * (template.range[1] - template.range[0]) +
          template.range[0],
      );
      transactions.push({
        id: id++,
        date: baseDate
          .date(Math.floor(Math.random() * maxDay) + 1)
          .format("YYYY-MM-DD"),
        description: template.description,
        category: template.category,
        type: "income",
        amount,
      });
    }
  }

  return transactions.sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
  );
};

export const mockTransactions = generateTransactions();
