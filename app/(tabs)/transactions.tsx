import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import axios from 'axios';
import { useUserData } from '@/lib/zustand';
import { formatDate, formattedCurrency } from '@/lib/data';
import LoadingModal from '@/components/LoadingModal';
import { flutterwaveKey } from '@/lib/keys';
import { fetchTransactions } from '@/actions/creda.actions';

// Define the shape of a transaction
interface Transaction {
    amount: number;
    transactionType: 'CR' | 'DB' | 'Airtime' | 'Data';
    date: string;
    remarks: string;
    refrence: string;
    createdAt: string;
    charges: number;
    counterparty: {
        name: string;
        accountNumber: string,
        bankName: string
    }
}

// Define the structure of the grouped transactions
type GroupedTransactions = {
    [key: string]: Transaction[];
};

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userData = useUserData((state) => state.data);

    console.log(userData)

    useEffect(() => {
        const getTransaction = async () => {
            setLoading(true);
            try {
                const response = await fetchTransactions(userData?.data?.userId);

                console.log('Transactions',response?.data.transactions)
                setTransactions(response?.data.transactions)

                setLoading(false)
            } catch (error) {
                console.error('Error fetching transaction data:', error);
                setLoading(false)
            } finally {
                setLoading(false);
            }
        };

        getTransaction()
    }, []);

    // Group transactions by month
    const groupedTransactions: GroupedTransactions = transactions.reduce((acc: GroupedTransactions, transaction) => {
        const month = new Date(transaction.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(transaction);
        return acc;
    }, {});

    if (loading) {
        return <LoadingModal />;
    }

    return (
        <SafeAreaView className="gap-4 pt-7 flex-1 bg-white">
            {/* Header Section */}
            <View className="bg-white flex flex-row justify-between items-center p-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={20} />
                </TouchableOpacity>
                <Text className="font-bold text-md">Transactions</Text>
                <Text className="text-green-500 text-[12px]">Download</Text>
            </View>

            {/* Transactions Grouped by Month */}
            <ScrollView className="" contentContainerStyle={{paddingBottom: 90}}>
                {Object.entries(groupedTransactions).map(([month, transactions]) => {
                    const inflow = transactions
                        .filter((item) => item.transactionType === 'CR')
                        .reduce((total, item) => total + item.amount, 0);
                    const outflow = transactions
                        .filter((item) => item.transactionType !== 'CR')
                        .reduce((total, item) => total + item.amount, 0);

                    return (
                        <View key={month} className="bg-white w-auto rounded-lg p-4 mb-4">
                            {/* Month Title and Summary */}
                            <Text className="text-lg font-bold">{month}</Text>
                            <View className="mt-2 flex-row p-0.5 gap-2">
                                <Text className="text-gray-500 text-sm">
                                    In:{' '}
                                    <Text className="text-green-500 font-bold">{formattedCurrency(inflow)}</Text>
                                </Text>
                                <Text className="text-gray-500 text-sm">
                                    Out:{' '}
                                    <Text className="text-red-500 font-bold">{formattedCurrency(outflow)}</Text>
                                </Text>
                            </View>

                            {/* Transactions List */}
                            <View className="pt-4 gap-2 pb-3">
                                {transactions.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className="flex flex-row p-2 border-b border-gray-200"
                                        onPress={() =>
                                            router.push({
                                                pathname: '/(tabs)/transaction-details',
                                                params: {
                                                    remarks: item.transactionType === 'Airtime' ? 'Mobile Airtime Top Up' : item.transactionType === 'Data' ? 'Mobile Data Top up' : item.transactionType === 'CR' ? `Transfer from ${item.counterparty.name}` : item.transactionType === 'DB' ? `Transfer to ${item.counterparty.name}`  : 'no discription',
                                                    amount: item.amount,
                                                    transactionNo: item.refrence,
                                                    date: item.date,
                                                    charges: item.charges,
                                                        counterpartyName: item.counterparty.name,
                                                          counterpartyBank: item.counterparty.bankName,
                                                        counterpartyAccountNumber: item.counterparty.accountNumber,
                                                         type: item.transactionType
                                                },
                                            })
                                        }
                                    >
                                        {/* Left Section: Icon and Details */}
                                        <View className="flex flex-row items-center gap-3 w-[70%]">
                                            {/* Transaction Type Icon */}
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

                                            {/* Transaction Details */}
                                            <View>
                                                <Text className="text-[10px] font-medium text-gray-700">
                                                    {item?.transactionType === 'Airtime' && 'Airtime top up' || item?.transactionType === 'Data' && 'Data top up' || item.transactionType === "CR" && `Transfer from ${item.counterparty.name}` || item.transactionType === "DB" && `Transfer to ${item.counterparty.name}` || 'No description'}
                                                </Text>
                                                <Text className="text-[8px] text-gray-500">{formatDate(item.date)}</Text>
                                            </View>
                                        </View>

                                        {/* Right Section: Amount and Status */}
                                        <View className="flex items-end justify-center w-[30%]">
                                            <Text
                                                className={`text-[12px] font-semibold ${
                                                    item?.transactionType === 'CR' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                            >
                                                {item.transactionType === 'CR' ? '+' : '-'}
                                                {formattedCurrency(item?.amount ?? 0)}
                                            </Text>
                                            <Text className="text-[10px] text-gray-500 font-medium">Successful</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Transactions;

const styles = StyleSheet.create({});
