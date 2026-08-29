import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { ArrowLeft, Building2 } from 'lucide-react'

function CompanyCreate() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState("")


  const registerNewCompany = async () => {
    try {

      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        navigate(`/recruiter/companies/${res.data.company._id}`)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)

    }

  }

  return (
   

    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-10">

      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/recruiter/companies")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#2563EB] transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Companies
        </button>


        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 sm:p-10">

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">

            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Building2
                size={24}
                className="text-[#2563EB]"
              />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-[#111827]">
                Create Your Company
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Add your company to start posting jobs and finding
                talented candidates.
              </p>

            </div>

          </div>


          {/* Form */}
          <div className="space-y-2">

            <Label
              htmlFor="companyName"
              className="font-medium text-[#111827]"
            >
              Company Name
            </Label>

            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Microsoft, Google, Amazon"
              className="h-11"
            />

            <p className="text-xs text-gray-500 pt-1">
              You can update your company information later.
            </p>

          </div>


          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-10">

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/recruiter/companies")}
              className="px-6"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={registerNewCompany}
              disabled={!companyName.trim()}
              className="px-6 bg-[#2563EB] hover:bg-[#1D4ED8]"
            >
              Continue
            </Button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CompanyCreate
