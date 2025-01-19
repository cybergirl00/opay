import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomHeader'
import WidthWrapper from '@/components/WidthWrapper'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import axios from 'axios'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { flutterwaveKey } from '@/lib/keys'

const BankTransfer = () => {
    const [openBankModal, setOpenBankModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState<{ account_name?: string; account_number?: string }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBank, setSelectedBank] = useState<{ name: string | null; code: string | null }>({
        name: null,
        code: null,
      });
      const [accountNumber, setAccountNumber] = useState<string | null>(null);
      const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);

    const filteredBanks = banks.filter(bank =>
        bank?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    useEffect(() => {
     const getBanks = async () => {
        try {
            const response = await axios.get('https://api.flutterwave.com/v3/banks/NG', {
                headers: {
                    Authorization: `Bearer ${flutterwaveKey}`,
                    "Content-Type": 'application/json'
                }
            })
            setBanks(response.data.data)
        } catch (error) {
            console.log(error)
        }
     }

     getBanks();
    }, [])

    const selectbank = (name: string, code: string) => {
        setSelectedBank({name , code});
        setOpenBankModal(false)
    }

    const getdetails = async () => {
        if(accountNumber ?? selectedBank.code) {
            try {
                setIsLoading(true);
                const response = await axios.post(`https://api.flutterwave.com/v3/accounts/resolve`, {
                    account_number: accountNumber,
                    account_bank: selectedBank.code
                },
                 {
                    headers: {
                        Authorization: `Bearer ${flutterwaveKey}`,
                         'Content-Type': 'application/json'
                    }
                })

                if(response.data.status === 'success') {
                    setIsLoading(false);
                    setCustomerDetails(response.data.data)
                    console.log(response.data.data);
                    setDetailsModal(true)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
                alert('Account cannot be found please confirm the details.')
            } finally {
                setIsLoading(false)
            }
        }
    }
    
  return (
    <View>
        <CustomHeader title='Transfer To Bank Account'  left='History' />
        

        <WidthWrapper>
            <View className='pt-4'>

                <View className='bg-white w-auto rounded-lg p-3'>
                    <Text className='p-2 text-[12px] font-semibold '>Recipient Account</Text>

                    <View className='p-2 gap-4 '>
                        <TextInput placeholder='Enter 10 digits Account Number' onChangeText={(text: string) => setAccountNumber(text)} keyboardType='number-pad' className='border-b  border-gray-200 text-[12px] ' />
                       <View>
                        <TouchableOpacity onPress={() => setOpenBankModal(true)} className=''>
                            {selectedBank.name  !== null ? 
                             <View className='flex-row p-1 gap-3 items-center ' >
                             
                             <View className='bg-green-500 rounded-full  p-1'>
                        <FontAwesome name='bank' size={13} color={'white'} />
                        </View>
                        <Text className='text-gray-900 text-[15px]  font-semibold  '>{selectedBank.name}</Text>
                             </View>
                              : (
                                 <View  className='flex-row justify-between p-1 items-center'>
                                 <Text className='text-gray-400 text-[12px]  '>Select Bank</Text>
                                 <FontAwesome name='angle-right' />
                                 </View>
                            ) }
                        </TouchableOpacity>
                       </View>
                    </View>

                    {accountNumber && selectedBank.code !== null && (
                        <CustomButton name='Send Money ' onPress={getdetails} isLoading={isLoading} />
                    )}
                </View>
            </View>
        </WidthWrapper>

        <Modal visible={openBankModal}>
            <View className='p-3'>
                <View className='flex-row p-2 items-center bg-white '>
                    <TouchableOpacity onPress={() => setOpenBankModal(!openBankModal)}>
                    <FontAwesome name='close' size={20} />
                    </TouchableOpacity>
                    <Text className='left-[35%] font-semibold'>Select Bank</Text>
                </View>

                <View className='justify-center p-4'>
                <View className='flex-row   items-center pl-4 border border-gray-200 rounded-lg'>
                    {/* <FontAwesome name='search' size={13} /> */}
                    <TextInput placeholder='Search here' placeholderTextColor={'gray'} className='' onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery} />
                </View>
                </View>
                <ScrollView className='pt-5  pr-2 gap-3'>
                {filteredBanks.map((bank) => (
                    <TouchableOpacity className='flex-row p-1 gap-2' onPress={() => selectbank(bank.name, bank.code)} >
                        <View className='bg-green-500 rounded-full  p-1'>
                        <FontAwesome name='bank' size={17} color={'white'} />
                        </View>
                        <Text>{bank?.name}</Text>
                        </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        </Modal>

        <Modal visible={detailsModal} transparent={true}>
            <View className='flex-1 justify-center items-center bottom-[50px]  p-4 bg-[rgb(0,0,0)] '>
                <View className='bg-white h-fit w-[100%] rounded-lg shadow-2xl  shadow-green-500 '>
                    <TouchableOpacity className='pl-4 pt-4' onPress={() => setDetailsModal(false)} >
                        <FontAwesome name='close' size={20} />
                    </TouchableOpacity>
                    <Text className='text-center text-gray-900 font-semibold text-md pt-3'>{selectedBank.name}</Text>
                    <Text className='text-center font-extrabold text-2xl pt-3'>{customerDetails?.account_name}</Text>
                    <Text className='text-center font-extrabold text-lg pt-3'>{customerDetails?.account_number}</Text>

                    <CustomButton name='Continue' onPress={() => router.push({
                        pathname: '/(tabs)/transfer',
                        params: {
                            account_number: customerDetails.account_number,
                            account_name: customerDetails.account_name,
                            title: 'Transfer to Bank Account',
                            bankName: selectedBank.name,
                            bankCode: selectedBank.code
                        }
                    })} />
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default BankTransfer

const styles = StyleSheet.create({})