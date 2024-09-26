import { z } from "zod";

const shipperValidationSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  phone: z.string().min(8),
});

export default shipperValidationSchema;
