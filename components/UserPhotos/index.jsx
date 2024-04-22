import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, CardMedia, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { cs142models } from "../../modelData/photoApp";

function UserPhotos(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const userId = props.match.params.userId;

    const fetchUserPhotos = async () => {
      try {
        const userPhotos = await cs142models.photoOfUserModel(userId);
        setPhotos(userPhotos);
      } catch (error) {
        console.error("Error fetching user photos:", error);
      }
    };

    fetchUserPhotos();

    return () => {
      setPhotos([]);
    };
  }, [props.match.params.userId]);

  return (
    <div>
      <Button
        variant="outlined"
        component={Link}
        to={`/users/${props.match.params.userId}`}
        sx={{ marginBottom: '20px' }}
      >
        Back to User Detail
      </Button>
      <Typography variant="body1">
        {photos.length > 0 ? (
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} key={photo._id}>
                <Paper elevation={3} sx={{ marginBottom: '20px' }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="400"
                      image={`../../images/${photo.file_name}`} 
                      alt={photo.file_name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {photo.file_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date/Time: {new Date(photo.date_time).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Comments:
                      </Typography>
                      {photo.comments && Array.isArray(photo.comments) && photo.comments.length > 0 ? (
                        photo.comments.map((comment) => (
                          <Typography key={comment._id} variant="body2" sx={{ marginLeft: '15px', borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
                            <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                              <strong>{comment.user.first_name} {comment.user.last_name}</strong>
                            </Link>
                            : {comment.comment}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2">
                          No comments for this photo.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No photos found for this user.</p>
        )}
      </Typography>
    </div>
  );
}

export default UserPhotos;
