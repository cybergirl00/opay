import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomHeader'
import WidthWrapper from '@/components/WidthWrapper'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import axios from 'axios'
import CustomButton from '@/components/CustomButton'

const BankTransfer = () => {
    const [openBankModal, setOpenBankModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState({
        name: null,
        code: null
    });
    const [accountNumber, setAccountNumber] = useState(null);
    const [banks, setBanks] = useState([])


    useEffect(() => {
     const getBanks = async () => {
        try {
            const response = await axios.get('https://api.flutterwave.com/v3/banks/NG', {
                headers: {
                    Authorization: `Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X`,
                    "Content-Type": 'application/json'
                }
            })
            setBanks(response.data.data)
            console.log(response.data.data)   
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
    
  return (
    <View>
        <CustomHeader title='Transfer To Bank Account'  left='History' />
        

        <WidthWrapper>
            <View className='pt-4'>

                <View className='bg-white w-auto rounded-lg p-3'>
                    <Text className='p-2 text-[12px] font-semibold '>Recipient Account</Text>

                    <View className='p-2 gap-4 '>
                        <TextInput placeholder='Enter 10 digits Account Number' onChangeText={(text) => setAccountNumber(text)} keyboardType='number-pad' className='border-b  border-gray-200 text-[12px] ' />
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
                        <CustomButton name='Send Money ' onPress={() => {}} />
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

                <ScrollView className='pt-5  pr-2 gap-3'>
                {banks.map((bank) => (
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
    </View>
  )
}

export default BankTransfer

const styles = StyleSheet.create({})