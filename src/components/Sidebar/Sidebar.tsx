// src/components/Sidebar.tsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      text: "Created Jobs",
      icon: <i className="fas fa-tasks"></i>,
      path: "/created-jobs",
    },
    {
      text: "Unpaid Jobs",
      icon: <i className="fas fa-money-check-alt"></i>,
      path: "/unpaid-jobs",
    },
  ];

  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
