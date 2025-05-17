// components/Home.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import { getJobById, getJobs } from '../api/jobAPI';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const handleOpen = async (jobId) => {
  setLoading(true);
  try {
    const jobDetails = await getJobById(jobId);
    setSelectedJob(jobDetails);
    setOpen(true);
  } catch (error) {
    console.error('Failed to fetch job details:', error);
  } finally {
    setLoading(false);
  }
};
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const fetchJobs = async () => {
    const data = await getJobs(searchTitle, searchLocation);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTitle, searchLocation]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        width: { xs: '100%', sm: '90%', md: '75%', lg: '60%' },
        margin: 'auto',
      }}
    >
      <Typography variant={isMobile ? 'h4' : 'h3'} mb={4} align="center">
        Job Postings
      </Typography>

      {/* Search Fields */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={4}
        justifyContent="center"
        alignItems="stretch"
        width="100%"
      >
        <TextField
          fullWidth
          size="small"
          label="Search by Title"
          variant="outlined"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CiSearch size={20} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          size="small"
          label="Search by Location"
          variant="outlined"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CiSearch size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Job List */}
      <Stack spacing={3}>
        {jobs.length ? (
          jobs.map((job) => (
            <Paper
              key={job._id}
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: '#fff',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 15px 20px rgba(0,0,0,0.30)',
                },
              }}
              onClick={() =>handleOpen(job._id)}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {job.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {job.company} | {job.type} | {job.location}
              </Typography>
              <Typography variant="body2" mb={2}>
                Posted On: {new Date(job.createdAt).toLocaleDateString('en-IN')}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="h6" align="center" mt={4}>
            No jobs found matching your search.
          </Typography>
        )}
      </Stack>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedJob?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Company: {selectedJob?.company}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Type: {selectedJob?.type}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Location: {selectedJob?.location}
          </Typography>
          <Typography variant="body1" mt={2}>
            {selectedJob?.description}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={2}
            display="block"
          >
            Posted On: {new Date(selectedJob?.createdAt).toLocaleDateString('en-IN')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
