import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WidthWrapper from '@/components/WidthWrapper'
import { Link, router } from 'expo-router'
import Card from '@/components/card/Card'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomButton from '@/components/CustomButton'

const Cards = () => {

  const getCard = () => {
    router.push('/(tabs)/card-application')
  }
  return (
    <>
    <View className='p-4'>
        
          <View className=' flex  flex-row justify-between items-center'>
            <Text className='text-gray-900 text-xl font-bold'>Opay Cards</Text>
            <Link href={'/'} className='text-[12px] font-semibold text-[#02bb86]  '>Q&A</Link>
          </View>

          <View>
            <Text className='text-center pt-5 font-extrabold underline underline-offset-1'>Virtual Card</Text>

            <ScrollView className='p-2 pt-10'>
              <Card />

              <View className='pt-5 gap-1' >
                 
                <View 
                className='flex flex-row  items-center gap-5'
                >
                  <FontAwesome name='bolt' size={24} color='#02bb86' />

                  <View>
                    <Text className='font-semibold'>Instant Access</Text>
                    <Text className='font-semibold'>Apply and activate <Text className='text-[#02bb86] '> instantly</Text></Text>
                  </View>
                </View>

                <View 
                className='flex flex-row  items-center gap-5'
                >
                  <FontAwesome name='map' size={24} color='#02bb86' />

                  <View className=''>
                    <Text className='font-semibold'>Rep Your State of Origin</Text>
                    <Text className='font-semibold text-[#02bb86] text-sm w-[60%] '>Get a virtual OPay card unique to your state of origin</Text>
                  </View>
                </View>
                <View 
                className='flex flex-row  items-center gap-5'
                >
                  <FontAwesome name='globe' size={24} color='#02bb86' />

                  <View className=''>
                    <Text className='font-semibold'>Online Merchant Acceptance</Text>
                    <Text className='font-semibold  text-sm w-[36%] '>Accepted by <Text className='text-[#02bb86] '>40,000+</Text> online merchents, including JUMIA, KONGA,NETFLIX,UBER Wallet Funding and others</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View className='bg-white pb-4'>
            <CustomButton name='Get It Now' onPress={getCard}  />
          </View>
    </View>
    </>
  )
}

export default Cards

const styles = StyleSheet.create({})