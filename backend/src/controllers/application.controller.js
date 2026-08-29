import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { sendApplicationConfirmationEmail } from "../utils/sendEmail.js";
import { sendNewApplicationEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.model.js";



export const applyJob = async (req, res) => {

    

    try {

        const userId = req.id
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        
        
        // Check if the user has already applied for this job
        // Check if the job exists

        const [existingApplication, job] = await Promise.all([
            Application.findOne({
                job: jobId,
                applicant: userId
            }),
            Job.findById(jobId).populate("company", "name")
        ])

        

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            })
        }

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }


        // Find applicant and recruiter

        const [applicant, recruiter] = await Promise.all([
            User.findById(userId).select("fullname email"),
            User.findById(job.created_by).select("fullname email")
        ])

        

        if (!applicant) {
            return res.status(404).json({
                message: "Applicant not found.",
                success: false
            })
        }

        if (!recruiter) {
            return res.status(404).json({
                message: "Recruiter not found.",
                success: false
            })
        }

        // Create a new application


        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })



        // Link the application to the job


        job.applications.push(newApplication._id)
        await job.save()



        // Send application confirmation email to student



        sendApplicationConfirmationEmail(
            applicant.email,
            applicant.fullname,
            job.title,
            job.company.name
           

        ).catch((error) => {

            console.log("Application confirmation email failed:", error)
        })



        // Send new application notification email to recruiter



        sendNewApplicationEmail(
            recruiter.email,
            recruiter.fullname,
            applicant.fullname,
            applicant.email,
            job.title,
            job.company.name
            

        ).catch((error) => {

            console.log("New application email failed:", error)
        })

  
        

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })

    } catch (error) {

        
        console.log("Apply Job error:", error)

        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })

    }

}

// Get all jobs applied by the logged-in student

export const getAppliedJobs = async (req, res) => {
    try {

        const userId = req.id
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!applications) {
            return res.status(404).json({
                message: "No applications.",
                success: false
            })
        }

        return res.status(200).json({
            applications,
            success: true
        })

    } catch (error) {
        console.log(error)

    }
}

// Get all students who applied for this job

export const getApplicants = async (req, res) => {

    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } }
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true

        })


    } catch (error) {
        console.log(error)

    }
}

export const updateStatus = async (req, res) => {

    try {
        const { status } = req.body;
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            })

        }

        // Find the application by its ID

        const application = await Application.findOne({ _id: applicationId })

        if (!application) {
            return res.status(400).json({
                message: "Application not found.",
                success: false
            })

        }

        // Update status
        application.status = status.toLowerCase();
        await application.save()

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        })


    } catch (error) {
        console.log(error)

    }

}