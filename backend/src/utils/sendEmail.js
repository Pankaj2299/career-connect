import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Account Verification Email


export const sendVerificationEmail = async (email, otp) => {

    try {

        await transporter.sendMail({
            from: `"CareerConnect" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your CareerConnect account",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
    
                    <h2>Welcome to CareerConnect</h2>
    
                    <p>
                        Thank you for creating your account.
                        Please use the OTP below to verify your email address.
                    </p>
    
                    <div style="
                        font-size: 30px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        margin: 25px 0;
                    ">
                        ${otp}
                    </div>
    
                    <p>
                        This OTP will expire in <strong>5 minutes</strong>.
                    </p>
    
                    <p>
                        If you did not create this account, you can safely ignore this email.
                    </p>
    
                    <p>
                        Thanks,<br/>
                        <strong>Career Connect Team</strong>
                    </p>
    
                </div>
            `
        });

    } catch (error) {


        console.log("Verification email error:", error)
        throw error

    }

};

//  Password Reset Email 

export const sendPasswordResetEmail = async (email, otp) => {

    try {

        const mailOptions = {
            from: `"CareerConnect" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Career Connect Password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                    <h2 style="color: #2563EB;">
                        Password Reset Request
                    </h2>

                    <p>
                        We received a request to reset your Career Connect password.
                    </p>

                    <p>
                        Your password reset OTP is:
                    </p>

                    <h1 style="letter-spacing: 8px; color: #111827;">
                        ${otp}
                    </h1>

                    <p>
                        This OTP will expire in <strong>5 minutes</strong>.
                    </p>

                    <p>
                        If you did not request a password reset, you can safely ignore this email.
                    </p>

                    <p style="margin-top: 30px;">
                        Regards,<br>
                        <strong>Career Connect Team</strong>
                    </p>

                </div>
            `
        }

        await transporter.sendMail(mailOptions)

    } catch (error) {

        console.log("Password reset email error:", error)

        throw error
    }
}


// Welcome Email

export const sendWelcomeEmail = async (email, fullname, role) => {

    try {

        const isRecruiter = role === "recruiter"

        const mailOptions = {
            from: `"CareerConnect" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: isRecruiter
                ? "Welcome to CareerConnect as a Recruiter"
                : "Welcome to CareerConnect",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                    <h2 style="color: #2563EB;">
                        Welcome to CareerConnect, ${fullname}!
                    </h2>

                    ${isRecruiter
                    ? `
                                <p>
                                    Your recruiter account has been successfully verified.
                                </p>

                                <p>
                                    You can now create job opportunities, manage applications,
                                    and connect with talented candidates.
                                </p>
                            `
                    : `
                                <p>
                               Your account has been successfully verified.
                                 </p>

                                <p>
    You can now explore job opportunities, apply for jobs,
    and build your career with CareerConnect.
</p>
                            `
                }

                    <p style="margin-top: 30px;">
                        We're happy to have you with us!
                    </p>

                    <p>
                        Regards,<br>
                        <strong>Career Connect Team</strong>
                    </p>

                </div>
            `
        }

        await transporter.sendMail(mailOptions)

    } catch (error) {

        console.log("Welcome email error:", error)
        throw error

    }

}


// Job Application Confirmation Email 

export const sendApplicationConfirmationEmail = async (
    email,
    fullname,
    jobTitle,
    companyName
) => {

    try {

        await transporter.sendMail({

            from: `"CareerConnect" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Job Application Submitted Successfully",

            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                    <h2 style="color: #2563EB;">
                        Application Submitted Successfully
                    </h2>

                    <p>
                        Hi <strong>${fullname}</strong>,
                    </p>

                    <p>
                        Your application for the
                        <strong>${jobTitle}</strong>
                        position at
                        <strong>${companyName}</strong>
                        has been successfully submitted.
                    </p>

                    <p>
                        The recruiter will review your application
                        and contact you if you are shortlisted.
                    </p>

                    <p style="margin-top: 30px;">
                        Best of luck with your application!
                    </p>

                    <p>
                        Regards,<br>
                        <strong>Career Connect Team</strong>
                    </p>

                </div>
            `
        })

    } catch (error) {

        console.log("Application confirmation email error:", error)

        throw error
    }
}



// New Job Application Notification Email

export const sendNewApplicationEmail = async (
    email,
    recruiterName,
    candidateName,
    candidateEmail,
    jobTitle,
    companyName
) => {
    try {
        await transporter.sendMail({
            from: `"CareerConnect" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `New Application Received for ${jobTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

        <h2 style="color: #2563EB;">
            New Job Application Received
        </h2>

        <p>
            Hi ${recruiterName},
        </p>

        <p>
            You have received a new application for the position of
            <strong>${jobTitle}</strong> at
            <strong>${companyName}</strong>.
        </p>

        <div style="
            background-color: #F3F4F6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        ">

            <p style="margin: 8px 0;">
                <strong>Candidate Name:</strong> ${candidateName}
            </p>

            <p style="margin: 8px 0;">
                <strong>Candidate Email:</strong> ${candidateEmail}
            </p>

            <p style="margin: 8px 0;">
                <strong>Job Position:</strong> ${jobTitle}
            </p>

            <p style="margin: 8px 0;">
                <strong>Company:</strong> ${companyName}
            </p>

        </div>

        <p>
            Please log in to CareerConnect to review the candidate's
            application and manage the recruitment process.
        </p>

        <p style="margin-top: 30px;">
            Regards,<br>
            <strong>Career Connect Team</strong>
        </p>

    </div>
            `
        })
    } catch (error) {
        console.log("New application email error:", error)
        throw error
    }
}