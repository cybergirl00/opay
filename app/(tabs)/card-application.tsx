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
  const open = useOpenModal((state) => state.open)
  const setOpen = useOpenModal((state) => state.setOpen)
  

  const accountref = userData.accountRef
  const [Balance, setBalance] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          `https://api.flutterwave.com/v3/payout-subaccounts/${accountref}/balances?currency=NGN`,
          {
            headers: {
              Authorization: `Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X` // Replace with your actual secret key
            }
          }
        );
        const fetchedBalance = response.data.data.available_balance; 
        setBalance(fetchedBalance);
        console.log(fetchedBalance)
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    getBalance();
  }, [accountref]);
 const pay = async () => {
  setOpen(true)
 }

 const createCard = async () => {

  // setIsLoading(true);
  try {

    const response = await axios.post(
      'http:///%7Bbaseurl%7D/virtual-card-http/business/cards',
      {}, // Your payload here
      {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwd2JvcHhlc2I1dmdmMm8iLCJtYXhUaW1lIjoxODg3NDg3ODE5LCJtZWRpdW0iOiJhcGkifQ.-14Hj6Vqt915aKWds7PYLKD79h5xPN-xDFGm2P7lQnM'
        }
      }
    );

    console.log(response)


    // const response = await axios.post('https://8728-197-211-63-167.ngrok-free.app/create-card', {
    //   userId: userData.clerkId,
    //   cardRef: '123456'
    // })
    // console.log(response)
    // setOpen(false)
    // router.push('/')
  } catch (error) {
    console.error('Error details:', error);
  if (error.response) {
    console.log(error.response.data); // Response from server
    console.log(error.response.status); // HTTP Status
    console.log(error.response.headers); // Response headers
  } else if (error.request) {
    console.log(error.request); // Request sent to server
  } else {
    console.log('Error message:', error.message);
  }
  }
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
        <CustomButton name='Confirm and Pay' onPress={pay} />
      </View>

    
      {open && (
        <Modal transparent={true} animationType='slide'>
           <View className='flex-1 relative top-0'>
          <CustomModal>
            <ScrollView>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <FontAwesome name='close' size={20} color={'gray'}  />
              </TouchableOpacity>

              <Text className='text-center text-2xl font-extrabold'>{formattedCurrency(1000)}</Text>

              <View className='pt-5'>
                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Merchant Name</Text>
                  <Text className='font-semibold text-[12px] '>OPayCard Activate</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Amount</Text>
                  <Text className='font-semibold text-[12px] '>{formattedCurrency(1000)}</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Cashback</Text>
                  <Text className='font-semibold text-[12px] '>-{formattedCurrency(0)}</Text>
                </View>

              </View>

              <View className='p-2'>
                <View className='flex flex-row items-center p-1 justify-between'>
                <Text className='font-semibold text-sm'>Payment Method</Text>
                <View className='flex flex-row items-center gap-2 '>
                  <Text className='text-[12px] text-gray-500 '>All</Text>
                  <FontAwesome name='angle-right' color={'#6b7280'} />
                </View>
                </View>

                <View className='p-0.5 pt-4 gap-3'>

                  <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3'>
                    <View className='flex flex-row items-center gap-3 '>
                      <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                      <FontAwesome name='money' color={'#02bb86'} />
                      </View>
                     
                      <Text className='font-bold '>Wallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(Balance && Balance)})</Text></Text>
                    </View>

                    <FontAwesome name='check' size={20} color={'#02bb86'}  />
                  </TouchableOpacity>

                  <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3'>
                    <View className='flex flex-row items-center gap-3 '>
                      <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                      <FontAwesome name='money' color={'#02bb86'} />
                      </View>
                     
                      <Text className='font-bold '>OWallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(11)})</Text></Text>
                    </View>

                    {/* <FontAwesome name='check' size={20} color={''}  /> */}
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {Balance > 1000 ? 
                <View>
                  <Text className='text-center text-sm font-semibold text-red-500'>Insufficient fund, Please fund your wallet</Text>
                  </View>
                : 
                <View>
                  <CustomButton name='Pay' onPress={createCard} />
                </View>
                }

              </View>
            </ScrollView>
          </CustomModal>
        </View>
        </Modal>
      )}

      {isLoading && (
        <LoadingModal />
      )}
    </View>
  );
};

export default CardApplication;

const styles = StyleSheet.create({});
