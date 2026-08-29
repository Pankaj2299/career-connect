import { SetAllRecruiterJobs,SetLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllRecruiterJobs = ()=> {

    const dispatch = useDispatch()

    useEffect( () => {

        const fetchAllRecruiterJobs = async () => {
      
            dispatch(SetLoading(true))
            
            try {

                const res = await axios.get(`${JOB_API_END_POINT}/getrecruiterjobs`,{withCredentials:true})


                if(res.data.success){
                 
                    dispatch(SetAllRecruiterJobs(res.data.jobs))
                }
          
            } catch (error) {
                console.log(error)
              
            } finally{
             dispatch(SetLoading(false))
            }
        }
        fetchAllRecruiterJobs()

    },[])
  
}

export default useGetAllRecruiterJobs
