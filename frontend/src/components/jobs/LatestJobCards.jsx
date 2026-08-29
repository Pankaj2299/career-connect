import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function LatestJobCards({job}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            
             <div className="flex items-center gap-3">

                <Avatar className="h-12 w-12 rounded-lg border border-gray-200">
                    <AvatarImage
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                        className="object-contain"
                    />

                    <AvatarFallback className="rounded-lg bg-blue-50 text-[#2563EB] font-bold">
                        {job?.company?.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h1 className="font-semibold text-lg text-[#111827]">
                        {job?.company?.name}
                    </h1>

                    <p className="text-sm text-gray-500">
                        {job?.location}
                    </p>
                </div>

            </div>

            <div>
                <h1 className='font-bold text-xl text-[#111827] mt-4'>{job?.title}</h1>
                <p className='text-sm text-gray-600 leading-6'>{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
                <Badge
                    className={'bg-blue-50 text-[#2563EB] font-semibold'}
                    variant="secondary">
                    {job?.position} Positions

                </Badge>
                <Badge
                    className={'bg-green-50 text-green-700 font-semibold'}
                    variant="secondary">
                    {job?.jobType}

                </Badge>
                <Badge
                    className={'bg-orange-50 text-orange-600 font-semibold'}
                    variant="secondary">
                    {job?.salary} LPA

                </Badge>
            </div>

        </div>
    )
}



export default LatestJobCards









