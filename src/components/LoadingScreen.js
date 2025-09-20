import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Favorite sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          </motion.div>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            MindfulSupport
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Loading your wellness journey...
          </Typography>
        </Box>
      </motion.div>
      
      <CircularProgress size={40} thickness={4} />
    </Box>
  );
};

export default LoadingScreen;