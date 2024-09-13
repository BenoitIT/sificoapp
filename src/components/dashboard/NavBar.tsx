import {  EnvelopeClosedIcon, ZoomOutIcon } from "@radix-ui/react-icons"
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
    return (
        <div className='flex items-center justify-between p-4'>
            <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
                <ZoomOutIcon className='w-4 h-4 text-gray-500' />
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
            </div>
            <div className='flex items-center gap-6 justify-end w-full'>
                <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
                    <EnvelopeClosedIcon className='w-5 h-5 text-gray-500' />
                </div>
                <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                    <IoIosNotifications className='w-5 h-5 text-gray-500' />
                </div>
                <div className='flex flex-col'>
                    <span className="text-sm leading-3 font-medium text-gray-700">John Doe</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-gray-600'>
                    JD
                </div>
            </div>
        </div>
    )
}

export default Navbar