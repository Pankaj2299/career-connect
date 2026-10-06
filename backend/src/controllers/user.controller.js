import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { sendPasswordResetEmail } from "../utils/sendEmail.js";
import { sendWelcomeEmail } from "../utils/sendEmail.js";
import { validateEmail, validatePassword, validateOtp, validateFullname, validatePhoneNumber, validateRole } from "../utils/validation.js";


// Register 

export const register = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, password, role } = req.body

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };

        const fullnameError = validateFullname(fullname)

        if (fullnameError) {
            return res.status(400).json({
                message: fullnameError,
                success: false
            })
        }

        const emailError = validateEmail(email);

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            });
        }

        const passwordError = validatePassword(password);

        if (passwordError) {
            return res.status(400).json({
                message: passwordError,
                success: false
            });
        }

        const phoneError = validatePhoneNumber(phoneNumber);

        if (phoneError) {
            return res.status(400).json({
                message: phoneError,
                success: false
            });
        }

        const roleError = validateRole(role)

        if (roleError) {
            return res.status(400).json({
                message: roleError,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            })
        };




        const generateOtp = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();

        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const otp = generateOtp()

        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)




        const file = req.file

        let profilePhoto = "";
        let profilePhotoPublicId = "";

        if (file) {
            const fileUri = getDataUri(file)

            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto"
            })

            profilePhoto = cloudResponse.secure_url
            profilePhotoPublicId = cloudResponse.public_id
        }


        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,

            isVerified: false,

            verificationOtp: otp,

            verificationOtpExpiresAt: otpExpiresAt,

            lastOtpSentAt: new Date(),

            otpSendCount: 0,
            otpWindowStartedAt: new Date(),

            profile: {
                profilePhoto,
                profilePhotoPublicId
            }
        })

        try {

            await sendVerificationEmail(email, otp)

        } catch (error) {

            console.log("Failed to send verification email after registration:", error)

        }


        return res.status(201).json({
            message: "Account created successfully. Please check your email for the verification OTP.",
            success: true
        })


    } catch (error) {

        console.log("Register error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }

}

// VerifyEmail

export const verifyEmail = async (req, res) => {

    try {

        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false
            })
        }

        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }

        const otpError = validateOtp(otp)

        if (otpError) {
            return res.status(400).json({
                message: otpError,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false
            })
        }

        if (!user.verificationOtp || user.verificationOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false
            })
        }

        if (
            !user.verificationOtpExpiresAt ||
            user.verificationOtpExpiresAt < new Date()
        ) {
            return res.status(400).json({
                message: "OTP has expired",
                success: false
            })
        }

        user.isVerified = true
        user.verificationOtp = ""
        user.verificationOtpExpiresAt = null
        user.lastOtpSentAt = null
        user.otpSendCount = 0

        await user.save()

        // Send welcome email 

        try {
            await sendWelcomeEmail(
                user.email,
                user.fullname,
                user.role
            )

        } catch (error) {

            console.log("Failed to send welcome email:", error)
        }


        return res.status(200).json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


//  Resend Otp

