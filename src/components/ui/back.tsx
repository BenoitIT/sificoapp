"use client";
import { TiArrowBack } from "react-icons/ti";
import { useRouter } from "next/navigation";
const Back = () => {
  const router = useRouter();
  return (
    <button
      className="text-[#003472] text-xl lg:text-3xl bg-white shadow rounded px-2"
      onClick={() => router.back()}
    >
      <TiArrowBack />
    </button>
  );
};
export default Back;
