import {
  dependanceEndpoint,
  getDependancies,
} from "@/app/httpservices/dependacies";
import { updateStuffingReportsItemsDetail } from "@/app/httpservices/stuffingReport";
import ErrorSection from "@/appComponents/pageBlocks/errorDisplay";
import Loader from "@/appComponents/pageBlocks/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewStuffingItem, StepFormProps } from "@/interfaces/stuffingItem";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const StepTwoForm = ({
  setItemsData,
  ErrorLogger,
  setActiveForm,
  newItemPayload,
  errors,
}: StepFormProps) => {
  const params = useParams();
  const router = useRouter();
  const session:any=useSession();
  const userName=session?.data?.firstname;
  const date=new Date();
  const staffReportId = params?.id;
  const staffReportItmId = params?.itmid;
  const { data, isLoading, error } = useSWR(
    dependanceEndpoint,
    getDependancies
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.type == "number") {
      setItemsData((prevState: NewStuffingItem) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value),
      }));
      if (e.target.name == "line") {
        setItemsData((prevState: NewStuffingItem) => ({
          ...prevState,
          freight: Number(e.target.value) * Number(data?.freightRate ?? 1),
        }));
      }
    } else {
      setItemsData((prevState: NewStuffingItem) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    ErrorLogger(e.target.name, null);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    const Line = form.elements.namedItem("line") as HTMLInputElement;
    const blFee = form.elements.namedItem("blFee") as HTMLInputElement;
    if (description.value === "") {
      ErrorLogger("description", "Description  is required.");
    } else if (Line.value == "" || !Number(Line.value)) {
      ErrorLogger("line", "Numerical value for line is required.");
    } else if (blFee.value == "" || !Number(blFee.value)) {
      ErrorLogger("blFee", "Numerical value for blFee is required.");
    } else {
      try {
        delete newItemPayload.id;
        newItemPayload.editedAt=date.toDateString();
        newItemPayload.editedBy=userName;
        const { message, status } = await updateStuffingReportsItemsDetail(
          Number(staffReportId),
          Number(staffReportItmId),
          newItemPayload
        );
        if (status == 200) {
          toast.success(message);
          router.back();
        } else {
          toast.error(message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to record shipment.");
      }
    }
  };
  if (data) {
    return (
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              cols={10}
              placeholder="type.."
              onChange={handleDescriptionChange}
              value={newItemPayload?.description}
              className={
                errors?.description
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span
              className={
                errors?.description ? "text-xs text-red-500" : "hidden"
              }
            >
              {errors?.description}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="line">Line</Label>
              <Input
                id="line"
                name="line"
                type="number"
                placeholder="type.."
                value={newItemPayload?.line}
                onChange={handleChange}
                className={
                  errors?.line
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span
                className={errors?.line ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.line}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="freight">
                Freight<span className="text-red-500">*</span>
              </Label>
              <Input
                id="freight"
                name="freight"
                type="number"
                placeholder="type.."
                disabled
                value={newItemPayload?.freight}
                onChange={handleChange}
                className={
                  errors["freight"]
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span
                className={errors?.freight ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.freight}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
          <div className="grid gap-2">
              <Label htmlFor="noOfPkgs">
                JB<span className="text-red-500">*</span>
              </Label>
              <Input
                id="jb"
                name="jb"
                placeholder="type.."
                type="number"
                value={newItemPayload?.jb}
                onChange={handleChange}
                className={
                  errors?.jb
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span className={errors?.jb ? "text-xs text-red-500" : "hidden"}>
                {errors?.jb}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Handling</Label>
              <Input
                id="handling"
                name="handling"
                type="number"
                placeholder="type.."
                value={newItemPayload?.handling}
                onChange={handleChange}
                className={
                  errors?.handling
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span
                className={errors?.handling ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.handling}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">CBM</Label>
              <Input
                id="cbm"
                name="cbm"
                type="number"
                placeholder="type.."
                value={newItemPayload?.cbm}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="blFee">
                BL Fee<span className="text-red-500">*</span>
              </Label>
              <Input
                id="blFee"
                name="blFee"
                type="number"
                placeholder="type.."
                value={newItemPayload?.blFee}
                onChange={handleChange}
                className={
                  errors?.blFee
                    ? "text-xs text-red-500 border-red-500"
                    : "placeholder:text-gray-400"
                }
              />
              <span
                className={errors?.blFee ? "text-xs text-red-500" : "hidden"}
              >
                {errors?.blFee}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="inspection">Inspection</Label>
              <Input
                id="inspection"
                name="inspection"
                type="number"
                placeholder="type.."
                value={newItemPayload?.inspection}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="carHanging">Car hanging</Label>
              <Input
                id="carHanging"
                name="carHanging"
                type="number"
                placeholder="type.."
                value={newItemPayload?.carHanging}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="recovery">Recovery</Label>
              <Input
                id="recovery"
                name="recovery"
                type="number"
                placeholder="type.."
                onChange={handleChange}
                value={newItemPayload?.recovery}
                className={"placeholder:text-gray-400"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                id="insurance"
                name="insurance"
                type="number"
                placeholder="type.."
                value={newItemPayload?.insurance}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="localCharges">Local charges</Label>
              <Input
                id="localCharges"
                name="localCharges"
                type="number"
                placeholder="type.."
                value={newItemPayload?.localCharges}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tot">Total amount</Label>
              <Input
                id="tot"
                name="tot"
                type="number"
                placeholder="type.."
                onChange={handleChange}
                value={newItemPayload?.totalUsd}
                className={"placeholder:text-gray-400"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="portOfdischarge">port of discharge</Label>
              <Input
                id="portOfdischarge"
                name="portOfdischarge"
                type="text"
                placeholder="type.."
                value={newItemPayload?.portOfdischarge}
                onChange={handleChange}
                className={"placeholder:text-gray-400"}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="totalinwords">Total amount in word</Label>
            <Input
              id="totalinwords"
              name="totalinwords"
              type="text"
              placeholder="type.."
              value={newItemPayload?.totalinwords}
              onChange={handleChange}
              className={"placeholder:text-gray-400"}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              className="w-fit"
              variant="secondary"
              onClick={() => setActiveForm(1)}
            >
              Back
            </Button>
            <Button type="submit" className="w-fit">
              Update
            </Button>
          </div>
        </div>
      </form>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorSection />;
  }
};
export default StepTwoForm;
