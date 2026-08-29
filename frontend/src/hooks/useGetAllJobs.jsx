import { SetAllJobs,SetLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = ()=> {

    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(state => state.job)

    useEffect( () => {

        const fetchAllJobs = async () => {
      
            dispatch(SetLoading(true))

            try {

                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})

                if(res.data.success){
                 
                    dispatch(SetAllJobs(res.data.jobs))
                }
          
            } catch (error) {
                console.log(error)
                
            } finally{
             dispatch(SetLoading(false))
            }
        }
        fetchAllJobs()

    },[])
  
}

export default useGetAllJobs
