import { z } from "zod";

export const UserProfileSchema = z.object({
	id: z.string().default(""),
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	avatar: z.string().default(""),
	displayName: z.string().default(""),
	userId: z.string().default(""),
	email: z.string().email({ message: "Not a valid email" }),
});

export const defaultUserProfile = {
	id: "",
	firstName: "",
	lastName: "",
	avatar: "",
	displayName: "",
	userId: "",
	email: "",
};

export type UserProfileT = z.infer<typeof UserProfileSchema>;
