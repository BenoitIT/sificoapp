import { z } from "zod";

const stuffingItemSchema = z.object({
  shipper: z.number(),
  consignee: z.number(),
  noOfPkgs: z.number(),
  typeOfPkg: z.string(),
  weight: z.number(),
  line: z.number(),
  cbm: z.number(),
  description: z.string(),
  freight: z.number(),
  blFee: z.number(),
});
export default stuffingItemSchema;
