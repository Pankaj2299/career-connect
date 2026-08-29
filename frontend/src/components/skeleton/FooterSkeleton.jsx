import React from "react";
import { Skeleton } from "../ui/skeleton";

const FooterSkeleton = () => {
    return (
        <footer className="bg-[#F8FAFC] border-t border-gray-200 text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">

                {/* Main Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-7 w-36" />
                        </div>

                        <div className="mt-5 space-y-2">
                            <Skeleton className="h-3 w-full max-w-sm" />
                            <Skeleton className="h-3 w-[90%] max-w-sm" />
                            <Skeleton className="h-3 w-[75%] max-w-sm" />
                            <Skeleton className="h-3 w-[60%] max-w-sm" />
                        </div>
                    </div>


                    {/* Job Seekers / Employers */}
                    <div>
                        <Skeleton className="h-6 w-32 mb-5" />

                        <div className="space-y-4">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>


                    {/* Contact */}
                    <div>
                        <Skeleton className="h-6 w-24 mb-5" />

                        <div className="space-y-5">

                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-48" />
                            </div>

                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4 pt-3">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>

                        </div>
                    </div>

                </div>


                {/* Divider */}
                <div className="my-8 border-t border-gray-300" />


                {/* Bottom Footer */}
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <Skeleton className="h-4 w-64" />

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default FooterSkeleton;