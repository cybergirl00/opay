import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import axios from 'axios';
import otpimg from '@/assets/images/otp.png'
import LoadingModal from '@/components/LoadingModal';

const OtpScreen = () => {
  const [isLoading , setisLoading ] = useState(false)
  const { email, firstName, lastName, phone, clerkId } = useLocalSearchParams();
  const { isLoaded, signUp, setActive,  } = useSignUp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State to store each digit of the OTP
  const inputs = useRef<Array<TextInput | null>>([]); // Refs to handle focus between inputs

  // Function to handle change in each input box
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if available and a digit is entered
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (newOtp.every((digit) => digit !== '')) {
      onPressVerify(newOtp.join(''));
    }
  };

  // ADD USER TO DOCS AND CREATE A FLUTTERWAVE SUBACCOUNT
  const addUserAndCreateSubaccount = async () => {
    setisLoading(true);
    try {
        // Step 1: Create a customer on Paystack
        const response = await axios.post(
            ' https://4193-197-211-63-167.ngrok-free.app/create-subaccount',
            {
                email,
               firstName,
                lastName,
              phone,
            }
        );

        console.log(response)
        await axios.post(' https://4193-197-211-63-167.ngrok-free.app/users', {
            email,
            clerkId,
            firstName,
            lastName,
            accountNumber: response.data.data.nuban,
            accountRef: response.data.data.account_reference,
            bankName: response.data.data.bank_name,
            amount: 0,
            phone: phone
        });

        router.push('/');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    } finally {
        setisLoading(false); // Ensure loading stops even on error
    }
};


  const onPressVerify = async (fullOtp: string) => {
    if (!isLoaded) {
      return;
    }
    setisLoading(true)
    try {
      const completeSignUpResult = await signUp.attemptEmailAddressVerification({
        code: fullOtp,
      });

      if (completeSignUpResult.status === 'complete') {
        await addUserAndCreateSubaccount(); // Call the function after successful OTP verification
        await setActive({ session: completeSignUpResult.createdSessionId });
      } else {
        console.error(JSON.stringify(completeSignUpResult, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setisLoading(false)
    }

    console.log('OTP pressed:', fullOtp);
  };

  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center p-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center font-bold text-lg flex-grow">
          Verify Email Address
        </Text>
      </View>

      {/* Content */}
      <View className="p-5">
        {/* STEP ONE */}
        <View className="bg-gray-200 rounded-md p-5">
          <Text className="text-md font-bold">
            Step 1 - Check the Code You Received
          </Text>
          <View className="flex flex-row gap-3 items-center">
            <Text className="pt-2 text-gray-500 text-sm">
              A verification code has been sent to{' '}
              <Text className="text-[#02bb86] font-bold text-md">
                @{email}
              </Text>{' '}
              please take a look
            </Text>
            <Image source={otpimg} className="h-10 w-10" />
          </View>
        </View>

        {/* STEP TWO - OTP INPUT */}
        <View className="mt-10">
          <Text className="text-md font-bold text-center mb-4">
            Enter the 6-digit code
          </Text>
          <View className="flex flex-row justify-between">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold"
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(el) => (inputs.current[index] = el)} // Store input refs for focus handling
                autoFocus={index === 0} // Focus on the first input
              />
            ))}
          </View>
        </View>
        <View className="pt-5">
          <Text>
            Didn't receive the OTP? Resend{' '}
            <Text className="text-[#02bb86]">(54s)</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>

    {isLoading  && (
      <LoadingModal />
    )}
    </>
  );
};

export default OtpScreen;


// const uri = "mongodb+srv://dikkorabiat25:KRJPuYk2pwVID9vK@opay.7efac.mongodb.net/?retryWrites=true&w=majority&appName=opay";

// sk_test_d8d935cadfad5db7dcc37e673c8c1e042bd7efa7