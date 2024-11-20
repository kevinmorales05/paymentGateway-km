import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CardInfo, UserCards } from "@/types/types";
import CardSelector from "./CardSelector";
import { Heading, VStack } from "@chakra-ui/react";
//context of the app
import { useAppContext } from "@/context/AppContext";

export default function CardModalSelector(props: UserCards) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //context variables
  const { updateUserCards } = useAppContext();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Heading>Cards previously used</Heading>
        <VStack>
        { props.cards !== null ? <>
        {
            props.cards.map((card: CardInfo) => {
                return (
                  <>
                    <CardSelector
                      cardInfo={card}
                      key={card.cardId}
                  
                    />
                  </>
                );
              })
        }
        </> : <>
        
        <h1>Empty</h1></>}
        </VStack>
        

        
      </Modal>
    </>
  );
}
