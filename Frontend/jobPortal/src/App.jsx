import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import PostJob from './pages/PostJob'; 
import { Box } from '@mui/material';
import Home from './pages/Home'; 

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-job" element={<PostJob />} />

        </Routes>
      </Box>
    </>
  );
}

export default App;
