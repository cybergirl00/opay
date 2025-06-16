import { getUserData } from "@/lib/storage"
import { useUserData } from "@/lib/zustand"
import { CreateCredaAccountProps } from "@/types"
import axios from "axios"

const baseUrl = process.env.EXPO_PUBLIC_CREDA_BASE_URL
const secretKey = process.env.EXPO_PUBLIC_CREDA_SECRET_KEY


export const createCredaAccount = async ({bvn, firstName, lastName, phoneNumber, email}: CreateCredaAccountProps) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/account/create-account`, {
            "bvn": bvn,
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "email": email
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        return response
    } catch (error) {
        console.log(error)
    }
}

export const getUserbyEmail = async () => {
    const user = await getUserData()
    try {
        const response = await axios.post(`${baseUrl}/api/v1/account/getAccountbyEmail`, {
            "email": user?.email
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        console.log(response.data)

        return response;
    } catch (error) {
        console.log(error)
    }
}

export const signInUserbyEmail = async ({ email }: { email: string}) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/account/getAccountbyEmail`, {
            "email": email
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        console.log(response.data)

        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getBalance = async (id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/account/getBalance/${id}`, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        console.log(response.data)

        return response
    } catch (error) {
        console.log(error)
    }
}

export const fetchTransactions = async (id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/transactions/fetchTransactionbyUserid/${id}`, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        // console.log(response.data)

        return response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
      console.log("📛 Axios error occurred:");
      console.log("🔹 Message:", error.message);
      if (error.response) {
        console.log("🔹 Status:", error.response.status);
        console.log("🔹 Data:", error.response.data);
        console.log("🔹 Headers:", error.response.headers);
      } else if (error.request) {
        console.log("🔹 No response received:", error.request);
      }
    } else {
      console.log("⚠️ Non-Axios error:", error);
    }
    }
}

export const buyAirtime = async (phoneNumber: string | undefined, networkId: string, amount: number) => {
    const user = await getUserbyEmail();

    console.log('From actions',user?.data.data)
    try {
        const response = await axios.post(`${baseUrl}/api/v1/vtu/airtime`, {
            "phoneNumber": phoneNumber,
            "networkId": networkId,
            "amount": amount,
            "accountId": user?.data.data._id
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        console.log(response.data)

        return response
    } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("📛 Axios error occurred:");
      console.log("🔹 Message:", error.message);
      if (error.response) {
        console.log("🔹 Status:", error.response.status);
        console.log("🔹 Data:", error.response.data);
        console.log("🔹 Headers:", error.response.headers);
      } else if (error.request) {
        console.log("🔹 No response received:", error.request);
      }
    } else {
      console.log("⚠️ Non-Axios error:", error);
    }
  }
}


export const fetchRates = async () => {
    
    try {
        const response = await axios.get(`${baseUrl}/api/v1/vtu/getRates`);

        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const buyDataPlan = async (code: string, phoneNumber: string | undefined) => {
     const user = await getUserbyEmail();

     try {
        const response = await axios.post(`${baseUrl}/api/v1/vtu/data/`, {
            "code": code,
            "phoneNumber": phoneNumber,
            "accountId": user?.data.data._id
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        return response;
     } catch (error: any) {
         if (axios.isAxiosError(error)) {
      console.log("📛 Axios error occurred:");
      console.log("🔹 Message:", error.message);
      if (error.response) {
        console.log("🔹 Status:", error.response.status);
        console.log("🔹 Data:", error.response.data);
        console.log("🔹 Headers:", error.response.headers);
      } else if (error.request) {
        console.log("🔹 No response received:", error.request);
      }
    } else {
      console.log("⚠️ Non-Axios error:", error);
    }
     }
}

export const transferInterBank = async ({ accountNumber, amount }: { accountNumber: string, amount: number, }) => {
      const user = await getUserbyEmail();
    try {
        const response = await axios.post(`${baseUrl}/api/v1/transactions/createwithinBankTransfer`, {
            "accountNumber": accountNumber,
            "amount": amount,
            "accountId": user?.data.data._id
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        return response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
      console.log("📛 Axios error occurred:");
      console.log("🔹 Message:", error.message);
      if (error.response) {
        console.log("🔹 Status:", error.response.status);
        console.log("🔹 Data:", error.response.data);
        console.log("🔹 Headers:", error.response.headers);
      } else if (error.request) {
        console.log("🔹 No response received:", error.request);
      }
    } else {
      console.log("⚠️ Non-Axios error:", error);
    }
    }
}

export const transferOuterBank = async ({ accountNumber, amount, bankCode, narration }: { accountNumber: string, amount: number, bankCode: string, narration?: string}) => {
     const user = await getUserbyEmail();
    try {
        const response = await axios.post(`${baseUrl}/api/v1/transactions/createOuterbankTransfer`, {
            "accountNumber": accountNumber,
            "amount": amount,
            "accountId": user?.data.data._id,
            "bankCode": bankCode,
            "narration": narration
        }, {
            headers: {
                "Authorization": `Bearer ${secretKey}`
            }
        });

        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
      console.log("📛 Axios error occurred:");
      console.log("🔹 Message:", error.message);
      if (error.response) {
        console.log("🔹 Status:", error.response.status);
        console.log("🔹 Data:", error.response.data);
        console.log("🔹 Headers:", error.response.headers);
      } else if (error.request) {
        console.log("🔹 No response received:", error.request);
      }
    } else {
      console.log("⚠️ Non-Axios error:", error);
    }
    }
}

export const resolvebankDetails = async ({ accountNumber} : { accountNumber: string}) => {
    try {
       const response = await axios.get(`${baseUrl}/api/v1/transactions/resolvebankDetails/${accountNumber}`, {
        headers: {
            "Authorization": `Bearer ${secretKey}`
        }
       });

       return response;
    } catch (error) {
        console.log(error)
    }
}