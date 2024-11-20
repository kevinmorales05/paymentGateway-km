'use client'
import { useAppContext } from '@/context/AppContext';
import { AbsoluteCenter, Heading, VStack } from '@chakra-ui/react';

import React from 'react';

export default function placeOrder() {

  const { userInfo} = useAppContext();
  return (
    <div>
      <AbsoluteCenter>
        <VStack>
        <Heading>Your payment was sent successfully!</Heading>
        <p>We'll email you the receipt to {userInfo?.username} </p>
        </VStack>
      
      </AbsoluteCenter>


    </div>

  )
}
