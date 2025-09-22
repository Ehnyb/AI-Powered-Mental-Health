import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
  TrendingUp,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  const moods = [
    {
      name: 'Very Happy',
      icon: <SentimentVerySatisfied />,
      color: '#10b981',
      value: 5,
    },
    {
      name: 'Happy',
      icon: <SentimentSatisfied />,
      color: '#84cc16',
      value: 4,
    },
    {
      name: 'Neutral',
      icon: <SentimentNeutral />,
      color: '#f59e0b',
      value: 3,
    },
    {
      name: 'Sad',
      icon: <SentimentDissatisfied />,
      color: '#f97316',
      value: 2,
    },
    {
      name: 'Very Sad',
      icon: <SentimentVeryDissatisfied />,
      color: '#ef4444',
      value: 1,
    },
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const history = JSON.parse(localStorage.getItem(`moodHistory_${user?.uid}`)) || [];
    setMoodHistory(history);
  }, [user]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setDialogOpen(true);
  };

  const handleSaveMood = async () => {
    const moodEntry = {
      mood: selectedMood.name,
      value: selectedMood.value,
      intensity,
      notes,
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    const updatedHistory = [...moodHistory, moodEntry];
    setMoodHistory(updatedHistory);
    localStorage.setItem(`moodHistory_${user?.uid}`, JSON.stringify(updatedHistory));

    // Update streak
    const today = new Date().toDateString();
    const lastEntry = updatedHistory[updatedHistory.length - 2];
    const lastEntryDate = lastEntry ? new Date(lastEntry.date).toDateString() : null;
    
    if (lastEntryDate !== today) {
      const currentStreak = parseInt(localStorage.getItem(`moodStreak_${user?.uid}`)) || 0;
      localStorage.setItem(`moodStreak_${user?.uid}`, (currentStreak + 1).toString());
    }

    // Get AI suggestion
    try {
      const response = await axios.post('http://127.0.0.1:5001/checkin', {
        mood: selectedMood.name.toLowerCase(),
      });
      setAiSuggestion(response.data.suggestion);
    } catch (error) {
      setAiSuggestion('Remember to take care of yourself today! 💙');
    }

    setDialogOpen(false);
    setNotes('');
    setIntensity(3);
  };

  const getChartData = () => {
    return moodHistory
      .slice(-7)
      .map((entry, index) => ({
        day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
        mood: entry.value,
        date: entry.date,
      }));
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.value, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Mood Tracker 📊
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Track your emotional well-being and discover patterns in your mood.
        </Typography>

        {/* Mood Selection */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              How are you feeling right now?
            </Typography>
            <Grid container spacing={2}>
              {moods.map((mood, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        p: 2,
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: mood.color,
                          boxShadow: `0 4px 20px ${mood.color}30`,
                        },
                      }}
                      onClick={() => handleMoodSelect(mood)}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: mood.color,
                          width: 60,
                          height: 60,
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        {mood.icon}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {mood.name}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Stats and Chart */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Mood Trend (Last 7 Days)
                </Typography>
                {moodHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[1, 5]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <Typography>Start tracking your mood to see trends!</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Statistics
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Entries
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {moodHistory.length}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Average Mood
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {getAverageMood()}/5
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    This Week
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {moodHistory.filter(entry => 
                      Date.now() - new Date(entry.date).getTime() < 7 * 24 * 60 * 60 * 1000
                    ).length} entries
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {aiSuggestion && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    AI Wellness Tip
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    {aiSuggestion}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Recent Entries */}
        {moodHistory.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Entries
              </Typography>
              <List>
                {moodHistory
                  .slice(-5)
                  .reverse()
                  .map((entry, index) => {
                    const mood = moods.find(m => m.name === entry.mood);
                    return (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: mood?.color }}>
                            {mood?.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {entry.mood}
                              </Typography>
                              <Chip
                                label={`${entry.intensity}/5`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(entry.date).toLocaleString()}
                              </Typography>
                              {entry.notes && (
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                  "{entry.notes}"
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Mood Entry Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {selectedMood && (
                <Avatar sx={{ backgroundColor: selectedMood.color, mr: 2 }}>
                  {selectedMood.icon}
                </Avatar>
              )}
              <Typography variant="h6">
                Feeling {selectedMood?.name}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                How intense is this feeling?
              </Typography>
              <Rating
                value={intensity}
                onChange={(event, newValue) => setIntensity(newValue)}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes (optional)"
              placeholder="What's on your mind? Any specific thoughts or events that influenced your mood?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveMood}>
              Save Entry
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default MoodTracker;