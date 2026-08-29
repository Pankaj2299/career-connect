import React, { useState } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';



function PostJob() {

  useGetAllCompanies()

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies, loading: companyLoading } = useSelector(state => state.company);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const selectChangeHandler = (value) => {

    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company.")
      return
    }

    const requirements = input.requirements
    .split("\n")
    .map(item => item.trim())
    .filter(item => item !== "");


    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`,{...input,
         requirements} , {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/jobs");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#111827]">
            Post a New Job
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create a job posting and find the right candidate for your company.
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
                placeholder="e.g. 6-10 "
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
                placeholder="e.g. 0-2 "
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


            {/* Company */}

            <div className="space-y-2 md:col-span-2">

              <Label>
                Company
              </Label>

              {
                companyLoading ? (

                  <div className="flex items-center h-11 px-3 rounded-md border border-gray-200 bg-gray-50">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Loading companies...
                    </span>
                  </div>

                ) : companies.length > 0 ? (

                  <Select
                    value={input.companyId}
                    onValueChange={selectChangeHandler}
                  >

                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>

                        {
                          companies.map((company) => (

                            <SelectItem
                              key={company._id}
                              value={company._id}
                            >
                              {company.name}
                            </SelectItem>

                          ))
                        }

                      </SelectGroup>
                    </SelectContent>

                  </Select>

                ) : (

                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-sm text-red-600">
                      Please register a company first before posting a job.
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/recruiter/companies/create")}
                      className="mt-3"
                    >
                      Create Company
                    </Button>

                  </div>

                )
              }

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
                placeholder={`e.g. Good knowledge of React
Basic understanding of JavaScript
                              `}
                className="min-h-24 resize-none"
              />

              <p className="text-xs text-gray-500">
                Enter each requirement on a new line.
              </p>

            </div>

          </div>


          {/* Submit */}

          <Button
            type="submit"
            disabled={loading || companies.length === 0}
            className="w-full h-11 mt-7 bg-[#2563EB] hover:bg-[#1D4ED8]"
          >

            {
              loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting Job...
                </>
              ) : (
                "Post New Job"
              )
            }

          </Button>

        </form>

      </div>

    </div>
  )
}

export default PostJob
