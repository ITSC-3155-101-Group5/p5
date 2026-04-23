import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import './TopBar.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: undefined,
      selectedFileName: '',
    };
  }

  componentDidMount() {
    axios.get('/test/info')
      .then((response) => {
        this.setState({ version: response.data.__v });
      })
      .catch((err) => {
        console.error('Failed to fetch version:', err);
      });
  }

  handleFileChange = (e) => {
    console.log("CHANGE FIRED");
    console.log("FILES:", e.target.files);
    console.log("FIRST FILE:", e.target.files[0]);

    const file = e.target.files[0];
    this.selectedFile = file;

    this.setState({
      selectedFileName: file ? file.name : '',
    });
  };

  handleUpload = (e) => {
    e.preventDefault();
    console.log("BUTTON CLICKED");
    console.log("SELECTED FILE:", this.selectedFile);

    if (!this.selectedFile) {
      console.log("No file selected");
      return;
    }

    const form = new FormData();
    form.append("uploadedphoto", this.selectedFile);

    axios.post("/photos/new", form)
      .then((res) => {
        console.log("Upload success", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Upload error", err);
      });
  };

  render() {
    const { loggedInUser, onLogout } = this.props;
    const isLoggedIn = !!loggedInUser;

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          {isLoggedIn && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={this.handleFileChange}
              />

              <button type="button" onClick={this.handleUpload}>
                Add Photo
              </button>

              <span style={{ marginLeft: '8px', marginRight: '16px' }}>
                {this.state.selectedFileName}
              </span>
            </>
          )}

          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            {isLoggedIn ? `Hi ${loggedInUser.first_name}` : 'Please Login'}
            {this.state.version !== undefined && ` — v${this.state.version}`}
          </Typography>

          {isLoggedIn && (
            <button onClick={onLogout} style={{ marginLeft: '16px' }}>
              Logout
            </button>
          )}

          <Typography variant="h6" color="inherit">
            {this.props.mainContent || ''}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;