export const resendOtp = async (req, res) => {

    try {

        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }


        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false
            })
        }

        // Check 15-minute OTP window

        const windowDuration = 15 * 60 * 1000

        if (
            user.otpWindowStartedAt &&
            Date.now() - new Date(user.otpWindowStartedAt).getTime() >= windowDuration
        ) {
            user.otpWindowStartedAt = null
            user.otpSendCount = 0
            user.otpCooldownUntil = null

            await user.save()
        }


        // OTP cooldown check
        if (user.otpCooldownUntil) {

            const remainingCooldown =
                new Date(user.otpCooldownUntil).getTime() - Date.now()

            if (remainingCooldown > 0) {

                const remainingMinutes =
                    Math.ceil(remainingCooldown / (60 * 1000))

                const remainingSeconds =
                    Math.ceil(remainingCooldown / 1000)

                return res.status(429).json({
                    message: `Too many OTP requests. Please try again after ${remainingMinutes} minutes.`,
                    cooldownRemaining: remainingSeconds,
                    success: false
                })
            }

            // Cooldown finished → reset cooldown and resend count
            user.otpCooldownUntil = null
            user.otpSendCount = 0

            await user.save()
        }

        // 60 seconds resend restriction
        if (user.lastOtpSentAt) {

            const timePassed =
                Date.now() - new Date(user.lastOtpSentAt).getTime()

            const remainingTime = 60 * 1000 - timePassed

            if (remainingTime > 0) {

                const remainingSeconds =
                    Math.ceil(remainingTime / 1000)

                return res.status(429).json({
                    message: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
                    success: false
                })
            }
        }



        // Maximum 3 resend attempts


        if (user.otpSendCount >= 3) {
            const cooldownSeconds = 15 * 60

            user.otpCooldownUntil =
                new Date(Date.now() + cooldownSeconds * 1000)

            await user.save()

            return res.status(429).json({
                message: "Too many OTP requests. Please try again after 15 minutes.",
                cooldownRemaining: cooldownSeconds,
                success: false
            })
        }


        // Generate new OTP
        const otp =
            Math.floor(100000 + Math.random() * 900000).toString()

        // OTP expires after 5 minutes
        const otpExpiresAt =
            new Date(Date.now() + 5 * 60 * 1000)

        user.verificationOtp = otp
        user.verificationOtpExpiresAt = otpExpiresAt
        user.lastOtpSentAt = new Date()
        user.otpSendCount += 1

        if (!user.otpWindowStartedAt) {
            user.otpWindowStartedAt = new Date()
        }

        await user.save()

        // Send OTP email

        try {

            await sendVerificationEmail(email, otp)

            return res.status(200).json({
                message: "A new OTP has been sent to your email.",
                success: true
            })

        } catch (error) {

            return res.status(500).json({
                message: "Failed to send OTP email. Please try again.",
                success: false
            })

        }

    } catch (error) {

        console.log("Resend OTP error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }
}


// Forgot Password

export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }

        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email.",
                success: false
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email before resetting your password.",
                success: false
            })
        }


        // Check 15-minute OTP window

        const windowDuration = 15 * 60 * 1000

        if (
            user.passwordResetOtpWindowStartedAt &&
            Date.now() - new Date(user.passwordResetOtpWindowStartedAt).getTime() >= windowDuration
        ) {
            user.passwordResetOtpWindowStartedAt = null
            user.passwordResetOtpSendCount = 0
            user.passwordResetOtpCooldownUntil = null

            await user.save()
        }


        // OTP cooldown check

        if (user.passwordResetOtpCooldownUntil) {

            const remainingCooldown =
                new Date(user.passwordResetOtpCooldownUntil).getTime() - Date.now()

            if (remainingCooldown > 0) {

                const remainingMinutes =
                    Math.ceil(remainingCooldown / (60 * 1000))

                return res.status(429).json({
                    message: `Too many OTP requests. Please try again after ${remainingMinutes} minutes.`,
                    success: false
                })
            }

            // Cooldown finished → reset count

            user.passwordResetOtpCooldownUntil = null
            user.passwordResetOtpSendCount = 0

            await user.save()
        }

        // 60 seconds resend restriction

        if (user.passwordResetLastOtpSentAt) {

            const timePassed =
                Date.now() -
                new Date(user.passwordResetLastOtpSentAt).getTime()

            const remainingTime =
                60 * 1000 - timePassed

            if (remainingTime > 0) {

                const remainingSeconds =
                    Math.ceil(remainingTime / 1000)

                return res.status(429).json({
                    message: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
                    success: false
                })
            }
        }

        // Maximum 3 OTP requests

        if (user.passwordResetOtpSendCount >= 3) {

            const cooldownSeconds = 15 * 60

            user.passwordResetOtpCooldownUntil =
                new Date(Date.now() + cooldownSeconds * 1000)

            await user.save()

            return res.status(429).json({
                message: "Too many OTP requests. Please try again after 15 minutes.",
                cooldownRemaining: cooldownSeconds,
                success: false
            })
        }

        // Generate OTP

        const otp =
            Math.floor(100000 + Math.random() * 900000).toString()

        // OTP expires after 5 minutes

        const otpExpiresAt =
            new Date(Date.now() + 5 * 60 * 1000)

        user.passwordResetOtp = otp
        user.passwordResetOtpExpiresAt = otpExpiresAt
        user.passwordResetLastOtpSentAt = new Date()
        user.passwordResetOtpSendCount += 1
        user.passwordResetOtpVerified = false

        if (!user.passwordResetOtpWindowStartedAt) {
            user.passwordResetOtpWindowStartedAt = new Date()
        }

        await user.save()

        // Send OTP email

        try {

            await sendPasswordResetEmail(email, otp)

            return res.status(200).json({
                message: "A password reset OTP has been sent to your email.",
                success: true
            })
        } catch (error) {

            return res.status(500).json({
                message: "Failed to send OTP email. Please try again.",
                success: false
            })

        }


    } catch (error) {


        console.log("Forgot Password error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// Verify Reset Otp

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false
            })
        }

        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }


        const otpError = validateOtp(otp)

        if (otpError) {
            return res.status(400).json({
                message: otpError,
                success: false
            })
        }


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (!user.passwordResetOtp) {
            return res.status(400).json({
                message: "No password reset OTP found",
                success: false
            })
        }

        if (
            !user.passwordResetOtpExpiresAt ||
            user.passwordResetOtpExpiresAt < new Date()
        ) {
            return res.status(400).json({
                message: "OTP has expired",
                success: false
            })
        }

        if (user.passwordResetOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false
            })
        }

        user.passwordResetOtpVerified = true
        await user.save()

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


