export interface ILoginFormInput {
    email: string;
    password: string;
  }

export interface IRegisterFormInput {
    email: string;
    password: string;
    confirmPassword: string;
    name:string;
    lastName: string;
    dateOfBirth: Date;
    telephone: string;
}

export interface IUpdatePassword {
    email: string;
    password: string;
    confirmPassword: string;
    otp:string;
}

export interface propsLoader {
    active: boolean;
  }

//interface of the payment info
export interface DecryptedData {
    merchantId: string;
    products: { id: string, name: string; cantidad: number; subtotal: number; total: number, taxes: number; }[];
    subtotal: number;
    taxes: number;
    total: number;
    username: string;
    id: string;
  }
export interface OrderDetailsProps {
    data: DecryptedData;
  }

export interface IAddCardInterface {
  name: string;
  cardNumber: string;
  ccv: string;
  expDate: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  note?: string;
}

export interface UserInfo {
  username: string;
  name: string;
  lastName: string;
  userId: string;
}
export interface CardInfo {
  cardId: string; //here is the token
  last4: string; // name of the card to recordxxxx-3456
  expMonth: string;
  expYear: string;
  brand: string; //visa, mastercard, etc.
  cardholderName: string;
  priority: number; // 1 for priority, 0 no priority, 1 is the card configured for default payments
}
export interface UserCards {
  userId: string;
  cards: [CardInfo] | null;
}

export interface propsCard {
  cardInfo: CardInfo | null;
}