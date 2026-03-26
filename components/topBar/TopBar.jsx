import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@mui/material';
import FetchModel from '../../lib/fetchModelData';
import './TopBar.css';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      context: 'Users',
      version: '',
    };
  }

  componentDidMount() {
    this.updateContext();
    this.fetchVersion();
    window.addEventListener('hashchange', this.updateContext);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.updateContext);
  }

  fetchVersion = () => {
    FetchModel('/test/info')
      .then((res) => {
        this.setState({ version: res.data.__v });
      })
      .catch((err) => console.error(err));
  };

  updateContext = () => {
    const hash = window.location.hash;

    const photosMatch = hash.match(/^#\/photos\/([^/]+)$/);
    if (photosMatch) {
      const userId = photosMatch[1];

      FetchModel(`/user/${userId}`)
        .then((res) => {
          const user = res.data;
          this.setState({
            context: `Photos of ${user.first_name} ${user.last_name}`
          });
        })
        .catch((err) => console.error(err));
      return;
    }

    const usersMatch = hash.match(/^#\/users\/([^/]+)$/);
    if (usersMatch) {
      const userId = usersMatch[1];

      FetchModel(`/user/${userId}`)
        .then((res) => {
          const user = res.data;
          this.setState({
            context: `Profile of ${user.first_name} ${user.last_name}`
          });
        })
        .catch((err) => console.error(err));
      return;
    }

    this.setState({ context: 'Users' });
  };

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            Elijah James
          </Typography>
          <Typography variant="h6" color="inherit">
            {this.state.context} {this.state.version && `(v${this.state.version})`}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
