import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import JobCardSkeleton from '../skeleton/JobCardSkeleton'
import { SetSearchedQuery } from '@/redux/jobSlice'


function Browse() {
  useGetAllJobs()

  const { allJobs, loading } = useSelector(state => state.job)
  const dispatch =useDispatch()

  useEffect(() => {

    return () => {
      dispatch(SetSearchedQuery(""))
    }

  },[])

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">
            Search Results
          </h1>

          <p className="text-gray-500 mt-1">
            {allJobs.length} jobs found
          </p>
        </div>

        {

          loading ?

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {
                Array.from({ length: 6 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))
              }
            </div>
            :
            allJobs.length === 0 ? (

              <div className="flex items-center justify-center h-60">
                <h2 className="text-xl font-semibold text-gray-500">
                  No Jobs Found
                </h2>
              </div>

            )

              : (

                <div className='grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 max-w-4xl mx-auto space-y-5'>
                  {
                    allJobs.map((job) => (
                      <div key={job?._id}>
                        <Job job={job} />
                      </div>
                    ))
                  }
                </div>

              )
        }

      </div>
    </div>
  )
}

export default Browse






