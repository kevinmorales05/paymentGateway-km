"use client";

import {
  CardInfo,
  IAddCardInterface,
  UserCards,
  UserInfo,
} from "@/types/types";
import {
  get4lastNumbers,
  getMonth,
  getShortYear,
  identifyCardType,
} from "@/utils/functions";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { encryptData, decryptData } from "@/utils/encritpRestInfo"; // Importa la utilidad de cifrado

interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  logged: boolean;
  sessionToken: string | null;
  setSessionToken: (sessionToken: string | null) => void;
  setLogged: (logged: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  userCards: UserCards | null;
  setUserCards: (userCards: UserCards) => void;
  updateUserCards: (updatedCard: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  deleteUserCard: (cardId: string) => void;
  addUserCard: (newCard: IAddCardInterface) => void;
  closeSession: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Cargar datos iniciales descifrados desde sessionStorage
  const [user, setUser] = useState<string | null>(
    decryptData(sessionStorage.getItem("user") || "") || null
  );
  const [logged, setLogged] = useState<boolean>(
    decryptData(sessionStorage.getItem("logged") || "") === "true"
  );
  const [sessionToken, setSessionToken] = useState<string | null>(
    decryptData(sessionStorage.getItem("sessionToken") || "") || null
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    decryptData(sessionStorage.getItem("userInfo") || "") || null
  );
  const [userCards, setUserCards] = useState<UserCards | null>(
    decryptData(sessionStorage.getItem("userCards") || "") || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guardar datos cifrados en sessionStorage
  React.useEffect(() => {
    sessionStorage.setItem("user", encryptData(user || ""));
    sessionStorage.setItem("logged", encryptData(String(logged)));
    sessionStorage.setItem("sessionToken", encryptData(sessionToken || ""));
    sessionStorage.setItem("userInfo", encryptData(userInfo));
    sessionStorage.setItem("userCards", encryptData(userCards));
  }, [user, logged, sessionToken, userInfo, userCards]);

  const closeSession = () => {
    sessionStorage.clear();

    setUser(null);
    setLogged(false);
    setSessionToken(null);
    setUserInfo(null);
    setUserCards(null);
    setIsModalOpen(false);

    console.log("Session closed and storage cleared.");
  };

  const updateUserCards = (updatedCard: string) => {
    const cardsUpdated = userCards?.cards?.map((card) => ({
      ...card,
      priority: card.cardId === updatedCard ? 1 : 0,
    }));

    if (cardsUpdated && userCards) {
      setUserCards({
        ...userCards,
        cards: cardsUpdated,
        userId: userCards.userId,
      });
    }
  };

  const addUserCard = (newCard: IAddCardInterface) => {
    const tokenize = (cardNumber: string) => `token123-${newCard.cardNumber}abc`;

    const newCardCyphered = {
      cardId: tokenize(newCard.cardNumber),
      last4: get4lastNumbers(newCard.cardNumber),
      expMonth: getMonth(newCard.expDate),
      expYear: getShortYear(newCard.expDate),
      brand: identifyCardType(newCard.cardNumber),
      cardholderName: newCard.name,
      priority: 1,
    };

    const updatedCards =
      userCards?.cards?.map((card) => ({
        ...card,
        priority: 0,
      })) || [];

    updatedCards.push(newCardCyphered);

    if (userCards) {
      setUserCards({
        ...userCards,
        cards: updatedCards,
        userId: userCards.userId,
      });
    }
  };

  const deleteUserCard = (cardIdToDelete: string) => {
    const cardsAfterDeletion = userCards?.cards?.filter(
      (card) => card.cardId !== cardIdToDelete
    );

    if (cardsAfterDeletion && userCards) {
      setUserCards({
        ...userCards,
        cards: cardsAfterDeletion,
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
        closeSession,
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
