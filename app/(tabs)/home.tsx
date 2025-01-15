import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import LoadingModal from '@/components/LoadingModal';
import Header from '@/components/home/Header';
import WidthWrapper from '@/components/WidthWrapper';
import Banner from '@/components/home/Banner';
import Actions from '@/components/home/Actions';

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (!user) return;
  
      try {
        const response = await fetch(`https://6f99-197-211-53-110.ngrok-free.app/get-user?clerkId=${user.id}`, { // Send clerkId as query parameter
          method: 'GET', 
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set the user data in state
          console.log(data)
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };
  
    getUser(); // Call getUser on component mount
  }, [user]);
  

  if (loading || !userData) {
    return <LoadingModal />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
     <WidthWrapper>
     <Header firstName={userData?.firstName} />

     <Banner accountref={userData.accountRef} />

     <Actions />
     </WidthWrapper>
    </View>
  );
};

export default Home;
