import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import LoadingModal from '@/components/LoadingModal';
import Header from '@/components/home/Header';
import WidthWrapper from '@/components/WidthWrapper';
import Banner from '@/components/home/Banner';
import Actions from '@/components/home/Actions';
import { useUserData } from '@/lib/zustand';
import axios from 'axios';

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const setData = useUserData((state) => state.setData)
  const storedata = useUserData((state) => state.data)
  // console.log('This is the data from strore' + storedata)
  console.log(user?.id)
  console.log(storedata)
  useEffect(() => {
    const getUser = async () => {
      if (!user) return;
  
      try {

        const response = await fetch(`https://4193-197-211-63-167.ngrok-free.app/get-user?clerkId=${user.id}`, { // Send clerkId as query parameter
          method: 'GET', 
        });

        console.log(response);
        console.log(response)
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data); 
          console.log(data)
          setData(data)
        } else {
          console.error('Failed to fetch user data', response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };
  
    getUser(); // Call getUser on component mount
  }, [user]);
  

 

  if (loading || !storedata) {
    return <LoadingModal />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
     <WidthWrapper>
     <Header firstName={userData?.firstName} />

     <ScrollView showsVerticalScrollIndicator={false}>
     <Banner accountref={userData?.accountRef} />
     <Actions />
     </ScrollView>
     </WidthWrapper>
    </View>
  );
};

export default Home;
