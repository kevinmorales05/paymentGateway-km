import { UserCards } from "@/types/types";

export function getPreferedCard(userCards: UserCards | null){
  console.log('status userCards ', userCards);
    if (userCards !== null) {
      if(userCards.cards === null || userCards.cards === undefined){
        return null;
      }
      return userCards.cards.filter(
        (card) => card.priority === 1
      )[0];
    }
    return null;
      
  }
  //get the last 4 numbers of the card
  export const get4lastNumbers = ( cardNumber: string) => {
    return cardNumber.slice(-4); 
  }
  //get the type of the card according to the first numbers
  export function identifyCardType(cardNumber: string) {
    if (/^4/.test(cardNumber)) {
      return "Visa";
    } else if (/^5[1-5]/.test(cardNumber) || /^222[1-9]/.test(cardNumber) || /^22[3-9]/.test(cardNumber) || /^2[3-6]/.test(cardNumber) || /^27[01]/.test(cardNumber) || /^2720/.test(cardNumber)) {
      return "MasterCard";
    } else {
      return "Unknown Card Type";
    }
  }
  //get month function
  export function getMonth(monthData:string) {
    const [, month] = monthData.split("-"); // Obtiene el segundo valor (el mes)
    return month;
  }
  // get short year
  export function getShortYear(monthData: string) {
    const [year] = monthData.split("-"); // Obtiene el primer valor (el año)
    return year.slice(-2); // Toma los últimos dos dígitos del año
  }