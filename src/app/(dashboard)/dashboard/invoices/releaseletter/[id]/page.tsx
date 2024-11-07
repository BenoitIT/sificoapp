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
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Warehouse Release Letter
          </h1>
          <p className="text-gray-600">Date: 12-oct-2024</p>
        </header>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">To:</h2>
          <p className="text-gray-600">[Recipient Name]</p>
          <p className="text-gray-600">[Recipient Company]</p>
          <p className="text-gray-600">[Recipient Address]</p>
        </section>
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Subject: Load Release Authorization
          </h3>
          <p className="text-gray-700 mt-4 leading-relaxed">
            This letter authorizes the release of the following items from our
            warehouse:
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4 text-left font-medium text-gray-700">
                    Number of packages
                  </th>
                  <th className="border-b py-2 px-4 text-left font-medium text-gray-700">
                    Weight
                  </th>
                  <th className="border-b py-2 px-4 text-left font-medium text-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b py-2 px-4 text-gray-600">Item 1</td>
                  <td className="border-b py-2 px-4 text-gray-600">10</td>
                  <td className="border-b py-2 px-4 text-gray-600">
                    Example Description
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-6">
          <p className="text-gray-700 mt-4 leading-relaxed">
            The bearer of this letter is authorized to receive the above items
            from the warehouse. Please verify identity upon pickup.
          </p>
        </section>

        <footer className="mt-8 text-gray-700">
          <p>Sincerely,</p>
          <p className="font-semibold mt-2">[Warehouse Manager Name]</p>
          <p>Warehouse Manager</p>
          <p className="text-gray-500">[Warehouse Address]</p>
          <p className="text-gray-500">[Warehouse Contact Information]</p>
        </footer>
      </div>
    </div>
  );
};
export default Page;
