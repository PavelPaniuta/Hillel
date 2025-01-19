import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/SwapiSlice/SwapiSlice';
import { TextField, Button, Box, Typography } from '@mui/material';

const SwapiInput = () => {
  const dispatch = useDispatch();

  const fixedPart = 'https://swapi.py4e.com/api/';
  const [editablePart, setEditablePart] = useState('');

  const fullUrl = `${fixedPart}${editablePart}`;

  const loadData = (url) => {
    dispatch(fetchData(url));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
        Fetch Star Wars Data
      </Typography>

      
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: '#f3f3f3',
            padding: '10px 15px',
            borderRadius: '4px 0 0 4px',
            color: '#555',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {fixedPart}
        </Typography>
        <TextField
          value={editablePart}
          onChange={(e) => setEditablePart(e.target.value)}
          placeholder="people/1"
          variant="outlined"
          sx={{
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '0 4px 4px 0',
            },
          }}
        />
      </Box>

      
      <Button
        variant="contained"
        color="primary"
        onClick={() => loadData(fullUrl)}
        sx={{
          padding: '10px 20px',
          textTransform: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Get Info
      </Button>
    </Box>
  );
};

export default SwapiInput;
