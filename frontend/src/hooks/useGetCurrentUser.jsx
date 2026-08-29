import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser,setLoading } from "@/redux/authSlice";

const useGetCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {

            dispatch(setLoading(true))

            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/profile`,
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                // User login nahi hai to kuch nahi karna
                dispatch(setUser(null));
            } finally{
                dispatch(setLoading(false))
            }
        };

        fetchCurrentUser();
    }, [dispatch]);
};

export default useGetCurrentUser;
