import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";



// Register Company

export const registerCompany = async (req, res) => {

    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,

        })

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

}

// Get All Companies

export const getCompany = async (req, res) => {

    try {

        const userId = req.id // logged in user userId
        const companies = await Company.find({ userId })

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

}

// Get Company By Id

export const getCompanyById = async (req, res) => {

    try {

        const companyId = req.params.id


        const company = await Company.findById(companyId)




        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error)

    }
}

// Update Company Details


export const updateCompany = async (req, res) => {

    try {

        const { name, description, website, location } = req.body;

        const file = req.file // File from multer


        const company = await Company.findOne({
            _id: req.params.id,
            userId: req.id
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found or you don't have access to this company.",
                success: false
            });
        }


        const updateData = { name, description, website, location };



        if (file) {

            // Old logo ki public ID
            const oldLogoPublicId = company.logoPublicId;

            // New logo upload
            const fileUri = getDataUri(file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "image"
                }
            );

            updateData.logo = cloudResponse.secure_url;
            updateData.logoPublicId = cloudResponse.public_id;

            // Old logo delete
            if (oldLogoPublicId) {
                await cloudinary.uploader.destroy(
                    oldLogoPublicId,
                    {
                        resource_type: "image"
                    }
                );
            }
        }

         // Company update
        company.name = name;
        company.description = description;
        company.website = website;
        company.location = location;

        if (updateData.logo) {
            company.logo = updateData.logo;
            company.logoPublicId = updateData.logoPublicId;
        }

        await company.save();

        return res.status(200).json({
            message: "Company informations updated successfully.",
            success: true,
            company
        });


    } catch (error) {
        console.log(error)

    }

}