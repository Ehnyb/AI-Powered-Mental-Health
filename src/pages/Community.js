import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Forum,
  Add,
  ThumbUp,
  Comment,
  People,
  Support,
  Favorite,
  Psychology,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Community = () => {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Dealing with anxiety at work',
      content: 'I\'ve been struggling with anxiety in my workplace. Does anyone have tips for managing stress during meetings?',
      author: 'Sarah M.',
      category: 'Anxiety',
      likes: 12,
      comments: 8,
      time: '2 hours ago',
      avatar: 'S',
    },
    {
      id: 2,
      title: 'Celebrating small wins',
      content: 'Today I managed to go for a walk even though I was feeling down. It\'s a small step but I\'m proud of myself!',
      author: 'Mike R.',
      category: 'Self-Care',
      likes: 24,
      comments: 15,
      time: '4 hours ago',
      avatar: 'M',
    },
    {
      id: 3,
      title: 'Meditation apps recommendations?',
      content: 'I\'m new to meditation and looking for good apps to get started. What has worked for you?',
      author: 'Emma L.',
      category: 'Mindfulness',
      likes: 18,
      comments: 22,
      time: '6 hours ago',
      avatar: 'E',
    },
  ]);

  const categories = [
    { name: 'Anxiety', color: '#6366f1', count: 45 },
    { name: 'Depression', color: '#ec4899', count: 32 },
    { name: 'Self-Care', color: '#10b981', count: 67 },
    { name: 'Mindfulness', color: '#f59e0b', count: 28 },
    { name: 'Support', color: '#8b5cf6', count: 54 },
  ];

  const handleCreatePost = () => {
    const newPost = {
      id: posts.length + 1,
      title: postTitle,
      content: postContent,
      author: 'You',
      category: 'General',
      likes: 0,
      comments: 0,
      time: 'Just now',
      avatar: 'Y',
    };
    setPosts([newPost, ...posts]);
    setNewPostDialog(false);
    setPostTitle('');
    setPostContent('');
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : '#6366f1';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Community Support 🤝
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Connect with others on their mental health journey. Share experiences, offer support, and find encouragement.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setNewPostDialog(true)}
            sx={{ height: 'fit-content' }}
          >
            New Post
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Categories Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  <People sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Categories
                </Typography>
                <List dense>
                  {categories.map((category, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 2,
                        mb: 0.5,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: category.color,
                            width: 32,
                            height: 32,
                          }}
                        >
                          <Forum sx={{ fontSize: 16 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={category.name}
                        secondary={`${category.count} posts`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  <Support sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Community Guidelines
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  • Be kind and respectful
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  • Share experiences, not medical advice
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  • Respect privacy and confidentiality
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Report inappropriate content
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Posts Feed */}
          <Grid item xs={12} md={9}>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: 'primary.main',
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {post.avatar}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
                            {post.title}
                          </Typography>
                          <Chip
                            label={post.category}
                            size="small"
                            sx={{
                              backgroundColor: getCategoryColor(post.category),
                              color: 'white',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          by {post.author} • {post.time}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          {post.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            startIcon={<ThumbUp />}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 20 }}
                          >
                            {post.likes} Likes
                          </Button>
                          <Button
                            startIcon={<Comment />}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 20 }}
                          >
                            {post.comments} Comments
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Load More Button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="outlined" size="large">
                Load More Posts
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* New Post Dialog */}
        <Dialog
          open={newPostDialog}
          onClose={() => setNewPostDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Add sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Create New Post</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Post Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              sx={{ mb: 3, mt: 1 }}
              placeholder="What would you like to share?"
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or ask for support..."
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Remember: This is a supportive community. Please be respectful and avoid sharing personal information.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setNewPostDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreatePost}
              disabled={!postTitle.trim() || !postContent.trim()}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default Community;