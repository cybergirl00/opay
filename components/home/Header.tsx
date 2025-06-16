import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import avatar from '@/assets/images/avatar.png'
import FontAwesome from '@expo/vector-icons/FontAwesome'
const Header = ({ firstName } : { firstName: string | undefined | string[]}) => {
  return (
    <View className='bg-white'>
        <View 
        className='pt-4 flex flex-row justify-between items-center' 
        style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 4, backgroundColor: '#fff'}}>
        <View className='flex flex-row items-center gap-2'>
        <Image source={avatar}  className='w-7 h-7 rounded-full' />
        <Text className='text-[12px] font-bold '>Hi, {firstName}</Text>
      </View>

      <View className='flex flex-row gap-2'>
      <TouchableOpacity>
            <FontAwesome name='headphones' size={13} />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome name='qrcode' size={13} />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome name='bell' size={13} />
        </TouchableOpacity>
      </View>
        </View>
     
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})