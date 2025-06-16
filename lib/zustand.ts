import { create } from 'zustand';


interface ModalProps {
    open: boolean;
    setOpen: (value: boolean) => void
}
interface UserData {
    _id?: string;
    accountNumber?: string;
    accountRef?: string;
    amount?: number;
    bankName?: string;
    clerkId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    availableBalance: number
}

interface UserDataStore {
    data: UserData;
    setData: (data: UserData) => void;
}

interface BalanceStore {
    balance: number,
    setBalance: (value: number) => void
}

export const useUserData = create<UserDataStore>((set) => ({
    data: {},
    setData: (newData) => set({ data: newData }),
}));


export const useOpenModal = create<ModalProps>((set) => ({
    open: false,
    setOpen: (value: boolean) => set({ open: value})
}))

export const storeBalance = create<BalanceStore>((set) => ({
    balance: 0,
    setBalance: (balance: number) => set({balance: balance})
}));