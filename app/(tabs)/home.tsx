import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-expo';
import LoadingModal from '@/components/LoadingModal';
import Header from '@/components/home/Header';
import WidthWrapper from '@/components/WidthWrapper';
import Banner from '@/components/home/Banner';
import Actions from '@/components/home/Actions';
import { useUserData } from '@/lib/zustand';

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Added for pull-to-refresh

  const setData = useUserData((state) => state.setData)
  const storedata = useUserData((state) => state.data)

  const getUser = async () => {
    if (!user) return;
    setRefreshing(true); // Start refreshing on fetch

    try {
      const response = await fetch(
        `https://c87a-197-211-63-167.ngrok-free.app/get-user?clerkId=${user.id}`, 
        { method: 'GET' }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after data fetch
    }
  };

  useEffect(() => {
    getUser(); // Fetch data on component mount
  }, [user]);

  if (loading || !storedata) {
    return <LoadingModal />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <WidthWrapper>
        <Header firstName={userData?.firstName} />
        
        {/* Added RefreshControl for pull-to-refresh */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getUser} />
          }
        >
          <Banner accountref={userData?.accountRef} />
          <Actions />
        </ScrollView>
      </WidthWrapper>
    </View>
  );
};

export default Home;
