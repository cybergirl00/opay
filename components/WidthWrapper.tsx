import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

const WidthWrapper = ({ children }: { children: ReactNode}) => {
  return (
    <View className='pl-4 pr-4 pb-12 '>
      {children}
    </View>
  )
}

export default WidthWrapper

const styles = StyleSheet.create({})