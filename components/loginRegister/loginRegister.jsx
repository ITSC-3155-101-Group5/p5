import React from 'react';
import {
  Button, TextField, Typography, Grid, Paper, Alert
} from '@mui/material';
import axios from 'axios';
import './loginRegister.css';

/**
 * Define LoginRegister, a React component for user login and registration
 */
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: '',
      password: '',
      firstName: '',
      lastName: '',
      location: '',
      description: '',
      occupation: '',
      confirmPassword: '',
      loginError: '',
      registerError: '',
      registerSuccess: ''
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { loginName, password } = this.state;

    axios.post('/admin/login', { login_name: loginName, password })
      .then((response) => {
        // Assuming successful login, redirect or update app state
        console.log('Login successful', response.data);
        this.setState({ loginError: '' });
        // Call the onLogin prop to update parent state
        if (this.props.onLogin) {
          this.props.onLogin(response.data);
        }
      })
      .catch((error) => {
        this.setState({ loginError: error.response?.data || 'Login failed' });
      });
  };

  handleRegister = (event) => {
    event.preventDefault();
    const {
      loginName, password, firstName, lastName, location, description, occupation, confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({ registerError: 'Passwords do not match' });
      return;
    }

    axios.post('/user', {
      login_name: loginName,
      password,
      first_name: firstName,
      last_name: lastName,
      location,
      description,
      occupation
    })
      .then(() => {
        this.setState({
          registerError: '',
          registerSuccess: 'Registration successful! Please log in.',
          loginName: '',
          password: '',
          firstName: '',
          lastName: '',
          location: '',
          description: '',
          occupation: '',
          confirmPassword: ''
        });
      })
      .catch((error) => {
        this.setState({ registerError: error.response?.data || 'Registration failed' });
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      loginName, password, firstName, lastName, location, description, occupation, confirmPassword,
      loginError, registerError, registerSuccess
    } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <Paper style={{ padding: 20 }}>
            <form onSubmit={this.handleLogin}>
              <TextField
                fullWidth
                label="Login Name"
                name="loginName"
                value={loginName}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Register</Typography>
          {registerError && <Alert severity="error">{registerError}</Alert>}
          {registerSuccess && <Alert severity="success">{registerSuccess}</Alert>}
          <Paper style={{ padding: 20 }}>
            <form onSubmit={this.handleRegister}>
              <TextField
                fullWidth
                label="Login Name"
                name="loginName"
                value={loginName}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={location}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={description}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Occupation"
                name="occupation"
                value={occupation}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Register Me
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default LoginRegister;
