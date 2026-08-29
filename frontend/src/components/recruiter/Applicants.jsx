import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from "@/redux/applicationSlice"
import TableSkeleton from '../skeleton/TableSkeleton';

const Applicants = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { applicants } = useSelector(state => state.application);

    useEffect(() => {

        const fetchAllApplicants = async () => {

            setLoading(true)

            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);


    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6">
                <TableSkeleton />
            </div>
        )
    }

    return (
         <div className="min-h-screen bg-gray-50 py-6">

            <div className="max-w-7xl mx-auto px-4">

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Applicants
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        {applicants?.applications?.length || 0} applicants have applied for this job.
                    </p>

                </div>

                <ApplicantsTable />

            </div>

        </div>
    )
}

export default Applicants
