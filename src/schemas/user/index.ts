import { ImageSchema } from "schemas/image";
import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string().default(""),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  avatar: z.string().default(""),
  displayName: z.string().default(""),
  userId: z.string().default(""),
  email: z.string().email({ message: "Not a valid email" }),
  imageBlob: ImageSchema,
  planId: z.string().default(""),
  trialExpires: z.date().default(new Date()),
  isPaid: z.boolean().default(false),
});

export const defaultUserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  avatar: "",
  displayName: "",
  userId: "",
  email: "",
  imageBlob: null,
  planId: "",
  trialExpires: new Date(),
  isPaid: false,
};

export type UserProfileT = z.infer<typeof UserProfileSchema>;
