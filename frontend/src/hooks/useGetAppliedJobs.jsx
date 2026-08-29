import { SetAllAppliedJobs,SetLoading } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {

            dispatch(SetLoading(true))

            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                
                if(res.data.success){
                    dispatch(SetAllAppliedJobs(res.data.applications));
                }
            } catch (error) {

                console.log(error);

            } finally {
               dispatch(SetLoading(false))
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;