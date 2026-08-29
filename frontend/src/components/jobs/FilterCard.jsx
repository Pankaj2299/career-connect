// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { SetSearchedQuery } from '@/redux/jobSlice'
// import { Button } from './ui/button'

// function FilterCard() {

//     const filterData = [

//         {
//             filterType: "Location",
//             array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai","Noida","Chennai","Gurugram","Kolkata","Ahmedabad","Jaipur"]
//         },
//         {
//             filterType: "Job Role",
//             array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science", "UI/UX Designer", "DevOps Engineer", "Android Developer", "AI/ML Engineer", "Cloud Engineer"]
//         },
//         {

//             filterType: "Freshness",
//             array: [
//                 "Past 24 hours",
//                 "Past 3 days",
//                 "Past 7 days",
//                 "Past 15 days",
//                 "Past 30 days"
//             ]
//         },
//     ]

//     const [filters, setFilters] = useState({
//         location: "",
//         jobRole: "",
//         freshness: ""
//     })
//     const dispatch = useDispatch()

//     const changeHandler = (filterType, value) => {

//         if (filterType === "Location") {
//             setFilters(prev => ({
//                 ...prev, location: value
//             }))
//         }
//         if (filterType === "Job Role") {
//             setFilters(prev => ({
//                 ...prev, jobRole: value
//             }))
//         }
//         if (filterType === "Freshness") {
//             setFilters(prev => ({
//                 ...prev, freshness: value
//             }))
//         }


//     }

//     useEffect(() => {
//         dispatch(SetSearchedQuery(filters))
//     }, [filters, dispatch])

//     return (

//         <div className='w-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm'>
//             <div className="flex items-center justify-between mb-4">
//                 <h1 className='font-semibold text-xl text-[#111827]'>
//                     Filter Jobs
//                 </h1>
//                 <Button
//                     type="button"
//                     variant='outline'
//                     onClick={() =>
//                         setFilters({
//                             location: "",
//                             jobRole: "",
//                             freshness: ""
//                         })
//                     }
//                     className="text-sm text-gray-500 hover:text-red-600 hover:bg-red-50"
//                 >

//                     Clear

//                 </Button>
//             </div>

//             <hr className="my-4 border-gray-200" />

//             {
//                 filterData.map((data, index) => (

//                     <div key={data.filterType} className='mb-6'>

//                         <h1 className='font-semibold text-base text-[#111827] mb-3'>
//                             {data.filterType}
//                         </h1>

//                         <RadioGroup
//                             value={
//                                 data.filterType === "Location"
//                                     ? filters.location
//                                     : data.filterType === "Job Role"
//                                         ? filters.jobRole
//                                         : filters.freshness
//                             }
//                             onValueChange={(value) =>
//                                 changeHandler(data.filterType, value)
//                             }
//                             className='space-y-1'
//                         >

//                             {
//                                 data.array.map((item, idx) => {

//                                     const itemId = `id${index}-${idx}`

//                                     return (
//                                         <div
//                                             key={item}
//                                             className='flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-blue-50 transition-colors'
//                                         >

//                                             <RadioGroupItem
//                                                 value={item}
//                                                 id={itemId}
//                                             />

//                                             <Label
//                                                 className='text-gray-600 cursor-pointer'
//                                                 htmlFor={itemId}
//                                             >
//                                                 {item}
//                                             </Label>

//                                         </div>
//                                     )
//                                 })
//                             }

//                         </RadioGroup>

//                     </div>

//                 ))
//             }


//         </div>
//     )
// }

// export default FilterCard

import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function FilterCard({
    filters,
    setFilters,
    onApply,
    onClear,
    showApplyButton = false
}) {

    const filterData = [

        {
            filterType: "Location",
            array: [
                "Delhi",
                "Bangalore",
                "Hyderabad",
                "Pune",
                "Mumbai",
                "Noida",
                "Chennai",
                "Gurugram",
                "Kolkata",
                "Ahmedabad",
                "Jaipur"
            ]
        },

        {
            filterType: "Job Role",
            array: [
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Data Science",
                "UI/UX Designer",
                "DevOps Engineer",
                "Android Developer",
                "AI/ML Engineer",
                "Cloud Engineer"
            ]
        },

        {
            filterType: "Freshness",
            array: [
                "Past 24 hours",
                "Past 3 days",
                "Past 7 days",
                "Past 15 days",
                "Past 30 days"
            ]
        }

    ]


    const changeHandler = (filterType, value) => {

        setFilters(prev => ({

            ...prev,

            ...(filterType === "Location" && {
                location: value
            }),

            ...(filterType === "Job Role" && {
                jobRole: value
            }),

            ...(filterType === "Freshness" && {
                freshness: value
            })

        }))

    }


    return (

        <div className="w-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between mb-4">

                <h1 className="font-semibold text-xl text-[#111827]">
                    Filter Jobs
                </h1>

                <Button
                    type="button"
                    variant="outline"
                    onClick={onClear}
                    className="text-sm text-gray-500 hover:text-red-600 hover:bg-red-50"
                >
                    Clear
                </Button>

            </div>


            <hr className="my-4 border-gray-200" />


            {/* Filters */}

            {
                filterData.map((data, index) => (

                    <div
                        key={data.filterType}
                        className="mb-6"
                    >

                        <h1 className="font-semibold text-base text-[#111827] mb-3">
                            {data.filterType}
                        </h1>


                        <RadioGroup

                            value={
                                data.filterType === "Location"
                                    ? filters.location || ""
                                    : data.filterType === "Job Role"
                                        ? filters.jobRole || ""
                                        : filters.freshness || ""
                            }

                            onValueChange={(value) =>
                                changeHandler(
                                    data.filterType,
                                    value
                                )
                            }

                            className="space-y-1"
                        >

                            {
                                data.array.map((item, idx) => {

                                    const itemId = `id${index}-${idx}`

                                    return (

                                        <div
                                            key={item}
                                            className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-blue-50 transition-colors"
                                        >

                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                            />

                                            <Label
                                                className="text-gray-600 cursor-pointer"
                                                htmlFor={itemId}
                                            >
                                                {item}
                                            </Label>

                                        </div>

                                    )

                                })
                            }

                        </RadioGroup>

                    </div>

                ))
            }


            {/* Apply Button */}

            {
                showApplyButton && (

                    <Button
                        type="button"
                        onClick={onApply}
                        className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
                    >
                        Apply Filters
                    </Button>

                )
            }

        </div>
    )
}

export default FilterCard