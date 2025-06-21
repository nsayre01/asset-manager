import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { BasicDrawer } from "./BasicDrawer";

export const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Asset Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <BasicDrawer />
    </Box>
  );
};
