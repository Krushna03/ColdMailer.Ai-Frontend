import React, { useEffect, useState } from 'react'
import { MovingDots } from '../components/moving-dots';
import { Header } from '../components/Header';
import { EmailGenerator } from '../components/email-generator';
import { Footer } from '../components/Footer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, logout } from '../context/authSlice';
import { useToast } from '../hooks/use-toast';
import { GoSidebarCollapse } from "react-icons/go";

export const GenerateEmail = () => {

  const [generatedEmail, setGeneratedEmails] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const url = import.meta.env.VITE_BASE_URL

  const token = JSON.parse(localStorage.getItem('token')) || null;

  // console.log(sidebarActive);
  
  const validateANDFetchUser = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/user/getCurrentUser`,
        {
          headers: {Authorization: `Bearer ${token}`}
        },
        {
        withCredentials: true
        }
      )
      
    if (response && response.data) {
        dispatch(login({ 
            userData: response.data?.data,
        }))
      }
    } catch (error) {
      console.error("Error while validating token:", error);
      dispatch(logout());
      
      toast({
          title: "Authentication Error",
          description: error.response?.data?.message || "Please log in again",
          variant: "destructive"
      });
      navigate('/sign-in')
    }
  } 

  useEffect(() => {
    if (token) {
      validateANDFetchUser()
    }
}, [dispatch])
  
  return (
    <>
    {/* Sidebar Toggle Button */}
    <div
      className="cursor-pointer fixed left-0 w-8 h-full z-50 md:flex items-end justify-center hidden"
      onMouseOver={() => setSidebarActive(true)}
    >
      <GoSidebarCollapse className="h-6 w-6 text-gray-400" />
    </div>
  
    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#1f1f28] text-white z-40 transform transition-transform duration-300 ${
        sidebarActive ? "translate-x-0" : "-translate-x-full"
      }`}
      onMouseLeave={() => setSidebarActive(false)}
    >
      <div className="p-4 font-semibold text-lg border-b border-gray-700">Sidebar</div>
      <ul className="p-4 space-y-4">
        <li className="hover:text-purple-400 cursor-pointer">Option 1</li>
        <li className="hover:text-purple-400 cursor-pointer">Option 2</li>
        <li className="hover:text-purple-400 cursor-pointer">Option 3</li>
      </ul>
    </div>
  
    {/* Main Content */}
    <div className="h-screen overflow-y-hidden flex flex-col relative bg-[#0d0e12]">
      {/* Background glow */}
      <div className="absolute top-20 -left-14 w-1/2 h-48 bg-[#6f34ed] opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-1/2 h-40 bg-[#6f34ed] opacity-30 blur-3xl"></div>
  
      <MovingDots />
      <Header />
      <main className="z-50 flex-1 flex sm:flex-col items-center justify-center px-4">
        <EmailGenerator emailGenerated={setGeneratedEmails} />
      </main>
  
      {!generatedEmail && <Footer />}
    </div>
  </>
  
  )
}

export default GenerateEmail