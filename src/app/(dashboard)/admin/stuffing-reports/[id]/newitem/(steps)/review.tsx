import { addStuffingReportsItems } from "@/app/httpservices/stuffingReport";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NewStuffingItem } from "@/interfaces/stuffingItem";
import { useParams, useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
interface StepFormProps {
  newItemPayload: NewStuffingItem;
  setActiveForm: (val: number) => void;
}
const StepThree = ({ setActiveForm, newItemPayload }: StepFormProps) => {
  const params = useParams();
  const router = useRouter();
  const staffReportId = params?.id;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      delete newItemPayload.id;
      const {message,status} = await addStuffingReportsItems(
        Number(staffReportId),
        newItemPayload
      );
      if(status==201){
      toast.success(message);
      router.back();
      }else{
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to record shipment.");
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <p className="text-center pb-1 mb-6 font-semibold text-gray-700 border-b border-gray-400">
        Data review
      </p>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="consignee">
              Customer <span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600 capitalize">
              {newItemPayload?.customername}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.type}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.code}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">Mark</Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.mark}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="salesAgent">
              Sales agent <span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600 capitalize">
              {newItemPayload?.agentname}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="noOfPkgs">
              No of packages<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.noOfPkgs}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="typeOfPackage">
              Type of package<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.typeOfPkg}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">
              Weight<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.weight}
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">
            Description<span className="text-red-500">*</span>
          </Label>
          <span className="w-full flex-shrink text-sm text-gray-600">
            {newItemPayload?.description}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Handling</Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.handling ?? ""}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">CBM</Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.cbm ?? ""}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="line">
              Lines<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.line}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="freight">
              Freight<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.freight}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="blFee">
              BL Fee<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.blFee}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="noOfPkgs">
              JB<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.jb}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">
              Other<span className="text-red-500">*</span>
            </Label>
            <span className="w-full flex-shrink text-sm text-gray-600">
              {newItemPayload?.others}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            className="w-fit"
            variant="secondary"
            onClick={() => setActiveForm(2)}
          >
            Back
          </Button>
          <Button type="submit" className="w-fit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
export default StepThree;
