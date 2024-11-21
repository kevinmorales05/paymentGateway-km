"use client";
import Loader from "@/components/Loader";
import { CardInfo, DecryptedData, UserCards } from "@/types/types";
import { decrypt } from "@/utils/decrypt";
import {
  AbsoluteCenter,
  Box,
  Text,
  VStack,
  Center,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; //usar despues
import { useRouter } from "next/navigation";
import { OrderDetail } from "@/components/OrderDetail";
//context of the app
import { useAppContext } from "@/context/AppContext";
import CardSelector from "@/components/CardSelector";
import CardModalSelector from "@/components/CardModalSelector";
import { getPreferedCard } from "@/utils/functions";

//Dummie key and token to decrypt for testing
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
  const router = useRouter();
  //getContextVariables
  const { userInfo, sessionToken, userCards, setUserCards, closeSession } =
    useAppContext();

  const dummieUserCardsNull: UserCards = {
    userId: "anonimousUser",
    cards: null,
  };
  //integrate a service to ask for the token through the id we receive
  useEffect(() => {
    async function getParams() {
      setLoading(true);
      //let identification = await params.token;

      // console.log("here we have the identifier ", identification);

      //1. get token
      //2. decrypt
      //const tokenFromDB = decrypt(identification, secretKey);
      const dataDecrypted = decrypt(temporalToken, secretKey);
      console.log("data from DB ", dataDecrypted);

      setData(dataDecrypted);
      setLoading(false);
    }
    getParams();
    console.log("usercard ", userCards);
    if (userCards === null) {
      console.log("sesion anonima!");
      setUserCards(dummieUserCardsNull);
    }
  }, []);

  const placePayment = () => {
    console.log("Start Place Payment");
    //1. activate the loading process
    setLoading(true);
    //2. get the prefered card
    var preferedCard = getPreferedCard(userCards);
    //3. consume placepayment service, use the prefered card to send a payment
    console.log("prefered card ", preferedCard);

    //4. desactivate the loading modal
    //setLoading(false);
    //5. navigate to placeOrder success

    console.log("End of place order!");
    router.push("/placeOrder");
  };

  return (
    <div>
      {loading === true ? (
        <Loader active={loading} />
      ) : (
        <>
          <Box>
            <Center>
              <VStack>
                <Text marginTop={20}>
                  {" "}
                  Welcome {userInfo?.name} {userInfo?.lastName} !
                </Text>
                {userInfo !== null ? (
                  <>
                    <Button
                      onClick={() => {
                        console.log("Close Session");
                        closeSession();
                        router.push("/login");
                      }}
                    >
                      Close Session
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                <Heading margin={25} marginTop={10}>
                  ORDER DETAILS
                </Heading>

                <OrderDetail data={data} />
                <Text> PAYMENT TYPE</Text>
                <VStack>
                  {/* Card selected by default */}

                  {userCards?.cards === null ||
                  userCards?.cards === undefined ? (
                    <></>
                  ) : (
                    <>
                      <CardSelector
                        key={getPreferedCard(userCards).cardholderName}
                        cardInfo={getPreferedCard(userCards)}
                      />
                      <CardModalSelector
                        key={userCards?.userId}
                        cards={userCards?.cards}
                        userId="kevin"
                      />
                    </>
                  )}

                  <Button
                    onClick={() => {
                      console.log("Add credit/debit!");
                      router.push("/addcard");
                    }}
                  >
                    Add Credit/Debit Card
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Pay with Zora!");
                      router.push("/paywithZora");
                    }}
                  >
                    Pay with ZoraPay Credit
                  </Button>
                </VStack>
                <Button
                  onClick={() => placePayment()}
                  size={"xl"}
                  variant={"surface"}
                  disabled={getPreferedCard(userCards) === null ? true : false}
                >
                  Place Order
                </Button>
              </VStack>
            </Center>
            
          </Box>
        </>
      )}
    </div>
  );
}
