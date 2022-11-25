
import PinIcon from '../components/Icons/PinIcon';
import FavoritesIcon from '../components/Icons/FavoritesIcon';
import Stars from '../components/Stars/Stars';

import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Job {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  salary: string;
  address: string;
  benefits: [string];
  location: {
    lat: number;
    long: number;
  };
  pictures: [string];
  createdAt: string;
  updatedAt: string;
  description: string;
  employment_type: [string];
}


export default function Home({joblist}: any) {
  console.log(joblist);
  
  const [currentJobs, setCurrentJobs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const jobsPerPage: number = 15;
  useEffect(() => {
    const endOffset = itemOffset + jobsPerPage;
    setCurrentJobs(joblist.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(joblist.length / jobsPerPage));
  }, [itemOffset, jobsPerPage, joblist]);
  const handlePageClick = (event: { selected: number }) => {
    const newoffset = (event.selected * jobsPerPage) % joblist.length;
    setItemOffset(newoffset);
  };
  
  return (
    <>
      <div className="flex flex-col items-center gap-2 p-2 bg-slate-200 desktop:pt-8">
        {currentJobs.map((job: Job) => {
          const timeDistance = job.updatedAt // change time string to time to now
            ? `Updated ${formatDistanceToNow(new Date(job.updatedAt))} ago`
            : `Posted ${formatDistanceToNow(new Date(job.createdAt))} ago`;
          return (
            <div
              className="flex flex-row flex-wrap w-full p-3 text-gray-400 rounded-lg shadow-lg shadow-black/7 bg-slate-100 desktop:bg-slate-50 desktop:w-[1400px]"
              key={job.id}>
              <div className="w-1/6 p-3 desktop:w-1/12">
                <img
                  className="w-full mt-4 rounded-full aspect-square desktop:mt-0 desktop:w-20"
                  src={job.pictures[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-row flex-wrap justify-between w-5/6 desktop:w-11/12 desktop:flex-row">
                <div className="flex flex-row flex-wrap items-end justify-between w-full desktop:flex-col desktop:order-1 desktop:w-3/12">
                  <div className="flex flex-col justify-center desktop:self-start desktop:h-full">
                    <Stars />
                  </div>
                  <div className="hidden mt-2 h-7 desktop:block hover:scale-125 ">
                    <FavoritesIcon borderColorDefault="#70778B" />
                  </div>
                  <div className="desktop:text-lg text-[14px] text-slate-400">{timeDistance}</div>
                </div>
                <div className="w-full desktop:w-4/6">
                  <Link
                    to={`/job/${job.id}`}
                    className="desktop:font-bold text-grayblue desktop:text-desktop">
                    <div className="">{job.title}</div>
                  </Link>
                  <div className="pt-2 pb-2">{job.name}</div>
                  <div className="flex flex-row">
                    <div className="mr-2">
                      <PinIcon />
                    </div>
                    {job.address}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full pt-12 pb-16 text-gray-400 bg-slate-200">
        <ReactPaginate
          pageCount={pageCount}
          breakLabel="..."
          nextLabel="&#10095;"
          previousLabel="&#10094;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          containerClassName="desktop:w-[515px] desktop:h-13 p-2 flex shadow-lg bg-[#F9FAFD] shadow-black/7 flex-row justify-center gap-2 w-full rounded-lg p-0"
          pageClassName="font-bold text-lg w-8 text-center"
          activeClassName="text-[#5876C5] border-b-2 border-[#5876C5]"
          nextClassName="font-bold pt-[2px]"
          previousClassName="font-bold pt-[2px]"
        />
      </div>
    </>
    
  )
}
