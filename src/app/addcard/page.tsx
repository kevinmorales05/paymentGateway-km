"use client";
import React, { useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import {
  Heading,
  Box,
  Group,
  Button,
  IconButton,
  Center,
  Fieldset,
  Input,
  HStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAddCardInterface } from "@/types/types";


export default function AddCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddCardInterface>();
  

  const onSubmit: SubmitHandler<IAddCardInterface> = (data) => {
    console.log(data);
  };
  return (
    <Center display={"flex"} flexDir={"column"}>
      <Box>
        <Heading> ADD CREDIT/DEBIT CARD</Heading>
      </Box>
      <Box>
        <Group attached>
          <IconButton variant="outline" size="sm">
            <CameraOutlined />
          </IconButton>
          <Button variant="outline" size="sm">
            Scan your Card
          </Button>
        </Group>
      </Box>
      <Box>
        <Heading> or</Heading>
      </Box>
      <Box>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}

              <Field label="Name on Card" required margin={3}>
                <Input
                  defaultValue="Kevin"
                  {...register("name", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.name && <span>This field is required</span>}
              </Field>
              <HStack>
                <Field label="Card Number" required margin={3}>
                  <Input
                    defaultValue="321456789123456765"
                    {...register("cardNumber", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.cardNumber && <span>This field is required</span>}
                </Field>
                <Field label="CCV" required margin={3}>
                  <Input
                    defaultValue="xxx"
                    {...register("ccv", { required: true })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.ccv && <span>This field is required</span>}
                </Field>
              </HStack>

              <Field label="Expiration Date" required margin={3}>
                <Input
                  defaultValue="mm/yy"
                  type="month"
                  {...register("expDate", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.expDate && <span>This field is required</span>}
              </Field>
              <Field label="Billing Address" required margin={3}>
                <Input
                  defaultValue="Line 1"
                  {...register("line1", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.line1 && <span>This field is required</span>}
                <Input
                  defaultValue="Line 2"
                  {...register("line2", { required: true })}
                />
                {errors.line2 && <span>This field is required</span>}
                <HStack>
                  <Input
                    placeholder="City"
                    {...register("city", { required: true })}
                  />
                  {errors.city && <span>This field is required</span>}
                  <Input
                    placeholder="State"
                    {...register("state", { required: true })}
                  />
                  {errors.state && <span>This field is required</span>}
                </HStack>
                <HStack>
                  <Input
                    placeholder="Zip Code"
                    {...register("zipCode", { required: true })}
                  />
                  {errors.zipCode && <span>This field is required</span>}
                  <Input
                    placeholder="Country"
                    {...register("country", { required: true })}
                  />
                  {errors.country && <span>This field is required</span>}
                </HStack>
              </Field>
              <Field label="Receipt? (optional)" margin={3}>
                <Input
                  placeholder="Phone or email"
                  {...register("note", { required: false })}
                />
                {/* errors will return when field validation fails  */}
                {errors.note && <span>This field is required</span>}
              </Field>

           

              <Center>
                <Button
                  type="submit"
                  alignSelf="center"
                  padding={5}
                  margin={10}
                >
                  Add Card
                </Button>
              </Center>
            </form>
          </Fieldset.Content>
        </Fieldset.Root>
      </Box>
    </Center>
  );
}
