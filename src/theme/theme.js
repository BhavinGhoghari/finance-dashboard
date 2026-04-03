import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#0052CC",
        light: "#4C9AFF",
        dark: "#003994",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#00B8D9",
        light: "#79E2F2",
        dark: "#0081A7",
      },
      success: { main: "#36B37E", light: "#57D9A3", dark: "#006644" },
      error: { main: "#FF5630", light: "#FF8F73", dark: "#BF2600" },
      warning: { main: "#FFAB00", light: "#FFE380", dark: "#FF8B00" },
      background: {
        default: darkMode ? "#0A0E1A" : "#F4F5F7",
        paper: darkMode ? "#111827" : "#FFFFFF",
        card: darkMode ? "#1A2236" : "#FFFFFF",
        sidebar: darkMode ? "#0D1526" : "#0052CC",
      },
      text: {
        primary: darkMode ? "#F1F5F9" : "#172B4D",
        secondary: darkMode ? "#94A3B8" : "#6B778C",
      },
      divider: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.03em" },
      h2: { fontWeight: 700, letterSpacing: "-0.025em" },
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: { fontWeight: 700, letterSpacing: "-0.015em" },
      h5: { fontWeight: 600, letterSpacing: "-0.01em" },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: {
        fontWeight: 600,
        fontSize: "0.8rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      },
      body1: { fontSize: "0.9375rem" },
      body2: { fontSize: "0.875rem" },
      caption: { fontSize: "0.75rem", fontFamily: "'DM Mono', monospace" },
    },
    shape: { borderRadius: 12 },
    shadows: darkMode
      ? [
          "none",
          "0 1px 3px rgba(0,0,0,0.5)",
          "0 4px 12px rgba(0,0,0,0.4)",
          "0 8px 24px rgba(0,0,0,0.3)",
          ...Array(21).fill("0 16px 40px rgba(0,0,0,0.3)"),
        ]
      : [
          "none",
          "0 1px 3px rgba(0,82,204,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          "0 4px 12px rgba(0,82,204,0.08), 0 2px 4px rgba(0,0,0,0.05)",
          "0 8px 24px rgba(0,82,204,0.1), 0 4px 8px rgba(0,0,0,0.06)",
          ...Array(21).fill("0 16px 40px rgba(0,82,204,0.12)"),
        ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            fontSize: "0.875rem",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: "none",
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: "0.75rem" },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          },
        },
      },
    },
  });
