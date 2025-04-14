import { useState } from 'react';
import { Copy, CopyCheckIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TiArrowBack } from "react-icons/ti";
import { useSelector } from 'react-redux';


export function EmailOutput({
  prompt,
  generatedEmail,
  bottomPrompt,
  setBottomPrompt,
  onUpdate,
  loading,
  onBack
}) {
  
  const [copied, setCopied] = useState(false);

  const user = useSelector(state => state.auth.userData)
  let userInitial = user?.userData?.username 
  userInitial = userInitial?.slice(0, 1)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="flex flex-col sm:flex sm:flex-row gap-8 P-2 mt-6 sm:mt-1">

        <div className="sm:w-[65%] flex flex-col mt-9 sm:mt-0">
          
          <div className="sm:hidden mt-2 mb-3 sm:mb-0 overflow-y-auto custom-scroll max-h-[350px] sm:h-[490px]">
            <p className="bg-[#0d0e12] shadow-xl text-sm sm:text-lg font-normal text-gray-100 py-2 p-4 rounded-md">
            <span className='bg-[#482b9e] px-2 py-1 sm:px-3 sm:py-1 mr-1 rounded-full text-sm sm:text-lg -ml-2'>{userInitial?.toUpperCase()}</span> {prompt}
            </p>
          </div>
          
          <div className="flex justify-between items-center sm:justify-start">
            {!loading && (
              <Button onClick={copyToClipboard} className="px-2 bg-none text-xs sm:text-base">
                {copied ? (
                  <>
                    Copied <CopyCheckIcon className="mt-1 h-2 w-2 sm:w-4 sm:h-4 text-gray-200" />
                  </>
                ) : (
                  <>
                    Copy <Copy className="mt-1 h-2 w-2 sm:w-4 sm:h-4 p-0" />
                  </>
                )}
              </Button>
            )}

            <Button 
              onClick={onBack}
              variant="outline" 
              className="sm:hidden bg-gray-950 hover:bg-gray-950 text-gray-300 hover:text-gray-200 px-1 h-5 text-xs"
            >
              <TiArrowBack className='h-2 w-2 sm:w-4 sm:h-4' />
              Back to Input
            </Button>
          </div>

          <div className="bg-gray-300 p-4 rounded-lg w-full min-h-[300px] sm:h-[610px] overflow-y-auto custom-scroll relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-900" />
                  <p className="text-blue-900 font-medium">Generating your email...</p>
                </div>
              </div>
            ) : (
              <pre className="text-black whitespace-pre-wrap text-xs sm:text-base">{generatedEmail}</pre>
            )}
          </div>

        </div>

        <div className="w-full sm:w-[35%] relative">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="hidden sm:flex mt-10 mb-1 bg-gray-950 hover:bg-gray-950 text-gray-300 hover:text-gray-200 px-3 h-8 text-xs"
          >
            <TiArrowBack className='w-4 h-4' />
            Back to Input
          </Button>
          
          <div className="hidden sm:block mt-2 overflow-y-auto custom-scroll max-h-[350px] sm:h-[490px]">
            <p className="bg-[#0d0e12] shadow-xl text-sm sm:text-lg font-normal text-gray-100 py-2 p-4 rounded-md">
            <span className='bg-[#482b9e] px-2 py-1 sm:px-3 sm:py-1 mr-1 rounded-full text-sm sm:text-lg -ml-2'>{userInitial?.toUpperCase()}</span> {prompt}
            </p>
            <div className="hidden sm:block mt-1 rounded-md text-gray-300 p-2 bg-[#0d0e12] text-sm font-normal">
              <p>Want to refine your email further? Use the input below to specify any additional requirements or modifications.</p>
            </div>
          </div>

          <div className="absolute sm:bottom-0 w-full">
            <Textarea
              placeholder="Add any specific requirements or modifications..."
              className="bg-[#0d0e12] w-full py-2 px-3 text-white max-h-48 placeholder:text-sm sm:text-xl border border-gray-400 rounded-xl sm:placeholder:text-base placeholder:font-medium placeholder:text-gray-500 focus:outline-blue-800 resize-none custom-scroll"
              value={bottomPrompt}
              onChange={(e) => {
                setBottomPrompt(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />

            <button
              className={`w-full py-1 text-gray-200 rounded-lg ${!bottomPrompt ? 'bg-[#2e137a] text-gray-300' : 'bg-[#3b1cab] text-gray-50'} text-sm sm:text-lg font-normal mt-2 mb-6 sm:mb-0`}
              onClick={onUpdate}
              disabled={!bottomPrompt}
            >
              Update Email
            </button>
          </div>
        </div>
        
      </div>
  );
}