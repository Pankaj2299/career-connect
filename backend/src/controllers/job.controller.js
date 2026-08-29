import { Job } from "../models/job.model.js";

 // Recruiter creates a new job


export const postJob = async (req,res) =>{

    try {

        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
 
         const userId = req.id

         if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
         }

         const job = await Job.create({
            title,
            description,
            requirements: requirements,
            salary,
            location,
            jobType,
            experienceLevel:experience,
            position,
            created_by :userId,
            company:companyId
        })

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success:true
        });

    } catch (error) {
        console.log(error)
    }

}


 // Students can view all available jobs

 export const getAllJobs = async (req, res) => {

    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
                
            
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1 })

      if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }

 }

   // Students can view job details by ID

 export const getJobById = async (req,res) =>{

       try {

        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
    
 
        if(!job){
            return res.status(404).json({
                message: "Job not found.",
                success:false
            
            })
        };

        return res.status(200).json({
            job,
            success:true
        });

        
       } catch (error) {
        console.log(error)
       }
 }


 // Get all jobs posted by the logged-in recruiter

 export const getRecruiterJobs = async (req,res) => {

    try {

        const recruiterId = req.id
        const jobs = await Job.find({ created_by: recruiterId })
    .populate("company")
    .sort({ createdAt: -1 });
        
     if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error)
    }

 }

 // Recruiter updates their own job

export const updateJob = async (req, res) => {

    try {

        const jobId = req.params.id;
        const recruiterId = req.id;

        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position
        } = req.body;


        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }


        // Ownership check
        if (job.created_by.toString() !== recruiterId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false
            });
        }


        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: requirements,
                salary,
                location,
                jobType,
                experienceLevel: experience,
                position
            },
            {
               returnDocument:"after"
            }
        );


        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });

    }

}


        