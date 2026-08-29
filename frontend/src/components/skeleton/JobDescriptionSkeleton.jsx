import React from 'react'
import { Skeleton } from '../ui/skeleton'

const JobDescriptionSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                <div className="space-y-4">

                    {/* Title */}
                    <Skeleton className="h-9 w-72" />

                    {/* Badges */}
                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-7 w-32 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-28 rounded-full" />
                    </div>

                </div>

                {/* Apply Button */}
                <Skeleton className="h-14 w-full md:w-36 rounded-lg" />

            </div>


            {/* Heading */}
            <div className="mt-10 border-b pb-3">
                <Skeleton className="h-7 w-48" />
            </div>


            {/* Job Details Card */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="space-y-6">

                    {/* Role */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-48" />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-40" />
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                    {/* Salary */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                    </div>

                    {/* Applicants */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-20" />
                    </div>

                    {/* Posted Date */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-28" />
                    </div>


                    {/* Description */}
                    <div className="pt-3 border-t border-gray-200 space-y-3">

                        <Skeleton className="h-5 w-28" />

                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-4/5" />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default JobDescriptionSkeleton