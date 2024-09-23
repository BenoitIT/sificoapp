import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EditPasswordForm = () => {
  return (
    <div className="w-full flex justify-center text-gray-700 mt-3 ml-2">
      <form>
        <div className="grid gap-2 w-[280px] md:w-[300px]">
          <Label htmlFor="cpassword">
            Current password<span className="text-red-500">*</span>
          </Label>
          <Input type="text" placeholder="Enter the current one" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="grid gap-2 w-[280px] md:w-[300px]">
            <Label htmlFor="npassword">
              New password<span className="text-red-500">*</span>
            </Label>
            <Input type="text" placeholder="Enter the current one" />
          </div>
          <div className="grid gap-2 w-[280px] md:w-[300px]">
            <Label htmlFor="cnpassword">
              Confirm password<span className="text-red-500">*</span>
            </Label>
            <Input type="password" placeholder="Enter the current one" />
          </div>
        </div>
        <div className="mt-4">
          <Button>Update password</Button>
        </div>
      </form>
    </div>
  );
};
