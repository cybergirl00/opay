import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import avatar from '@/assets/images/avatar.png';
import { storeBalance, useUserData } from '@/lib/zustand';
import axios from 'axios';
import { formattedCurrency } from '@/lib/data';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { getUserData } from '@/lib/storage';


interface UserDataProps {
  firstName: string;
  lastName: string;
  email: string
}

const Profile = () => {
  const { signOut } = useAuth();
  const [userData, setuserData] = useState<UserDataProps>()

  const {balance } = storeBalance((state) => state)
  
  const links = [
    { id: 1, name: 'Transaction History', path: '/transactions', icon: 'book' },
    { id: 2, name: 'Buy Data', path: '/data', icon: 'mobile-phone' },
    { id: 3, name: 'Buy Airtime', path: '/airtime', icon: 'mobile-phone' },
  ];

  useEffect(() => {
   const getUser = async () => {
    const store = await getUserData();

    // console.log(store)
    setuserData(store)

    // setUser
   }

   getUser();
  }, [userData])
  
  
  const logout = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData?.firstName} {userData?.lastName}</Text>
            <Text style={styles.accountInfo}> {userData?.email}</Text>
          </View>
        </View>
        <Text style={styles.balance}>{formattedCurrency(balance)}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.links}>
        {links.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(item.path)}
            style={styles.linkItem}
          >
            <View style={styles.linkContent}>
              <View style={styles.iconContainer}>
                <FontAwesome name={item.icon} size={15} color={'white'} />
              </View>
              <Text style={styles.linkText}>{item.name}</Text>
            </View>
            <FontAwesome name="angle-right" size={18} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 23
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountInfo: {
    fontSize: 12,
    color: '#888',
  },
  balance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  links: {
    marginTop: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 50,
  },
  linkText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#f44336',
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
  },
});
