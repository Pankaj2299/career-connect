import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Plus, Search } from 'lucide-react'
import RecruiterJobsTable from './RecruiterJobsTable'
import useGetAllRecruiterJobs from '@/hooks/useGelAllRecruiterJobs'
import { SetSearchJobByText } from '@/redux/jobSlice'


function RecruiterJobs() {
    useGetAllRecruiterJobs()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SetSearchJobByText(input))
    }, [input, dispatch])
    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC]">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                        Your Jobs
                    </h1>

                    <p className="mt-1 text-sm sm:text-base text-gray-500">
                        Manage the jobs you have posted and keep track of your job postings.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                    {/* Search */}
                    <div className="relative w-full sm:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Search jobs..."
                            className="h-11 pl-10 bg-white border-gray-200 focus-visible:ring-[#2563EB]"
                        />
                    </div>

                    <Button
                        onClick={() => navigate("/recruiter/jobs/create")}
                        className="h-11 bg-[#2563EB] hover:bg-[#1D4ED8] gap-2"
                    >
                        <Plus size={18} />
                        New Jobs

                    </Button>
                </div>


                {/* Jobs Table */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <RecruiterJobsTable/>
                </div>

            </div>
        </div>
    )
}

export default RecruiterJobs

