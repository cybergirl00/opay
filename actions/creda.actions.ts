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

        console.log(response)

        return response
    } catch (error) {
        console.log(error)
    }
}