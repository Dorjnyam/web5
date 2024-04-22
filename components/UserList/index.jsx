import React, { useState } from "react";
import {
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  Box, // Import Box component
} from "@mui/material";
import { Link } from "react-router-dom"; 
import { cs142models } from "../../modelData/photoApp";

function UserList() {
  const users = cs142models.userListModel();

  const [selectedIndex, setSelectIndex] = useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectIndex(index);
  };

  return (
    <div>
      <Typography variant="body1">
         You might choose to use{" "}
        <a href="https://mui.com/components/lists/">Lists</a> and{" "}
        <a href="https://mui.com/components/dividers/">Dividers</a> 
      </Typography>
      <List component="nav">
        {users &&
          users.map((user, index) => (
            <div key={index}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
                component={Link} 
                to={`/users/${user._id}`} 
              >
                <Box>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                    secondary={`Location: ${user.location}, Occupation: ${user.occupation}`}
                  />
                </Box>
              </ListItemButton>
              <Divider />
            </div>
          ))}
      </List>
    </div>
  );
}

export default UserList;
