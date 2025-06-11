export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>
    saveToken: (key: string, token: string) => Promise<void>
    clearToken?: (key: string) => void
  }

  interface CreateCredaAccountProps {
    firstName: string;
    lastName: string;
    bvn: string;
    phoneNumber: string;
    email: string
  }