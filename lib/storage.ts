import AsyncStorage from '@react-native-async-storage/async-storage';


interface UserDataProps {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
export const storeUserData = async (userData: UserDataProps ) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};


export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};


export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error("Error removing user data:", error);
  }
};
