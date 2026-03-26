import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Card, CardContent, CardMedia, Box
} from '@mui/material';
import FetchModel from '../../lib/fetchModelData';
import './userPhotos.css';

/**
 * Define UserPhotos, a React component of project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      user: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;

    // Fetch user info
    FetchModel(`/user/${userId}`)
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        this.setState({ error: 'Failed to load user data' });
      });

    // Fetch user photos
    FetchModel(`/photosOfUser/${userId}`)
      .then((res) => {
        this.setState({ photos: res.data, loading: false });
      })
      .catch((err) => {
        console.error('Error fetching photos:', err);
        this.setState({ error: 'Failed to load photos', loading: false });
      });
  }

  render() {
    const { photos, user, loading, error } = this.state;
    const userId = this.props.match.params.userId;

    if (loading) {
      return <Typography variant="body1">Loading photos...</Typography>;
    }

    if (error) {
      return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!photos || photos.length === 0) {
      return (
        <Typography variant="body1">
          No photos found for {user ? `${user.first_name} ${user.last_name}` : `user ${userId}`}.
        </Typography>
      );
    }

    return (
      <Box className="user-photos-container">
        {photos.map((photo) => (
          <Card key={photo._id} className="user-photo-card">
            <CardMedia
              component="img"
              image={'/images/' + photo.file_name}
              alt="User Photo"
              className="photo-img"
            />
            <CardContent>
              <Typography variant="caption" color="textSecondary">
                {new Date(photo.date_time).toLocaleString()}
              </Typography>

              {photo.comments && photo.comments.length > 0 && (
                <Box className="comments-section">
                  <Typography variant="subtitle2" color="textPrimary">
                    Comments:
                  </Typography>
                  {photo.comments.map((comment) => (
                    <Box key={comment._id} className="comment-item">
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        <Link to={`/users/${comment.user._id}`}>
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                        : {comment.comment}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }
}

export default UserPhotos;
