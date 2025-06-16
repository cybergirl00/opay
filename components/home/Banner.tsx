import { StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { formatDate, formattedCurrency } from '@/lib/data';
import { useUserData } from '@/lib/zustand';
import { router } from 'expo-router';
import { flutterwaveKey } from '@/lib/keys';
import { fetchTransactions } from '@/actions/creda.actions';


interface Transaction {
  transactionType: 'CR' | 'DB' | 'Airtime' | "Data"; 
  remarks: string | null;
  amount: number;
  reference: string;
  date: string; 
  counterparty: {
    name: string,
    bankName: string,
    accountNumber: string
  }
}



const Banner = ({ balance, id }: { balance: number, id: string }) => {
  console.log(id)
  const [hidebalance, setHidebalance] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Added for pull-to-refresh
  const userData = useUserData((state) => state.data);

  

  useEffect(() => {
  const getTransaction = async () => {
    try {
      console.log(userData);

      const response = await fetchTransactions(id);

      if (response?.data?.transactions) {
        setTransactions(response.data.transactions);
      } else {
        setTransactions([]); // fallback to avoid undefined
      }

      console.log('Fetched transactions:', response?.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]); // fallback on error
    }
  };

  if (id) {
    getTransaction();
  }
}, [id]);

  
  return (
    <ScrollView
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      className="pt-6"
    >
      <View className="w-full h-24 bg-[#02bb86] rounded-lg">
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

          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => router.push('/(tabs)/transactions')}
          >
            <Text className="text-white text-[10px]">Transaction History</Text>
            <FontAwesome name="angle-right" color={'white'} />
          </TouchableOpacity>
        </View>

        <View className="p-3">
          <View className="justify-between flex flex-row items-center">
            <View>
              {hidebalance ? (
                <Text className="text-xl text-white font-bold">****</Text>
              ) : (
                <Text className="text-xl text-white font-bold">
                  {formattedCurrency(balance ? balance : 0)}
                </Text>
              )}
            </View>

            <View>
              <TouchableOpacity
                className="bg-white flex-row w-[100%] p-1.5 rounded-full"
                onPress={() => router.push('/fund')}
              >
                <View className="flex-row items-center gap-1.5 justify-center">
                  <FontAwesome name="plus" color={'#02bb86'} />
                  <Text className="text-[10px] text-[#02BB86] font-bold ">Add Money</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {!hidebalance && (
        <View className="pt-4 p-1">
          <View>
            {Array.isArray(transactions) && transactions.slice(0, 2).map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row p-2 border-b border-gray-200"
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/transaction-details',
                    params: {
                      remarks: item?.remarks,
                      amount: item.amount,
                      transactionNo: item?.reference,
                      date: item?.date,
                      counterpartyName: item.counterparty.name,
                      counterpartyBank: item.counterparty.bankName,
                      counterpartyAccountNumber: item.counterparty.accountNumber,
                      type: item.transactionType
                    },
                  })
                }
              >
                <View className="flex flex-row items-center gap-3 w-[70%]">
                  <View
                    className={`p-2 rounded-full ${
                      item?.transactionType !== 'CR' ? 'bg-red-100' : 'bg-green-100'
                    }`}
                  >
                    {item?.transactionType !== 'CR' ? (
                      <FontAwesome name="arrow-down" color="red" size={16} />
                    ) : (
                      <FontAwesome name="arrow-up" color="green" size={16} />
                    )}
                  </View>

                  <View>
                    <Text className="text-[10px] font-medium text-gray-700">
                      {item?.transactionType === 'Airtime' && 'Airtime Top up' || item?.transactionType === 'Data' && "Data Top up"  || item.transactionType === "CR" && `Transfer from ${item.counterparty.name}` || item.transactionType === "DB" && `Transfer to ${item.counterparty.name}` ||  'No description'} 
                    </Text>
                    <Text className="text-[10px] text-gray-500">
                      {formatDate(item?.date)}
                    </Text>
                  </View>
                </View>

                <View className="flex items-end justify-center w-[30%]">
                  <Text
                    className={`text-[12px] font-semibold ${
                      item.transactionType === 'CR' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.transactionType === 'CR' ? '+' : '-'}
                    {formattedCurrency(item?.amount ?? 0)}
                  </Text>
                  <Text className="text-[10px] text-gray-500 font-medium">
                    Successful
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Banner;

const styles = StyleSheet.create({});
