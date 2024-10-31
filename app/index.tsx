import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { SignedOut, useUser, } from '@clerk/clerk-expo';
import axios from 'axios';

const Home = () => {
  const { user } = useUser();
  const [account, setAccount] = useState([])


  const fetchSubaccounts = async () => {
    try {
        const response = await axios.get('https://b15b-197-211-61-31.ngrok-free.app/list-subaccounts');
        console.log('Subaccounts:', response.data.data);
        setAccount(response.data.data);
    } catch (error) {
        console.error('Error fetching subaccounts:', error);
    }
}

// Fetch subaccounts when the component is mounted
useEffect(() => {
    fetchSubaccounts();
}, []);
 

  if(!user) return (<Redirect href={'/(auth)/sign-in'} />);

  return (
    <SafeAreaView>
      
        {account?.map((account) => (
          <Text>
            {account?.nuban}
            { ' '}
            {account?.bank_name}
            {' '}
            {account?.account_name}
         </Text>
        ))}
      
    </SafeAreaView>
  )
}

export default Home