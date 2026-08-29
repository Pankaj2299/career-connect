import express from "express"
import {postJob,getAllJobs,getJobById,getRecruiterJobs,updateJob } from "../controllers/job.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import authorizeRoles from "../middlewares/authorizeRoles.js"


const router = express.Router()

router.route("/post").post(isAuthenticated,authorizeRoles("recruiter"),postJob);
router.route("/get").get(getAllJobs);
router.route("/getrecruiterjobs").get(isAuthenticated,authorizeRoles("recruiter"),getRecruiterJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated,authorizeRoles("recruiter"),updateJob)

export default router