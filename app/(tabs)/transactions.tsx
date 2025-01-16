import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import axios from 'axios';
import { useUserData } from '@/lib/zustand';
import { formatDate, formattedCurrency } from '@/lib/data';
import LoadingModal from '@/components/LoadingModal';

// Define the shape of a transaction
interface Transaction {
    amount: number;
    type: 'C' | 'D'; // C for Credit, D for Debit
    date: string;
    remarks: string;
    refrence: string;
}

// Define the structure of the grouped transactions
type GroupedTransactions = {
    [key: string]: Transaction[];
};

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userData = useUserData((state) => state.data);

    useEffect(() => {
        const getTransaction = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flutterwave.com/v3/payout-subaccounts/${userData.accountRef}/transactions?fetch_limit=10`,
                    {
                        headers: {
                            Authorization: "Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X",
                            "Content-Type": "application/json",
                        },
                    }
                );
                setTransactions(response.data.data.transactions);
                console.log(response.data.data.transactions)
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (userData?.accountRef) {
            getTransaction();
        }
    }, [userData?.accountRef]);

    // Group transactions by month
    const groupedTransactions: GroupedTransactions = transactions.reduce((acc: GroupedTransactions, transaction) => {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' });
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
        <View className="gap-4">
            {/* Header Section */}
            <View className="bg-white flex flex-row justify-between items-center p-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={20} />
                </TouchableOpacity>
                <Text className="font-bold text-md">Transactions</Text>
                <Text className="text-green-500 text-[12px]">Download</Text>
            </View>

            {/* Transactions Grouped by Month */}
            <ScrollView className="p-5">
                {Object.entries(groupedTransactions).map(([month, transactions]) => {
                    const inflow = transactions
                        .filter((item) => item.type === 'C')
                        .reduce((total, item) => total + item.amount, 0);
                    const outflow = transactions
                        .filter((item) => item.type === 'D')
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
                                                    remarks: item.remarks,
                                                    amount: item.amount,
                                                    transactionNo: item.refrence,
                                                    date: item.date,
                                                },
                                            })
                                        }
                                    >
                                        {/* Left Section: Icon and Details */}
                                        <View className="flex flex-row items-center gap-3 w-[70%]">
                                            {/* Transaction Type Icon */}
                                            <View
                                                className={`p-2 rounded-full ${
                                                    item?.type === 'D' ? 'bg-red-100' : 'bg-green-100'
                                                }`}
                                            >
                                                {item?.type === 'D' ? (
                                                    <FontAwesome name="arrow-down" color="red" size={16} />
                                                ) : (
                                                    <FontAwesome name="arrow-up" color="green" size={16} />
                                                )}
                                            </View>

                                            {/* Transaction Details */}
                                            <View>
                                                <Text className="text-[10px] font-medium text-gray-700">
                                                    {item?.remarks || 'No description'}
                                                </Text>
                                                <Text className="text-[8px] text-gray-500">{formatDate(item.date)}</Text>
                                            </View>
                                        </View>

                                        {/* Right Section: Amount and Status */}
                                        <View className="flex items-end justify-center w-[30%]">
                                            <Text
                                                className={`text-[12px] font-semibold ${
                                                    item.type === 'C' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                            >
                                                {item.type === 'C' ? '+' : '-'}
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
        </View>
    );
};

export default Transactions;

const styles = StyleSheet.create({});
