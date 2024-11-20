import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CardInfo, UserCards } from "@/types/types";
import CardSelector from "./CardSelector";
import { Heading, VStack } from "@chakra-ui/react";

export default function CardModalSelector(props: UserCards) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //context variables
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
        title="Cards previously used"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      
        <VStack>
        { props.cards !== null || props.cards !== undefined  ? <>
        {
            props.cards?.map((card: CardInfo) => {
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
