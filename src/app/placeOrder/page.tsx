"use client";
import { useAppContext } from "@/context/AppContext";
import { AbsoluteCenter, Heading, VStack, Text, Link, Box } from "@chakra-ui/react";

import React from "react";

export default function placeOrder() {
  const { userInfo } = useAppContext();
  return (
    <div>
      <AbsoluteCenter>
        <VStack>
          <Heading>Your payment was sent successfully!</Heading>
          {userInfo === null ? (
            <>
              <p>We invite you to create a new account </p>
              <Box>
              <Text>
                  <Link color="teal.500" href="/register">
                    Create an account
                  </Link>
                </Text>
              </Box>
            </>
          ) : (
            <>
              <p>We'll email you the receipt to {userInfo?.username} </p>
            </>
          )}
        </VStack>
      </AbsoluteCenter>
    </div>
  );
}
