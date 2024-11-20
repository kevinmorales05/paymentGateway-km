import { CardInfo, propsCard } from "@/types/types";
import { CreditCardOutlined } from "@ant-design/icons";
import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
//context of the app
import { useAppContext } from "@/context/AppContext";


function CardSelector(props: propsCard) {
  const { updateUserCards } = useAppContext();
  return (
    <Button onClick={()=> {console.log("this is the id ", props.cardInfo?.cardId)
      updateUserCards(props.cardInfo?.cardId);

    }}>
      <HStack>
        <Text>{props.cardInfo.brand}</Text>
        <Text>xxxx-{props.cardInfo.last4}</Text>
        <CreditCardOutlined />
      </HStack>
    </Button>
  );
}

export default CardSelector;
