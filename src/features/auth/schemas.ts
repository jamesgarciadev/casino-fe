import { z } from "zod";

import { LoginInputSchema } from "@/gql/validation";

// UX-layer validation, mirroring the @rules on LoginInput in be's schema.graphql.
export const loginSchema = LoginInputSchema().extend({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type LoginValues = z.infer<typeof loginSchema>;
