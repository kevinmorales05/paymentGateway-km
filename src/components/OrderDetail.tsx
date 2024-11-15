import { DecryptedData, OrderDetailsProps } from "@/types/types";
import { Box, VStack, Text, Heading, HStack } from "@chakra-ui/react";
import React from "react";

export const OrderDetail: React.FC<DecryptedData | null> = ({ data }) => {
    
  return (
    <>
      <Box maxWidth="600px" margin="auto" padding="10" boxShadow="md" borderRadius="md" bg="white">
      <VStack spacing={4} align="start">
        <Heading size="lg">Order Summary</Heading>
        
        <Text><strong>Order ID:</strong> {data.id}</Text>
        <Text><strong>Merchant ID:</strong> {data.merchantId}</Text>
        <Text><strong>Username:</strong> {data.username}</Text>

        <Box borderBottomWidth="1px" width="100%" my="4" />

        <Heading size="md">Products</Heading>

        {data.products.map((product) => (
          <Box key={product.id} padding="2" borderWidth="1px" borderRadius="md" width="100%">
            <HStack justify="space-between">
              <Text fontWeight="bold">{product.name}</Text>
              <Text>${product.total.toFixed(2)}</Text>
            </HStack>
            <Text>Quantity: {product.cantidad}</Text>
            <Text>Subtotal: ${product.subtotal.toFixed(2)}</Text>
            <Text>Taxes: ${product.taxes.toFixed(2)}</Text>
          </Box>
        ))}

        <Box borderBottomWidth="1px" width="100%" my="4" />

        <VStack width="100%" align="start">
          <HStack justify="space-between" width="100%">
            <Text fontWeight="bold">Subtotal</Text>
            <Text>${data.subtotal.toFixed(2)}</Text>
          </HStack>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="bold">Taxes</Text>
            <Text>${data.taxes.toFixed(2)}</Text>
          </HStack>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="bold" fontSize="lg">Total</Text>
            <Text fontSize="lg">${data.total.toFixed(2)}</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
    </>
  );
};
