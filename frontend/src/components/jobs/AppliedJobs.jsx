import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import TableSkeleton from '../skeleton/TableSkeleton'

function AppliedJobs() {
    const {allAppliedJobs,loading} = useSelector(state => state.job)

    if(loading) {
        return <TableSkeleton />
    }

    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
            <Table>
                <TableCaption>
                    Track the status of your job applications.
                </TableCaption>

                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-blue-50 transition-colors">
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        allAppliedJobs.length === 0 ?

                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    You haven't applied to any jobs yet.
                                </TableCell>
                            </TableRow>
                            :
                            (

                                allAppliedJobs.map((appliedJob) => (
                                    <TableRow key={appliedJob._id}>
                                        <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                        <TableCell>{appliedJob?.job?.title || "NA"}</TableCell>
                                        <TableCell>{appliedJob?.job?.company?.name || "NA"}</TableCell>
                                        <TableCell className='text-right'>
                                            <Badge className={appliedJob?.status === "accepted"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : appliedJob?.status === "rejected"
                                                ? "bg-red-100 text-red-700 hover:bg-red-100"
                                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                             }>
                                               {appliedJob?.status.toUpperCase()}
                                            </Badge>

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

export default AppliedJobs
