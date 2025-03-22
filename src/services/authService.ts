import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse {
  email: string;
  name: string;
  id: string;
  role: string;
}

export interface ErrorResponse {
  message: string;
}

// Simulated backend validation
const validateCredentials = (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === "test@test.test" &&
        credentials.password === "password"
      ) {
        resolve({
          email: credentials.email,
          name: credentials.email.split("@")[0],
          id: Math.random().toString(),
          role: "user",
        });
      } else {
        reject({ message: "User not found" });
      }
    }, 1000);
  });
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      queryFn: async (credentials) => {
        try {
          const result = await validateCredentials(credentials);
          return { data: result };
        } catch (error) {
          return {
            error: {
              status: 401,
              data: error as ErrorResponse,
            },
          };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
