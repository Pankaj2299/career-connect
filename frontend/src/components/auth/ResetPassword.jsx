import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { USER_API_END_POINT } from "@/utils/constant"
import { validatePassword } from "@/utils/validation"

function ResetPassword() {

    const location = useLocation()
    const navigate = useNavigate()

    const email = location.state?.email

    const [input, setInput] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    useEffect(() => {
        if (!email) {
            toast.info("Please verify your OTP first.")
            navigate("/forgot-password", { replace: true })
        }
    }, [email, navigate])

    if (!email) {
        return null
    }


    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {

        e.preventDefault()

        const { newPassword, confirmPassword } = input

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields")
            return
        }

        const passwordError = validatePassword(newPassword)

        if (passwordError) {
            toast.error(passwordError)
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }


        try {

            setLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/reset-password`,
                {
                    email,
                    newPassword
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                navigate("/login", { replace: true })
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

                    <h1 className="text-2xl font-bold text-[#111827] text-center">
                        Reset Password
                    </h1>

                    <p className="text-sm text-gray-500 text-center mt-2 mb-8">
                        Create a new password for your account.
                    </p>

                    <div className="space-y-2 mb-5">

                        <Label
                            htmlFor="newPassword"
                            className="font-medium"
                        >
                            New Password
                        </Label>

                        <div className="relative">
                            <Input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={input.newPassword}
                                onChange={changeEventHandler}
                                autoComplete="new-password"
                                placeholder="Enter new password"
                                className="h-11 pr-10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showNewPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                    </div>

                    <div className="space-y-2 mb-6">

                        <Label
                            htmlFor="confirmPassword"
                            className="font-medium"
                        >
                            Confirm Password
                        </Label>

                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={input.confirmPassword}
                                onChange={changeEventHandler}
                                autoComplete="new-password"
                                placeholder="Confirm new password"
                                className="h-11 pr-10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    >

                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resetting Password...
                            </>
                        ) : (
                            "Reset Password"
                        )}

                    </Button>

                </form>

            </div>

        </div>
    )
}

export default ResetPassword