import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e1e2f" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left: Logo / Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          MyDashboard
        </Typography>

        {/* Center: Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </Box>

        {/* Right: User Avatar */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ p: 0 }}
          >
            <Avatar sx={{ bgcolor: "#1976d2" }}>U</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={(e) => setMobileMenu(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMenu}
            open={Boolean(mobileMenu)}
            onClose={() => setMobileMenu(null)}
          >
            <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
