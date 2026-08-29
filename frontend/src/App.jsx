import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Home from './components/Home'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import VerifyResetOtp from './components/auth/VerifyResetOtp'
import ResetPassword from './components/auth/ResetPassword'
import Signup from './components/auth/Signup'
import VerifyEmail from './components/auth/VerifyEmail'
import AllJobs from './components/jobs/AllJobs'
import JobDescription from './components/jobs/JobDescription '
import Browse from './components/jobs/Browse'
import Profile from './components/profile/Profile'
import Companies from './components/recruiter/Companies'
import ProtectedRoute from './components/recruiter/ProtectedRoute'
import CompanyCreate from './components/recruiter/CompanyCreate'
import CompanySetup from './components/recruiter/CompanySetup'
import RecruiterJobs from './components/recruiter/RecruiterJobs'
import PostJob from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import EditJob from './components/recruiter/EditJob'
import useGetCurrentUser from './hooks/useGetCurrentUser'






const Approuter = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[

       {
 path:"",
 element:<Home/>
},

  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/verify-reset-otp",
    element:<VerifyResetOtp/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
  },

  {
    path:"/signup",
    element:<Signup/>

  },
  {
    path:"/verify-email",
    element:<VerifyEmail/>

  },
  {
    path:"/all-jobs",
    element:<AllJobs/>
    
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
    
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },

  // Recruiter routes

  {
    path:"/recruiter/companies",
    element:<ProtectedRoute>
      <Companies/>
    </ProtectedRoute>
  },
  {
    path:"/recruiter/companies/create",
    element:<ProtectedRoute>
      <CompanyCreate/>
    </ProtectedRoute> 
      
  },
  {
    path:"/recruiter/companies/:id",
    element: <ProtectedRoute>
      <CompanySetup/>
    </ProtectedRoute>

  },
  {
    path:"/recruiter/jobs",
    element:<ProtectedRoute> 
    <RecruiterJobs/>
    </ProtectedRoute>
  },
  {
    path:"/recruiter/jobs/create",
    element:<ProtectedRoute>
      <PostJob/>
      </ProtectedRoute>
  },
  {
    path:"/recruiter/jobs/:id/applicants",
    element:<ProtectedRoute>
      <Applicants/>
      </ProtectedRoute>
  },
  {
    path:"/recruiter/jobs/:id",
    element:<ProtectedRoute>
      <EditJob/>
      </ProtectedRoute>
  },

    ]
  }
 
])


function App() {
  
  useGetCurrentUser()

  return (
    <>
   
    <RouterProvider router={Approuter}/>
    
    </>
    
     
  )
}

export default App
