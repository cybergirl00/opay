import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formatDate, formattedCurrency } from '@/lib/data';
import CustomButton from '@/components/CustomButton';

const TransactionDetail = () => {
    const { remarks, amount, date } = useLocalSearchParams();

    // Ensure remarks is treated as a string
    const safeRemarks = Array.isArray(remarks) ? remarks[0] : remarks;

    const extractBusinessName = (name: string): string | null => {
        const match = name.match(/from\s(.*?)\|/);
        return match ? match[1] : null;
    };
    
    const extractAfterPipe = (name: string): string | null => {
        const parts = name.split('|');
        return parts.length > 1 ? parts[1].trim() : null;
    };
    
    const extractAfterSecondPipe = (name: string): string | null => {
        const parts = name.split('|');
        return parts.length > 2 ? parts[2].trim() : null;
    };

    // Apply the extraction only if safeRemarks is defined
    const businessName = safeRemarks ? extractBusinessName(safeRemarks) : null;
    const result = safeRemarks ? extractAfterPipe(safeRemarks) : null;
    const enduser = safeRemarks ? extractAfterSecondPipe(safeRemarks) : null;

    return (
        <View>
            <View className='bg-white flex-row p-4 items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name='angle-left' size={20} />
                </TouchableOpacity>
                <Text className='text-md font-bold '>Transaction Details</Text>

                <FontAwesome name='headphones' size={20} color={'#02BB86'} />
            </View>

            <ScrollView className='p-4 gap-4'>
                <View className='bg-white p-5 rounded-lg'>
                    <Text className='text-center text-[12px] font-normal'>{remarks}</Text>
                    <Text className='text-center pt-4 text-3xl font-bold'>{formattedCurrency(amount)}</Text>
                    <Text className='text-sm text-green-400 font-semibold text-center'>Successful</Text>

                    <View className='flex flex-row p-2'>
                        {/* First line item */}
                        <View className='flex-row items-center'>
                            <View className='flex items-center p-1'>
                                <FontAwesome name='check-circle' size={16} color={'#4ade80'} />
                                <Text className='text-[10px] w-[49px] text-center pt-1 '>Payment Successful</Text>
                                <Text className='text-[9px] pt-1 text-gray-400'>{formatDate(date)}</Text>
                            </View>
                            {/* Add horizontal line */}
                            <View className='border-b border-green-400 w-10 ' />
                        </View>

                        {/* Second line item */}
                        <View className='flex-row items-center'>
                            <View className='flex items-center p-1'>
                                <FontAwesome name='check-circle' size={16} color={'#4ade80'} />
                                <Text className='text-[10px] w-[53px] text-center pt-1'>Processing by bank</Text>
                                <Text className='text-[9px] pt-1 text-gray-400'>{formatDate(date)}</Text>
                            </View>
                            {/* Add horizontal line */}
                            <View className='border-b border-green-400 w-10' />
                        </View>

                        <View className='flex-row items-center'>
                            <View className='flex items-center p-1'>
                                <FontAwesome name='check-circle' size={16} color={'#4ade80'} />
                                <Text className='text-[10px] w-[49px] text-center pt-1 '>Recieved by bank</Text>
                                <Text className='text-[9px] pt-1 text-gray-400'>{formatDate(date)}</Text>
                            </View>
                        </View>
                    </View>

                    <View className='pt-5'>
                    <View className='bg-gray-300 p-1 rounded-lg'>

<Text className='text-[8px] text-center text-gray-500 '>The recipient account is expected to be credited within 5 minutes, subject to notification by the bank</Text>
</View>
                    </View>

                    <View className='pt-4'>
                        <View className='flex-row p-1 justify-between items-center '>
                            <Text className='text-[12px] text-gray-500 font-normal '>Amount</Text>
                            <Text className='text-[12px] '>{formattedCurrency(amount)}</Text>
                        </View>
                        <View className='flex-row p-1 justify-between items-center '>
                            <Text className='text-[12px] text-gray-500 font-normal '>Fee</Text>
                            <Text className='text-[12px] '>{formattedCurrency(1.4)}</Text>
                            
                        </View>

                        <View className='flex-row p-1 justify-between items-center '>
                            <Text className='text-[12px] text-gray-500 font-normal '>Amount Paid</Text>
                            <Text className='text-[12px] '>{formattedCurrency(amount)}</Text>
                        </View>
                    </View>
                    
                </View>

                {/* <View className='bg-white p-5 rounded-lg'>
                    <Text className='text-md font-semibold'>Transaction Details </Text>
                </View> */}
            </ScrollView>

            <CustomButton name='Share Recipt' onPress={() => {}} />
        </View>
    );
};

export default TransactionDetail;

const styles = StyleSheet.create({});
