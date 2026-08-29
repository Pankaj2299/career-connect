import React, { useEffect, useState } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'

function EditJob() {

    const params = useParams()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: ""
    })

    const [loading, setLoading] = useState(false)
    const [fetchingJob, setFetchingJob] = useState(true)


    // Fetch existing job
    useEffect(() => {

        const fetchJob = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${params.id}`
                )

                if (res.data.success) {

                    const job = res.data.job

                    setInput({
                        title: job?.title || "",
                        description: job?.description || "",
                        requirements: job?.requirements?.join("\n") || "",
                        salary: job?.salary || "",
                        location: job?.location || "",
                        jobType: job?.jobType || "",
                        experience: job?.experienceLevel || "",
                        position: job?.position || ""
                    })
                }

            } catch (error) {

                console.log(error)

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch job."
                )

            } finally {

                setFetchingJob(false)

            }
        }

        fetchJob()

    }, [params.id])


    // Handle input
    const changeEventHandler = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }


    // Update job
    const submitHandler = async (e) => {

        e.preventDefault()

        const requirements = input.requirements
            .split("\n")
            .map(item => item.trim())
            .filter(item => item !== "");

        try {

            setLoading(true)

            const res = await axios.put(
                `${JOB_API_END_POINT}/update/${params.id}`,
                { ...input, requirements },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                navigate("/recruiter/jobs")

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                "Failed to update job."
            )

        } finally {

            setLoading(false)

        }
    }


    // Loading existing job
    if (fetchingJob) {

        return (

            <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-10">

                <div className="max-w-4xl mx-auto">

                    <div className="mb-8">

                        <div className="h-9 w-40 bg-gray-200 rounded animate-pulse" />

                        <div className="h-4 w-80 bg-gray-200 rounded mt-3 animate-pulse" />

                    </div>


                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {Array.from({ length: 8 }).map((_, index) => (

                                <div
                                    key={index}
                                    className={index > 5 ? "md:col-span-2" : ""}
                                >

                                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />

                                    <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md animate-pulse" />

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>
        )
    }


    return (

        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-10">

            <div className="max-w-4xl mx-auto">

                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-[#111827]">
                        Edit Job
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Update your job posting and keep the information up to date.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={submitHandler}
                    className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                        {/* Job Title */}

                        <div className="space-y-2">

                            <Label htmlFor="title">
                                Job Title
                            </Label>

                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="e.g. Frontend Developer"
                                className="h-11"
                            />

                        </div>


                        {/* Location */}

                        <div className="space-y-2">

                            <Label htmlFor="location">
                                Location
                            </Label>

                            <Input
                                type="text"
                                name="location"
                                id="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="e.g. Delhi, India"
                                className="h-11"
                            />

                        </div>


                        {/* Salary */}

                        <div className="space-y-2">

                            <Label htmlFor="salary">
                                Salary
                            </Label>

                            <Input
                                type="text"
                                name="salary"
                                id="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="e.g. 6-10"
                                className="h-11"
                            />

                        </div>


                        {/* Job Type */}

                        <div className="space-y-2">

                            <Label htmlFor="jobType">
                                Job Type
                            </Label>

                            <Input
                                type="text"
                                name="jobType"
                                id="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="e.g. Full Time"
                                className="h-11"
                            />

                        </div>


                        {/* Experience */}

                        <div className="space-y-2">

                            <Label htmlFor="experience">
                                Experience Level
                            </Label>

                            <Input
                                type="text"
                                name="experience"
                                id="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="e.g. 0-2"
                                className="h-11"
                            />

                        </div>


                        {/* Positions */}

                        <div className="space-y-2">

                            <Label htmlFor="position">
                                Number of Positions
                            </Label>

                            <Input
                                type="number"
                                name="position"
                                id="position"
                                min="1"
                                value={input.position}
                                onChange={changeEventHandler}
                                placeholder="e.g. 2"
                                className="h-11"
                            />

                        </div>


                        {/* Description */}

                        <div className="space-y-2 md:col-span-2">

                            <Label htmlFor="description">
                                Job Description
                            </Label>

                            <Textarea
                                name="description"
                                id="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe the role, responsibilities and expectations..."
                                className="min-h-28 resize-none"
                            />

                        </div>


                        {/* Requirements */}

                        <div className="space-y-2 md:col-span-2">

                            <Label htmlFor="requirements">
                                Requirements
                            </Label>

                            <Textarea
                                name="requirements"
                                id="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder={`e.g. React and JavaScript experience
Good understanding of REST APIs
`}
                                className="min-h-24 resize-none"
                            />

                            <p className="text-xs text-gray-500">
                                Enter each requirement on a new line.
                            </p>

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row gap-3 mt-7">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/recruiter/jobs")}
                            className="w-full sm:w-auto sm:px-8 h-11"
                        >
                            Cancel
                        </Button>


                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:flex-1 h-11 bg-[#2563EB] hover:bg-[#1D4ED8]"
                        >

                            {loading ? (

                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating Job...
                                </>

                            ) : (

                                "Update Job"

                            )}

                        </Button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditJob