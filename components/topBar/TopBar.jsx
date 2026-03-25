import React from 'react';

import {
  AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

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
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
              Chelsey Clinton
          </Typography>
          <Typography variant="h6" color="inherit">
              {this.getContext()}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
