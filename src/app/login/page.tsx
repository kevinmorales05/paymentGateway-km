"use client";
import React from "react";
//design components
import {
  Button,
  Input,
  Center,
  Heading,
  Container,
  VStack,
  Fieldset,
  Stack,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { toaster } from "@/components/ui/toaster";
//dependency for forms
import { useForm, SubmitHandler } from "react-hook-form";

// Define form data types
interface ILoginFormInput {
  email: string;
  password: string;
}

const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
  console.log(data);
  toaster.create({
    title: "Logged in successfully.",
    description: "You have successfully logged in.",
    duration: 5000,
  });
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  // Form submit handler
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <AbsoluteCenter>
        <VStack>
          <Fieldset.Root size="lg" maxW="md">
            <Heading textAlign={'center'} margin={5}>Login</Heading>
            <Stack>
              <Fieldset.Legend textAlign={'center'} margin={2}>Access Credentials</Fieldset.Legend>
              <Fieldset.HelperText textAlign={'center'} margin={3}>
                Please provide your email and password
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <Field label="Email" required margin={3}>
                  <Input
                    defaultValue="zorapay@gmail.com"
                    {...register("email", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.email && <span>This field is required</span>}
                </Field >
                {/* include validation with required or other standard HTML validation rules */}
                <Field label="Password" required margin={3}>
                  <Input
                    defaultValue="**********"
                    {...register("password", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.password && <span>This field is required</span>}
                </Field>

                <Button type="submit" alignSelf="flex-start" padding={5} margin={10}>
                  Submit
                </Button>
              </form>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
