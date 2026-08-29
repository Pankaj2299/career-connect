import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ArrowLeft, Building2, Loader2, Upload } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function CompanySetup() {

  const params = useParams()

  useGetCompanyById(params.id)

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState("")
  const { singleCompany } = useSelector(state => state.company)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {

    const file = e.target.files?.[0] || null

    setInput({
      ...input,
      file
    })

    if (file) {
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", input?.name)
    formData.append("description", input?.description)
    formData.append("website", input?.website)
    formData.append("location", input?.location)

    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/recruiter/companies")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    if (singleCompany) {

      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null
      })

      setLogoPreview(singleCompany.logo || "")
    }

  }, [singleCompany])



  return (


    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-10">

      <div className="max-w-3xl mx-auto">

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
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">

            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">

              <Building2
                size={24}
                className="text-[#2563EB]"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-[#111827]">
                Company Setup
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Update your company information and logo.
              </p>

            </div>

          </div>


          <form onSubmit={submitHandler}>

            {/* Company Logo */}
            <div className="mb-8 p-5 rounded-lg border border-gray-200 bg-gray-50">

              <div className="flex items-center gap-4">

                <Avatar className="h-16 w-16 border border-gray-200 bg-white">

                  <AvatarImage
                    src={logoPreview || singleCompany?.logo}
                    alt={singleCompany?.name}
                  />

                  <AvatarFallback className="bg-blue-50 text-[#2563EB] text-lg font-semibold">
                    {singleCompany?.name?.charAt(0)?.toUpperCase() || "C"}
                  </AvatarFallback>

                </Avatar>

                <div>

                  <p className="font-semibold text-[#111827]">
                    Company Logo
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Upload a new logo if you want to replace the current one.
                  </p>

                </div>

              </div>

              <div className="mt-4">

                <Label
                  htmlFor="logo"
                  className="flex items-center gap-2 w-fit cursor-pointer"
                >
                  <Upload size={16} />
                  Choose New Logo
                </Label>

                <Input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="mt-2 cursor-pointer"
                />

                {
                  input.file && (
                    <p className="text-xs text-gray-500 mt-2">
                      Selected: {input.file.name}
                    </p>
                  )
                }

              </div>

            </div>


            {/* Information */}
            <div className="space-y-6">

              {/* Company Name */}
              <div className="space-y-2">

                <Label
                  htmlFor="companyName"
                  className="font-medium text-[#111827]"
                >
                  Company Name
                </Label>

                <Input
                  type="text"
                  id="companyName"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                  className="h-11"
                />

              </div>


              {/* Description */}
              <div className="space-y-2">

                <Label
                  htmlFor="description"
                  className="font-medium text-[#111827]"
                >
                  Description
                </Label>

                <textarea
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Tell candidates about your company..."
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none resize-none focus-visible:ring-1 focus-visible:ring-[#2563EB]"
                />

              </div>


              {/* Website + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="space-y-2">

                  <Label
                    htmlFor="website"
                    className="font-medium text-[#111827]"
                  >
                    Website
                  </Label>

                  <Input
                    type="text"
                    name="website"
                    id="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    placeholder="https://example.com"
                    className="h-11"
                  />

                </div>


                <div className="space-y-2">

                  <Label
                    htmlFor="location"
                    className="font-medium text-[#111827]"
                  >
                    Location
                  </Label>

                  <Input
                    type="text"
                    name="location"
                    id="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="e.g. Mumbai, India"
                    className="h-11"
                  />

                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-200">

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/recruiter/companies")}
                disabled={loading}
              >
                Cancel
              </Button>


              {
                loading ? (

                  <Button
                    type="button"
                    disabled
                    className="bg-[#2563EB] opacity-90"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </Button>

                ) : (

                  <Button
                    type="submit"
                    className="bg-[#2563EB] hover:bg-[#1D4ED8]"
                  >
                    Update Company
                  </Button>

                )
              }

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default CompanySetup
