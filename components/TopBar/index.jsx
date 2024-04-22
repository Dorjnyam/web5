import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import { withRouter } from "react-router-dom";
import { cs142models } from "../../modelData/photoApp";

function TopBar({ location }) {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserFirstName = async () => {
      setLoading(true);
      setError("");

      const pathname = location.pathname;
      const params = pathname.split("/");
      const userId = params[2]; 

      try {
        if (userId) {
          const user = await cs142models.userModel(userId);
          if (user) {
            setFirstName(user.first_name);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserFirstName();
  }, [location.pathname]);

  const getCurrentContext = () => {
    const pathname = location.pathname;
    const params = pathname.split("/");
    const context = params[1];

    switch (context) {
      case "users":
        return loading ? "Loading..." : firstName ? `Details of ${firstName}` : "User Details";
      case "photos":
        return loading ? "Loading..." : firstName ? `Photos of ${firstName}` : "User Photos";
      default:
        return "PhotoShare App";
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dorjnyam
        </Typography>
        <Typography variant="h6">{getCurrentContext()}</Typography>
        {loading && <CircularProgress color="inherit" size={24} />}
        {error && <Typography variant="subtitle1" color="error">{error}</Typography>}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
