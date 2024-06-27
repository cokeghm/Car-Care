import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Alert } from '@mui/material';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/files');
        setFiles(res.data);
      } catch (err) {
        setError('Failed to fetch files');
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        File List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {files.map((file) => (
          <ListItem key={file._id}>
            <ListItemText primary={file.filename} secondary={`Uploaded on ${new Date(file.uploadDate).toLocaleString()}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileList;