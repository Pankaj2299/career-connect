import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { SetSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import JobDescriptionSkeleton from '../skeleton/JobDescriptionSkeleton'

function JobDescription() {
    const { singleJob } = useSelector(state => state.job)
    const { user, loading: authLoading } = useSelector(state => state.auth)
    const [isApplied, setIsApplied] = useState(false)
    const [checkingApplication, setCheckingApplication] = useState(true)
    const [loading, setLoading] = useState(true)
    const [applying, setApplying] = useState(false)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {

        try {
            setApplying(true)

            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
           
            if (res.data.success) {
                setIsApplied(true)

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...(singleJob?.applications || []),
                        { applicant: user?._id }
                    ]
                }

                dispatch(SetSingleJob(updatedSingleJob))

                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setApplying(false)
        }
    }


    useEffect(() => {

        if (authLoading) return

        const fetchSingleJob = async () => {

            setLoading(true)
            setCheckingApplication(true)

            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )

                if (res.data.success) {

                    const job = res.data.job

                    dispatch(SetSingleJob(job))

                    if (user?._id) {

                        const applied = job?.applications?.some(
                            application =>
                                application?.applicant?.toString() === user?._id?.toString()
                        )
                        setIsApplied(applied)

                    } else {
                        setIsApplied(false)
                    }

                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)
                setCheckingApplication(false)

            }
        }

        fetchSingleJob()

    }, [jobId, user?._id, authLoading, dispatch])

    if (loading) {
        return <JobDescriptionSkeleton />
    }

    return (
        <div className='max-w-7xl mx-auto py-10 px-4'>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <Badge
                            className={'bg-blue-50 text-[#2563EB] font-semibold px-3 py-1'}
                            variant="secondary">
                            {singleJob?.position} Positions

                        </Badge>
                        <Badge
                            className={'bg-green-50 text-green-700 font-semibold px-3 py-1'}
                            variant="secondary">
                            {singleJob?.jobType}

                        </Badge>
                        <Badge
                            className={'bg-orange-50 text-orange-600 font-semibold px-3 py-1'}
                            variant="secondary">
                            {singleJob?.salary} LPA

                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? undefined : applyJobHandler}
                    disabled={checkingApplication || isApplied || applying}
                    className={`w-full md:w-auto px-8 py-6 rounded-lg font-semibold shadow-md transition-all duration-300 ${checkingApplication || isApplied || applying
                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                        : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                        }`}
                >
                    {
                        checkingApplication

                            ? "Checking..."
                            : applying
                                ? "Applying..."
                                : isApplied
                                    ? "Already Applied"
                                    : "Apply Now"
                    }
                </Button>
            </div>
            <h2 className="mt-10 border-b pb-3 text-xl font-semibold">Job Description</h2>
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="space-y-5">

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Role</span>
                        <span className="text-gray-700">{singleJob?.title}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Location</span>
                        <span className="text-gray-700">{singleJob?.location}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Experience</span>
                        <span className="text-gray-700">{singleJob?.experienceLevel} Years</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Salary</span>
                        <span className="text-gray-700">{singleJob?.salary} LPA</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Total Applicants</span>
                        <span className="text-gray-700">{singleJob?.applications?.length}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row">
                        <span className="w-40 font-semibold text-gray-900">Posted Date</span>
                        <span className="text-gray-700">{singleJob?.createdAt.split("T")[0]}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-900">Description</h3>

                        <p className="mt-2 leading-7 text-gray-700">
                            {singleJob?.description}
                        </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200">

                        <h3 className="font-semibold text-gray-900">
                            Requirements
                        </h3>

                        <ul className="mt-2 list-disc pl-5 space-y-1.5 text-gray-700">
                            {singleJob?.requirements?.map((requirement, index) => (
                                <li key={index}>
                                    {requirement}
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default JobDescription 
