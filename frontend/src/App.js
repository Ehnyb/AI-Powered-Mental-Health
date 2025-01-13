import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  deleteUser,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  Container,
  Box,
  Typography,
  Card,
  Button,
  Grid,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  TextField,
} from '@mui/material';
import { Menu as MenuIcon, Logout, Favorite, Whatshot, EmojiEmotions, MoodBad, SentimentSatisfiedAlt } from '@mui/icons-material';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoEmN0N0ZSepfVaxUS6m5i-ATiyp4FlXE",
  authDomain: "ai-app-9235f.firebaseapp.com",
  projectId: "ai-app-9235f",
  storageBucket: "ai-app-9235f.firebasestorage.app",
  messagingSenderId: "879165162969",
  appId: "1:879165162969:web:7d616f6030bb489a85c5c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [animeQuote, setAnimeQuote] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { label: 'Happy', icon: <SentimentSatisfiedAlt />, color: '#FFD700' },
    { label: 'Sad', icon: <MoodBad />, color: '#87CEEB' },
    { label: 'Excited', icon: <Whatshot />, color: '#FF6347' },
    { label: 'Content', icon: <EmojiEmotions />, color: '#FFE4B5' },
    { label: 'Angry', icon: <MoodBad />, color: '#DC143C' },
    { label: 'Peaceful', icon: <Favorite />, color: '#98FB98' },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedUsername = localStorage.getItem(`username_${user.uid}`);
        setUser(user);
        setUsername(storedUsername || '');
        const storedLog = JSON.parse(localStorage.getItem(`moodLog_${user.uid}`)) || [];
        setMoodHistory(storedLog);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      localStorage.setItem(`username_${userCredential.user.uid}`, username);
      alert('Sign-up successful! Check your email for verification.');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert('Please verify your email before signing in.');
        return;
      }
      alert('Sign-in successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    setUsername('');
  };

  const handleSubmit = async (selectedMood) => {
    setMood(selectedMood);
    try {
      const response = await axios.post('http://127.0.0.1:5001/checkin', { mood: selectedMood });
      setSuggestion(response.data.suggestion);
      setAnimeQuote('');
      const updatedLog = [...moodHistory, { mood: selectedMood, date: new Date().toLocaleString() }];
      setMoodHistory(updatedLog);
      localStorage.setItem(`moodLog_${user.uid}`, JSON.stringify(updatedLog));
      fetchAnimeQuote();
    } catch (error) {
      setSuggestion('Oops! Something went wrong. Try again later.');
    }
  };

  const fetchAnimeQuote = () => {
    const animeQuotes = [
      `"A lesson without pain is meaningless." — Edward Elric (Fullmetal Alchemist)`,
      `"Fear is not evil." — Gildarts Clive (Fairy Tail)`,
      `"A person grows up when they overcome hardships." — Jiraiya (Naruto)`,
    ];
    const randomQuote = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
    setAnimeQuote(randomQuote);
  };

  const handleUpdateInfo = () => {
    if (newUsername) {
      localStorage.setItem(`username_${user.uid}`, newUsername);
      setUsername(newUsername);
    }
    if (newEmail) {
      updateEmail(user, newEmail)
        .then(() => alert('Email updated successfully!'))
        .catch((err) => alert(`Failed to update email: ${err.message}`));
    }
    if (newPassword) {
      updatePassword(user, newPassword)
        .then(() => alert('Password updated successfully!'))
        .catch((err) => alert(`Failed to update password: ${err.message}`));
    }
    setSettingsOpen(false);
  };

  const handleDeleteAccount = () => {
    deleteUser(user)
      .then(() => {
        alert('Account deleted successfully.');
        setUser(null);
      })
      .catch((err) => alert(`Failed to delete account: ${err.message}`));
  };

  return (
    <Container sx={{ padding: 4, background: '#f7f8fc', minHeight: '100vh', borderRadius: 4 }}>
      <IconButton onClick={() => setDrawerOpen(true)} sx={{ position: 'absolute', top: 10, left: 10 }}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem button onClick={() => setLogOpen(true)}>
              <ListItemText primary="Daily Mood Log" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setSettingsOpen(true)}>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <Logout sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        {user ? `Welcome, ${username || "Bestie"}! 🌟` : 'Welcome to Your Mood Tracker'}
      </Typography>

      <Dialog open={logOpen} onClose={() => setLogOpen(false)} fullWidth>
        <DialogTitle>Daily Mood Log</DialogTitle>
        <DialogContent>
          {moodHistory.length > 0 ? (
            <List>
              {moodHistory.map((entry, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Mood: ${entry.mood}`} secondary={`Logged at: ${entry.date}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No mood logs recorded yet.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} fullWidth>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <TextField label="Change Username" fullWidth sx={{ mb: 2 }} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          <TextField label="Change Email" fullWidth sx={{ mb: 2 }} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <TextField label="Change Password" type="password" fullWidth sx={{ mb: 2 }} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateInfo}>Save Changes</Button>
          <Button onClick={handleDeleteAccount} color="error">Delete Account</Button>
          <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {user && (
        <>
          <Grid container spacing={2} justifyContent="center">
            {moods.map((m) => (
              <Grid item key={m.label}>
                <Button variant="contained" sx={{ minWidth: 100, backgroundColor: m.color }} onClick={() => handleSubmit(m.label)}>
                  {m.icon} {m.label}
                </Button>
              </Grid>
            ))}
          </Grid>

          {suggestion && <Chip label={`AI Self-Care Suggestion: ${suggestion}`} sx={{ mt: 3 }} />}

          {animeQuote && <Typography align="center" sx={{ mt: 2, fontStyle: 'italic' }}>Anime Quote: "{animeQuote}"</Typography>}
        </>
      )}
    </Container>
  );
}

export default App;