import React from "react";

function JobCardSkeleton() {
    return (
        <div className=" h-full flex flex-col p-5 rounded-md border border-gray-200 bg-white animate-pulse">

            {/* Top */}
            <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-gray-200"></div>
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
            </div>

            {/* Company */}
            <div className="flex items-center gap-2 my-2">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>

                <div className="flex-1">
                    <div className="h-5 w-32 rounded bg-gray-200"></div>
                    <div className="mt-2 h-4 w-20 rounded bg-gray-200"></div>
                </div>
            </div>

            {/* Title & Description */}
            <div>
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>

                <div className="mt-3 h-4 w-full rounded bg-gray-200"></div>
                <div className="mt-2 h-4 w-5/6 rounded bg-gray-200"></div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-5">
                <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                <div className="h-7 w-20 rounded-full bg-gray-200"></div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-auto pt-5">
                <div className="h-10 flex-1 rounded-md bg-gray-200"></div>
                <div className="h-10 flex-1 rounded-md bg-gray-200"></div>
            </div>

        </div>
    );
}

export default JobCardSkeleton;