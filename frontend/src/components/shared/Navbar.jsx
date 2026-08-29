import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage, } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Building2, BriefcaseBusiness, Search, Home, Menu, } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";
import UpdateProfileDialog from "../profile/UpdateProfileDialog";


function Navbar() {

    const { user, loading } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);

    const [updateProfileOpen, setUpdateProfileOpen] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // ================= Logout =================

    const logoutHandler = async () => {

        setOpen(false);

        try {

            const res = await axios.get(
                `${USER_API_END_POINT}/logout`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {

                dispatch(setUser(null));

                navigate("/");

                toast.success(res.data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Logout failed."
            );

        }
    };


    if (loading) {
        return <NavbarSkeleton />;
    }


    return (

        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

            <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">



                {/* LOGO */}


                <div>

                    <Link to="/">

                        <h1 className="text-2xl font-bold">

                            Career
                            <span className="text-[#2563EB]">
                                Connect
                            </span>

                        </h1>

                    </Link>

                </div>




                {/* RIGHT SECTION */}


                <div className="flex items-center justify-center gap-12">


                    {/* DESKTOP NAVIGATION */}



                    <ul className="hidden md:flex items-center font-medium gap-6">


                        {/*  Recruiter  */}

                        {
                            user?.role === "recruiter" ? (

                                <>

                                    <li>

                                        <NavLink
                                            to="/recruiter/companies"
                                            className={({ isActive }) =>
                                                `transition-colors ${isActive
                                                    ? "text-[#2563EB]"
                                                    : "text-[#111827]"
                                                } duration-200 hover:text-[#2563EB]`
                                            }
                                        >
                                            Companies
                                        </NavLink>

                                    </li>


                                    <li>

                                        <NavLink
                                            to="/recruiter/jobs"
                                            className={({ isActive }) =>
                                                `transition-colors ${isActive
                                                    ? "text-[#2563EB]"
                                                    : "text-[#111827]"
                                                } duration-200 hover:text-[#2563EB]`
                                            }
                                        >
                                            Jobs
                                        </NavLink>

                                    </li>

                                </>

                            ) : (

                                /*  Student / Guest  */

                                <>

                                    <li>

                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                `transition-colors ${isActive
                                                    ? "text-[#2563EB]"
                                                    : "text-[#111827]"
                                                } duration-200 hover:text-[#2563EB]`
                                            }
                                        >
                                            Home
                                        </NavLink>

                                    </li>


                                    <li>

                                        <NavLink
                                            to="/all-jobs"
                                            className={({ isActive }) =>
                                                `transition-colors ${isActive
                                                    ? "text-[#2563EB]"
                                                    : "text-[#111827]"
                                                } duration-200 hover:text-[#2563EB]`
                                            }
                                        >
                                            Jobs
                                        </NavLink>

                                    </li>


                                    <li>

                                        <NavLink
                                            to="/browse"
                                            className={({ isActive }) =>
                                                `transition-colors ${isActive
                                                    ? "text-[#2563EB]"
                                                    : "text-[#111827]"
                                                } duration-200 hover:text-[#2563EB]`
                                            }
                                        >
                                            Browse
                                        </NavLink>

                                    </li>

                                </>

                            )
                        }

                    </ul>




                    {/* GUEST */}


                    {
                        !user ? (

                            <>


                                {/*  Desktop Guest  */}

                                <div className="hidden md:flex items-center gap-2">

                                    <Link to="/login">

                                        <Button
                                            variant="outline"
                                            className="rounded-lg"
                                        >
                                            Login
                                        </Button>

                                    </Link>


                                    <Link to="/signup">

                                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                                            Signup
                                        </Button>

                                    </Link>

                                </div>



                                {/*  Mobile Guest  */}

                                <div className="md:hidden">

                                    <Popover
                                        open={open}
                                        onOpenChange={setOpen}
                                    >

                                        <PopoverTrigger asChild>

                                            <button
                                                type="button"
                                                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                                            >

                                                <Menu
                                                    size={24}
                                                    className="text-gray-700"
                                                />

                                            </button>

                                        </PopoverTrigger>


                                        <PopoverContent
                                            align="end"
                                            className="w-64 rounded-xl border shadow-lg p-2"
                                        >

                                            {/* Guest Navigation */}

                                            <div className="flex flex-col">


                                                {/* Home */}

                                                <Link
                                                    to="/"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >

                                                    <Home size={19} />

                                                    <span>
                                                        Home
                                                    </span>

                                                </Link>


                                                {/* Jobs */}

                                                <Link
                                                    to="/all-jobs"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >

                                                    <BriefcaseBusiness size={19} />

                                                    <span>
                                                        Jobs
                                                    </span>

                                                </Link>


                                                {/* Browse */}

                                                <Link
                                                    to="/browse"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >

                                                    <Search size={19} />

                                                    <span>
                                                        Browse
                                                    </span>

                                                </Link>


                                                <div className="my-2 border-t border-gray-200" />


                                                {/* Login */}

                                                <Link
                                                    to="/login"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center justify-center rounded-md px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    Login
                                                </Link>


                                                {/* Signup */}

                                                <Link
                                                    to="/signup"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center justify-center rounded-md px-3 py-2.5 bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors mt-1"
                                                >
                                                    Signup
                                                </Link>

                                            </div>

                                        </PopoverContent>

                                    </Popover>

                                </div>

                            </>

                        ) : (



                            //    LOGGED-IN USER


                            <Popover
                                open={open}
                                onOpenChange={setOpen}
                            >

                                <PopoverTrigger asChild>

                                    <button
                                        type="button"
                                        className="rounded-full outline-none"
                                    >

                                        <Avatar className="cursor-pointer">

                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                            />

                                            <AvatarFallback className="font-bold text-xl">

                                                {user?.fullname
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}

                                            </AvatarFallback>

                                        </Avatar>

                                    </button>

                                </PopoverTrigger>


                                <PopoverContent
                                    align="end"
                                    onCloseAutoFocus={(e) => e.preventDefault()}
                                    className="w-80 rounded-xl border shadow-lg p-4"
                                >



                                    {/* USER INFORMATION */}


                                    <div className="flex gap-3 items-start">

                                        <Avatar>

                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                            />

                                            <AvatarFallback className="font-bold text-xl">

                                                {user?.fullname
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}

                                            </AvatarFallback>

                                        </Avatar>


                                        <div className="min-w-0">

                                            <h4 className="font-medium truncate">
                                                {user?.fullname}
                                            </h4>


                                            {/* Student = Bio
                                                Recruiter = Recruiter */}

                                            {
                                                user?.role === "student" ? (

                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {user?.profile?.bio ||
                                                            "No bio added"}
                                                    </p>

                                                ) : (
                                                    user?.role === "recruiter" && ( 

                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {user?.profile?.bio 
                                                         || "No bio added"
                                                        }
                                                       
                                                    </p>
                                                    )
                                                )
                                            }

                                        </div>

                                    </div>




                                    {/* MOBILE NAVIGATION */}


                                    <div className="md:hidden border-b border-gray-200 my-3 pb-3">


                                        {/* Recruiter  */}

                                        {
                                            user?.role === "recruiter" ? (

                                                <>


                                                    {/* Companies */}

                                                    <Link
                                                        to="/recruiter/companies"
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-center gap-3 rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >

                                                        <Building2 size={19} />

                                                        <span>
                                                            Companies
                                                        </span>

                                                    </Link>


                                                    {/* Jobs */}

                                                    <Link
                                                        to="/recruiter/jobs"
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-center gap-3 rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >

                                                        <BriefcaseBusiness size={19} />

                                                        <span>
                                                            Jobs
                                                        </span>

                                                    </Link>

                                                </>

                                            ) : (

                                                /*  Student  */

                                                <>





                                                    {/* Home */}

                                                    <Link
                                                        to="/"
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-center gap-3 rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >

                                                        <Home size={19} />

                                                        <span>
                                                            Home
                                                        </span>

                                                    </Link>


                                                    {/* Jobs */}

                                                    <Link
                                                        to="/all-jobs"
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-center gap-3 rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >

                                                        <BriefcaseBusiness size={19} />

                                                        <span>
                                                            Jobs
                                                        </span>

                                                    </Link>


                                                    {/* Browse */}

                                                    <Link
                                                        to="/browse"
                                                        onClick={() => setOpen(false)}
                                                        className="flex items-center gap-3 rounded-md px-2 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >

                                                        <Search size={19} />

                                                        <span>
                                                            Browse
                                                        </span>

                                                    </Link>

                                                </>

                                            )
                                        }

                                    </div>




                                    {/* PROFILE + LOGOUT */}


                                    <div className="flex flex-col text-gray-600">


                                        {/* Student Profile */}

                                        {
                                            user?.role === "student" && (

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-gray-100 transition-colors"
                                                >

                                                    <User2 size={20} />

                                                    <span>
                                                        View Profile
                                                    </span>

                                                </Link>

                                            )
                                        }

                                        {/* Update Profile */}

                                        {
                                            user?.role === "recruiter" && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setUpdateProfileOpen(true);
                                                    }}
                                                    className="w-full flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-gray-100 transition-colors text-left"
                                                >
                                                    <User2 size={20} />

                                                    <span>
                                                        Update Profile
                                                    </span>
                                                </button>
                                            )
                                        }




                                        {/* Logout */}

                                        <button
                                            type="button"
                                            onClick={logoutHandler}
                                            className="w-full flex text-red-600 items-center gap-3 rounded-md px-2 py-2.5 cursor-pointer hover:bg-red-100 transition-colors text-left"
                                        >

                                            <LogOut size={20} />

                                            <span>
                                                Logout
                                            </span>

                                        </button>

                                    </div>


                                </PopoverContent>

                            </Popover>

                        )
                    }

                </div>

            </div>

            {/* Update Profile Dialog */}

            <UpdateProfileDialog
                open={updateProfileOpen}
                setOpen={setUpdateProfileOpen}
            />


        </div>

    );

}

export default Navbar;








