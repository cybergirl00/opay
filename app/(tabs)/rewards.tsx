import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Banner from '@/components/reward/Banner'
import Card from '@/components/reward/Card'

const Rewards = () => {
  return (
    <ScrollView className='pb-[40px] ' contentContainerStyle={{paddingBottom: 40}}>
    <Banner />

    <View>
      <View className='p-4 flex-row  justify-between items-center '>
      <Text className='font-semibold'>Popular Challenge</Text>
      <Text className='text-[14px] text-[#02BB86]  font-semibold '>Create one</Text>
      </View>

      {/* Cards */}
      <View className='pt-5'>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row gap-5  ' 
      contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {[1,2,3,4].map((item) => (
          <View key={item} >
            <Card />
          </View>
        ))}
      </ScrollView>
    </View>
      </View>
    </ScrollView>
  )
}

export default Rewards

const styles = StyleSheet.create({})