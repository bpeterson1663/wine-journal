import { z } from "zod";

const VintageSchema = z
  .union([
    z.string().regex(/^\d{4}$/, {
      message: "Enter the vintage of the wine (NV for non vintage)",
    }),
    z.literal("NV", {
      errorMap: () => ({ message: "Enter the vintage of the wine (NV for non vintage)" }),
    }),
    z.literal("nv", {
      errorMap: () => ({ message: "Enter the vintage of the wine (NV for non vintage)" }),
    }),
  ])
  .default("");

export const WineSchema = z.object({
  id: z.string().default(""),
  type: z.string().default("wine"),
  userId: z.string().default(""),
  date: z.date().default(new Date()),
  producer: z.string().min(1, { message: "Enter the producer of the wine" }),
  classification: z.string().default(""),
  varietal: z.array(z.string()).min(1, { message: "Enter at least one varietal" }),
  subregion: z.string().default(""),
  region: z.string().min(1, { message: "Enter the region the wine is from" }),
  country: z.string().min(1, { message: "Enter the country where the wine is from" }),
  vintage: VintageSchema,
  quantity: z.number().default(0),
  price: z.number().default(0),
  description: z.string().default(""),
  labelUri: z.string().default(""),
  imageBlob: z
    .instanceof(Blob)
    .nullable()
    .optional()
    .refine(
      (file) => {
        if (!file) {
          return true;
        }
        return file.size <= 10 * 1024 * 1024;
      },
      {
        message: "File size should be less than 10MB",
      },
    )
    .refine(
      (file) => {
        if (!file) {
          return true;
        }
        return ["image/jpeg", "image/png", "application/pdf"].includes(file.type);
      },
      {
        message: "Only JPEG, PNG, and PDF files are allowed",
      },
    ),
});

export type WineT = z.infer<typeof WineSchema>;

export const INITIAL_VALUES: WineT = {
  type: "wine",
  id: "",
  userId: "",
  producer: "",
  classification: "",
  subregion: "",
  region: "",
  country: "",
  vintage: "",
  quantity: 0,
  price: 0,
  description: "",
  labelUri: "",
  varietal: [],
  date: new Date(),
  imageBlob: null,
};
