import React from 'react';
import {
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import './userDetail.css';

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
}

export default UserDetail;