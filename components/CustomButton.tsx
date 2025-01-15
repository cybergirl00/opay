import { View, Text, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomButton = ({ type, onPress, name, isLoading }: { type?: string, onPress: any, name: string, isLoading?: boolean }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Spin animation effect
  useEffect(() => {
    if (isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000, // Adjust duration for speed
          easing: Easing.linear,
          useNativeDriver: true, // Use native driver for performance
        })
      );
      spinAnimation.start();
    } else {
      spinValue.setValue(0); // Reset animation when not loading
    }
  }, [isLoading]);

  // Spin value interpolation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className='p-7'>
      <TouchableOpacity
        className='items-center bg-[#02bb86] p-4 rounded-3xl'
        onPress={onPress}
        disabled={isLoading} // Disable button during loading state
      >
        {isLoading ? (
         <View>
          <Text className='text-white font-bold'><ActivityIndicator color={'white'} /></Text>
         </View>
        ) : (
          <Text className='text-white font-bold'>
            {name}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
