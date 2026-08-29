import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { USER_API_END_POINT } from "@/utils/constant"
import { validateEmail } from "@/utils/validation"

function ForgotPassword() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {

        e.preventDefault()


        const emailError = validateEmail(email)

        if (emailError) {
            toast.error(emailError)
            return
        }


        try {

            setLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/forgot-password`,
                {
                    email
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                navigate("/verify-reset-otp", {
                    state: {
                        email
                    }
                })
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            )

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                <form
                    onSubmit={submitHandler}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-8"
                >

                    <h1 className="text-3xl font-bold text-[#111827] text-center">
                        Forgot Password
                    </h1>

                    <p className="text-sm text-gray-500 text-center mt-2 mb-8">
                        Enter your email to receive a password reset OTP.
                    </p>

                    <div className="space-y-2 mb-6">

                        <Label
                            htmlFor="email"
                            className="font-medium"
                        >
                            Email
                        </Label>

                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="h-11"
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    >

                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP"
                        )}

                    </Button>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Remember your password?{" "}

                        <Link
                            to="/login"
                            className="text-[#2563EB] font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default ForgotPassword