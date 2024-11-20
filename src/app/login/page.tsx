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
//dependency for forms
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginFormInput, UserCards, UserInfo } from "@/types/types";
//links to move
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
//context of the app
import { useAppContext } from "@/context/AppContext";

//dummie info
const session =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtlbW9yYWxlcyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3ODg1MjAwLCJleHAiOjE2OTc4ODg4MDB9.4-ZXY7YXEzKgloTxOzckhx9GHvDS1exblR2IJrKJZ8I";

const dummieUser: UserInfo = {
  username: "kmorales201314@gmail.com",
  name: "Kevin",
  lastName: "Morales",
  userId: "123e4567-e89b-12d3-a456-426614174000",
};
const dummieUserCards: UserCards = {
  userId: "123e4567-e89b-12d3-a456-426614174000",
  cards: [
    {
      cardId: "token123abc",
      last4: "5678",
      expMonth: "12",
      expYear: "2026",
      brand: "Visa",
      cardholderName: "John Doe",
      priority: 0,
    },
    {
      cardId: "token987xyz",
      last4: "1234",
      expMonth: "08",
      expYear: "2025",
      brand: "Mastercard",
      cardholderName: "Jane Smith",
      priority: 0,
    },
    {
      cardId: "token456lmn",
      last4: "1111",
      expMonth: "04",
      expYear: "2024",
      brand: "American Express",
      cardholderName: "Carlos Rivera",
      priority: 1,
    },
  ],
};
const dummieUserCardsNull: UserCards = {
  userId: "123e4567-e89b-12d3-a456-426614174000",
  cards: null,
};
const purchaseID: string = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  //navigation
  const router = useRouter();

  //getContextVariables
  const { setUserInfo, setLogged, setSessionToken, setUserCards } =
    useAppContext();

  // Form submit handler
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
    //get user info

    //set user info
    setUserInfo(dummieUser);
    //get user cards

    //set usercards
    setUserCards(dummieUserCards);
    //setUserCards(dummieUserCardsNull);
    //throw error if no user info or incorrect password

    //set session token
    setSessionToken(session);
    //set user logged
    setLogged(true);

    //get the purchase id

    //use the purchase id, it comes in the param
    router.push(`/detail/${purchaseID}`);
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
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
