import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useOpenModal, useUserData } from '@/lib/zustand';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { formattedCurrency } from '@/lib/data';
import CustomButton from '@/components/CustomButton';
import CustomModal from '@/components/CustomModal';
import axios from 'axios';
import LoadingModal from '@/components/LoadingModal';

const CardApplication = () => {
  const [isLoading, setIsLoading] = useState(false)
  const userData = useUserData((state) => state.data);
  




const createCard = () => {
  router.push('/(tabs)/kyc')
}

  return (
    <View>
      {/* Header Section */}
      <View className="bg-white p-4 flex-row items-center gap-[20%] ">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={20} />
        </TouchableOpacity>
        <Text className="text-center text-sm font-semibold">Card Application</Text>
      </View>

      {/* Display User Data */}
      <ScrollView className='pt-5'>
      <View className="p-4  h-fit gap-7 ">
        <View className='bg-white p-2 rounded-lg'>
        <Text className='font-semibold text-gray-900 p-2'>Personal Information</Text>

        <View className='p-3 gap-3' >

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>First Name</Text>
            <Text className='font-bold text-[12px] '>{userData.firstName}</Text>
          </View>

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Last Name</Text>
            <Text className='font-bold text-[12px] '>{userData.lastName}</Text>
          </View>

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Email Address</Text>
            <Text className='font-bold text-[12px] '>{userData.email}</Text>
          </View>

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Phone Number</Text>
            <Text className='font-bold text-[12px] '>{userData.phone}</Text>
          </View>
        </View>
        </View>

        <View className='bg-white p-2 rounded-lg'>
        <Text className='font-semibold text-gray-900 p-2'>Account Details</Text>

        <View className='p-3 gap-3' >

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Wallet</Text>
            <Text className='font-bold text-[12px] '>
              <FontAwesome name='check' color={'#02bb86'} size={15}  />
            </Text>
          </View>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>OWallet</Text>
            <Text className='font-bold text-[12px] '>
              <FontAwesome name='check' color={'#02bb86'} size={15}  />
            </Text>
          </View>
        </View>
        </View>

        <View className='bg-white p-2 rounded-lg'>
        <Text className='font-semibold text-gray-900 p-2'>FEE and Charges</Text>

        <View className='p-3 gap-3' >

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Issurance Fee</Text>
            <Text className='font-bold text-[12px] '>{formattedCurrency(1000)}</Text>
          </View>

          <View className='flex flex-row items-center justify-between'>
            <Text className='text-gray-700 text-[12px] '>Maintance Fee</Text>
            <Text className='font-bold text-[12px] '>FREE</Text>
          </View>

         
        </View>
        </View>
      </View>
      </ScrollView>

      <View>
        <CustomButton name='Confirm and Pay' onPress={createCard} />
      </View>

    
    

      {isLoading && (
        <LoadingModal />
      )}
    </View>
  );
};

export default CardApplication;

const styles = StyleSheet.create({});
