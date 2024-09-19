"use client";
import TabularSection from "@/appComponents/pageBlocks/tabularSection";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const StaffingReports = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-4">
        <div className="flex gap-2 justify-end w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Add new</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4 shadow-md">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    New stuffing report
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Set the targeted delivery of stuffs
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-2 mr-4">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger className="w-full col-span-2 placeholder:text-gray-300">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Kigali, Rwanda</SelectItem>
                        <SelectItem value="finance">Goma, DRC</SelectItem>
                        <SelectItem value="agent">Butare, Rwanda</SelectItem>
                        <SelectItem value="Health Center">
                          Musanze, Rwanda
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <Button>save</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default TabularSection(StaffingReports);
