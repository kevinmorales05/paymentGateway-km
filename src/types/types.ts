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