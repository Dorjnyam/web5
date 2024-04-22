import React, { useEffect, useState } from "react";
import { Button, List, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { cs142models } from "../../modelData/photoApp";

function UserDetail(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = props.match.params.userId;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userDetails = await cs142models.userModel(userId);
        setUser(userDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      setUser(null);
      setLoading(true);
      setError(null);
    };
  }, [props.match.params.userId]);

  return (
    <div>
      {loading && (
        <Typography variant="body1">Loading user details...</Typography>
      )}
      {error && <Typography variant="body1">Error: {error}</Typography>}
      {user && (
        <List>
          <div>
            <Typography variant="body1">
              <strong>First Name:</strong> {user.first_name}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong> {user.last_name}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {user.location}
            </Typography>
            <Typography variant="body1">
              <strong>Occupation:</strong> {user.occupation}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/photos/${user._id}`}
            >
              View Photos
            </Button>
          </div>
        </List>
      )}
    </div>
  );
}

export default UserDetail;
