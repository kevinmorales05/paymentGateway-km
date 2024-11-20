"use client";

import {
  CardInfo,
  IAddCardInterface,
  UserCards,
  UserInfo,
} from "@/types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  user: string | null; //for anonymous payments
  setUser: (user: string | null) => void;
  logged: boolean; //set if a session is active
  sessionToken: string | null; //session token for all of the operations
  setSessionToken: (sessionToken: string | null) => void;
  setLogged: (logged: boolean) => void;
  userInfo: UserInfo | null; //information of the user account
  setUserInfo: (userInfo: UserInfo) => void;
  userCards: UserCards | null; //all of the attached cards of the user
  setUserCards: (userCards: UserCards) => void;
  updateUserCards: (updatedCard: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  deleteUserCard: (cardId: string) => void; // Delete a card by its ID
  addUserCard: (newCard: IAddCardInterface) => void; // Add a new card
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [logged, setLogged] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userCards, setUserCards] = useState<UserCards | null>(null);
  //close modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUserCards = (updatedCard: string) => {
    console.log("Before update: ", userCards?.cards);
    console.log("Card ID to update: ", updatedCard);

    // Ensure that the updated cards array is correctly mapped
    const cardsUpdated = userCards?.cards?.map((card) => ({
      ...card,
      priority: card.cardId === updatedCard ? 1 : 0, // Update priority for the matching card
    }));

    console.log("Updated cards: ", cardsUpdated);

    if (cardsUpdated && userCards) {
      setUserCards({
        ...userCards, // Preserve other properties
        cards: cardsUpdated, // Update only the cards property
        userId: userCards.userId,
      });
    }
  };
  const addUserCard = (newCard: IAddCardInterface
    ) => {
    console.log("Before addition: ", userCards?.cards);
    console.log("New card to add: ", newCard);
// tokenize the card number
const tokenize = (cardNumber: string) => {
  //substitute with the real service
  return `token123-${newCard.cardNumber}abc`
}
//get the last 4 numbers of the card
const get4lastNumbers = ( cardNumber: string) => {
  return cardNumber.slice(-4); 
}
//get the type of the card according to the first numbers
function identifyCardType(cardNumber: string) {
  if (/^4/.test(cardNumber)) {
    return "Visa";
  } else if (/^5[1-5]/.test(cardNumber) || /^222[1-9]/.test(cardNumber) || /^22[3-9]/.test(cardNumber) || /^2[3-6]/.test(cardNumber) || /^27[01]/.test(cardNumber) || /^2720/.test(cardNumber)) {
    return "MasterCard";
  } else {
    return "Unknown Card Type";
  }
}
//get month function
function getMonth(monthData:string) {
  const [, month] = monthData.split("-"); // Obtiene el segundo valor (el mes)
  return month;
}
// get short year
function getShortYear(monthData: string) {
  const [year] = monthData.split("-"); // Obtiene el primer valor (el año)
  return year.slice(-2); // Toma los últimos dos dígitos del año
}

    let newCardCyphered = {
      cardId: tokenize(newCard.cardNumber),
      last4: get4lastNumbers(newCard.cardNumber),
      expMonth: getMonth(newCard.expDate),
      expYear: getShortYear(newCard.expDate),
      brand: identifyCardType(newCard.cardNumber),
      cardholderName: newCard.name,
      priority: 1,
    };
    // Set the new card's priority to 1 and other cards' priority to 0
    const updatedCards =
      userCards?.cards?.map((card) => ({
        ...card,
        priority: 0, // Reset priority for existing cards
      })) || [];

    updatedCards.push(
      newCardCyphered
    );

    console.log("Cards after addition: ", updatedCards);

    if (userCards) {
      setUserCards({
        ...userCards, // Preserve other properties
        cards: updatedCards, // Update only the cards property
        userId: userCards.userId,
      });
    }
  };
  const deleteUserCard = (cardIdToDelete: string) => {
    console.log("Before deletion: ", userCards?.cards);
    console.log("Card ID to delete: ", cardIdToDelete);

    // Filter out the card with the specified cardId
    const cardsAfterDeletion = userCards?.cards?.filter(
      (card) => card.cardId !== cardIdToDelete
    );

    console.log("Cards after deletion: ", cardsAfterDeletion);

    if (cardsAfterDeletion && userCards) {
      setUserCards({
        ...userCards, // Preserve other properties
        cards: cardsAfterDeletion, // Update only the cards property
        userId: userCards.userId,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logged,
        setLogged,
        userInfo,
        setUserInfo,
        userCards,
        setUserCards,
        sessionToken,
        setSessionToken,
        updateUserCards,
        isModalOpen,
        setIsModalOpen,
        deleteUserCard,
        addUserCard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error in the context provider");
  }
  return context;
};
