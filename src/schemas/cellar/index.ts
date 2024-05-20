import { z } from "zod";

export const WineSchema = z.object({
	id: z.string().default(""),
	userId: z.string().default(""),
	date: z.date().default(new Date()),
	producer: z.string().min(1, { message: "Enter the producer of the wine" }),
	classification: z.string().default(""),
	varietal: z
		.array(z.string())
		.min(1, { message: "Enter at least one varietal" }),
	subregion: z.string().default(""),
	region: z.string().min(1, { message: "Enter the region the wine is from" }),
	country: z
		.string()
		.min(1, { message: "Enter the country where the wine is from" }),
	vintage: z
		.string()
		.min(1, { message: "Enter the vintage of the wine (N/V for non vintage)" }),
	quantity: z.number().default(0),
	price: z.number().default(0),
	description: z.string().default(""),
	labelUri: z.string().default(""),
	imageBlob: z.instanceof(Blob)
		.nullable()
		.optional()
		.refine((file) => {
			if (!file) {
				return
			}
			return file.size <= 10 * 1024 * 1024
		}, {
			message: "File size should be less than 10MB",
		})
		.refine((file) => {
			if (!file) {
				return
			}
			return ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
		}, {
			message: "Only JPEG, PNG, and PDF files are allowed",
		})
});

export type WineT = z.infer<typeof WineSchema>;

export const INITIAL_VALUES: WineT = {
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
	imageBlob: null
};
