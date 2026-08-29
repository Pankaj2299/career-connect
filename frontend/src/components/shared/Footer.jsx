import {
    BriefcaseBusiness,
    Mail,
    Phone,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterSkeleton from "../skeleton/FooterSkeleton";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const { user ,loading } = useSelector((state) => state.auth);

    const isStudent = user?.role === "student";
    const isRecruiter = user?.role === "recruiter";
    const isGuest = !user;

    // Guest = 4 columns
    // Student / Recruiter = 3 columns
    const gridColumns = isGuest
        ? "lg:grid-cols-4"
        : "lg:grid-cols-3";

        if(loading) {
            return <FooterSkeleton/>
        }

    return (
        <footer className="bg-[#F8FAFC] border-t border-gray-200 text-gray-600">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">

                {/* ================= Main Footer ================= */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns} gap-10 lg:gap-16`}
                >

                    {/* ================= Logo & Description ================= */}
                    <div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2"
                        >
                            <BriefcaseBusiness className="h-8 w-8 text-[#2563EB]" />

                            <h2 className="text-2xl font-bold text-[#111827]">
                                Career
                                <span className="text-[#2563EB]">
                                    Connect
                                </span>
                            </h2>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">
                            Connecting talented people with the right
                            opportunities. Discover jobs, connect with top
                            companies, and build your career with confidence.
                        </p>

                    </div>


                    {/* ================= Job Seekers ================= */}
                    {(isGuest || isStudent) && (
                        <div>

                            <h3 className="mb-4 text-lg font-semibold text-[#111827]">
                                Job Seekers
                            </h3>

                            <ul className="space-y-3 text-sm">

                                <li>
                                    <Link
                                        to="/all-jobs"
                                        className="transition-colors hover:text-[#2563EB]"
                                    >
                                        Browse Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/browse"
                                        className="transition-colors hover:text-[#2563EB]"
                                    >
                                        Companies
                                    </Link>
                                </li>

                                {user && (
                                    <>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Applied Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/profile"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Saved Jobs
                                            </Link>
                                        </li>
                                    </>
                                )}

                            </ul>

                        </div>
                    )}


                    {/* ================= Employers ================= */}
                    {(isGuest || isRecruiter) && (
                        <div>

                            <h3 className="mb-4 text-lg font-semibold text-[#111827]">
                                Employers
                            </h3>

                            <ul className="space-y-3 text-sm">

                                {user ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/recruiter/jobs/create"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Post a Job
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/recruiter/jobs"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Manage Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/recruiter/jobs"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                View Applicants
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/recruiter/companies"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Recruit Talent
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/login"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Post a Job
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/login"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Manage Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/login"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                View Applicants
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/login"
                                                className="transition-colors hover:text-[#2563EB]"
                                            >
                                                Recruit Talent
                                            </Link>
                                        </li>
                                    </>
                                )}

                            </ul>

                        </div>
                    )}


                    {/* ================= Contact ================= */}
                    <div>

                        <h3 className="mb-4 text-lg font-semibold text-[#111827]">
                            Contact
                        </h3>

                        <div className="space-y-4 text-sm">

                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-[#2563EB]" />

                                <span className="break-all">
                                    support@careerconnect.com
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-[#2563EB]" />

                                <span>
                                    +91 99999 88888
                                </span>
                            </div>


                            {/* Social Icons */}
                            <div className="flex items-center gap-4 pt-3">

                                <a
                                    href="https://github.com/Pankaj2299"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <FaGithub
                                        className="h-5 w-5 transition-all duration-300 hover:scale-110 hover:text-[#2563EB]"
                                    />
                                </a>

                                <a
                                    href="https://linkedin.com/in/pankaj-kumar-4b3276266"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin
                                        className="h-5 w-5 transition-all duration-300 hover:scale-110 hover:text-[#2563EB]"
                                    />
                                </a>

                                <a
                                    href="mailto:pankajkumar199922@gmail.com"
                                    aria-label="Email"
                                >
                                    <Mail
                                        className="h-5 w-5 transition-all duration-300 hover:scale-110 hover:text-[#2563EB]"
                                    />
                                </a>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= Divider ================= */}
                <div className="my-8 border-t border-gray-300" />


                {/* ================= Bottom Footer ================= */}
                <div className="flex flex-col gap-5 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

                    <p className="text-center md:text-left">

                        © {currentYear}{" "}

                        <span className="font-semibold text-[#111827]">
                            Career
                            <span className="text-[#2563EB]">
                                Connect
                            </span>
                        </span>

                        . All rights reserved.

                    </p>


                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">

                        <Link
                            to="/"
                            className="transition-colors hover:text-[#2563EB]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/"
                            className="transition-colors hover:text-[#2563EB]"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            to="/"
                            className="transition-colors hover:text-[#2563EB]"
                        >
                            About Us
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;





    