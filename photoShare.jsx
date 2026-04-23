import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import './styles/main.css';

import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/loginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainContent: '',
      loggedInUser: null, // { _id, first_name, last_name, location }
    };
    this.changeMainContent = this.changeMainContent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  changeMainContent(content) {
    this.setState({ mainContent: content });
  }

  handleLogin(user) {
    this.setState({ loggedInUser: user });
  }

  handleLogout() {
    this.setState({ loggedInUser: null });
  }

  render() {
    const isLoggedIn = !!this.state.loggedInUser;

    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar
                mainContent={this.state.mainContent}
                loggedInUser={this.state.loggedInUser}
                onLogout={this.handleLogout}
              />
            </Grid>
            <div className="main-topbar-buffer" />
            {isLoggedIn && (
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
            )}
            <Grid item sm={isLoggedIn ? 9 : 12}>
              <Paper className="main-grid-item">
                <Switch>
                  <Route
                    path="/login-register"
                    render={() => (
                      <LoginRegister onLogin={this.handleLogin} />
                    )}
                  />
                  {isLoggedIn ? (
                    <>
                      <Route
                        path="/users/:userId"
                        render={(props) => (
                          <UserDetail
                            {...props}
                            changeMainContent={this.changeMainContent}
                          />
                        )}
                      />
                      <Route
                        path="/photos/:userId"
                        render={(props) => (
                          <UserPhotos
                            {...props}
                            changeMainContent={this.changeMainContent}
                          />
                        )}
                      />
                      <Redirect to="/users" />
                    </>
                  ) : (
                    <Redirect to="/login-register" />
                  )}
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);