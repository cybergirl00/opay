import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'
import WidthWrapper from '@/components/WidthWrapper'
import { useUserData } from '@/lib/zustand'
import CustomButton from '@/components/CustomButton'

const FundWallet = () => {

      const userData = useUserData((state) => state.data)
  return (
    <View>
      <CustomHeader title='Add Money' />
      <WidthWrapper>
        <View className='pt-5'>

            <View className='bg-white h-auto p-3 rounded-lg'>
                <Text className='text-[10px] text-gray-500 font-semibold pl-3 '>{userData.bankName} Account Number</Text>
                <Text className='p-3 text-2xl text-gray-900 font-bold  '>{userData.accountNumber}</Text>

               <View className='flex-row p-2 gap-4'>
                <TouchableOpacity className='bg-green-50  p-3 text-center w-[140px] rounded-full'>
                    <Text className='text-center text-green-500 font-semibold text-[12px]'>Copy Number</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-green-500  p-3 text-center w-[140px] rounded-full'>
                    <Text className='text-center text-white font-semibold text-[12px]'>Share Details</Text>
                </TouchableOpacity>
               </View>
            </View>
        </View>
      </WidthWrapper>
    </View>
  )
}

export default FundWallet

const styles = StyleSheet.create({})