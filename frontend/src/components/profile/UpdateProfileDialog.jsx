import React, { useEffect, useState, useRef } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Camera, Eye, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import ProfilePhotoCropper from './ProfilePhotoCropper'
import { validateEmail, validateFullname, validatePhoneNumber } from '@/utils/validation'


function UpdateProfileDialog({ open, setOpen }) {

    const dispatch = useDispatch()
    const [viewPhotoOpen, setViewPhotoOpen] = useState(false);
    const [photoPopoverOpen, setPhotoPopoverOpen] = useState(false);
    const viewPhotoOpenRef = useRef(false);
    const profilePhotoInputRef = useRef(null);
    const [cropOpen, setCropOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [profilePreview, setProfilePreview] = useState("");
    const [resumeName, setResumeName] = useState("");
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        profilePhoto: null,
        resume: null
    });

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.join(", ") || "",
                profilePhoto: null,
                resume: null
            })
            setProfilePreview(user?.profile?.profilePhoto || "");
            setResumeName(user?.profile?.resumeOriginalName || "");

        }
    }, [user])

    const changeEventHandler = (e) => {

        setInput({ ...input, [e.target.name]: e.target.value })

    }
    const submitHandler = async (e) => {
        e.preventDefault()

        const fullnameError = validateFullname(input.fullname)

        if (fullnameError) {
            toast.error(fullnameError)
            return
        }

        const emailError = validateEmail(input.email)

        if (emailError) {
            toast.error(emailError)
            return
        }

        const phoneError = validatePhoneNumber(input.phoneNumber)

        if (phoneError) {
            toast.error(phoneError)
            return
        }



        const formData = new FormData()

        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto)
        }
        if (input.resume) {
            formData.append("resume", input.resume)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }



    }


    const fileChangeHandler = (e) => {
        const { name, files } = e.target;
        const file = files?.[0];

        if (!file) return;

        // 5 MB limit
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            e.target.value = "";
            return;
        }

        // Profile photo validation
        if (name === "profilePhoto") {
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file");
                e.target.value = "";
                return;
            }

            const imageUrl = URL.createObjectURL(file);

            setSelectedImage(imageUrl);
            setCropOpen(true);

            return;


        }

        // Resume validation
        if (name === "resume") {
            if (file.type !== "application/pdf") {
                toast.error("Resume must be a PDF file");
                e.target.value = "";
                return;
            }

            setResumeName(file.name);
        }

        setInput(prev => ({
            ...prev,
            [name]: file
        }));
    };



    return (

        <div>

            {/*  UPDATE PROFILE DIALOG  */}

            <Dialog
                open={open}
                onOpenChange={(value) => {

                    if (viewPhotoOpenRef.current) {
                        return
                    }
                    setOpen(value)

                }}
            >

                <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col">

                    <DialogHeader>

                        <DialogTitle className="text-2xl font-bold">
                            Update Profile
                        </DialogTitle>

                    </DialogHeader>


                    <form onSubmit={submitHandler}
                    className="flex flex-col min-h-0"
                    >

                       <div className="space-y-5 py-4 overflow-y-auto pr-2 min-h-0">


                            {/*  PROFILE PHOTO  */}

                            <div className="flex justify-start">

                                <div className="relative">

                                    {/* Hidden file input */}

                                    <input
                                        ref={profilePhotoInputRef}
                                        id="profilePhoto"
                                        name="profilePhoto"
                                        type="file"
                                        accept="image/*"
                                        onChange={fileChangeHandler}
                                        className="hidden"
                                    />


                                    <Avatar className="h-24 w-24 border">

                                        <AvatarImage
                                            src={profilePreview}
                                            className="object-cover"
                                        />

                                        <AvatarFallback className="font-bold text-2xl">
                                            {user?.fullname?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>

                                    </Avatar>


                                    {/* CAMERA BUTTON  */}

                                    <Popover
                                        open={photoPopoverOpen}
                                        onOpenChange={setPhotoPopoverOpen}
                                    >

                                        <PopoverTrigger asChild>

                                            <button
                                                type="button"
                                                className="
                                                    absolute
                                                    bottom-0
                                                    right-0
                                                    h-8
                                                    w-8
                                                    rounded-full
                                                    bg-black/50
                                                    text-white
                                                    flex
                                                    items-center
                                                    justify-center
                                                    border
                                                    border-white
                                                    hover:bg-black/70
                                                    transition
                                                "
                                            >

                                                <Camera size={15} />

                                            </button>

                                        </PopoverTrigger>


                                        <PopoverContent
                                            align="start"
                                            sideOffset={8}
                                            className="w-52 rounded-xl p-2"
                                        >

                                            <div className="flex flex-col">


                                                {/* View Profile Photo */}

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPhotoPopoverOpen(false)
                                                        viewPhotoOpenRef.current = true;
                                                        setViewPhotoOpen(true)
                                                    }}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-md
                                                        px-3
                                                        py-2.5
                                                        text-gray-700
                                                        hover:bg-gray-100
                                                        transition-colors
                                                        text-left
                                                    "
                                                >

                                                    <Eye size={16} />

                                                    <span>
                                                        View Profile Photo
                                                    </span>

                                                </button>


                                                {/* Update Profile Photo */}

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPhotoPopoverOpen(false)
                                                        profilePhotoInputRef.current?.click()
                                                    }}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-md
                                                        px-3
                                                        py-2.5
                                                        text-gray-700
                                                        hover:bg-gray-100
                                                        transition-colors
                                                        text-left
                                                    "
                                                >

                                                    <Camera size={16} />

                                                    <span>
                                                        Update Profile Photo
                                                    </span>

                                                </button>

                                            </div>

                                        </PopoverContent>

                                    </Popover>

                                </div>

                            </div>


                            {/*  NAME  */}

                            <div className="space-y-2">

                                <Label
                                    htmlFor="name"
                                    className="text-right font-medium"
                                >
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />

                            </div>


                            {/*  EMAIL */}

                            <div className="space-y-2">

                                <Label
                                    htmlFor="email"
                                    className="text-right font-medium"
                                >
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />

                            </div>


                            {/*  PHONE  */}

                            <div className="space-y-2">

                                <Label
                                    htmlFor="number"
                                    className="text-right font-medium"
                                >
                                    Number
                                </Label>

                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    placeholder="Enter phone number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />

                            </div>


                            {/*  BIO  */}

                            <div className="space-y-2">

                                <Label
                                    htmlFor="bio"
                                    className="text-right font-medium"
                                >
                                    Bio
                                </Label>

                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="resize-none"
                                />

                            </div>


                            {/* SKILLS */}

                            {user?.role === "student" && (

                                <div className="space-y-2">

                                    <Label
                                        htmlFor="skills"
                                        className="text-right font-medium"
                                    >
                                        Skills
                                    </Label>

                                    <Input
                                        id="skills"
                                        name="skills"
                                        placeholder="React, Node.js, MongoDB"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className="col-span-3"
                                    />

                                </div>

                            )}


                            {/*  RESUME */}

                            {user?.role === "student" && (

                                <div className="space-y-2">

                                    <Label
                                        htmlFor="resume"
                                        className="font-medium"
                                    >
                                        Resume
                                    </Label>

                                    <Input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                    />

                                    <p className="text-xs text-gray-500">

                                        {resumeName
                                            ? `Selected: ${resumeName}`
                                            : "Upload PDF only (Max 5MB)"}

                                    </p>

                                </div>

                            )}

                        </div>


                        {/* FOOTER  */}

                       <DialogFooter className="shrink-0 border-t pt-4">

                            {loading ? (

                                <Button
                                    disabled
                                    className="w-full mt-6 bg-[#2563EB] hover:bg-[#1D4ED8]"
                                >

                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                    Please wait

                                </Button>

                            ) : (

                                <Button
                                    type="submit"
                                    className="w-full mt-6 bg-[#2563EB] hover:bg-[#1D4ED8]"
                                >
                                    Update
                                </Button>

                            )}

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>


            {/* ================= VIEW PROFILE PHOTO DIALOG ================= */}

            <Dialog
                open={viewPhotoOpen}
                onOpenChange={(value) => {
                    setViewPhotoOpen(value)

                    if (!value) {
                        setTimeout(() => {
                            viewPhotoOpenRef.current = false;
                        }, 0);
                    }


                }}
            >

                <DialogContent className="sm:max-w-[450px]">

                    <DialogHeader>

                        <DialogTitle className="text-xl font-bold">
                            Profile Photo
                        </DialogTitle>

                    </DialogHeader>


                    <div className="flex justify-center py-4">

                        <Avatar className="h-80 w-80 border">

                            <AvatarImage
                                src={profilePreview}
                                className="object-cover"
                            />

                            <AvatarFallback className="font-bold text-6xl">

                                {user?.fullname?.charAt(0)?.toUpperCase()}

                            </AvatarFallback>

                        </Avatar>

                    </div>

                </DialogContent>

            </Dialog>

            {/* ProfilePhotoCropper  */}
            <ProfilePhotoCropper

                image={selectedImage}
                open={cropOpen}
                setOpen={setCropOpen}
                onCropComplete={(croppedFile) => {

                    setInput((prev) => ({
                        ...prev,
                        profilePhoto: croppedFile
                    }));

                    setProfilePreview(URL.createObjectURL(croppedFile));
                }}

            />



        </div>
    )
}

export default UpdateProfileDialog



