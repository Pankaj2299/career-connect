import React from "react";

function NavbarSkeleton() {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between animate-pulse">

                {/* Logo */}
                <div className="h-8 w-44 rounded-md bg-gray-200"></div>

                {/* Right Section */}
                <div className="flex items-center gap-12">

                    {/* Nav Links */}
                    <div className="flex items-center gap-6">
                        <div className="h-5 w-12 rounded bg-gray-200"></div>
                        <div className="h-5 w-10 rounded bg-gray-200"></div>
                        <div className="h-5 w-14 rounded bg-gray-200"></div>
                    </div>

                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>

                </div>

            </div>
        </div>
    );
}

export default NavbarSkeleton;