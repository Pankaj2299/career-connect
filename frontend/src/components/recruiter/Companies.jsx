import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus, Search } from 'lucide-react'


function Companies() {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])
    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC]">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                        Your Companies
                    </h1>

                    <p className="mt-1 text-sm sm:text-base text-gray-500">
                        Manage the companies you have registered for your job postings.
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
                            placeholder="Search company..."
                            className="h-11 pl-10 bg-white border-gray-200 focus-visible:ring-[#2563EB]"
                        />
                    </div>

                    <Button
                        onClick={() => navigate("/recruiter/companies/create")}
                        className="h-11 bg-[#2563EB] hover:bg-[#1D4ED8] gap-2"
                    >
                        <Plus size={18} />
                        New Company

                    </Button>
                </div>


                {/* Companies Table */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <CompaniesTable />
                </div>

            </div>
        </div>
    )
}

export default Companies
