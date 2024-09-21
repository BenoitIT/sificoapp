"use client";
import NavBar from "@/appComponents/navigations/NavBar";
import ContactUsForm from "@/appComponents/pageBlocks/contactUs";
import Footer from "@/appComponents/pageBlocks/footer";
import { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

const Page = () => {
  const [scrolledFromOrign, setScrolledFromOrign] = useState<boolean>(false);
  const [typeEffect] = useTypewriter({
    words: ["safety and perfection"],
    loop: 600,
    deleteSpeed: 600,
  });
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 150) {
      setScrolledFromOrign(true);
    }
    if (currentScrollY <= 150) {
      setScrolledFromOrign(false);
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-[100vh] relative w-full overflow-hidden">
      <div className="text-gray-900 h-[100vh] bg-[url('/images/image1.png')] bg-cover bg-center bg-fixed bg-no-repeat">
        <div className="w-fit fixed z-20 top-0">
          <NavBar scollThresholdChanged={scrolledFromOrign} />
        </div>
        <div className="h-[100vh] w-full  absolute  bg-gradient-to-r from-transparent to-[#003472]"></div>
        <div className="w-full h-full flex justify-center items-center ">
          <div className="z-10  w-fit p-6 flex flex-col gap-2">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-bold z-10 shadow-sm text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] capitalize">
              we are
            </p>
            <p className="text-white text-base md:text-2xl lg:text-4xl font-bold z-10 shadow-sm text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] capitalize">
              Super International Freight Services LLC
            </p>
            <p className="text-white text-lg md:text-xl lg:text-3xl font-bold z-10 shadow-sm text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              With our cargo services, your shipments
            </p>
            <p className="text-white text-lg md:text-xl lg:text-3xl font-bold z-10 shadow-sm text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {"reach customer's end with"}
            </p>
            <p className="text-white text-lg md:text-xl lg:text-3xl font-bold z-10 shadow-sm text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {typeEffect}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-white text-black w-full py-4" id="contact">
        <ContactUsForm />
      </div>
      <Footer />
    </div>
  );
};
export default Page;
