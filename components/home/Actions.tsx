import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {  bank, vtu } from '@/lib/data'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

type VtuItem = {
  id: string | number; // Ensure the id matches your data type
  to: string; // The route path
  icon: string; // The icon name used by FontAwesome
  title: string; // The text title
};

const Actions = () => {

  return (
    <View className='pt-5 gap-5'>

<View className='p-2 w-auto border border-gray-50 bg-gray-50 rounded-md '>
      <View className='flex flex-row flex-wrap pt-5 items-center justify-center gap-[15%]'>
        {bank.map((item: VtuItem) => ( 
            <TouchableOpacity className='gap-2' key={item.id}
            onPress={() => router.push(item.to)}
            >
                <View className='bg-green-100 w-auto h-auto p-3 justify-center items-center rounded-full'>
                    <FontAwesome name={item.icon} size={20} color={'#02bb86'} />
                </View>
                <Text className='text-[12px] text-center text-gray-800 font-normal'>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
      </View>
         {/* VTU */}

         <View className='p-2 w-auto border border-gray-50 bg-gray-50 rounded-md '>
      <View className='flex flex-row flex-wrap pt-5 items-center justify-center gap-[15%]'>
        {vtu.map((item: VtuItem) => ( 
            <TouchableOpacity className='gap-2' key={item.id}
            onPress={() => router.push(item.to)}
            >
                <View className='bg-green-100 w-auto h-auto p-3 justify-center items-center rounded-full'>
                    <FontAwesome name={item.icon} size={20} color={'#02bb86'} />
                </View>
                <Text className='text-[12px] text-center text-gray-800 font-normal'>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
      </View>
    </View>
  )
}

export default Actions

const styles = StyleSheet.create({})