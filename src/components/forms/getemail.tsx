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
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

//dependency for forms
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginFormInput } from "@/types/types";

export default function GetEmail(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  // Form submit handler
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
    props.setEmail(data.email);
    console.log(props.email);
    
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
                
                <Center>
                  <Box>
                    <Button
                      type="submit"
                      alignSelf="flex-start"
                      padding={5}
                      margin={10}
                    >
                      Send OTP
                    </Button>
                  </Box>
                </Center>
              </form>
            </Fieldset.Content>
          </Fieldset.Root>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
