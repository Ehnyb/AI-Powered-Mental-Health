import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Mood,
  TrendingUp,
  Schedule,
  Favorite,
  SelfImprovement,
  Psychology,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Dashboard = () => {
  const [dailyQuote, setDailyQuote] = useState('');
  const [moodStreak, setMoodStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(65);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const quotes = [
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "It's okay to not be okay. What's not okay is staying that way.",
    "Healing isn't linear. Be patient with yourself.",
    "You are stronger than you think and more resilient than you know.",
    "Progress, not perfection. Every small step counts.",
    "Your feelings are valid. Your struggles are real. Your recovery is possible.",
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
    
    // Load user data from localStorage
    const streak = localStorage.getItem(`moodStreak_${user?.uid}`) || 0;
    setMoodStreak(parseInt(streak));
  }, [user]);

  const quickActions = [
    {
      title: 'Track Mood',
      description: 'Log how you\'re feeling today',
      icon: <Mood />,
      color: '#6366f1',
      action: () => navigate('/mood'),
    },
    {
      title: 'Breathing Exercise',
      description: '5-minute guided breathing',
      icon: <SelfImprovement />,
      color: '#10b981',
      action: () => navigate('/resources'),
    },
    {
      title: 'Mental Health Tips',
      description: 'Daily wellness resources',
      icon: <Psychology />,
      color: '#f59e0b',
      action: () => navigate('/resources'),
    },
  ];

  const stats = [
    { label: 'Current Streak', value: `${moodStreak} days`, icon: <TrendingUp /> },
    { label: 'Weekly Progress', value: `${weeklyProgress}%`, icon: <Schedule /> },
    { label: 'Mood Entries', value: '12 this month', icon: <Mood /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome back! 👋
          </Typography>
          <Typography variant="h6" color="text.secondary">
            How are you feeling today? Let's check in with your mental wellness.
          </Typography>
        </Box>

        {/* Daily Quote */}
        <Card
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Favorite sx={{ mr: 2, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Daily Inspiration
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => {
                  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                  setDailyQuote(randomQuote);
                }}
              >
                <Refresh />
              </IconButton>
            </Box>
            <Typography variant="h5" sx={{ fontStyle: 'italic', lineHeight: 1.4 }}>
              "{dailyQuote}"
            </Typography>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {stat.value}
                        </Typography>
                        <Typography color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                    {stat.label === 'Weekly Progress' && (
                      <LinearProgress
                        variant="determinate"
                        value={weeklyProgress}
                        sx={{ mt: 2, height: 8, borderRadius: 4 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={action.action}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: action.color,
                          width: 56,
                          height: 56,
                          mr: 2,
                        }}
                      >
                        {action.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {action.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        mt: 2,
                        borderColor: action.color,
                        color: action.color,
                        '&:hover': {
                          backgroundColor: action.color,
                          color: 'white',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Your Wellness Journey
          </Typography>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Achievements
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label="7-day mood tracking streak"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Completed breathing exercise"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label="Read 3 wellness articles"
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  label="Joined community discussion"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/mood')}
                  sx={{ mr: 2 }}
                >
                  Track Today's Mood
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/resources')}
                >
                  Explore Resources
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Dashboard;