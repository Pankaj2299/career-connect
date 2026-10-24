import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Loader2, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobs from '../jobs/AppliedJobs'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import ProfileSkeleton from '../skeleton/ProfileSkeleton'

function Profile() {
    useGetAppliedJobs()

    
      const [open, setOpen] = useState(false); 

    const { user ,loading: authLoading } = useSelector((state) => state.auth)
    const { loading: appliedJobLoading } = useSelector((state) => state.job)


    if (authLoading || appliedJobLoading) {
    return <ProfileSkeleton/>
}

    return (
         <div className="bg-[#F8FAFC] min-h-screen py-8">

            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mt-8">
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
                        <Avatar className="h-15 w-15 md:h-20 md:w-20 lg:h-28 lg:w-28 border-2 border-blue-100">
                            <AvatarImage 
                            src={user?.profile?.profilePhoto}
                             alt="profile"
                             className="object-cover"
                             />
                            <AvatarFallback className='text-2xl md:text-4xl lg:text-6xl font-bold'>
                                {user?.fullname?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold text-[#111827]">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-1">
                                {user?.profile?.bio || "No bio added"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-full hover:bg-blue-50 hover:text-[#2563EB]"
                        onClick={() => setOpen(true)}
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>
                <div className="my-6 space-y-3">
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className="h-5 w-5 text-[#2563EB]" />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className="h-5 w-5 text-[#2563EB]" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-6'>
                    <h2 className="text-lg font-semibold text-[#111827] mb-3">
                        Skills
                    </h2>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills?.length > 0 ? user?.profile?.skills?.map((item, index) => <Badge
                                key={index}
                                className="bg-blue-50 text-[#2563EB] hover:bg-blue-100"
                            >{item}
                            </Badge>) 
                            : <span>NA</span>
                        }
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    { user?.profile?.resume ? (

                         <a
                          target='_blank'
                           href={user.profile.resume}
                            rel="noopener noreferrer"
                            className='text-[#2563EB] font-medium hover:underline cursor-pointer'>
                            {user?.profile?.resumeOriginalName || "View Resume"}
                            </a>
                    )
                    : (
                        <span>NA</span>
                    )
                }
                       

                            
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h1 className="text-xl font-bold text-[#111827] mb-5">Applied Jobs</h1>
                <div className='overflow-x-auto w-full pb-2'>
                <AppliedJobs />

                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
