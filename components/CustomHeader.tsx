import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, router } from 'expo-router'

const CustomHeader = ({ title, left, leftLink} : { title: string, left: string, leftLink: string}) => {
  return (
    <View className='bg-white flex-row items-center justify-between p-3'>
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name='angle-left' size={20} />
      </TouchableOpacity>
      <Text className='text-md font-semibold'>{title}</Text>
      <Link href={'/'} className='text-green-500 text-[12px] font-semibold' >{left}</Link>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})