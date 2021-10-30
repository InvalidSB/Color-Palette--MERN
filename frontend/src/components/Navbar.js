import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {state ? (
        <AppBar
          position="static"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Toolbar style={{ width: "80%", margin: "auto" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{textDecoration:"none",color:"black"}}>
                <HomeIcon style={{ fontSize: 15 }} />
                Home
              </Link>
            </Typography>

            <Button color="inherit">
              <Link to="/profile" style={{textDecoration:"none",color:"black"}}>Profile</Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/login"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                }}
                style={{textDecoration:"none",color:"black"}}
              >
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      ) : null}
    </Box>
  );
}
