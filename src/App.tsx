import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import JobList from './view/pages/JobList';
import JobDetailed from './view/pages/JobDetailed';
import { getJobList } from './api/api';

const queryClient = new QueryClient()

function App() {

  const [list, setList] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
		getJobList()
			.then((data) => {
				console.log(data);
				setList(data);
				setLoading(true);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
  return (
    <QueryClientProvider client={queryClient}>
    {loading ? (
				<Routes>
					<Route path="/" element={<JobList joblist={list} />} />
					<Route path="/job/:id" element={<JobDetailed joblist={list} />} />
				</Routes>
			) : (
				<h2>Loading</h2>
			)}</QueryClientProvider>
  );
}

export default App;
