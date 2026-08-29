import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProfileSkeleton = () => {
    return (
        <div className="bg-[#F8FAFC] min-h-screen py-8">

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mt-8">

                {/* Header */}
                <div className="flex justify-between">

                    <div className="flex items-center gap-4">

                        {/* Profile Image */}
                        <Skeleton className="h-28 w-28 rounded-full" />

                        <div className="space-y-3">

                            {/* Name */}
                            <Skeleton className="h-7 w-40" />

                            {/* Bio */}
                            <Skeleton className="h-4 w-64" />

                        </div>

                    </div>

                    {/* Edit Button */}
                    <Skeleton className="h-10 w-10 rounded-full" />

                </div>


                {/* Contact */}
                <div className="my-6 space-y-4">

                    <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-52" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                    </div>

                </div>


                {/* Skills */}
                <div className="my-6">

                    <Skeleton className="h-5 w-20 mb-4" />

                    <div className="flex flex-wrap gap-2">

                        <Skeleton className="h-7 w-20 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-16 rounded-full" />
                        <Skeleton className="h-7 w-28 rounded-full" />

                    </div>

                </div>


                <div className="my-6 border-t border-gray-200" />


                {/* Resume */}
                <div className="space-y-3">

                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-48" />

                </div>

            </div>


            {/* Applied Jobs */}
            <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                <Skeleton className="h-6 w-32 mb-5" />

                <div className="space-y-4">

                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />

                </div>

            </div>

        </div>
    )
}

export default ProfileSkeleton