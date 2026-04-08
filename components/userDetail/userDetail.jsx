import React from 'react';
import {
    Box,
    Button,
    TextField
} from '@mui/material';
import './userDetail.css';
import axios from 'axios';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    componentDidMount() {
        const userId = this.props.match?.params?.userId;
        if (userId) this.handleUserChange(userId);
    }

    componentDidUpdate() {
        const newUserId = this.props.match?.params?.userId;
        const currentUserId = this.state.user?._id;
        if (newUserId && newUserId !== currentUserId) {
            this.handleUserChange(newUserId);
        }
    }

    handleUserChange(userId) {
        axios.get("/user/" + userId)
            .then((response) => {
                const newUser = response.data;
                this.setState({ user: newUser });
                if (typeof this.props.changeMainContent === 'function') {
                    this.props.changeMainContent(
                        `User Details for ${newUser.first_name} ${newUser.last_name}`
                    );
                }
            })
            .catch((err) => {
                console.error('Failed to fetch user:', err.status, err.statusText);
            });
    }

    render() {
        const { user } = this.state;

        return user ? (
            <div>
                <Box component="form" noValidate autoComplete="off">
                    <div>
                        <Button variant="contained" component="a" href={"#/photos/" + user._id}>
                            User Photos
                        </Button>
                    </div>
                    <div>
                        <TextField label="First Name" variant="outlined" disabled fullWidth
                                   margin="normal" value={user.first_name || ""} />
                    </div>
                    <div>
                        <TextField label="Last Name" variant="outlined" disabled fullWidth
                                   margin="normal" value={user.last_name || ""} />
                    </div>
                    <div>
                        <TextField label="Location" variant="outlined" disabled fullWidth
                                   margin="normal" value={user.location || ""} />
                    </div>
                    <div>
                        <TextField label="Description" variant="outlined" multiline rows={4}
                                   disabled fullWidth margin="normal"
                                   value={user.description || ""} />
                    </div>
                    <div>
                        <TextField label="Occupation" variant="outlined" disabled fullWidth
                                   margin="normal" value={user.occupation || ""} />
                    </div>
                </Box>
            </div>
        ) : (
            <div/>
        );
    }
}

export default UserDetail;