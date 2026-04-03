import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Switch,
  Tooltip,
  Divider,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Receipt,
  Lightbulb,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setRole,
  toggleDarkMode,
  setActivePage,
} from "../../store/financeSlice";
import {
  selectRole,
  selectDarkMode,
  selectActivePage,
} from "../../store/selectors";

const DRAWER_WIDTH = 260;
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <Dashboard /> },
  { key: "transactions", label: "Transactions", icon: <Receipt /> },
  { key: "insights", label: "Insights", icon: <Lightbulb /> },
];

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const darkMode = useSelector(selectDarkMode);
  const activePage = useSelector(selectActivePage);

  const sidebarBg = darkMode
    ? "linear-gradient(180deg, #0D1526 0%, #111827 100%)"
    : "linear-gradient(180deg, #0052CC 0%, #003994 100%)";

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: sidebarBg,
        color: "#fff",
      }}
    >
      <Box sx={{ px: 3, py: 3.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
              ₹
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.2 }}
            >
              FinTrack
            </Typography>
            <Typography
              sx={{ fontSize: "0.7rem", opacity: 0.6, fontWeight: 500 }}
            >
              Finance Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.key;
          return (
            <ListItem
              key={item.key}
              onClick={() => {
                dispatch(setActivePage(item.key));
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                cursor: "pointer",
                background: active ? "rgba(255,255,255,0.18)" : "transparent",
                "&:hover": { background: "rgba(255,255,255,0.1)" },
                transition: "background 0.2s",
                py: 1.2,
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#fff" : "rgba(255,255,255,0.6)",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                  fontSize: "0.9rem",
                  color: active ? "#fff" : "rgba(255,255,255,0.7)",
                }}
              />
              {active && (
                <Box
                  sx={{
                    width: 4,
                    height: 28,
                    borderRadius: 2,
                    background: "#79E2F2",
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            opacity: 0.5,
            mb: 1,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Role
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            sx={{
              color: "#fff",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "& .MuiSvgIcon-root": { color: "#fff" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.4)",
              },
            }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          px: 2,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "0.85rem",
            }}
          >
            {role === "admin" ? "A" : "V"}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
              {role === "admin" ? "Admin User" : "Viewer"}
            </Typography>
            <Chip
              label={role}
              size="small"
              sx={{
                height: 16,
                fontSize: "0.65rem",
                background:
                  role === "admin"
                    ? "rgba(255,171,0,0.3)"
                    : "rgba(121,226,242,0.3)",
                color: role === "admin" ? "#FFAB00" : "#79E2F2",
              }}
            />
          </Box>
        </Box>
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
          <Switch
            checked={darkMode}
            onChange={() => dispatch(toggleDarkMode())}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": { color: "#79E2F2" },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: "#79E2F2",
              },
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              FinTrack
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <Switch
                checked={darkMode}
                onChange={() => dispatch(toggleDarkMode())}
                size="small"
              />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {isMobile ? (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
          <Box
            sx={{ width: DRAWER_WIDTH, position: "fixed", top: 0, bottom: 0 }}
          >
            {drawerContent}
          </Box>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          minHeight: "100vh",
          bgcolor: "background.default",
          p: { xs: 2, md: 3 },
          pt: { xs: 9, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
