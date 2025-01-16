import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { transfers, vtu } from '@/lib/data'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

const Actions = () => {
  return (
    <View className='pt-5 gap-5'>
      

      {/* TRANSFERS */}

      <View className='p-3 w-auto border border-gray-50 bg-gray-50 '>
      <View className='flex flex-row items-center justify-center gap-[15%]'>
        {transfers.map((item) => ( 
            <TouchableOpacity className='gap-2' key={item.id} onPress={() => router.push(item.to)}>
                <View className='bg-green-100 w-15 h-15 p-3 justify-center items-center rounded-full'>
                    <FontAwesome name={item.icon} size={14} color={'#02bb86'} />
                </View>
                <Text className='text-[12px] text-gray-800 font-normal'>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
      </View>

         {/* VTU */}

         <View className='p-2 w-auto border border-gray-50 bg-gray-50 rounded-md '>
      <View className='flex flex-row flex-wrap pt-5 items-center justify-center gap-[15%]'>
        {vtu.map((item) => ( 
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