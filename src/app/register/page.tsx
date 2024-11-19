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
  Text
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { toaster, Toaster } from "@/components/ui/toaster";
//dependency for forms
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterFormInput } from "@/types/types";
import { Link } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  // Form submit handler
  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    console.log(data);
    toaster.create({
      title: "Account Created successfully.",
      description: "You have successfully created an account!",
      duration: 6000,
      action: {
        label: "Continue",
        onClick: () => router.push('/login'),
      },
    });
    
  };

  //router to navigation
  const router = useRouter();

  return (
    <Box>
      <AbsoluteCenter>
        <VStack>
          <Fieldset.Root size="lg" maxW="md">
            <Heading textAlign={"center"} margin={5}>
              Register
            </Heading>
            <Stack>
              <Fieldset.Legend textAlign={"center"} margin={2}>
                Create a new account
              </Fieldset.Legend>
              <Fieldset.HelperText textAlign={"center"} margin={3}>
                Please provide your personal information
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <Field label="Name" required margin={3}>
                  <Input
                    defaultValue="Kevin"
                    {...register("name", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.name && <span>This field is required</span>}
                </Field>
                <Field label="Last Name" required margin={3}>
                  <Input
                    defaultValue="Morales"
                    {...register("lastName", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.lastName && <span>This field is required</span>}
                </Field>
                <Field label="Telephone" required margin={3}>
                  <Input
                    defaultValue="3852250301"
                    {...register("telephone", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.telephone && <span>This field is required</span>}
                </Field>
                <Field label="Date of Birth" required margin={3}>
                  <Input
                    defaultValue="3852250301"
                    type="date"
                    {...register("dateOfBirth", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.dateOfBirth && <span>This field is required</span>}
                </Field>
        
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
                <Field label="Confirm Password" required margin={3}>
                  <Input
                    defaultValue="**********"
                    type="password"
                    {...register("confirmPassword", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.confirmPassword && (
                    <span>This field is required</span>
                  )}
                </Field>
                <Center>
                  <Button
                    type="submit"
                    alignSelf="center"
                    padding={5}
                    margin={10}
                  >
                    Create Account
                  </Button>
                </Center>
              </form>
              <Box>
                <Text>
                  You already have an account{" "}
                  <Link color="teal.500" href="/login">
                    Go Login
                  </Link>
                </Text>
              </Box>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
        <Toaster />
      </AbsoluteCenter>
    </Box>
  );
}
