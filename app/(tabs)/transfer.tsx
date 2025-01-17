import { Modal, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomHeader';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formattedCurrency } from '@/lib/data';
import CustomButton from '@/components/CustomButton';
import CustomModal from '@/components/CustomModal';
import { useUserData } from '@/lib/zustand';
import axios from 'axios';

const Transfer = () => {
    const {  account_name, account_number, title, bankName, bankCode } = useLocalSearchParams();
    const [amount, setAmount] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false)
    const userData = useUserData((state) => state.data)

    const quick = [
        { id: 1, amount: 500 },
        { id: 2, amount: 1000 },
        { id: 3, amount: 2000 },
    ]
    const [Balance, setBalance] = useState(0)

  
    useEffect(() => {
        const getBalance = async () => {
          try {
            const response = await axios.get(
              `https://api.flutterwave.com/v3/payout-subaccounts/${userData.accountRef}/balances?currency=NGN`,
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
      }, [userData.accountRef]);

    const openModal = async  () => {
        if (amount < 100) {
            alert('The minmum amount is 100 and the maximum is 5,000,000');
        } else {
           setModal(!modal)
        }
    }

    const sendMoney = async () => {
        setIsLoading(true);
        try {
            const sendMoney = await axios.post(' https://4193-197-211-63-167.ngrok-free.app/transfer', {
                account_number: account_number,
                account_bank: bankCode,
                amount: amount,
                debit_subaccount: userData.accountRef,
                narration: remarks,
                currency: 'NGN'
    });
    if(sendMoney.data.status === 'success') {
        await axios.post('https://4193-197-211-63-167.ngrok-free.app/transaction', {
            ref: sendMoney.data.data.id,
            userId: userData.clerkId,
            type: 'transfer',
            points: 2
           }).then(() => {
            setIsLoading(false)
            alert('Transfer succesful')
            router.push({pathname: '/(tabs)/transaction-details', params: {
                remarks: remarks,
                amount: amount,
                date: new Date().toISOString(),
            }})
           })
    } else {
        alert('Transfer failed please try again after some thime ')
    }
    console.log(sendMoney.data.data)
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setModal(false)
        } finally {
            setModal(false)
            setIsLoading(false)
        }
    }
  return (
    <View>
      <CustomHeader title={title || ''} />

      <View className='flex-row p-1 pl-5 pt-3 gap-3 items-center'>
    {/* Bank Icon Container */}
    <View className='bg-gray-200 border border-green-500 h-12 w-12 justify-center items-center rounded-full'>
        <FontAwesome name='bank' size={25} color={'black'} />
    </View>

    {/* Account Details */}
    <View>
        <Text className='font-bold text-xl'>{account_name || 'N/A'}</Text>
        <Text className='text-gray-500 font-semibold'>
            {account_number || 'N/A'} | {bankName || 'N/A'}
        </Text>
    </View>
</View>


      <View className='p-5 rounded-lg '>
        <View className='bg-white h-fit w-fit p-4 rounded-lg '>
            <Text className='text-[12px] font-semibold '>Amount</Text>

            <View className='flex-row p-2 items-center gap-3 border-b border-gray-200'>
                <Text className='font-extrabold text-2xl'>N</Text>
                <TextInput placeholder='100.00 - 5,000,000' className='text-xl' onChangeText={(value: number) => setAmount(value)} value={amount} keyboardType='number-pad' />
            </View>

            <View className='p-2 flex-row items-center gap-5 pt-5'>
                {quick.map((item) => (
                    <TouchableOpacity key={item.id} className='border w-20 border-gray-200 h-8 items-center justify-center rounded-full' onPress={() => setAmount(item.amount)}>
                        <Text className='text-[10px] font-semibold '>{formattedCurrency(item.amount)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
      </View>

      
      <View className='p-5 rounded-lg '>
        <View className='bg-white h-fit w-fit p-4 rounded-lg '>
            <Text className='text-[12px] font-semibold '>Remark</Text>

            <View className='flex-row p-3 items-center gap-3 border-b border-gray-200'>
                <TextInput placeholder='What is this for (optional) ' className='text-sm' onChangeText={(value: string) => setRemarks(value)} value={remarks} />
            </View>
        </View>
      </View>

      <CustomButton name='Continue' onPress={openModal} isLoading={isLoading} />

      <Modal transparent={true} animationType='slide' visible={modal}>
           <View className='flex-1 relative top-0'>
          <CustomModal>
            <ScrollView>
              <TouchableOpacity onPress={() => setModal(!modal)}>
                <FontAwesome name='close' size={20} color={'gray'}  />
              </TouchableOpacity>

              <Text className='text-center text-2xl font-extrabold'>{formattedCurrency(amount)}</Text>

              <View className='pt-5'>
                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Bank Name</Text>
                  <Text className='font-semibold text-[12px] '>{bankName}</Text>
                </View>
                
                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Account Number</Text>
                  <Text className='font-semibold text-[12px] '>{account_number}</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Account Name</Text>
                  <Text className='font-semibold text-[12px] '>{account_name}</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Amount</Text>
                  <Text className='font-semibold text-[12px] '>{formattedCurrency(amount)}</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Bonus Reward </Text>
                  <Text className='font-semibold text-[12px] text-green-500 '>+2 points</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Transaction fee</Text>
                  <Text className='font-semibold text-[12px] '>{formattedCurrency(0)}</Text>
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
                     
                      <Text className='font-bold '>OWallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(userData?.amount ?? 0 )})</Text></Text>
                    </View>

                    {/* <FontAwesome name='check' size={20} color={''}  /> */}
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {Balance < amount ? 
                <View>
                  <Text className='text-center text-sm font-semibold text-red-500'>Insufficient fund, Please fund your wallet</Text>
                  </View>
                : 
                <View>
                  <CustomButton name='Pay' onPress={sendMoney} isLoading={isLoading} />
                </View>
                }

              </View>
            </ScrollView>
          </CustomModal>
        </View>
        </Modal>
    </View>
  )
}

export default Transfer

const styles = StyleSheet.create({})