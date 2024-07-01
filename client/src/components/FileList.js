import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { List, ListItem, ListItemText, CircularProgress, Alert, Box, Typography } from '@mui/material';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/files`);
        setFiles(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch files');
        setLoading(false);
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Uploaded Files
      </Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file._id}>
            <ListItemText primary={file.filename} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileList;