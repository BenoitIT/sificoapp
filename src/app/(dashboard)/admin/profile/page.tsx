"use client";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LuPencilLine } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { EditPasswordForm } from "./editPassword";

const Page = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("editprofile");
  const [editPhone, setEditPhone] = useState(false);
  useEffect(() => {
    dispatch(setPageTitle("My Profile"));
  }, [dispatch]);
  const ProfileNavigators = [
    { id: 1, title: "Account Information", key: "editprofile" },
    { id: 2, title: "Edit Password", key: "security" },
  ];
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center min-h-[80vh]">
      <div className="h-full min-w-fit md:min-h-[70vh] pt-6">
        <div className="h-[70px] w-[70px] md:h-[150px] md:w-[150px] bg-white rounded-full border border-gray-200 shadow-md flex justify-center items-center">
          <span className="text-xl md:text-6xl font-bold text-[#003472]">
            JD
          </span>
        </div>
      </div>
      <div className="h-full w-full md:h-[400px] md:w-[750px] bg-white rounded-xl shadow py-2">
        <div className="mb-[6vh] flex  w-fit text-base font-medium text-gray md:gap-4 gap-2  -z-10 mt-4 md:mx-8 mx-2">
          {ProfileNavigators.map((navigator) => (
            <div
              className={`${
                navigator.key === activeMenu
                  ? "text-[#189bcc] border-b-2 border-[#cde3eb] rounded-sm"
                  : "text-[#003472]"
              } transition-opacity duration-150 ease-linear capitalize hover:cursor-pointer border-b pb-1 text-sm `}
              key={navigator.id}
              onClick={() => setActiveMenu(navigator.key)}
            >
              {navigator.title}
            </div>
          ))}
        </div>
        <div
          className={
            activeMenu == "editprofile"
              ? "w-full text-gray-500 mx-8 flex flex-col gap-2 text-sm"
              : "hidden"
          }
        >
          <p>
            First Name <span className="ml-8 text-gray-900">Jane</span>
          </p>
          <p>
            Last Name <span className="ml-8 text-gray-900">Doe</span>
          </p>
          <p>
            Email{" "}
            <span className="ml-8 text-gray-900">janedoe@example.com</span>
          </p>
          <div className="flex relative">
            <p>
              Telephone <span className="ml-8 text-gray-900">555-5678</span>
            </p>
            <span
              className={
                editPhone
                  ? "hidden"
                  : "ml-8 text-[#003472] mt-[2px] hover:cursor-pointer"
              }
              onClick={() => setEditPhone(true)}
            >
              <LuPencilLine />
            </span>
            <div
              className={
                editPhone
                  ? "flex flex-col md:flex-row gap-2 absolute left-[20px] md:left-[180px] bg-white p-2"
                  : "hidden"
              }
            >
              <Input
                type="text"
                placeholder="Enter new phone number"
                className="w-full md:w-[270px] placeholder:text-gray-300 outline:border border-gray-400"
              />
              <Button onClick={() => setEditPhone(false)}>
                <FaCheck />
              </Button>
              <Button variant="destructive" onClick={() => setEditPhone(false)}>
                <RxCross2 />
              </Button>
            </div>
          </div>
          <p>
            Role <span className="ml-8 text-gray-900">Admin</span>
          </p>
          <p>
            Gender: <span className="ml-8 text-gray-900">Male</span>
          </p>
        </div>
        <div className={activeMenu != "editprofile" ? "w-full" : "hidden"}>
          <EditPasswordForm />
        </div>
      </div>
    </div>
  );
};
export default Page;
