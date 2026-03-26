import React from 'react';
import {
    Box,
    Button,
    TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import './userDetail.css';
import fetchModel from "../../lib/fetchModelData";

<<<<<<< HEAD
/**
 * Define UserDetail, a React component of project #5
 */
class UserDetail extends React.Component {
  render() {
    const userId = this.props.match.params.userId;
    const user = window.models.userModel(userId);

    if (!user) {
      return (
        <Typography variant="body1">
          User not found.
        </Typography>
      );
    }

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Location:</strong> {user.location}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Occupation:</strong> {user.occupation}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {user.description}
        </Typography>

        <Typography variant="body1" sx={{ marginTop: '16px' }}>
          <Link to={`/photos/${user._id}`}>
            View {user.first_name}&apos;s Photos
          </Link>
        </Typography>
      </div>
    );
  }
=======

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }
    componentDidMount() {
        const new_user_id = this.props.match.params.userId;
        this.handleUserChange(new_user_id);
    }

    componentDidUpdate() {
        const new_user_id = this.props.match.params.userId;
        const current_user_id = this.state.user?._id;
        if (current_user_id  !== new_user_id){
            this.handleUserChange(new_user_id);
        }
    }

    handleUserChange(user_id){
        fetchModel("/user/" + user_id)
            .then((response) =>
            {
                const new_user = response.data;
                this.setState({
                    user: new_user
                });
                const main_content = "User Details for " + new_user.first_name + " " + new_user.last_name;
                this.props.changeMainContent(main_content);
            });
    }

    render() {
        return this.state.user ? (
            <div>
                <Box component="form" noValidate autoComplete="off">
                    <div>
                        <Button variant="contained" component="a" href={"#/photos/" + this.state.user._id}>
                            User Photos
                        </Button>
                    </div>
                    <div>
                        <TextField id="first_name" label="First Name" variant="outlined" disabled fullWidth
                                   margin="normal"
                                   value={this.state.user.first_name}/>
                    </div>
                    <div>
                        <TextField id="last_name" label="Last Name" variant="outlined" disabled fullWidth
                                   margin="normal"
                                   value={this.state.user.last_name}/>
                    </div>
                    <div>
                        <TextField id="location" label="Location" variant="outlined" disabled fullWidth
                                   margin="normal"
                                   value={this.state.user.location}/>
                    </div>
                    <div>
                        <TextField id="description" label="Description" variant="outlined" multiline rows={4}
                                   disabled
                                   fullWidth margin="normal" value={this.state.user.description}/>
                    </div>
                    <div>
                        <TextField id="occupation" label="Occupation" variant="outlined" disabled fullWidth
                                   margin="normal"
                                   value={this.state.user.occupation}/>
                    </div>
                </Box>
            </div>
        ) : (
            <div/>
        );
    }
>>>>>>> refs/remotes/origin/nick
}

export default UserDetail;