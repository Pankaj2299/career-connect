import express from "express"
import { login,logout, register, updateProfile,getProfile,verifyEmail,resendOtp,forgotPassword,verifyResetOtp,resetPassword,resendPasswordResetOtp } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload,profileUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/verify-email").post(verifyEmail)
router.route("/resend-otp").post(resendOtp)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-reset-otp").post(verifyResetOtp)
router.route("/resend-password-reset-otp").post(resendPasswordResetOtp)
router.route("/reset-password").post(resetPassword)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,profileUpload,updateProfile)
router.route("/profile").get(isAuthenticated, getProfile);

export default router