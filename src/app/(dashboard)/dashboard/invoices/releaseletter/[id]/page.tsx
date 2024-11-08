"use client";
import Back from "@/components/ui/back";
import jsPdf from "jspdf";
import html2Canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { setPageTitle } from "@/redux/reducers/pageTitleSwitching";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Release letter"));
  }, [dispatch]);

  const downLoadResease = async () => {
    try {
      const currentRelease = divRef?.current;
      if (currentRelease) {
        const canvas = await html2Canvas(currentRelease);
        const imgData = canvas?.toDataURL("image/png");
        const pdf = new jsPdf({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas?.height * width) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`release-letter.pdf`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not download the release letter.");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col-reverse md:flex-row  justify-between mb-4 gap-2">
        <Back />
        <div className="flex gap-2 justify-end w-full">
          <Button variant="secondary" onClick={downLoadResease}>
            Download
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
      <div
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300"
        ref={divRef}
      >
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            SIFCO LTD
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm">Rwanda-Kigali</p>
            <p className="text-gray-600 text-sm">
              Email: info@superfreightservice.com
            </p>
            <p className="text-gray-600 text-sm">
              Tel: +250788713189 / 0799373436
            </p>
          </div>
        </section>
        <section className="mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">
              Date: <span className="font-normal">08-Nov-2024</span>
            </h3>
            <h3 className="font-semibold text-gray-700 text-sm">
              Warehouse Manager
            </h3>
            <h3 className="font-normal text-gray-700 text-sm">
              Dear Sir/Madam
            </h3>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">
              Re: Authorization for Cargo Release
            </h3>
          </div>
          <p className="text-gray-700 mt-4 leading-relaxed text-sm">
            I hope this message finds you well. As the Finance Manager of Sifco
            ltd, I am writing to authorize the release of cargo from your
            facility to the designated consignee, [Consignee Name], as per our
            agreed terms and conditions.
          </p>
        </section>
        <section className="mb-6">
          <div className="overflow-x-auto mt-4 text-gray-700 text-sm">
            <p>Details of the cargo to be released are as follows:</p>
            <div className="flex flex-col gap-1 mt-2">
              <p>
                <span className="font-semibold">Consignee Name:</span>
                {"Consignee's "}full name
              </p>
              <p>
                <span className="font-semibold">Bill of Lading Number:</span>BL
                Number
              </p>
              <p>
                <span className="font-semibold">Container number:</span>{" "}
              </p>
              <p>
                <span className="font-semibold">Release Date:</span> Date of
                Release
              </p>
            </div>
          </div>
        </section>
        <section className="mb-6">
          <p className="text-gray-700 mt-4 leading-relaxed text-sm w-[80%]">
            Should you require any further information or clarification, please
            do not hesitate to contact me directly.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed text-sm w-[80%]">
            Thank you for your cooperation and prompt attention to this matter.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed text-sm w-[80%]">
            N.B:{" "}
            <span className="font-semibold">
              Kindly keep in mind that this release authorization is based on
              finance issues only
            </span>
          </p>
        </section>

        <footer className="mt-8 text-gray-700 text-sm">
          <p>Sincerely,</p>
          <p className="font-semibold mt-2">Finance Manager</p>
          <p>Warehouse Manager</p>
          <p className="text-gray-500">SIFCO</p>
          <p className="text-gray-500">07848263545</p>
        </footer>
      </div>
    </div>
  );
};
export default Page;
