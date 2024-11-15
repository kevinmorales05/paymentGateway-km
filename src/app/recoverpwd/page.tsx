"use client";
import React, { useState } from "react";
//design components
import {
  Button,
  Input,
  Heading,
  VStack,
  Fieldset,
  Stack,
  Box,
  AbsoluteCenter,
  Center,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { toaster } from "@/components/ui/toaster";
//dependency for forms
import { useForm, SubmitHandler } from "react-hook-form";
import { IUpdatePassword } from "@/types/types";
//links to move
import { Link } from "@chakra-ui/react";
import GetEmail from "@/components/forms/getemail";

export default function RecoverPwd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdatePassword>();

  //validate email
  const [email, setEmail] = useState("");

  // Form submit handler
  const onSubmit: SubmitHandler<IUpdatePassword> = (data) => {
    console.log(data);
    console.log('this is the enroled email ', email);
    toaster.create({
      title: "Logged in successfully.",
      description: "You have successfully logged in.",
      duration: 5000,
    });
  };

  return (
    <Box>
      {email === "" ? (
        <>
          {" "}
          <GetEmail email={email} setEmail={setEmail} />
        </>
      ) : (
        <>
          {" "}
          <AbsoluteCenter>
            <VStack>
              <Fieldset.Root size="lg" maxW="md">
                <Heading textAlign={"center"} margin={5}>
                  Recover Password
                </Heading>
                <Stack>
                  <Fieldset.Legend textAlign={"center"} margin={2}>
                    Create a new Password
                  </Fieldset.Legend>
                  <Fieldset.HelperText textAlign={"center"} margin={3}>
                    Please provide your new password and the OTP number we have
                    send to your email or phone number.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}

                    {/* include validation with required or other standard HTML validation rules */}
                    <Field label="Password" required margin={3}>
                      <Input
                        type="password"
                        placeholder="***************"
                        {...register("password", { required: true })}
                      />
                      {/* errors will return when field validation fails  */}
                      {errors.password && <span>This field is required</span>}
                    </Field>
                    <Field label="Confirm Password" required margin={3}>
                      <Input
                        placeholder="***************"
                        type="password"
                        {...register("confirmPassword", { required: true })}
                      />
                      {/* errors will return when field validation fails  */}
                      {errors.confirmPassword && (
                        <span>This field is required</span>
                      )}
                    </Field>
                    <Field label="OTP received" required margin={3}>
                      <Input
                        defaultValue="123456"
                        type="text"
                        {...register("otp", { required: true })}
                      />
                      {/* errors will return when field validation fails  */}
                      {errors.otp && <span>This field is required</span>}
                    </Field>
                    <Center>
                      <Box>
                        <Button
                          type="submit"
                          alignSelf="flex-start"
                          padding={5}
                          margin={10}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Center>
                  </form>
                  <Box>
                    <Text>
                      You dont have an account{" "}
                      <Link color="teal.500" href="/register">
                        Create an account
                      </Link>
                    </Text>
                  </Box>
                  <Box>
                    <Text>
                      You rememberd your password{" "}
                      <Link color="teal.500" href="/login">
                        Go Login
                      </Link>
                    </Text>
                  </Box>
                </Fieldset.Content>
              </Fieldset.Root>
            </VStack>
          </AbsoluteCenter>
        </>
      )}
    </Box>
  );
}
