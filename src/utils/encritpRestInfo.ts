import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secure-key"; // Define una clave secreta fuerte y única

// Cifrar datos
export const encryptData = (data: any): string => {
  const stringifiedData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
};

// Descifrar datos
export const decryptData = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.stringify(decryptedData);
};
