// import React, { useEffect, useState } from 'react'
// import FilterCard from './FilterCard'
// import Job from './Job'
// import { useSelector } from 'react-redux'
// import useGetAllJobs from '@/hooks/useGetAllJobs'
// import JobCardSkeleton from './skeleton/JobCardSkeleton'
// import { SlidersHorizontal, X } from 'lucide-react'
// import { Button } from './ui/button'

// function AllJobs() {
//   useGetAllJobs()

//   const { allJobs, loading, searchedQuery } = useSelector(state => state.job)
//   const [filterJobs, setFilterJobs] = useState(allJobs)
//   const [showMobileFilter, setShowMobileFilter] = useState(false)

//   useEffect(() => {

//       const filteredJobs = allJobs.filter((job) => {

//         // Location filter
//         if (searchedQuery.location) {
//             if (
//                 !job?.location?.toLowerCase().includes(
//                   searchedQuery.location.toLowerCase()
//                 )
//             ) {
//                 return false
//             }
//         }

//         // Job Role filter
//         if (searchedQuery.jobRole) {
//             if (
//                 !job?.title?.toLowerCase().includes(
//                     searchedQuery.jobRole.toLowerCase()
//                 )
//             ) {
//                 return false
//             }
//         }

//         // Freshness filter
//         if (searchedQuery.freshness) {

//             const differenceInDays =
//                 (new Date() - new Date(job.createdAt)) /
//                 (1000 * 60 * 60 * 24)

//             if (
//                 searchedQuery.freshness === "Past 24 hours" &&
//                 differenceInDays > 1
//             ) {
//                 return false
//             }

//             if (
//                 searchedQuery.freshness === "Past 3 days" &&
//                 differenceInDays > 3
//             ) {
//                 return false
//             }

//             if (
//                 searchedQuery.freshness === "Past 7 days" &&
//                 differenceInDays > 7
//             ) {
//                 return false
//             }
//             if (
//                 searchedQuery.freshness === "Past 15 days" &&
//                 differenceInDays > 15
//             ) {
//                 return false
//             }

//             if (
//                 searchedQuery.freshness === "Past 30 days" &&
//                 differenceInDays > 30
//             ) {
//                 return false
//             }
//         }

//         return true
//     })

//     setFilterJobs(filteredJobs)

//   }, [allJobs, searchedQuery])

//   return (


//     // <div className='max-w-7xl mx-auto py-8'>

//     //   <div className='flex gap-5'>
//     //     <div className="w-72 shrink-0 sticky top-24 h-fit">
//     //       <FilterCard />

//     //     </div>

//     //     {
//     //       loading ?

//     //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//     //           {
//     //             Array.from({ length: 6 }).map((_, index) => (
//     //               <JobCardSkeleton key={index} />
//     //             ))
//     //           }
//     //         </div>

//     //         :

//     //         filterJobs.length === 0 ?

//     //           <div className="flex items-center justify-center h-80">
//     //             <h2 className="text-xl font-semibold text-gray-500">
//     //               No jobs found
//     //             </h2>
//     //           </div>

//     //           : (
//     //             <div className="flex-1 pb-5">
//     //               <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
//     //                 {
//     //                   filterJobs.map((job) => (
//     //                     <div key={job?._id}>
//     //                       <Job job={job} />
//     //                     </div>
//     //                   ))
//     //                 }

//     //               </div>

//     //             </div>
//     //           )


//     //     }
//     //   </div>

//     // </div>

//      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//       {/* ================= Mobile Filter Button ================= */}

//       <div className="md:hidden mb-5">

//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => setShowMobileFilter(true)}
//           className="w-full h-11 flex items-center justify-center gap-2 border-gray-300"
//         >

//           <SlidersHorizontal size={18} />

//           Filter Jobs

//         </Button>

//       </div>


//       {/* ================= Mobile Filter Panel ================= */}

//       {showMobileFilter && (

//         <div className="md:hidden fixed inset-0 z-[60] bg-black/40">

//           <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#F8FAFC] shadow-xl overflow-y-auto">

//             <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200">

//               <h2 className="font-semibold text-lg text-[#111827]">
//                 Filter Jobs
//               </h2>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setShowMobileFilter(false)}
//                 className="hover:bg-gray-100"
//               >
//                 <X size={20} />
//               </Button>

//             </div>

//             <div className="p-4">

//               <FilterCard />

//             </div>

//           </div>

//         </div>

//       )}


//       {/* ================= Desktop + Jobs ================= */}

//       <div className="flex gap-5">

//         {/* Desktop Filter */}

//         <div className="hidden md:block w-72 shrink-0 sticky top-24 h-fit">

//           <FilterCard />

//         </div>


//         {/* Jobs */}

//         {
//           loading ?

//             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

//               {
//                 Array.from({ length: 6 }).map((_, index) => (

//                   <JobCardSkeleton key={index} />

//                 ))
//               }

//             </div>

//             :

//             filterJobs.length === 0 ?

//               <div className="flex-1 flex items-center justify-center h-80">

//                 <h2 className="text-xl font-semibold text-gray-500">
//                   No jobs found
//                 </h2>

