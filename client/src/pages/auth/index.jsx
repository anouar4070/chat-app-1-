import Background from "@/assets/login2.png";
import { useFormik } from "formik";
import * as Yup from "yup";

import React from "react";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Auth = () => {

  function submitRegister() {
    console.log("submit");
  }
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password start with uppercase")
      .required("password  is Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")]),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center ">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl md:text-6xl font-bold">Welcome</h1>
              <img src={Victory} className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat-app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300  "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300  "
                >
                  Sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent
                onSubmit={formik.handleSubmit}
                value="login"
                className="flex flex-col gap-5 mt-10"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  className="rounded-full p-6 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="bg-white text-red-500 rounded">
                    {formik.errors.email}
                  </div>
                )}

                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  className="rounded-full p-6 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                />
                {formik.errors.password && formik.touched.password && (
                 <div className="bg-white text-red-500 rounded">
                    {formik.errors.password}
                  </div>
                )}

                <Button
                  disabled={!formik.isValid && formik.dirty}
                  type="submit"
                  className="rounded-full p-6 "
                >
                  {" "}
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                onSubmit={formik.handleSubmit}
                value="signup"
                className="flex flex-col gap-5 "
              >
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  className="rounded-full p-6 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="bg-white text-red-500 rounded">
                    {formik.errors.email}
                  </div>
                )}
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  className="rounded-full p-6 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                />
                {formik.errors.password && formik.touched.password && (
                 <div className="bg-white text-red-500 rounded">
                    {formik.errors.password}
                  </div>
                )}

                <Input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  className="rounded-full p-6 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="confirmPassword"
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="bg-white text-red-500 rounded">
                      {formik.errors.confirmPassword}
                    </div>
                  )}

                <Button
                  disabled={!formik.isValid && formik.dirty}
                  type="submit"
                  className="rounded-full p-6 "
                >
                  Sign up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center ">
          <img src={Background} className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
