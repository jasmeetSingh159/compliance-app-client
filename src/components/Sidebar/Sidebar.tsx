// src/components/Sidebar.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Backdrop,
  Hidden,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import NewJobModal from "../NewJobModal/NewJobModal";
import Logout from "../Login/Logout";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const toggleJobModal = () => {
    setIsJobModalOpen(!isJobModalOpen);
  };

  const menuItems = [
    {
      text: "Active Jobs",
      icon: <i className="fas fa-tasks"></i>,
      path: "/active",
    },
    {
      text: "Billed Jobs",
      icon: <i className="fas fa-money-check-alt"></i>,
      path: "/billed",
    },
    {
      text: "Closed Jobs",
      icon: <i className="fas fa-money-check-alt"></i>,
      path: "/closed",
    },
    {
      text: "Drivers",
      icon: <i className="fas fa-money-check-alt"></i>,
      path: "/drivers",
    },
    {
      text: "Vehicles",
      icon: <i className="fas fa-money-check-alt"></i>,
      path: "/vehicles",
    },
  ];

  return (
    <>
      <Hidden mdUp>
        <AppBar position="fixed">
          <Toolbar style={{ backgroundColor: "#1d366f" }}>
            <Box display={{ xs: "block", sm: "none" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ marginRight: 2 }}
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ color: "#08c076" }}
            >
              FleetWise
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : "15%",
            height: "100%",
            position: "fixed",
          },
        }}
      >
        <Hidden mdUp>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Hidden>
        <List>
          <Button onClick={toggleJobModal} variant="contained" color="primary">
            Add New Job
          </Button>
          {isJobModalOpen && (
            <NewJobModal show={isJobModalOpen} handleClose={toggleJobModal} />
          )}
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              onClick={handleLinkClick}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Logout />
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
            marginTop: isMobile ? "20px" : "0px",
          }}
        ></Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
