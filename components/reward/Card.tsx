import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Card = () => {
  return (
    <View className="bg-[#02BB86] w-[320px] h-fit rounded-2xl p-5 shadow-lg">
      {/* Title Section */}
      <Text className="text-white font-bold text-lg mb-2">
      🎯 Airtime Challenge
      </Text>
      <Text className="text-gray-100 text-md">
        Compete to buy the most airtime this month and win rewards!
      </Text>

      {/* Info Section */}
      <View className="flex-row justify-between items-center mt-5">
        <Text className="text-white text-sm">👥 12+ Members</Text>
        <Text className="text-white text-sm">⏳ Ends in 12 hrs</Text>
      </View>

      {/* Join Button */}
      <TouchableOpacity className="mt-5 bg-white py-2 rounded-lg items-center">
        <Text className="text-[#02BB86] font-bold text-lg">Join Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Card
