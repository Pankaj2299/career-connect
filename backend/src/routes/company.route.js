import express from "express"
import { registerCompany, getCompany,getCompanyById,updateCompany } from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js"
import authorizeRoles from "../middlewares/authorizeRoles.js"

const router = express.Router()

router.route("/register").post(isAuthenticated,authorizeRoles("recruiter"),registerCompany)
router.route("/get").get(isAuthenticated,getCompany)
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated,authorizeRoles("recruiter"),singleUpload,updateCompany)

export default router