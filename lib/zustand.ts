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
}

interface UserDataStore {
    data: UserData;
    setData: (data: UserData) => void;
}

export const useUserData = create<UserDataStore>((set) => ({
    data: {},
    setData: (newData) => set({ data: newData }),
}));


export const useOpenModal = create<ModalProps>((set) => ({
    open: false,
    setOpen: (value: boolean) => set({ open: value})
}))