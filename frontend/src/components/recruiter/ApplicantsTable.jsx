import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, MoreHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { updateApplicationStatus } from '@/redux/applicationSlice';


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const [open, setOpen] = useState(null)
    const { applicants } = useSelector(state => state.application);
    const dispatch = useDispatch()


    const statusHandler = async (status, id) => {

        setOpen(null)

        try {

            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status },
                { withCredentials: true });

            if (res.data.success) {
                dispatch(updateApplicationStatus({
                    applicationId: id,
                    status
                }))
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    }


    return (


        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

                <Table>

                    <TableCaption className="py-4 text-gray-500">
                        A list of users who applied for this job.
                    </TableCaption>


                    <TableHeader className="bg-gray-50">

                        <TableRow className="hover:bg-gray-50">

                            <TableHead className="pl-6">
                                Full Name
                            </TableHead>

                            <TableHead>
                                Email
                            </TableHead>

                            <TableHead>
                                Contact
                            </TableHead>

                            <TableHead>
                                Resume
                            </TableHead>

                            <TableHead>
                                Date
                            </TableHead>

                            <TableHead>
                                Status
                            </TableHead>

                            <TableHead className="text-right pr-6">
                                Action
                            </TableHead>

                        </TableRow>

                    </TableHeader>


                    <TableBody>

                        {
                            !applicants?.applications?.length ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center text-gray-500"
                                    >
                                        No applicants found.
                                    </TableCell>
                                </TableRow>
                            ) : (

                                applicants?.applications?.map((item) => (

                                    <TableRow
                                        key={item._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Full Name */}
                                        <TableCell className="pl-6">

                                            <p className="font-semibold text-gray-900">
                                                {item?.applicant?.fullname || 'N/A'}
                                            </p>

                                        </TableCell>


                                        {/* Email */}
                                        <TableCell className="text-gray-600">
                                            {item?.applicant?.email || 'N/A'}
                                        </TableCell>


                                        {/* Contact */}
                                        <TableCell className="text-gray-600">
                                            {item?.applicant?.phoneNumber || 'N/A'}
                                        </TableCell>


                                        {/* Resume */}
                                        <TableCell>

                                            {
                                                item?.applicant?.profile?.resume ? (

                                                    <a
                                                        href={item.applicant.profile.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                                    >
                                                        {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                                                    </a>

                                                ) : (

                                                    <span className="text-gray-400">
                                                        N/A
                                                    </span>

                                                )
                                            }

                                        </TableCell>


                                        {/* Date */}
                                        <TableCell className="text-gray-600 whitespace-nowrap">

                                            {
                                                item?.createdAt
                                                    ? item.createdAt.split('T')[0]
                                                    : 'N/A'
                                            }

                                        </TableCell>

                                        {/* Status  */}


                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${ item?.status === "accepted"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : item?.status === "rejected"
                                                        ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                                    }`}
                                            >
                                                {item?.status
                                                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                                    : "Pending"}
                                            </span>
                                        </TableCell>



                                        {/* Action */}
                                        <TableCell className="text-right pr-6">

                                            <Popover open={open === item._id} onOpenChange={(isOpen) => setOpen(isOpen ? item._id : null)}>

                                                <PopoverTrigger asChild>

                                                    <button
                                                        type="button"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                                                    >

                                                        <MoreHorizontal
                                                            size={20}
                                                            className="text-gray-600"
                                                        />

                                                    </button>

                                                </PopoverTrigger>


                                                <PopoverContent
                                                    align="end"
                                                    className="w-36 p-1"
                                                >

                                                    {
                                                        shortlistingStatus.map((status) => (

                                                            <button
                                                                key={status}
                                                                type="button"
                                                                onClick={() =>
                                                                    statusHandler(
                                                                        status,
                                                                        item?._id
                                                                    )
                                                                }
                                                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${status === 'Accepted'
                                                                    ? 'text-green-700 hover:bg-green-50'
                                                                    : 'text-red-700 hover:bg-red-50'
                                                                    }`}
                                                            >

                                                                {
                                                                    status === 'Accepted'
                                                                        ? <Check size={16} />
                                                                        : <X size={16} />
                                                                }

                                                                {status}

                                                            </button>

                                                        ))
                                                    }

                                                </PopoverContent>

                                            </Popover>

                                        </TableCell>

                                    </TableRow>

                                ))

                            )
                        }

                    </TableBody>

                </Table>




            </div>

        </div>
    )
}

export default ApplicantsTable
