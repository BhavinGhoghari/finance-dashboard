import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import store from "./store/store";
import { getTheme } from "./theme/theme";
import { selectDarkMode, selectActivePage } from "./store/selectors";
import Layout from "./components/Layout/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";

const PAGES = {
  dashboard: <Dashboard />,
  transactions: <Transactions />,
  insights: <Insights />,
};

function AppInner() {
  const darkMode = useSelector(selectDarkMode);
  const activePage = useSelector(selectActivePage);
  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>{PAGES[activePage] || <Dashboard />}</Layout>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
