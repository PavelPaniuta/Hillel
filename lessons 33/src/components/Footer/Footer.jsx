import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, marginBottom: 1 }}>
        <PersonIcon />
        <Typography variant="body1">Pavel Paniuta</Typography>
      </Box>

    
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, marginBottom: 1 }}>
        <PhoneIcon />
        <Typography variant="body1">
          <Link href="tel:+380936501751" color="inherit" underline="none">
            +38 093 650 17 51
          </Link>
        </Typography>
      </Box>

 
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <EmailIcon />
        <Typography variant="body1">
          <Link href="mailto:paniuta.p@gmail.com" color="inherit" underline="none">
            paniuta.p@gmail.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
