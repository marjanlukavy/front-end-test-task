import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCredentials } from "../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginCredentials } from "../services/authService";
import { useLoginMutation } from "../services/authService";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
    } catch (error: any) {
      setError("root", {
        message: error?.data?.message || "An error occurred during sign in",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md px-4 py-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`block w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-red-300 ring-red-500"
                      : "border-gray-200 hover:border-blue-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`block w-full px-4 py-3 rounded-xl border ${
                    errors.password
                      ? "border-red-300 ring-red-500"
                      : "border-gray-200 hover:border-blue-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {errors.root && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 flex justify-center items-center gap-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
