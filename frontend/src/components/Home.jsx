import React, { useEffect } from 'react'
import HeroSection from './jobs/HeroSection'
import CategoryCarousel from './jobs/CategoryCarousel'
import LatestJobs from './jobs/LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
  useGetAllJobs()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter/companies", {replace:true})
    }
  }, [user,navigate])

  return (
    
  <div className="w-full max-w-full overflow-x-hidden">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />

    </div>
  )
}

export default Home
