import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './userList.css';
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
  render() {
    const users = window.models.userListModel();

    return (
      <div>
        <List component="nav">
          {users.map((user) => (
            <div key={user._id}>
              <ListItemButton
                component={Link}
                to={`/users/${user._id}`}
              >
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                />
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;
