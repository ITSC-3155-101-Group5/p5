import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import './TopBar.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: undefined,
    };
  }

  componentDidMount() {
    axios.get('/test/info')
      .then((response) => {
        this.setState({ version: response.data.__v });
      })
      .catch((err) => {
        console.error('Failed to fetch version:', err.status, err.statusText);
      });
  }

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            Chelsey Clinton
            {this.state.version !== undefined && ` — v${this.state.version}`}
          </Typography>
          <Typography variant="h6" color="inherit">
            {this.props.mainContent || ''}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
