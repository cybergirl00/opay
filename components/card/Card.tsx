import { Text, View } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Card = () => {
  return (
    <View className='bg-[#02bb86] w-auto h-[170px] rounded-xl p-4'>
      {/* Card Title */}
      <Text className='text-white text-2xl font-bold leading-[34px]'>Opay</Text>

      {/* Card Footer Section */}
      <View className='relative top-[85px] flex flex-row justify-between items-center'>
        <Text className='font-light text-gray-100 text-md'>Virtual Card</Text>
        
        {/* Removed the className prop and used inline styles instead */}
        <FontAwesome name='cc-visa' color='white' size={24} style={{ paddingLeft: 16 }} />
      </View>
    </View>
  )
}

export default Card;
