import React from 'react'
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';
import JobCardSkeleton from '../skeleton/JobCardSkeleton';



function LatestJobs() {

    
    const { allJobs, loading } = useSelector(state => state.job);

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <h1 className="text-4xl font-bold text-center">
                <span className="text-[#2563EB]">Latest & Top</span> Job Openings
            </h1>
            <p className="text-center text-gray-500 mt-3 mb-10">
                Explore the newest opportunities from top companies.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                {


                    loading ?
                        Array.from({ length: 6 }).map((_, index) => (
                            <JobCardSkeleton key={index} />
                        ))

                        :
                        allJobs.length === 0 ?

                            <p className="text-center col-span-full text-gray-500 text-lg">
                                No job openings available at the moment.
                            </p>

                            :
                            allJobs.slice(0, 6).map(job => (
                                <LatestJobCards
                                
                                    key={job._id}
                                    job={job}
                                />
                            ))

                }
            </div>
        </div>
    )
}

export default LatestJobs
