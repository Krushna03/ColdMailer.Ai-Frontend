// import { GoSidebarCollapse } from "react-icons/go";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0d0e12]/50 py-4 mt-6 backdrop-blur-xl">
      {/* <div>
        <GoSidebarCollapse className="h-6 w-6 text-gray-400 ml-5" />
      </div> */}
      <div className=" flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-500">
          © 2025 Cold Mailer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

