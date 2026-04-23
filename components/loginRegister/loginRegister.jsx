import React from "react";
import axios from "axios";
import "./loginRegister.css";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // login fields
      login_name: "",
      password: "",

      // registration fields
      reg_login_name: "",
      reg_password: "",
      reg_confirm_password: "",
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",

      error: "",
      success: ""
    };
  }

  // =========================
  // LOGIN
  // =========================
  handleLogin = () => {
    this.setState({ error: "", success: "" });

    axios.post("/admin/login", {
      login_name: this.state.login_name,
      password: this.state.password
    })
    .then((res) => {
      this.setState({ success: "Login successful!" });

      // Notify parent app (typical pattern in this project)
      if (this.props.onLogin) {
        this.props.onLogin(res.data);
      }
    })
    .catch((err) => {
      this.setState({
        error: err.response?.data || "Login failed"
      });
    });
  };

  // =========================
  // REGISTER
  // =========================
  handleRegister = () => {
    this.setState({ error: "", success: "" });

    // validate passwords match
    if (this.state.reg_password !== this.state.reg_confirm_password) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    // basic validation
    if (!this.state.reg_login_name ||
        !this.state.reg_password ||
        !this.state.first_name ||
        !this.state.last_name) {
      this.setState({ error: "Missing required fields" });
      return;
    }

    axios.post("/user", {
      login_name: this.state.reg_login_name,
      password: this.state.reg_password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      location: this.state.location,
      description: this.state.description,
      occupation: this.state.occupation
    })
    .then(() => {
      this.setState({
        success: "Login successful!",
        error: "",

        // clear form
        reg_login_name: "",
        reg_password: "",
        reg_confirm_password: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: ""
      });
    })
    .catch((err) => {
      this.setState({
        error: err.response?.data || "Registration failed"
      });
    });
  };

  render() {
    return (
      <div className="login-register-container">

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Login Name"
          value={this.state.login_name}
          onChange={(e) => this.setState({ login_name: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        <button onClick={this.handleLogin}>
          Login
        </button>

        <hr />

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Login Name"
          value={this.state.reg_login_name}
          onChange={(e) => this.setState({ reg_login_name: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={this.state.reg_password}
          onChange={(e) => this.setState({ reg_password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={this.state.reg_confirm_password}
          onChange={(e) => this.setState({ reg_confirm_password: e.target.value })}
        />

        <input
          type="text"
          placeholder="First Name"
          value={this.state.first_name}
          onChange={(e) => this.setState({ first_name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={this.state.last_name}
          onChange={(e) => this.setState({ last_name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          value={this.state.location}
          onChange={(e) => this.setState({ location: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Occupation"
          value={this.state.occupation}
          onChange={(e) => this.setState({ occupation: e.target.value })}
        />

        <button onClick={this.handleRegister}>
          Register Me
        </button>

        {/* Messages */}
        {this.state.error && (
          <div className="error-message">
            {this.state.error}
          </div>
        )}

        {this.state.success && (
          <div className="success-message">
            {this.state.success}
          </div>
        )}

      </div>
    );
  }
}

export default LoginRegister;
