import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import {Link, usePathname } from 'expo-router'
const AuthFooter = () => {
    const pathname = usePathname();
  return (
   <SafeAreaView className=''>
    {pathname === '/sign-in' ? (
        <View className='pb-10 flex flex-row items-center justify-center'>
            <Text className=' text-lg text-center'>Don't have an account?  </Text>
            <Link href='/sign-up'>
            <Text className=' text-[#02bb86] text-center text-lg'>create one</Text></Link>
        </View>
    ): (
        <View className='pb-10 flex flex-row items-center justify-center'>
        <Text className=' text-lg text-center'>Already have an account?  </Text>
        <Link href='/sign-in'>
        <Text className=' text-[#02bb86] text-center text-lg'>Log in</Text>
        </Link>
    </View>
    )}
    </SafeAreaView>
  )
}

export default AuthFooter