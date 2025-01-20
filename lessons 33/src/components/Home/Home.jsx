import React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import photo from './photo.jpg';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >

      <Avatar
        alt="Pavel Paniuta"
        src={photo} 
        sx={{
          width: 150,
          height: 150,
          marginBottom: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      />

      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Pavel Paniuta
      </Typography>

 
      <Typography variant="body1" sx={{  marginBottom: 3 }}>
        Frontend Developer | SEO Specialist | Open Cart Expert
      </Typography>

  
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(185, 107, 107, 0.1)',
          padding: 3,
  }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Skills
        </Typography>
        <List>
          {['React.js', 'OpenCart', 'WordPress', 'SEO'].map((skill) => (
            <ListItem key={skill} sx={{ padding: 0, marginBottom: 1 }}>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Home;
