import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'


function Job({ job }) {


    const navigate = useNavigate()
    const getDaysAgo = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();

        const diffTime = currentDate - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";

        return `${diffDays} days ago`;
    };

    return (
        <div className=" h-full flex flex-col p-5 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200">

            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{getDaysAgo(job?.createdAt)}</p>
                <Button variant='outline' className="rounded-full hover:bg-blue-50 hover:text-[#2563EB] transition-colors duration-300" size='icon'><Bookmark className='h-4 w-4' /></Button>

            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage
                            src={job?.company?.logo}
                            alt={job?.company?.name}
                        />


                        <AvatarFallback className="rounded-lg bg-blue-50 text-[#2563EB] font-bold">
                            {job?.company?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>

                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-lg text-[#111827]'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div >
                <h1 className="font-bold text-xl text-[#111827] line-clamp-2 min-h-12">{job?.title}</h1>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2 min-h-10">{job?.description}</p>

            </div>

            <div className="flex flex-wrap  items-center gap-3 mt-5">
                <Badge
                    className={' bg-blue-50 text-[#2563EB] font-semibold px-3 py-1'}
                    variant="secondary">
                    {job?.position} Positions

                </Badge>
                <Badge
                    className={' bg-green-50 text-green-700 font-semibold px-3 py-1'}
                    variant="secondary">
                    {job?.jobType}

                </Badge>
                <Badge
                    className=" bg-orange-50 text-orange-600 font-semibold px-3 py-1"
                    variant="secondary">
                    {job?.salary} LPA

                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-5">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className='flex-1'>Details</Button>
                <Button className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8]">Save Job</Button>
            </div>

        </div>
    )
}

export default Job
