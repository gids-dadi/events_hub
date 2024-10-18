import { title } from "process";
import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(400, "Description must be at most 400 characters long"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(100, "Location must be at most 100 characters long"),
  imageUrl: z.string().url("Please enter a valid URL"),
  startDateTime: z
    .date()
    .refine((date) => date > new Date(), "Start date must be in the future"),
  endDateTime: z
    .date()
    .refine((date) => date > new Date(), "End date must be in the future"),
  category: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url("Please enter a valid URL"),
});
