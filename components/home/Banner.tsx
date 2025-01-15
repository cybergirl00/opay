import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import axios from 'axios';
import { formattedCurrency } from '@/lib/data';

const Banner = ({ accountref }: { accountref: string}) => {
  const [hidebalance, setHidebalance] = useState(true);
  const [Balance, setBalance] = useState(0)

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          `https://api.flutterwave.com/v3/payout-subaccounts/${accountref}/balances?currency=NGN`,
          {
            headers: {
              Authorization: `Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X` // Replace with your actual secret key
            }
          }
        );
        const fetchedBalance = response.data.data.available_balance; 
        setBalance(fetchedBalance);
        console.log(fetchedBalance)
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    getBalance();
  }, [accountref]);
  
  return (
    <View className="pt-6">
      <View className="w-full h-24 bg-[#02bb86] rounded-lg">
        {/* Use Tailwind classes for flex layout */}
        <View className="flex flex-row items-center justify-between p-3">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-[10px] font-semibold text-white">Available Balance</Text>
            <TouchableOpacity onPress={() => setHidebalance(!hidebalance)}>
              {hidebalance ? (
                <FontAwesome name="eye-slash" color={'white'} size={15} />
              ) : (
                <FontAwesome name="eye" color={'white'} size={15} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='flex-row  items-center gap-2'>
            <Text className="text-white text-[10px] ">Transaction History</Text>
            <FontAwesome name='angle-right' color={'white'} />
          </TouchableOpacity>
        </View>



        <View className='p-3'>
        <View className=' justify-between flex flex-row items-center '>
            
            <View>
            {hidebalance ? 
            <Text className='text-xl text-white font-bold'>****</Text>
          : <Text className='text-xl text-white font-bold'>{formattedCurrency(Balance && Balance)}</Text>  }
            </View>

          <View className=''>
            <TouchableOpacity className='bg-white flex-row w-[100%] p-1.5 rounded-full'>
                <View className='flex-row items-center gap-1.5 justify-center'>   
                 <FontAwesome name='plus' color={'#02bb86'} />
                <Text className='text-[10px]  text-[#02BB86] font-bold '>Add Money</Text></View>
            
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})
