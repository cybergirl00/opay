import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '@/components/CustomHeader';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formattedCurrency } from '@/lib/data';
import CustomButton from '@/components/CustomButton';
import CustomModal from '@/components/CustomModal';
import { storeBalance, useUserData } from '@/lib/zustand';
import { transferInterBank, transferOuterBank } from '@/actions/creda.actions';

const Transfer = () => {
  const {
    account_name,
    account_number,
    title,
    bankName,
    bankCode,
    bankLogo,
    type,
  } = useLocalSearchParams();

  const [amount, setAmount] = useState<string>('');
  const [remarks, setRemarks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const userData = useUserData((state) => state.data);
  const { balance } = storeBalance((state) => state);

  const quick = [
    { id: 1, amount: 500 },
    { id: 2, amount: 1000 },
    { id: 3, amount: 2000 },
  ];

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // remove non-numeric
    const num = Number(numericValue);

    if (num <= 5000000) {
      setAmount(numericValue);
    } else {
      alert('Maximum allowed amount is ₦5,000,000');
    }
  };

  const openModal = () => {
    const num = Number(amount);
    if (num < 100 || num > 5000000) {
      alert('Amount must be between ₦100 and ₦5,000,000');
    } else {
      setModal(true);
    }
  };

  const sendMoney = async () => {
    setIsLoading(true);
    try {
      if (type === 'opay') {
        const send = await transferInterBank({
          amount: Number(amount),
          accountNumber: account_number as string,
        });

        if (send?.status === 200) {
          alert('Transaction successful!, the receiver will be credited soon');
          setModal(false);
          router.push('/transactions');
        }
      } else {
        const send = await transferOuterBank({
          amount: Number(amount),
          accountNumber: account_number as string,
          bankCode: bankCode as string,
        });

        if (send?.status === 200) {
          alert('Transaction successful!, the receiver will be credited soon');
          setModal(false);
          router.push('/transactions');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="pt-7">
      <CustomHeader title={title || ''} />

      {/* Receiver Info */}
      <View className="flex-row p-1 pl-5 pt-3 gap-3 items-center">
        <View className="bg-gray-200 border border-green-500 h-12 w-12 justify-center items-center rounded-full">
          <Image
            source={{ uri: bankLogo as string }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </View>
        <View>
          <Text className="font-bold text-xl">{account_name || 'N/A'}</Text>
          <Text className="text-gray-500 font-semibold">
            {account_number || 'N/A'} | {bankName || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Amount Input */}
      <View className="p-5 rounded-lg">
        <View className="bg-white h-fit w-fit p-4 rounded-lg">
          <Text className="text-[12px] font-semibold ">Amount</Text>
          <View className="flex-row p-2 items-center gap-3 border-b border-gray-200">
            <Text className="font-extrabold text-2xl">₦</Text>
            <TextInput
              placeholder="100.00 - 5,000,000"
              className="text-xl"
              keyboardType="number-pad"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>

          {/* Quick Amount Buttons */}
          <View className="p-2 flex-row items-center gap-5 pt-5">
            {quick.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="border w-20 border-gray-200 h-8 items-center justify-center rounded-full"
                onPress={() => setAmount(item.amount.toString())}
              >
                <Text className="text-[10px] font-semibold ">
                  {formattedCurrency(item.amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Remarks */}
      <View className="p-5 rounded-lg">
        <View className="bg-white h-fit w-fit p-4 rounded-lg">
          <Text className="text-[12px] font-semibold ">Remark</Text>
          <View className="flex-row p-3 items-center gap-3 border-b border-gray-200">
            <TextInput
              placeholder="What is this for (optional)"
              className="text-sm"
              value={remarks}
              onChangeText={(value) => setRemarks(value)}
            />
          </View>
        </View>
      </View>

      <CustomButton name="Continue" onPress={openModal} isLoading={isLoading} />

      {/* Modal Confirmation */}
      <Modal transparent={true} animationType="slide" visible={modal}>
        <View className="flex-1 relative top-0">
          <CustomModal>
            <ScrollView>
              <TouchableOpacity onPress={() => setModal(false)}>
                <FontAwesome name="close" size={20} color="gray" />
              </TouchableOpacity>

              <Text className="text-center text-2xl font-extrabold">
                {formattedCurrency(Number(amount))}
              </Text>

              <View className="pt-5">
                {[
                  { label: 'Bank Name', value: bankName },
                  { label: 'Account Number', value: account_number },
                  { label: 'Account Name', value: account_name },
                  { label: 'Amount', value: formattedCurrency(Number(amount)) },
                  { label: 'Bonus Reward', value: '+2 points', color: 'text-green-500' },
                  { label: 'Transaction fee', value: formattedCurrency(0) },
                ].map((item, index) => (
                  <View
                    key={index}
                    className="flex flex-row justify-between items-center p-2"
                  >
                    <Text className="font-semibold text-[12px] text-gray-500">
                      {item.label}
                    </Text>
                    <Text className={`font-semibold text-[12px] ${item.color || ''}`}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Payment Methods */}
              <View className="p-2">
                <View className="flex flex-row items-center p-1 justify-between">
                  <Text className="font-semibold text-sm">Payment Method</Text>
                  <View className="flex flex-row items-center gap-2 ">
                    <Text className="text-[12px] text-gray-500 ">All</Text>
                    <FontAwesome name="angle-right" color={'#6b7280'} />
                  </View>
                </View>

                <View className="p-0.5 pt-4 gap-3">
                  <TouchableOpacity className="flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3">
                    <View className="flex flex-row items-center gap-3 ">
                      <View className="bg-green-100 w-fit h-fit p-2 rounded-full">
                        <FontAwesome name="money" color={'#02bb86'} />
                      </View>
                      <Text className="font-bold">
                        Wallet{' '}
                        <Text className="text-gray-500 font-semibold">
                          ({formattedCurrency(balance || 0)})
                        </Text>
                      </Text>
                    </View>
                    <FontAwesome name="check" size={20} color={'#02bb86'} />
                  </TouchableOpacity>

                  <TouchableOpacity className="flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3">
                    <View className="flex flex-row items-center gap-3 ">
                      <View className="bg-green-100 w-fit h-fit p-2 rounded-full">
                        <FontAwesome name="money" color={'#02bb86'} />
                      </View>
                      <Text className="font-bold">
                        OWallet{' '}
                        <Text className="text-gray-500 font-semibold">
                          ({formattedCurrency(userData?.amount || 0)})
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Payment Action */}
              <View>
                {Number(amount) > balance ? (
                  <Text className="text-center text-sm font-semibold text-red-500">
                    Insufficient fund, Please fund your wallet
                  </Text>
                ) : (
                  <CustomButton name="Pay" onPress={sendMoney} isLoading={isLoading} />
                )}
              </View>
            </ScrollView>
          </CustomModal>
        </View>
      </Modal>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
