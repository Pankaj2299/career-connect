import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { USER_API_END_POINT } from "@/utils/constant"
import { validateEmail, validateOtp } from "@/utils/validation"

function VerifyEmail() {

    const location = useLocation()
    const navigate = useNavigate()

    const email = location.state?.email


    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)

    const [resendLoading, setResendLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)
    const [cooldownTimer, setCooldownTimer] = useState(0)


    useEffect(() => {
        if (!email) {
            toast.info("Please login to continue email verification.")
            navigate("/login", { replace: true })
        }
    }, [email, navigate])



    //   resendTimer 

    useEffect(() => {

        if (resendTimer <= 0) return

        const timer = setInterval(() => {
            setResendTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)

    }, [resendTimer])


    useEffect(() => {

        if (cooldownTimer <= 0) return

        const timer = setInterval(() => {
            setCooldownTimer((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)

    }, [cooldownTimer])

    if (!email) {
        return null;
    }


    const submitHandler = async (e) => {

        e.preventDefault()

        const emailError = validateEmail(email)

        if (emailError) {
            toast.error(emailError)
            return
        }

        const otpError = validateOtp(otp)

        if (otpError) {
            toast.error(otpError)
            return
        }

        try {

            setLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/verify-email`,
                {
                    email,
                    otp
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                navigate("/login")
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

    const resendOtpHandler = async () => {

        if (resendTimer > 0 || cooldownTimer > 0) {
            return
        }
        try {

            setResendLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/resend-otp`,
                {
                    email
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                setResendTimer(60)
                setOtp("")
            }

        } catch (error) {

            console.log(error)

            const response = error.response?.data

            if (response?.cooldownRemaining) {
                setCooldownTimer(response.cooldownRemaining)
            }

            toast.error(
                response?.message ||
                "Something went wrong"
            )

        } finally {

            setResendLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <form
                    onSubmit={submitHandler}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-8"
                >

                    <h1 className="text-2xl font-bold text-center text-[#111827]">
                        Verify Your Email
                    </h1>

                    <p className="text-sm text-gray-500 text-center mt-2">
                        We sent a 6-digit OTP to
                    </p>

                    <p className="text-sm font-medium text-center mt-1">
                        {email}
                    </p>

                    <div className="mt-8 space-y-2">

                        <label className="text-sm font-medium">
                            Enter OTP
                        </label>

                        <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                        .replace(/\D/g, "")
                                )
                            }
                            placeholder="Enter 6-digit OTP"
                            className="h-11 text-center text-lg tracking-[0.5em]"
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 mt-6 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    >

                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify Email"
                        )}

                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={resendOtpHandler}
                        disabled={
                            resendLoading ||
                            resendTimer > 0 ||
                            cooldownTimer > 0
                        }
                        className="w-full mt-3"
                    >
                        {resendLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending OTP...
                            </>
                        ) : cooldownTimer > 0 ? (
                            `Try again in ${Math.floor(cooldownTimer / 60)}m ${cooldownTimer % 60}s`
                        ) : resendTimer > 0 ? (
                            `Resend OTP in ${resendTimer}s`
                        ) : (
                            "Resend OTP"
                        )}
                    </Button>


                </form>

            </div>

        </div>
    )
}

export default VerifyEmail