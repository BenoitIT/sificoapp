"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const NavBar = ({
  scollThresholdChanged,
}: {
  scollThresholdChanged: boolean;
}) => {
  const [displayMenus, setDisplayMenus] = useState(true);
  const router = useRouter();
  const handleLogin = () => {
    router.push("/auth/login");
  };
  return (
    <div
      className={`w-screen ${
        scollThresholdChanged
          ? "bg-white shadow-md"
          : " md:bg-gradient-to-tl md:from-transparent md:to-transparent bg-opacity-80 duration-75 bg-gradient-to-tl from-[#003472] to-white"
      }  h-auto px-14 py-6 flex justify-center items-center`}
    >
      <div
        className={`w-full flex flex-col md:flex-row justify-between ${
          scollThresholdChanged ? "text-[#003472]" : "text-white"
        }`}
      >
        <div className="flex  justify-between w-full md:w-fit">
          <Image src="/images/logoo.png" width={100} height={100} alt="Logo" />
          <div
            onClick={() => setDisplayMenus(true)}
            className={`${
              !displayMenus ? "flex" : "hidden md:flex"
            } ${
              scollThresholdChanged
                ? "border-[#003472] px-6 h-8 hover:shadow-[#189bcc] text-[#003472]":"border-white hover:shadow-white"} justify-center items-center md:hidden px-[10px]  rounded border`}
          >
            <HamburgerMenuIcon />
          </div>
          <div
            onClick={() => setDisplayMenus(false)}
            className={`${
              displayMenus ? "flex" : "hidden"
            } ${
              scollThresholdChanged
                ? "border-[#003472] px-6 h-8 hover:shadow-[#189bcc] text-[#003472]":"border-white hover:shadow-white"} justify-center items-center md:hidden px-[10px]  rounded border `}
          >
            <Cross1Icon/>
          </div>
        </div>
        <div
          className={`${
            displayMenus ? "flex" : "hidden md:flex"
          } flex-col md:flex-row gap-2  lg:gap-4 mt-0 lg:mt-1 items-end md:justify-center w-full`}
        >
          <p className="hover:bg-blue-400 md:hover:bg-transparent w-full md:w-fit text-end md:text-start p-2 rounded-sm">
            <a
              className="text-base capitalize"
              href="https://sifcoae.com/about-us"
            >
              About us
            </a>
          </p>
          <p className="hover:bg-blue-400 md:hover:bg-transparent w-full md:w-fit  text-end md:text-start p-2 rounded-sm">
            <a
              className="text-base capitalize"
              href="https://sifcoae.com/services"
            >
              services
            </a>
          </p>
          <p className="hover:bg-blue-400 w-full md:hover:bg-transparent md:w-fit text-end md:text-start p-2 rounded-sm">
            <Link className="text-base capitalize" href="/#contact">
              {"Let's talk"}
            </Link>
          </p>
        </div>
        <div>
          <Button
            className={`hidden md:block relative text-white text-sm capitalize ${
              scollThresholdChanged
                ? "bg-[#003472] px-6 w-20 h-8 hover:bg-[#189bcc]"
                : "hover:bg-[#003472]  w-20  px-6 h-8 bg-[#189bcc]"
            } hover:cursor-pointer`}
            onClick={handleLogin}
          >
            <p className="absolute top-[5px]">login</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
