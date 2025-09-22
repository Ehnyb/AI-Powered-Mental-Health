import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Edit,
  Email,
  CalendarToday,
  TrendingUp,
  EmojiEvents,
  Settings,
  Security,
  Notifications,
  Delete,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAuth, updatePassword, deleteUser } from 'firebase/auth';

const Profile = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [moodStats, setMoodStats] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    // Load user data
    const savedName = localStorage.getItem(`displayName_${user?.uid}`) || '';
    setDisplayName(savedName);

    // Load mood statistics
    const moodHistory = JSON.parse(localStorage.getItem(`moodHistory_${user?.uid}`)) || [];
    const streak = parseInt(localStorage.getItem(`moodStreak_${user?.uid}`)) || 0;
    
    setMoodStats({
      totalEntries: moodHistory.length,
      currentStreak: streak,
      averageMood: moodHistory.length > 0 
        ? (moodHistory.reduce((sum, entry) => sum + entry.value, 0) / moodHistory.length).toFixed(1)
        : 0,
      thisMonth: moodHistory.filter(entry => 
        new Date(entry.date).getMonth() === new Date().getMonth()
      ).length,
    });
  }, [user]);

  const handleSaveProfile = () => {
    localStorage.setItem(`displayName_${user?.uid}`, displayName);
    setEditDialog(false);
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
      setSettingsDialog(false);
    } catch (error) {
      alert('Error updating password: ' + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(user);
        alert('Account deleted successfully');
      } catch (error) {
        alert('Error deleting account: ' + error.message);
      }
    }
  };

  const achievements = [
    {
      title: 'First Steps',
      description: 'Completed your first mood entry',
      earned: moodStats.totalEntries > 0,
      icon: '🎯',
    },
    {
      title: 'Consistent Tracker',
      description: 'Logged mood for 7 days in a row',
      earned: moodStats.currentStreak >= 7,
      icon: '🔥',
    },
    {
      title: 'Monthly Warrior',
      description: 'Logged mood 20 times this month',
      earned: moodStats.thisMonth >= 20,
      icon: '🏆',
    },
    {
      title: 'Self-Care Champion',
      description: 'Used breathing exercises 10 times',
      earned: false,
      icon: '🧘',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
          Profile 👤
        </Typography>

        <Grid container spacing={3}>
          {/* Profile Info */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 3,
                    backgroundColor: 'primary.main',
                    fontSize: '3rem',
                  }}
                >
                  {displayName ? displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {displayName || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {user?.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setEditDialog(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Settings />}
                    onClick={() => setSettingsDialog(true)}
                  >
                    Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Account Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={user?.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Member Since"
                      secondary={user?.metadata?.creationTime ? 
                        new Date(user.metadata.creationTime).toLocaleDateString() : 
                        'Unknown'
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats and Progress */}
          <Grid item xs={12} md={8}>
            {/* Mood Statistics */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Wellness Statistics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {moodStats.totalEntries || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Entries
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        {moodStats.currentStreak || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Day Streak
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                        {moodStats.averageMood || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Mood
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                        {moodStats.thisMonth || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This Month
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Achievements
                </Typography>
                <Grid container spacing={2}>
                  {achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          sx={{
                            opacity: achievement.earned ? 1 : 0.5,
                            border: achievement.earned ? '2px solid' : '1px solid',
                            borderColor: achievement.earned ? 'success.main' : 'divider',
                          }}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="h4" sx={{ mr: 2 }}>
                                {achievement.icon}
                              </Typography>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {achievement.title}
                                </Typography>
                                {achievement.earned && (
                                  <Chip
                                    label="Earned"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Edit Profile Dialog */}
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              sx={{ mt: 2 }}
              placeholder="Enter your display name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                Change Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handlePasswordUpdate}
                disabled={!newPassword || !confirmPassword}
              >
                Update Password
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'error.main' }}>
                <Delete sx={{ mr: 1, verticalAlign: 'middle' }} />
                Danger Zone
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default Profile;