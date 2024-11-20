"use client";

import { CardInfo, UserCards, UserInfo } from "@/types/types";
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
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [logged, setLogged] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userCards, setUserCards] = useState<UserCards | null>(null);

  const updateUserCards = (updatedCard: string) => {
    console.log('Before update: ', userCards?.cards);
    console.log('Card ID to update: ', updatedCard);
  
    // Ensure that the updated cards array is correctly mapped
    const cardsUpdated = userCards?.cards?.map(card => ({
      ...card, 
      priority: card.cardId === updatedCard ? 1 : 0, // Update priority for the matching card
    }));
  
    console.log('Updated cards: ', cardsUpdated);
  
    if (cardsUpdated && userCards) {
      setUserCards({
        ...userCards, // Preserve other properties
        cards: cardsUpdated, // Update only the cards property
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
