import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableSkeleton from '../skeleton/TableSkeleton'
import { Avatar, AvatarImage } from '../ui/avatar'

function RecruiterJobsTable() {

    const { allRecruiterJobs, searchJobByText, loading } = useSelector(state => state.job)
    const [filterJobs, setFilterJobs] = useState(allRecruiterJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJob = allRecruiterJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        });
        setFilterJobs(filteredJob)

    }, [allRecruiterJobs, searchJobByText])

    if (loading) {
        return <TableSkeleton />
    }

    return (

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">

            <Table>

                <TableCaption className="py-4 text-gray-500">
                    List of your recently posted jobs.
                </TableCaption>


                <TableHeader className="bg-gray-50">

                    <TableRow className="hover:bg-gray-50">

                        <TableHead className="pl-6 min-w-[220px]">
                            Company
                        </TableHead>

                        <TableHead className="min-w-[220px]">
                            Job Role
                        </TableHead>

                        <TableHead className="min-w-[140px]">
                            Posted Date
                        </TableHead>

                        <TableHead className="text-right pr-6">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>


                <TableBody>

                    {
                        filterJobs.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={4}
                                    className="h-32 text-center text-gray-500"
                                >
                                    {
                                        allRecruiterJobs.length === 0
                                            ? "No jobs found."
                                            : "No jobs match your search."
                                    }
                                </TableCell>

                            </TableRow>

                        ) : (

                            filterJobs.map((job) => (

                                <TableRow
                                    key={job._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >

                                    {/* Company */}
                                
                                    <TableCell className="pl-6">
                                        <div className="flex items-center gap-3">

                                            <Avatar className="h-10 w-10 rounded-lg">
                                                {job?.company?.logo ? (
                                                    <AvatarImage
                                                        src={job.company.logo}
                                                        alt={job?.company?.name}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB] font-bold">
                                                        {job?.company?.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                )}
                                            </Avatar>

                                            <div>
                                                <p className="font-semibold text-[#111827]">
                                                    {job?.company?.name}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Company
                                                </p>
                                            </div>

                                        </div>
                                    </TableCell>


                                    {/* Job Role */}

                                    <TableCell>

                                        <div>
                                            <p className="font-semibold text-[#111827]">
                                                {job?.title}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {job?.jobType || "Job Opening"}
                                            </p>
                                        </div>

                                    </TableCell>


                                    {/* Date */}

                                    <TableCell>

                                        <span className="text-sm text-gray-600">
                                            {job?.createdAt?.split("T")[0]}
                                        </span>

                                    </TableCell>


                                    {/* Action */}

                                    <TableCell className="text-right pr-6">

                                        <Popover>

                                            <PopoverTrigger asChild>

                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-gray-100 transition-colors"
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

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(`/recruiter/jobs/${job._id}`)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                                >

                                                    <Edit2 size={16} />

                                                    Edit

                                                </button>

                                                
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(`/recruiter/jobs/${job._id}/applicants`)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                                >

                                                    <Eye size={16} />

                                                    Applicants

                                                </button>

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

    )
}

export default RecruiterJobsTable

