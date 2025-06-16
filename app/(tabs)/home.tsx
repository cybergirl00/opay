import { View, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import LoadingModal from '@/components/LoadingModal';
import Header from '@/components/home/Header';
import WidthWrapper from '@/components/WidthWrapper';
import Banner from '@/components/home/Banner';
import Actions from '@/components/home/Actions';
import { storeBalance, useUserData } from '@/lib/zustand';
import { getUserData } from '@/lib/storage';
import { getBalance, getUserbyEmail } from '@/actions/creda.actions';

// 👉 Socket import
import { getSocket } from '@/lib/socket';

interface UserDataProps {
  firstName: string | string[] | undefined;
  lastName: string;
  _id: string
}

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { setBalance, balance } = storeBalance((state) => state)
  const { data, setData } = useUserData((state) => state)

  
  useEffect(() => {
  const socket = getSocket();

  if (!data?.data?._id) return;

  socket.emit("join", data.data._id);
  console.log("✅ Joined socket room:", data.data._id);

  socket.on("balanceUpdate", ({ newBalance }) => {
    console.log("📦 balanceUpdate received:", newBalance);
    setBalance(newBalance);
  });

  const pingInterval = setInterval(() => {
    socket.emit("ping");
  }, 10000);

  return () => {
    socket.off("balanceUpdate");
    clearInterval(pingInterval);
  };
}, [data?.data?._id]); // ✅ Runs only when user ID is available



  const getUser = async () => {
    if (!user) return;
    setRefreshing(true);

    try {
      const response = await getUserbyEmail();

      if (response?.status === 200) {
        const user = await getUserData();
        const Balance = await getBalance(response?.data.data._id);

        console.log('User data:', user)

        setBalance(Balance?.data.balance);
        setUserData(user);
        setData(response.data);
        setLoading(false);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  if (loading || !data) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 25 }}>
      <WidthWrapper>
        <Header firstName={userData?.firstName} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getUser} />
          }
        >
          <Banner balance={balance} id={data?.data?.userId} />
          <Actions />
        </ScrollView>
      </WidthWrapper>
    </SafeAreaView>
  );
};

export default Home;
