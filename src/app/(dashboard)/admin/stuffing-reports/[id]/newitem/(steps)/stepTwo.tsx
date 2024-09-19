import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewStuffingItem, StepFormProps } from "@/interfaces/stuffingItem";
import { ChangeEvent, FormEvent } from "react";

const StepTwoForm = ({
  setItemsData,
  ErrorLogger,
  setActiveForm,
  newItemPayload,
  errors,
}: StepFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItemsData((prevState: NewStuffingItem) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    const Jb = form.elements.namedItem("jb") as HTMLInputElement;
    const Line = form.elements.namedItem("line") as HTMLInputElement;
    const freight = form.elements.namedItem("freight") as HTMLInputElement;
    const blFee = form.elements.namedItem("blFee") as HTMLInputElement;
    const handling = form.elements.namedItem("handling") as HTMLInputElement;
    const others = form.elements.namedItem("others") as HTMLInputElement;
    if (description.value === "") {
      ErrorLogger("description", "Description  is required.");
    } else if (Jb.value === "" || !Number(Jb.value)) {
      ErrorLogger("jb", "JB is required.");
    } else if (Line.value == "" || !Number(Line.value)) {
      ErrorLogger("line", "Numerical value for line is required.");
    } else if (freight.value == "" || !Number(freight.value)) {
      ErrorLogger("freight", "Numerical value for freight is required.");
    } else if (blFee.value == "" || !Number(blFee.value)) {
      ErrorLogger("blFee", "Numerical value for blFee is required.");
    } else if (!Number(handling.value)) {
      ErrorLogger("handling", "Numerical value for handling is required.");
    } else if (!Number(others.value)) {
      ErrorLogger("others", "Numerical value for others is required.");
    } else {
      console.log("payload", newItemPayload);
    }
  };
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
            className={
              errors?.description
                ? "text-xs text-red-500 border-red-500"
                : "placeholder:text-gray-400"
            }
          />
          <span
            className={errors?.description ? "text-xs text-red-500" : "hidden"}
          >
            {errors?.description}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="line">Line</Label>
            <Input
              id="line"
              name="line"
              placeholder="type.."
              onChange={handleChange}
              className={
                errors?.line
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span className={errors?.line ? "text-xs text-red-500" : "hidden"}>
              {errors?.line}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Handling</Label>
            <Input
              id="handling"
              name="handling"
              placeholder="type.."
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
              placeholder="type.."
              onChange={handleChange}
              className={"placeholder:text-gray-400"}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              placeholder="type.."
              onChange={handleChange}
              className={"placeholder:text-gray-400"}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="noOfPkgs">
              JB<span className="text-red-500">*</span>
            </Label>
            <Input
              id="jb"
              name="jb"
              placeholder="type.."
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
            <Label htmlFor="freight">
              Freight<span className="text-red-500">*</span>
            </Label>
            <Input
              id="freight"
              name="freight"
              placeholder="type.."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="blFee">
              BL Fee<span className="text-red-500">*</span>
            </Label>
            <Input
              id="blFee"
              name="blFee"
              placeholder="type.."
              onChange={handleChange}
              className={
                errors?.blFee
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span className={errors?.blFee ? "text-xs text-red-500" : "hidden"}>
              {errors?.blFee}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">Other</Label>
            <Input
              id="other"
              name="others"
              placeholder="type.."
              onChange={handleChange}
              className={
                errors?.others
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
            />
            <span
              className={errors?.others ? "text-xs text-red-500" : "hidden"}
            >
              {errors?.others}
            </span>
          </div>
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
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
export default StepTwoForm;
