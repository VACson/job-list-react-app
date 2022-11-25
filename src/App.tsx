import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import JobList from './view/pages/JobList';
import JobDetailed from './view/pages/JobDetailed';

const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
    <Route path="/">
      <Route index element={<JobList />} />
      <Route path="job/:id" element={<JobDetailed/>} />
    </Route>
  </Routes></QueryClientProvider>
  );
}

export default App;
