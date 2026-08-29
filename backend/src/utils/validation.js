export const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;


export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;


export const validateEmail = (email) => {

    if (!email) {
        return "Email is required";
    }

    if (email.length > 100) {
        return "Email is too long";
    }

    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return null;
};


export const validatePassword = (password) => {

    if (!password) {
        return "Password is required";
    }

    if (password.length < 8 || password.length > 64) {
        return "Password must be between 8 and 64 characters";
    }

    if (!passwordRegex.test(password)) {
        return "Password must contain uppercase, lowercase, number and special character";
    }

    return null;
};


export const validateOtp = (otp) => {

    if (!otp) {
        return "OTP is required";
    }

    if (!/^\d{6}$/.test(otp)) {
        return "OTP must be a 6-digit number";
    }

    return null;
};


export const validateFullname = (fullname) => {

    if (!fullname) {
        return "Full name is required";
    }

    if (fullname.trim().length < 2) {
        return "Full name must be at least 2 characters long";
    }

    if (fullname.length > 50) {
        return "Full name is too long";
    }

     if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(fullname.trim())) {
        return "Full name can contain only letters and spaces";
    }

    return null;
};


export const validatePhoneNumber = (phoneNumber) => {

    if (!phoneNumber) {
        return "Phone number is required";
    }

    if (!/^[6-9]\d{9}$/.test(String(phoneNumber))) {
        return "Please enter a valid 10-digit phone number";
    }

    return null;
};


export const validateRole = (role) => {

    if (!role) {
        return "Role is required";
    }

    if (!["student", "recruiter"].includes(role)) {
        return "Invalid role";
    }

    return null;
};