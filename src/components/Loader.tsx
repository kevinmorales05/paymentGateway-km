import { propsLoader } from "@/types/types";
import React, { useState } from "react";
import styles from "@/app/ui/loader.module.css";
import {
  AbsoluteCenter,
  Box,
  Center,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function Loader(props: propsLoader) {
  return (
    <>
      {props.active === true ? (
        <>
          <Box>
            <Center>
              <AbsoluteCenter>
                <VStack>
                  <Heading margin={10}>ZoraPay</Heading>
                  <Text >Connecting</Text>
                  <Text marginBottom={20}>to ZoraPay</Text>

                  <Box className={styles.loader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </Box>
                </VStack>
              </AbsoluteCenter>
            </Center>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