//               </div>

//               :

//               (

//                 <div className="flex-1 pb-5">

//                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

//                     {
//                       filterJobs.map((job) => (

//                         <div key={job?._id}>

//                           <Job job={job} />

//                         </div>

//                       ))
//                     }

//                   </div>

//                 </div>

//               )
//         }

//       </div>

//     </div>




//   )
// }

// export default AllJobs



import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import JobCardSkeleton from '../skeleton/JobCardSkeleton'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '../ui/button'
import { SetSearchedQuery } from '@/redux/jobSlice'

function AllJobs() {

    useGetAllJobs()

    const dispatch = useDispatch()

    const { allJobs, loading, searchedQuery } = useSelector(
        state => state.job
    )

    const [filterJobs, setFilterJobs] = useState(allJobs)

    const [filters, setFilters] = useState({
        location: "",
        jobRole: "",
        freshness: ""
    })

    const [showMobileFilter, setShowMobileFilter] = useState(false)


    // Keep local filter state synced with Redux
    // useEffect(() => {

    //     setFilters(searchedQuery)

    // }, [searchedQuery])


    // Filter jobs
    useEffect(() => {

        const filteredJobs = allJobs.filter((job) => {

            // Location
            if (searchedQuery.location) {

                if (
                    !job?.location?.toLowerCase().includes(
                        searchedQuery.location.toLowerCase()
                    )
                ) {
                    return false
                }

            }


            // Job Role
            if (searchedQuery.jobRole) {

                if (
                    !job?.title?.toLowerCase().includes(
                        searchedQuery.jobRole.toLowerCase()
                    )
                ) {
                    return false
                }

            }


            // Freshness
            if (searchedQuery.freshness) {

                const differenceInDays =
                    (new Date() - new Date(job.createdAt)) /
                    (1000 * 60 * 60 * 24)


                if (
                    searchedQuery.freshness === "Past 24 hours" &&
                    differenceInDays > 1
                ) {
                    return false
                }


                if (
                    searchedQuery.freshness === "Past 3 days" &&
                    differenceInDays > 3
                ) {
                    return false
                }


                if (
                    searchedQuery.freshness === "Past 7 days" &&
                    differenceInDays > 7
                ) {
                    return false
                }


                if (
                    searchedQuery.freshness === "Past 15 days" &&
                    differenceInDays > 15
                ) {
                    return false
                }


                if (
                    searchedQuery.freshness === "Past 30 days" &&
                    differenceInDays > 30
                ) {
                    return false
                }

            }

            return true

        })

        setFilterJobs(filteredJobs)

    }, [allJobs, searchedQuery])


    // Apply filters
    const applyFilters = () => {

        dispatch(SetSearchedQuery(filters))

        setShowMobileFilter(false)
         window.scrollTo({
        top: 0,
        behavior: "instant",
    });

    }


    // Clear filters
    const clearFilters = () => {

        const emptyFilters = {
            location: "",
            jobRole: "",
            freshness: ""
        }

        setFilters(emptyFilters)

        dispatch(SetSearchedQuery(emptyFilters))

    }


    return (

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


            {/* Mobile Filter Button */}

            <div className="md:hidden mb-5">

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMobileFilter(true)}
                    className="w-full h-11 flex items-center justify-center gap-2 border-gray-300"
                >

                    <SlidersHorizontal size={18} />

                    Filter Jobs

                </Button>

            </div>


            {/* Mobile Filter */}

            {showMobileFilter && (

                <div className="md:hidden fixed inset-0 z-[60] bg-black/40">

                    <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#F8FAFC] shadow-xl overflow-y-auto">

                        {/* Header */}

                        <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200">

                            <h2 className="font-semibold text-lg text-[#111827]">
                                Filter Jobs
                            </h2>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowMobileFilter(false)}
                            >
                                <X size={20} />
                            </Button>

                        </div>


                        {/* Filter */}

                        <div className="p-4">

                            <FilterCard
                                filters={filters}
                                setFilters={setFilters}
                                onApply={applyFilters}
                                onClear={clearFilters}
                                showApplyButton={true}
                            />

                        </div>

                    </div>

                </div>

            )}


            {/* Desktop + Jobs */}

            <div className="max-w-7xl mx-auto py-8 px-4">
    <div className="flex gap-6">

        {/* Desktop Filter */}
        <div className="hidden md:block w-72 shrink-0 sticky top-24 h-fit">
              
              <FilterCard
                        filters={filters}
                        setFilters={setFilters}
                        onApply={applyFilters}
                        onClear={clearFilters}
                        showApplyButton={true}
                    />
        </div>

        {/* Jobs */}
        {
            loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <JobCardSkeleton key={index} />
                    ))}
                </div>
            ) : filterJobs.length === 0 ? (
                <div className="flex-1 flex items-center justify-center h-80">
                    <h2 className="text-xl font-semibold text-gray-500">
                        No jobs found
                    </h2>
                </div>
            ) : (
                <div className="flex-1 pb-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filterJobs.map((job) => (
                            <div key={job?._id}>
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

    </div>
</div>

        </div>
    )
}

export default AllJobs






 