"use client";
import React from "react";
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
import { ILoginFormInput } from "@/types/types";
//links to move
import { Link } from "@chakra-ui/react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  // Form submit handler
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
    toaster.create({
      title: "Logged in successfully.",
      description: "You have successfully logged in.",
      duration: 5000,
    });
  };

  return (
    <Box>
      <AbsoluteCenter>
        <VStack>
          <Fieldset.Root size="lg" maxW="md">
            <Heading textAlign={"center"} margin={5}>
              Login
            </Heading>
            <Stack>
              <Fieldset.Legend textAlign={"center"} margin={2}>
                Access Credentials
              </Fieldset.Legend>
              <Fieldset.HelperText textAlign={"center"} margin={3}>
                Please provide your email and password
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <Field label="Email" required margin={3}>
                  <Input
                    defaultValue="zorapay@gmail.com"
                    {...register("email", { required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address",
                        } })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.email && <span>{errors.email.message}</span>}
                </Field>
                {/* include validation with required or other standard HTML validation rules */}
                <Field label="Password" required margin={3}>
                  <Input
                    defaultValue="**********"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.password && <span>This field is required</span>}
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
                  Do you forget your password?{" "}
                  <Link color="teal.500" href="/recoverpwd">
                    Recover Password
                  </Link>
                </Text>
              </Box>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
