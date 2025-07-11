import { useContext, useState } from 'react';
import { EmailInput } from './email-input';
import { EmailOutput } from './email-output';
import { useToast } from "../hooks/use-toast";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSidebarContext } from '../context/SidebarContext';
import { handleLogout, isTokenExpired } from '../Helper/tokenValidation';

const url = import.meta.env.VITE_BASE_URL

export function EmailGenerator({ emailGenerated }) {
    const [prompt, setPrompt] = useState("");
    const [generatedEmail, setGeneratedEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bottomPrompt, setBottomPrompt] = useState("");
    const [showOutput, setShowOutput] = useState(false);
    const [emailId, setEmailId] = useState("")
    const { toast } = useToast();
    const { updateSidebar, setUpdateSidebar } = useSidebarContext()
    const token = JSON.parse(localStorage.getItem('token')) || null;

    const user = useSelector(state => state.auth.userData)
    const userId = user?.userData?._id

    const generateEmail = async (e) => {
      e.preventDefault();
      setShowOutput(true); 
      setLoading(true);
      setError(null);
      emailGenerated(true);

      if (!token) {
        handleLogout("No authentication token found.");
        return;
      }
  
      if (isTokenExpired(token)) {
        handleLogout("Session expired. Please log in again.");
        return;
      }

      try {
        const response = await axios.post(`${url}/api/v1/email/generate-email`, { prompt, userId }, 
          { 
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setGeneratedEmail(response.data.fullEmail);
          setEmailId(response.data.emailId)
          setUpdateSidebar(!updateSidebar)
      } else {
          throw new Error(response.data.error || 'Failed to generate email');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        toast({
          title: "Error Occurred !!",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };


    const updateEmail = async () => {
      if (!bottomPrompt) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(`${url}/api/v1/email/update-email`, {
          baseEmail: generatedEmail,
          modifications: bottomPrompt,
          emailId
        }, {
          withCredentials: true
        });
        if (response.data.success) {
          setGeneratedEmail(response.data.updatedEmail);
        } else {
          throw new Error(response.data.error || 'Failed to update email');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setBottomPrompt("");
        setLoading(false);
      }
    };


  return (
    <div className="w-full max-w-[1400px] mx-auto relative h-full z-10 -top-6 sm:-top-4">
        <div 
          className={`
            w-full z-10
            transition-all duration-500 ease-in-out
            ${showOutput ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}
            absolute top-[20%] left-0
          `}
        >
          <EmailInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={generateEmail}
          />
        </div>

        <div 
          className={`
            w-full h-full mt-6 pb-8 z-10
            transition-all duration-500 ease-in-out overflow-y-auto custom-scroll
            ${showOutput ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}
            absolute top-0 left-0 bottom-0
          `}
        >
          <EmailOutput
            prompt={prompt}
            generatedEmail={generatedEmail}
            bottomPrompt={bottomPrompt}
            setBottomPrompt={setBottomPrompt}
            onUpdate={updateEmail}
            loading={loading}
            onBack={() => {
              setShowOutput(false);
              setGeneratedEmail("");
              emailGenerated(false);
              setPrompt("")
              setError("")
            }}
          />
      </div>

      {/* {error && (
        <div className="text-red-400 text-center mt-4 p-4 rounded-lg bg-red-500/10 backdrop-blur-sm z-50">
          {error}
        </div>
      )} */}

      {/* <Toaster /> */}
    </div>
  );
}

