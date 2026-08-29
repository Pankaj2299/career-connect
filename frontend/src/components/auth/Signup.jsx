import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Camera, Eye, EyeOff } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfilePhotoCropper from '../profile/ProfilePhotoCropper'
import { validateEmail, validatePassword, validateFullname, validatePhoneNumber, validateRole } from '@/utils/validation'


function Signup() {

  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useSelector(state => state.auth)
  const [cropOpen, setCropOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null
  })


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

  }
  const changeFileHandler = (e) => {


    const file = e.target.files?.[0]

    if (!file) return

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      e.target.value = ""
      return
    }

    // Image validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      e.target.value = ""
      return
    }

    const imageUrl = URL.createObjectURL(file)

    setSelectedImage(imageUrl)
    setCropOpen(true)

  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const { fullname, email, password } = input

    const fullnameError = validateFullname(fullname)

    if (fullnameError) {
      toast.error(fullnameError)
      return
    }

    const emailError = validateEmail(email)

    if (emailError) {
      toast.error(emailError)
      return
    }

    const phoneError = validatePhoneNumber(input.phoneNumber)

    if (phoneError) {
      toast.error(phoneError)
      return
    }

    const passwordError = validatePassword(password)

    if (passwordError) {
      toast.error(passwordError)
      return
    }

    const roleError = validateRole(input.role)

    if (roleError) {
      toast.error(roleError)
      return
    }

    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)

    if (input.file) {
      formData.append("file", input.file)
    }


    try {
      setLoading(true)

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if (res.data.success) {
        navigate("/verify-email", {
          state: {
            email: input.email
          }
        })

        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])


  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] flex items-center justify-center px-4 py-10">


      <div className="w-full max-w-2xl">

        <ProfilePhotoCropper
          image={selectedImage}
          open={cropOpen}
          setOpen={setCropOpen}
          onCropComplete={(croppedFile) => {

            setInput((prev) => ({
              ...prev,
              file: croppedFile
            }))
            setSelectedImage(URL.createObjectURL(croppedFile))
            setCropOpen(false)
          }}
        />

        <form onSubmit={submitHandler} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-[#111827] text-center">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            Join CareerConnect and start your career journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">



            <div className="space-y-2 mb-5">
              <Label htmlFor="name">Full Name </Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                id="name"
                placeholder="Enter your full name"
                className='h-11'

              />




            </div>


            <div className="space-y-2 mb-5">
              <Label htmlFor="email">Email </Label>
              <Input
                type="email"
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter your email"
                className='h-11'

              />

            </div>


            <div className="space-y-2 mb-5">
              <Label htmlFor="phoneNumber">Phone Number </Label>
              <Input
                type="tel"
                id="phoneNumber"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
                className='h-11'

              />

            </div>

            <div className="space-y-2 mb-5">
              <Label htmlFor="password">Password </Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Create a password"
                  className="h-11 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

          </div>



          <div className="space-y-6 my-6">

            {/* Role */}

            <div className="space-y-3">
              <Label className="font-medium">Role</Label>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name='role'
                    id='student'
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    value="student"
                    className='cursor-pointer'

                  />
                  <label htmlFor="student">Student</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name='role'
                    id='recruiter'
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    value="recruiter"
                    className='cursor-pointer'
                  />
                  <label htmlFor="recruiter">Recruiter</label>

                </div>
              </div>
            </div>

            {/* Profile Photo */}

            <div className="space-y-3">

              <Label className="font-medium">
                Profile Photo
              </Label>

              <div className="flex justify-start">

                <div className="relative">

                  {/* Hidden File Input */}

                  <input
                    type="file"
                    id="profilePhoto"
                    onChange={changeFileHandler}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Profile Preview */}

                  <div className="relative">

                    {input.file ? (
                      <img
                        src={selectedImage}
                        alt="Profile Preview"
                        className="h-24 w-24 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full border bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          Photo
                        </span>
                      </div>
                    )}

                    {/* Camera Button */}

                    <label
                      htmlFor="profilePhoto"
                      className="
                        absolute
                        bottom-0
                        right-0
                        h-8
                        w-8
                        rounded-full
                        bg-black/60
                        text-white
                        flex
                        items-center
                        justify-center
                        border
                        border-white
                        cursor-pointer
                        hover:bg-black/75
                        transition
                    "
                    >
                      <Camera size={15} />
                    </label>

                  </div>

                </div>

              </div>

              <p className="text-xs text-gray-500">
                Click the camera icon to upload your profile photo.
              </p>

            </div>




          </div>

          {
            loading ? (
              <Button
                disabled
                className="w-full h-11 bg-[#2563EB] cursor-not-allowed opacity-90"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating your account...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
              >
                Create Account
              </Button>
            )
          }

          <p className="text-center text-sm text-gray-600">Already have an account ? <Link to="/login" className="text-[#2563EB] font-medium hover:underline">Login</Link></p>


        </form>
      </div>
    </div>



  )
}

export default Signup
