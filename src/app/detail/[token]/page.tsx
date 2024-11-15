"use client";
import Loader from "@/components/Loader";
import { DecryptedData } from "@/types/types";
import { decrypt } from "@/utils/decrypt";
import {
  AbsoluteCenter,
  Box,
  Text,
  VStack,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { OrderDetail } from "@/components/OrderDetail";
//key to decrypt for testing
const secretKey: string = "mySecretKey12345";
let temporalToken: string =
  "U2FsdGVkX1/klyAXsuk6zSNl7Y1jH1gqSk4jsfLO/XrEJnfkkZJ3GCQF7tZ7pghIA48XxYXMR0YkNHTjOMpLTPjIXIxs3ftvVTLF9UlHhqpb19OM3oIOeNPwEfvGOoiLj1WUrW/EWcbgOEOzUlXbE1RB1oXBX+cb0n3qWx3zwN0OmxvkGGoQLX44EdxbJQU7o66hysvBdmWTMoN3pYkjYwaCfRWJDFPB7/0NhEIVLlXfKDW50d3mbr4Si3u1mpps6jtmkwYLikp9ifSqP+QtV+CGGYk625z5Yr83xQjAm1simO6HqNNI2wF/mNsC36GjvIvmyqPliSrtBakze8aEXWMi9MloU6kJC4DrIUXpapFfaTsn/UPoFVzBCuJHXCahm2oGclgjWwvbB5ogudXjDK1IOsy5QQ1iTKg4Awkzlx8X/fVx5YFFnhKxl8rH82Ndpb4wiZvUWSeK3Nr16XRv24VKRXgF7QCb/pAtFNwn1/a+STQ748s3Je5Ctkqf5+MDqa6vSp+Ppzc35V2U2s93g6golCz1P8Q/xlkuFn37HBU=";

export default function DecryptDetails({
  params,
}: {
  params: { token: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DecryptedData | null>(null);

  //integrate a service to ask for the token through the id we receive
  useEffect(() => {
    async function getParams() {
      setLoading(true);
      let identification = await params.token;

      console.log("here we have the identifier ", identification);
      //1. get token
      //2. decrypt
      //const tokenFromDB = decrypt(identification, secretKey);
      const dataDecrypted = decrypt(temporalToken, secretKey);
      console.log("data from DB ", dataDecrypted);

      setData(dataDecrypted);
      setLoading(false);
    }
    getParams();
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loader active={loading} />
      ) : (
        <>
          <Box>
            <Center>
              <AbsoluteCenter>
                <VStack>
                  <Heading margin={25} marginTop={40}>
                    Order Details
                  </Heading>
                  <Text>This are the details of your purchase</Text>

                  <OrderDetail data={data} />
                  <Text> PAYMENT TYPE</Text>
                  <VStack>
                    <Button>Add Credit/Debit Card</Button>
                    <Button>Pay with ZoraPay Credit</Button>
                  </VStack>
                  <Button onClick={()=> {
                    console.log('Place order!');
                  }} size={'xl'} variant={'surface'} >Place Order</Button>
                </VStack>
              </AbsoluteCenter>
            </Center>
          </Box>
        </>
      )}
    </div>
  );
}
