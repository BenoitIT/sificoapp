"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session: any = useSession();
  const accessToken = session?.data?.accessToken;
  const role = session?.data?.role;
  if (!accessToken) {
    return <div>{children}</div>;
  } else if (accessToken && role?.toLowerCase().includes("admin")) {
    return router.push("/dashboard");
  } else if (accessToken && role?.toLowerCase().includes("origin agent")) {
    return router.push("/dashboard");
  } else if (accessToken && role?.toLowerCase().includes("operation manager")) {
    return router.push("/opmanager");
  } else if (accessToken && role?.toLowerCase().includes("finance")) {
    return router.push("/dashboard");
  } else if (accessToken && role?.toLowerCase().includes("head of finance")) {
    return router.push("/dashboard");
  } else {
    return router.push("/");
  }
};
export default Authlayout;
