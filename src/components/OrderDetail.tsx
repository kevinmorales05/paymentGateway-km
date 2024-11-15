import { DecryptedData, OrderDetailsProps } from "@/types/types";
import { ShopOutlined } from "@ant-design/icons";
import { Box, VStack, Text, Heading, HStack } from "@chakra-ui/react";
import React from "react";

export const OrderDetail: React.FC<DecryptedData | null> = ({ data }) => {
  console.log("order ID ", data.id);
  return (
    <>
      <Box
        maxWidth="600px"
        margin="auto"
        padding="10"
        boxShadow="md"
        borderRadius="md"
        bg="white"
      >
        <VStack spacing={4} align="start">
          {/* <Text><strong>Order ID:</strong> {data.id}</Text>
        <Text><strong>Merchant ID:</strong> {data.merchantId}</Text>
        <Text><strong>Username:</strong> {data.username}</Text> */}
        <HStack>
            
            <ShopOutlined  style={{color:'black', fontSize:70, height:'auto'}} />
            <Text color={'black'}>Crispy Cones</Text>
         
            
        </HStack>

          {data.products.map((product) => (
            <Box
              key={product.id}
              padding="2"
              borderWidth="1px"
              borderRadius="md"
              width="100%"
              color={'black'}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">{product.name}</Text>
                <Text>${product.total.toFixed(2)}</Text>
              </HStack>
              <Text>Quantity: {product.cantidad}</Text>
              <Text>Subtotal: ${product.subtotal.toFixed(2)}</Text>
              <Text>Taxes: ${product.taxes.toFixed(2)}</Text>
            </Box>
          ))}

          <Box borderBottomWidth="2px" width="100%" my="4" />

          <VStack width="100%" align="start" color={'black'}>
            <HStack justify="space-between" width="100%">
              <Text fontWeight="bold">Subtotal</Text>
              <Text>${data.subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between" width="100%">
              <Text fontWeight="bold">Taxes</Text>
              <Text>${data.taxes.toFixed(2)}</Text>
            </HStack>
            <HStack justify="space-between" width="100%">
              <Text fontWeight="bold" fontSize="lg">
                Total
              </Text>
              <Text fontSize="lg">${data.total.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};
