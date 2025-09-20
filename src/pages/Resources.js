import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  SelfImprovement,
  Psychology,
  MenuBook,
  Phone,
  VideoLibrary,
  Article,
  Favorite,
  PlayArrow,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Resources = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [exerciseDialog, setExerciseDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const breathingExercises = [
    {
      name: '4-7-8 Breathing',
      duration: '4 minutes',
      description: 'Inhale for 4, hold for 7, exhale for 8. Great for anxiety relief.',
      steps: [
        'Sit comfortably with your back straight',
        'Exhale completely through your mouth',
        'Inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat 3-4 times'
      ],
      benefits: ['Reduces anxiety', 'Improves sleep', 'Lowers stress'],
    },
    {
      name: 'Box Breathing',
      duration: '5 minutes',
      description: 'Equal counts for inhale, hold, exhale, hold. Used by Navy SEALs.',
      steps: [
        'Sit upright in a comfortable position',
        'Exhale all air from your lungs',
        'Inhale through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale through your mouth for 4 counts',
        'Hold empty for 4 counts',
        'Repeat for 5 minutes'
      ],
      benefits: ['Improves focus', 'Reduces stress', 'Enhances performance'],
    },
    {
      name: 'Belly Breathing',
      duration: '10 minutes',
      description: 'Deep diaphragmatic breathing to activate relaxation response.',
      steps: [
        'Lie down or sit comfortably',
        'Place one hand on chest, one on belly',
        'Breathe slowly through your nose',
        'Feel your belly rise more than your chest',
        'Exhale slowly through pursed lips',
        'Continue for 10 minutes'
      ],
      benefits: ['Activates relaxation', 'Lowers blood pressure', 'Improves oxygen flow'],
    },
  ];

  const articles = [
    {
      title: 'Understanding Anxiety: A Complete Guide',
      category: 'Mental Health',
      readTime: '8 min read',
      description: 'Learn about anxiety symptoms, causes, and effective coping strategies.',
      color: '#6366f1',
    },
    {
      title: 'Building Resilience in Difficult Times',
      category: 'Self-Care',
      readTime: '6 min read',
      description: 'Practical tips for developing emotional resilience and bouncing back.',
      color: '#10b981',
    },
    {
      title: 'The Science of Happiness',
      category: 'Psychology',
      readTime: '10 min read',
      description: 'Discover what research tells us about happiness and well-being.',
      color: '#f59e0b',
    },
    {
      title: 'Mindfulness for Beginners',
      category: 'Mindfulness',
      readTime: '5 min read',
      description: 'Simple mindfulness practices you can start today.',
      color: '#ec4899',
    },
  ];

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support',
      available: '24/7',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text',
      available: '24/7',
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      available: '24/7',
    },
  ];

  const handleExerciseStart = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseDialog(true);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
      }
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Wellness Resources 🌱
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Tools and resources to support your mental health journey.
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 4 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Breathing Exercises" icon={<SelfImprovement />} />
          <Tab label="Articles" icon={<Article />} />
          <Tab label="Crisis Support" icon={<Phone />} />
        </Tabs>

        {/* Breathing Exercises Tab */}
        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={3}>
            {breathingExercises.map((exercise, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                          <SelfImprovement />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {exercise.name}
                          </Typography>
                          <Chip
                            label={exercise.duration}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {exercise.description}
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                          Benefits:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {exercise.benefits.map((benefit, idx) => (
                            <Chip
                              key={idx}
                              label={benefit}
                              size="small"
                              variant="outlined"
                              color="success"
                            />
                          ))}
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PlayArrow />}
                        onClick={() => handleExerciseStart(exercise)}
                      >
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Articles Tab */}
        <TabPanel value={selectedTab} index={1}>
          <Grid container spacing={3}>
            {articles.map((article, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card sx={{ height: '100%', cursor: 'pointer' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ backgroundColor: article.color, mr: 2 }}>
                          <Article />
                        </Avatar>
                        <Box>
                          <Chip
                            label={article.category}
                            size="small"
                            sx={{ backgroundColor: article.color, color: 'white', mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {article.readTime}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {article.description}
                      </Typography>
                      <Button variant="outlined" fullWidth>
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Crisis Support Tab */}
        <TabPanel value={selectedTab} index={2}>
          <Card sx={{ mb: 4, backgroundColor: 'error.light', color: 'error.contrastText' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                ⚠️ If you're in immediate danger, call 911
              </Typography>
              <Typography variant="body1">
                If you're having thoughts of suicide or self-harm, please reach out for help immediately.
                You are not alone, and there are people who want to help.
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {crisisResources.map((resource, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ backgroundColor: 'error.main', mr: 2 }}>
                          <Phone />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {resource.name}
                          </Typography>
                          <Chip
                            label={resource.available}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}
                      >
                        {resource.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {resource.description}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        color="error"
                        href={`tel:${resource.number.replace(/\D/g, '')}`}
                      >
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Exercise Dialog */}
        <Dialog
          open={exerciseDialog}
          onClose={() => setExerciseDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SelfImprovement sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">
                {selectedExercise?.name}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {selectedExercise?.description}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Steps:
            </Typography>
            <List>
              {selectedExercise?.steps.map((step, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setExerciseDialog(false)}>Close</Button>
            <Button variant="contained" onClick={() => setExerciseDialog(false)}>
              Start Exercise
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default Resources;