// Resend Password Reset OTP

export const resendPasswordResetOtp = async (req, res) => {

    try {

        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }



        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email.",
                success: false
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email before resetting your password.",
                success: false
            })
        }



        // Check 15-minute OTP window

        const windowDuration = 15 * 60 * 1000

        if (
            user.passwordResetOtpWindowStartedAt &&
            Date.now() - new Date(user.passwordResetOtpWindowStartedAt).getTime() >= windowDuration
        ) {
            user.passwordResetOtpWindowStartedAt = null
            user.passwordResetOtpSendCount = 0
            user.passwordResetOtpCooldownUntil = null

            await user.save()
        }


        // OTP cooldown check

        if (user.passwordResetOtpCooldownUntil) {

            const remainingCooldown =
                new Date(user.passwordResetOtpCooldownUntil).getTime() - Date.now()

            if (remainingCooldown > 0) {

                const remainingMinutes =
                    Math.ceil(remainingCooldown / (60 * 1000))

                const remainingSeconds =
                    Math.ceil(remainingCooldown / 1000)

                return res.status(429).json({
                    message: `Too many OTP requests. Please try again after ${remainingMinutes} minutes.`,
                    cooldownRemaining: remainingSeconds,
                    success: false
                })
            }

            // Cooldown finished → reset count

            user.passwordResetOtpCooldownUntil = null
            user.passwordResetOtpSendCount = 0

            await user.save()
        }


        // 60 seconds resend restriction

        if (user.passwordResetLastOtpSentAt) {

            const timePassed =
                Date.now() -
                new Date(user.passwordResetLastOtpSentAt).getTime()

            const remainingTime =
                60 * 1000 - timePassed

            if (remainingTime > 0) {

                const remainingSeconds =
                    Math.ceil(remainingTime / 1000)

                return res.status(429).json({
                    message: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
                    success: false
                })
            }
        }


        // Maximum 3 resend attempts

        if (user.passwordResetOtpSendCount >= 3) {

            const cooldownSeconds = 15 * 60

            user.passwordResetOtpCooldownUntil =
                new Date(Date.now() + cooldownSeconds * 1000)

            await user.save()

            return res.status(429).json({
                message: "Too many OTP requests. Please try again after 15 minutes.",
                cooldownRemaining: cooldownSeconds,
                success: false
            })
        }


        // Generate new OTP

        const otp =
            Math.floor(100000 + Math.random() * 900000).toString()


        // OTP expires after 5 minutes

        const otpExpiresAt =
            new Date(Date.now() + 5 * 60 * 1000)


        user.passwordResetOtp = otp
        user.passwordResetOtpExpiresAt = otpExpiresAt
        user.passwordResetLastOtpSentAt = new Date()
        user.passwordResetOtpSendCount += 1
        user.passwordResetOtpVerified = false

        if (!user.passwordResetOtpWindowStartedAt) {
            user.passwordResetOtpWindowStartedAt = new Date()
        }

        await user.save()


        // Send OTP email

        try {
            await sendPasswordResetEmail(email, otp)


            return res.status(200).json({
                message: "A new password reset OTP has been sent to your email.",
                success: true
            })

        } catch (error) {

            return res.status(500).json({
                message: "Failed to send OTP email. Please try again.",
                success: false
            })

        }


    } catch (error) {


        console.log("Resend Password Reset OTP error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


// Reset Password 

export const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required",
                success: false
            })
        }


        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }

        const passwordError = validatePassword(newPassword)

        if (passwordError) {
            return res.status(400).json({
                message: passwordError,
                success: false
            })
        }


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (!user.passwordResetOtpVerified) {
            return res.status(403).json({
                message: "Please verify your OTP first",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        // Clear password reset data
        user.passwordResetOtp = ""
        user.passwordResetOtpExpiresAt = null
        user.passwordResetOtpVerified = false
        user.passwordResetLastOtpSentAt = null
        user.passwordResetOtpSendCount = 0
        user.passwordResetOtpCooldownUntil = null
        user.passwordResetOtpWindowStartedAt = null

        await user.save()

        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


// Login 

export const login = async (req, res) => {

    try {

        const { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };


        const emailError = validateEmail(email)

        if (emailError) {
            return res.status(400).json({
                message: emailError,
                success: false
            })
        }

        const roleError = validateRole(role)

        if (roleError) {
            return res.status(400).json({
                message: roleError,
                success: false
            })
        }



        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };



        // Check password is correct or not 

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        };


        // Check role is correct or not 

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist in current role",
                success: false
            })
        };


        // Check email verification
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in.",
                success: false,
                email: user.email
            })
        }



        // Generate token

        const tokenData = {
            userId: user._id
        }

        const token =  jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })


    } catch (error) {

        console.log("Login error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }

}

// Logout

export const logout = async (req, res) => {

    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({

            message: "Logged out successfully",
            success: true
        })


    } catch (error) {

        console.log("Logout error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }

}


// Update Profile 

export const updateProfile = async (req, res) => {

    try {
        // Add cloudinary setup for file 

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const profilePhoto = req.files?.profilePhoto?.[0];
        const resume = req.files?.resume?.[0];


        const userId = req.id;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname) {
            const fullnameError = validateFullname(fullname)

            if (fullnameError) {
                return res.status(400).json({
                    message: fullnameError,
                    success: false
                })
            }
        }

        if (email) {
            const emailError = validateEmail(email)

            if (emailError) {
                return res.status(400).json({
                    message: emailError,
                    success: false
                })
            }
        }

        if (phoneNumber) {
            const phoneError = validatePhoneNumber(phoneNumber)

            if (phoneError) {
                return res.status(400).json({
                    message: phoneError,
                    success: false
                })
            }
        }

        if (email && email !== user.email) {

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists with this email.",
                    success: false
                })
            }
        }



        let profilePhotoResponse;
        let resumeResponse;

        // Profile Photo validation
        if (profilePhoto) {
            if (!profilePhoto.mimetype.startsWith("image/")) {
                return res.status(400).json({
                    message: "Profile photo must be an image.",
                    success: false
                });
            }

            if (profilePhoto.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    message: "Profile photo must be less than 5MB.",
                    success: false
                });
            }
        }

        // Resume validation
        if (resume) {
            if (resume.mimetype !== "application/pdf") {
                return res.status(400).json({
                    message: "Resume must be a PDF file.",
                    success: false
                });
            }

            if (resume.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    message: "Resume must be less than 5MB.",
                    success: false
                });
            }
        }

        // Profile Photo
        if (profilePhoto) {

            const oldProfilePhotoPublicId = user.profile.profilePhotoPublicId;

            const fileUri = getDataUri(profilePhoto);

            profilePhotoResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "image",
                }
            );

            if (oldProfilePhotoPublicId) {
                await cloudinary.uploader.destroy(oldProfilePhotoPublicId, {
                    resource_type: "image"
                });
            }

        }

        // Resume
        if (resume) {

            const oldResumePublicId = user.profile.resumePublicId;

            const fileUri = getDataUri(resume);

            resumeResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "auto",
                }
            );


            if (oldResumePublicId) {

                const deleteResponse = await cloudinary.uploader.destroy(
                    oldResumePublicId,
                    {
                        resource_type: resumeResponse.resource_type
                    }
                );

            }
        }

        let skillsArray;

        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }


        // Update user data

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillsArray) {

            user.profile.skills = skillsArray
        }




        // Update Profile Photo
        if (profilePhotoResponse) {
            user.profile.profilePhoto = profilePhotoResponse.secure_url;
            user.profile.profilePhotoPublicId = profilePhotoResponse.public_id;
        }

        // Update Resume
        if (resumeResponse) {
            user.profile.resume = resumeResponse.secure_url;
            user.profile.resumeOriginalName = resume.originalname;
            user.profile.resumePublicId = resumeResponse.public_id;
        }





        await user.save()

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile update successfully",
            user,
            success: true
        })




    } catch (error) {
        console.log("Update Profile error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


// Get Profile 

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        return res.status(200).json({
            user,
            success: true,
        });

    } catch (error) {
        console.log("Get Profile error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
};