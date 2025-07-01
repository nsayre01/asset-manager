import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
// Import the icons you need
import HomeIcon from "@mui/icons-material/Home";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ApiIcon from "@mui/icons-material/Api";

const drawerWidth = 250;

export const BasicDrawer = () => {
  const navigate = useNavigate();

  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Summary", path: "/summary", icon: <SummarizeIcon /> },
    { text: "About Mentors", path: "/about-mentors", icon: <PeopleIcon /> },
    { text: "Resources", path: "/resources", icon: <LibraryBooksIcon /> },
    {
      text: "Backend Example",
      path: "/backend-example",
      icon: <ApiIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map(({ text, icon, path }) => (
            <ListItemButton key={text} onClick={() => navigate(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          width: "100%",
        }}
        mt={10}
        ml={3}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
