import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { validateEmail, validateRole } from '@/utils/validation'



function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const { user, loading: authLoading } = useSelector(state => state.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const emailError = validateEmail(input.email)

    if (emailError) {
      toast.error(emailError)
      return
    }

    const roleError = validateRole(input.role)

    if (roleError) {
      toast.error(roleError)
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)

      const message = error.response?.data?.message

      if (message === "Please verify your email before logging in.") {
        toast.info("Please verify your email first.")

        navigate("/verify-email", {
          state: {
            email: input.email
          }
        })

        return
      }

      toast.error(message || "Something went wrong")
    }

    finally {
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


      <div className="w-full max-w-md">

        <form onSubmit={submitHandler} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-[#111827] text-center">Login</h1>

          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            Welcome back! Login to continue.
          </p>



          <div className="space-y-2 mb-5">
            <Label htmlFor="email" className="font-medium">Email </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              autoComplete="email"
              placeholder="Enter your email"
              className='h-11'

            />

          </div>

          <div className="space-y-2 mb-5">
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={input.password}
                onChange={changeEventHandler}
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
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

            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-[#2563EB] font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className='my-6'>

            <div defaultValue="student" className='flex gap-8'>
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
                <label className='cursor-pointer' htmlFor="student">Student</label>
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
                <label className='cursor-pointer' htmlFor="recruiter">Recruiter</label>
              </div>
            </div>

          </div>
          {
            loading ? (
              <Button
                disabled
                className="w-full h-11 bg-[#2563EB] cursor-not-allowed opacity-90"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing you in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
              >
                Sign In
              </Button>
            )
          }



          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#2563EB] font-medium hover:underline"
            >
              Signup
            </Link>
          </p>


        </form>
      </div>
    </div>
  )
}

export default Login
