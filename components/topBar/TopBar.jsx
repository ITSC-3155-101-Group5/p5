import React from 'react';

import {
  AppBar, Toolbar, Typography, Button
} from '@mui/material';
import axios from 'axios';
import './TopBar.css';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    axios.post('/admin/logout')
      .then(() => {
        // Update app state to reflect logout
        if (this.props.onLogout) {
          this.props.onLogout();
        }
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  // eslint-disable-next-line class-methods-use-this
  getContext() {
    const hash = window.location.hash;

    const photosMatch = hash.match(/^#\/photos\/([^/]+)$/);
    if (photosMatch) {
      const user = window.models.userModel(photosMatch[1]);
      if (user) {
        return `Photos of ${user.first_name} ${user.last_name}`;
      }
    }

    const usersMatch = hash.match(/^#\/users\/([^/]+)$/);
    if (usersMatch) {
      const user = window.models.userModel(usersMatch[1]);
      if (user) {
        return `Profile of ${user.first_name} ${user.last_name}`;
      }
    }

    return 'Users';
  }

  render() {
    const { loggedInUser } = this.props;

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            Chelsey Clinton
          </Typography>
          <Typography variant="h6" color="inherit" style={{ marginRight: 20 }}>
            {this.getContext()}
          </Typography>
          {loggedInUser ? (
            <>
              <Typography variant="h6" color="inherit" style={{ marginRight: 10 }}>
                Hi {loggedInUser.first_name}
              </Typography>
              <Button color="inherit" onClick={this.handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="h6" color="inherit">
              Please Login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
