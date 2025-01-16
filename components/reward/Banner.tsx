import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import coin from '@/assets/images/coin.jpg'
import { formattedCurrency } from '@/lib/data'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

const Banner = () => {
  return (
    <ScrollView className="p-4">
      <View className="bg-white p-5 rounded-3xl border border-green-200 shadow-lg h-[160px] flex justify-between">
        
        {/* Header Section */}
        <Text className="text-gray-900 text-xl font-bold">🎉 Rewards</Text>

        {/* Points Section */}
        <View className="flex-row items-center gap-2">
          <Image source={coin} className="h-6 w-6" />
          <Text className="text-gray-500 font-medium text-sm">Points Earned</Text>
        </View>

        {/* Points Value Display */}
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-900 font-bold text-2xl">10 Points</Text>
          <Text className="text-3xl font-extrabold text-green-500">=</Text>
          <Text className="text-gray-900 font-bold text-2xl">{formattedCurrency(100)}</Text>
        </View>
      </View>

      {/* Bonus */}
      <View className='p-2'>
        <Text className='font-bold text-sm p-3' >Daily Bonus</Text>

        <View className='pt-3 gap-4'>
            <View className='flex-row p-2 items-center bg-gray-200 rounded-md w-[300px] justify-between'>
                <View className='bg-gray-100 h-[35px] w-[40px] justify-center items-center rounded-xl '>
                <FontAwesome name='mobile-phone' size={30} />
                </View>
                <View>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-semibold '>Buy Airtime</Text>
                        <View className='flex-row items-center gap-0.5'>
                        <Image source={coin} className="h-3 rounded-full  w-3" />
                        <Text className='text-[#02BB86] font-semibold text-[10px] '>+2 points</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 text-[10px] font-semibold '>Buy Airtime and get 2 points</Text>
                </View>

                <View className='p-2.5'>
                    <TouchableOpacity className='bg-[#02BB86] fit p-1 rounded-full w-[45px] items-center' onPress={() => router.push('/airtime')}>
                        <Text className='text-white font-bold  text-[12px] '>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex-row p-2 items-center bg-gray-200 rounded-md w-[300px] justify-between'>
                <View className='bg-gray-100 h-[35px] w-[40px] justify-center items-center rounded-xl '>
                <FontAwesome name='mobile-phone' size={30} />
                </View>
                <View>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-semibold '>Buy Data</Text>
                        <View className='flex-row items-center gap-0.5 '>
                        <Image source={coin} className="h-3 rounded-full  w-3" />
                        <Text className='text-green-500 font-semibold text-[10px] '>+3 points</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 text-[10px] font-semibold '>Buy Airtime and get 2 points</Text>
                </View>

                <View className='p-2.5'>
                    <TouchableOpacity className='bg-[#02BB86] fit p-1 rounded-full w-[45px] items-center' onPress={() => router.push('/data')}>
                        <Text className='text-white font-bold  text-[12px] '>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex-row p-2 items-center bg-gray-200 rounded-md w-[300px] justify-between'>
                <View className='bg-gray-100 h-[35px] w-[40px] justify-center items-center rounded-xl '>
                <FontAwesome name='mobile-phone' size={30} />
                </View>
                <View>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-semibold '>Send Money</Text>
                        <View className='flex-row items-center gap-0.5'>
                        <Image source={coin} className="h-3 rounded-full  w-3" />
                        <Text className='text-[#02BB86] font-semibold text-[10px] '>+2 points</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 text-[10px] font-semibold  w-[140px] '>Send money to friends  and get 3 points</Text>
                </View>

                <View className='p-2.5'>
                    <TouchableOpacity className='bg-[#02BB86] fit p-1 rounded-full w-[45px] items-center' onPress={() => router.push('/data')}>
                        <Text className='text-white font-bold  text-[12px] '>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex-row p-2 items-center bg-gray-200 rounded-md w-[300px] justify-between'>
                <View className='bg-gray-100 h-[35px] w-[40px] justify-center items-center rounded-xl '>
                <FontAwesome name='mobile-phone' size={30} />
                </View>
                <View>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-semibold '>Betting/Tv</Text>
                        <View className='flex-row items-center gap-0.5'>
                        <Image source={coin} className="h-3 rounded-full  w-3" />
                        <Text className='text-[#02BB86] font-semibold text-[10px] '>+2 points</Text>
                        </View>
                    </View>
                    <Text className='text-gray-500 text-[9px] font-semibold  w-[140px] '>fund your betting wallet and subscribe to your channel to get 4 points</Text>
                </View>

                <View className='p-2.5'>
                    <TouchableOpacity className='bg-[#02BB86] fit p-1 rounded-full w-[45px] items-center' onPress={() => router.push('/data')}>
                        <Text className='text-white font-bold  text-[12px] '>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Banner
