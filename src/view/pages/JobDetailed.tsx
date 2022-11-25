import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import PinIcon from '../components/Icons/PinIcon';
import FavoritesIcon from '../components/Icons/FavoritesIcon';
import FavoritesIconMobile from '../components/Icons/FavoritesIconMobile';
import ShareIcon from '../components/Icons/ShareIcon';

import GoogleMapBlock from '../components/GoogleMap/GoogleMapBlock';
import JobDetailDescription from '../components/Description/JobDetailDescription';
import { Link, useLocation } from 'react-router-dom';

export const getJobs = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    })
    .then((res) => res.data);
};

export default function HomeQuery() {
  const { data, isLoading, error } = useQuery(['job'], getJobs);
  if (isLoading) return <h2>Loading</h2>;
  if (error) return <h2>Error</h2>;
  return <Job joblist={data}/>
} 

export function Job({joblist}: any) {
  const router = useLocation(); //useRouter to get id of job
  console.log(router);
   const currentJob = joblist.filter(
    //get current job object in array
    (job: { id: string | string[] | undefined }) => job.id === router.pathname.substring(5) ,
  )[0];
  const timeDistance =  currentJob.updatedAt // change time string to time to now
    ? `Updated ${formatDistanceToNow(new Date(currentJob.updatedAt))} ago`
    : `Posted ${formatDistanceToNow(new Date(currentJob.createdAt))} ago`
    
    
  return (
    <div className="flex flex-col justify-center w-full h-full gap-32 p-4 pt-8 pb-20 desktop:flex-row bg-[#f5f5f5]">
      <div className="w-full text-[#3A4562] desktop:w-2/5">
        <div className="flex flex-col flex-wrap justify-between pb-2 text-3xl font-bold tracking-wider desktop:flex-row">
          Job Details
          <div className="flex flex-row order-1 gap-4 font-normal desktop:text-lg desktop:order-1-none">
            <div className="flex flex-row items-center">
              <div className="hidden mr-2 desktop:block text-[#70778B] hover:scale-125">
                <FavoritesIcon borderColorDefault="#70778B" />
              </div>
              <div className="mr-2 desktop:hidden text-[#70778B] hover:scale-125">
                <FavoritesIconMobile borderColorDefault="#70778B" />
              </div>
              Save to my list
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-2 text-[#70778B] hover:text-blue-400 hover:scale-125">
                <ShareIcon />
              </div>
              Share
            </div>
          </div>
          <hr className="w-full mt-[9px] desktop:mb-0 mb-6 desktop:order-1" />
        </div>
        <button className="hidden mt-10 mb-8 text-xs text-white rounded-lg w-buttonWidth bg-button-bg desktop:block h-buttonHeight hover:opacity-75">
          APPLY NOW
        </button>
        <div className="flex flex-row flex-wrap justify-between w-full">
          <div className="w-11/12 text-2xl font-bold desktop:w-2/3">{currentJob.title}</div>
          <div className="flex flex-col order-1 w-2/4 text-xl font-bold desktop:w-1/3 desktop:text-start text-end desktop:order-none flex-nowrap">
            <div className="order-1 desktop:order-none">
              &#8364; {currentJob.salary.replace(/k/g, ' 000').replace(/-/g, '—')}{' '}
              {/* turn k symbol into 000 to get normal view of salary */}
            </div>
            <div className="text-lg font-normal">Brutto, per year</div>
          </div>
          <div className="w-2/5 text-lg text-grey-text">{timeDistance}</div>
        </div>
        <div className="text-lg">
          <JobDetailDescription description={currentJob.description} />
        </div>
        <div className="flex justify-center w-full mt-10 mb-20 desktop:justify-start">
          <button className="text-xs text-white rounded-lg w-buttonWidth bg-button-bg h-buttonHeight hover:opacity-75">
            APPLY NOW
          </button>
        </div>
        <div className="flex flex-col">
          <div className="mt-20 text-3xl font-bold desktop:order-1">
            Attached images <hr className="mt-[9px]" />
            <div className="flex flex-row w-full gap-8 overflow-x-auto flex-nowrap">
              {currentJob.pictures.map(
                (
                  pictureUrl: string,
                  index: number, //map images
                ) => (
                  <div className=" mt-5 min-w-[200px] h-[116px]" key={index}>
                    <img className="object-cover w-full h-full" src={pictureUrl} alt="" />
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="mt-16 text-3xl font-bold">
            Additional info <hr />
          </div>
          <div className="w-full mt-4 text-lg">
            Employment type
            <div className="flex flex-row gap-2 font-bold flex-nowrap">
              {currentJob.employment_type.map(
                (
                  type: string | undefined, // map empoyment types
                ) => (
                  <div
                    className="w-56 h-12 pt-2 mt-2.5 border-slate-400 border-[1px] pr-4 desktop:pr-0 text-end desktop:text-center text-[#55699E] rounded-lg bg-slate-200"
                    key={type}>
                    {type}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="text-lg ">
            Benefits
            <div className="flex flex-row gap-2 font-bold flex-nowrap">
              {currentJob.benefits.map(
                (
                  benefit: string,
                  index: number, // map benefits
                ) => (
                  <div
                    className="w-56 h-12 mt-2.5 pt-2 text-center rounded-lg border-amber-400 border-[1px] text-amber-700 bg-amber-100"
                    key={index}>
                    {benefit}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <Link to={'/'}>
          <button className="hidden h-12 mt-24 text-[12px] font-semibold rounded-lg desktop:block desktop:-ml-24 w-52 bg-slate-200">
            <span className="text-[18px] mr-5">&#10094;</span>RETURN TO JOB BOARD
          </button>
        </Link>
      </div>
      <div className="rounded-lg desktop:w-100 h-109">
        <div className="mt-16 mb-2.5 text-3xl font-bold text-blue-900 desktop:hidden">
          Contacts <hr />
        </div>
        <div className="w-full z-0 relative p-8 pl-16 pr-16 outline-2 mt-5 rounded-t-lg desktop:mt-0 h-1/2 text-slate-200 bg-[#2A3047]">
          <div className="absolute rounded-t-lg left-0 top-0 w-1/2 h-full bg-[#202336] -z-10 clip-custom-circle"></div>
          <div className="text-xl font-bold text-slate-50">{currentJob.name}</div>
          <span className="text-lg">
            <div className="inline-block mr-2">
              <PinIcon />
            </div>
            {currentJob.address}
          </span>
          <div className="text-lg">{currentJob.phone}</div>
          <div className="text-lg">{currentJob.email}</div>
        </div>
        <GoogleMapBlock lat={currentJob.location.lat} lng={currentJob.location.long} />
      </div>
    </div>
      
    
  )
}