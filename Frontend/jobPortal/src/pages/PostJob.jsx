import React from 'react';
import { useFormik } from 'formik';
import { jobValidationSchema } from './validation';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postJob } from '../api/jobAPI';

const PostJob = () => {
  const navigate = useNavigate();

   const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      type: '',
      location: '',
      description: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await postJob(values); 
        toast.success('Job posted successfully!');
        resetForm();
        navigate('/');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || 'Failed to post job');
      }
    },
  });

  return (
    <Box sx={{ p: 3 }} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>Post a Job</Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 500 }}
      >
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Company"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
        />
        <TextField
          label="Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        />
        <TextField
          label="Location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default PostJob;
