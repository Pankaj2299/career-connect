import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetSearchedQuery } from '@/redux/jobSlice';



function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(SetSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className="max-w-6xl mx-auto px-4">
                <div className='flex flex-col gap-5 pt-14 md:pt-16 pb-8'>
                    <span className="mx-auto px-5 py-2 rounded-full bg-blue-50 text-[#2563EB] font-semibold border border-blue-100">No. 1 Job Hunt Website</span>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl'>Find Your Dream Job <br />With  <span className='text-[#2563EB]'>Career Connect</span></h1>
                    <p className='max-w-2xl mx-auto text-gray-600 leading-7'>Find thousands of verified jobs, connect with top companies, and take the next step toward your dream career.</p>
                    <div className="flex items-center w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-full shadow-md px-2 py-2">
                        <input
                            type="text"
                            value={query}
                            placeholder="Search by job title, keyword or company"
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 px-4 py-3 text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
                        />
                        <Button
                            onClick={searchJobHandler}
                            aria-label="Search jobs"
                            className="h-12 w-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>


                </div>

            </div>
        </div>
    )

}

export default HeroSection
