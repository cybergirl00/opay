import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomHeader'
import CustomForm from '@/components/CustomForm'
import CustomButton from '@/components/CustomButton'
import axios from 'axios'
import { useUser } from '@clerk/clerk-expo'
import { useOpenModal, useUserData } from '@/lib/zustand'
import success from '@/assets/images/sucess.png'
import { Image } from 'react-native'
import { router } from 'expo-router'
import LoadingModal from '@/components/LoadingModal'
import avatar from '@/assets/images/avatar.png';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomModal from '@/components/CustomModal'
import { formattedCurrency } from '@/lib/data'
import { Cloudinary } from "@cloudinary/url-gen";


const Kyc = () => {
  const { user } = useUser()
  const [bvn, setBvn] = useState<string>();
  const [state, setstate] = useState<string>()
  const [address, setaddress] = useState<string>()
  const [postalcode, setPostalcode] = useState<string>();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useUserData((state) => state.data);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [id_number, setId_number] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
    const open = useOpenModal((state) => state.open)
    const setOpen = useOpenModal((state) => state.setOpen);
    const accountref = userData.accountRef
    const [Balance, setBalance] = useState(0);
    const [switchwallet, setSwitchwallet] = useState('owallet');
    const [checkoutamount, setCheckoutamount] = useState(Balance)      

    const cld = new Cloudinary({
      cloud: {
          cloudName: 'drbslypfl'
      },
      url: {
          secure: true
      }
  });
  
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

    const pay =  () => {
      if (!bvn || !state || !address || !postalcode || !image ) {
        alert('Please fill in all the fields');
        return; 
      } else {
        setOpen(true)
      }
     }

     const pickImageAsyncUpload = async () => {
      try {
        setUploadingImage(true)
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'], // Use the proper enum
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          const imageUri = result.assets[0].uri;
    
          // Prepare FormData for Cloudinary
          const formData = new FormData();
          formData.append("file", {
            uri: imageUri,
            name: "photo.jpg",
            type: "image/jpeg",
          });
          formData.append("upload_preset", "opay_card"); // Replace with your preset
    
          // Upload to Cloudinary
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/drbslypfl/image/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          setUploadingImage(false)
    
          console.log("Image uploaded successfully:", response.data.secure_url);
    
          // Set the image URI locally after successful upload
          setImage(response.data.secure_url);
        } else {
          alert("You did not select any image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error.response?.data || error.message);
        alert("Failed to upload image. Please try again.");
      }
    };

    const handleWallet = (wallet: string, amount: number ) => {
      // Your wallet handling logic here
      setSwitchwallet(wallet);
      setCheckoutamount(amount)
    }

  const createCard = async () => {
    if (!bvn || !state || !address || !postalcode || !image ) {
      alert('Please fill in all the fields');
      return; // Stop further execution if validation fails
    } else {
      try {
        setIsLoading(true);
        if(switchwallet === 'wallet') {
          const sendMoney = await axios.post('https://c87a-197-211-63-167.ngrok-free.app/transfer', {
            account_number: '1542363659',
            account_bank: '044',
            amount: 100,
            debit_subaccount: userData.accountRef,
            narration: `Virtual card  created by ${userData.firstName} ${userData.lastName}`,
            currency: 'NGN'
  });
                if(sendMoney.data.status === 'success') {
                  const response = await axios.post('https://c87a-197-211-63-167.ngrok-free.app/create-card', {
                    bvn: bvn,
                    state: state,
                    address: address,
                    postal_code: postalcode,
                    first_name: user?.firstName,
                    last_name: user?.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    id_image: image,
                    id_number: id_number
                  })
                  console.log(response)
                  if(response.data.status === 'success'){
                    console.log(response.data);
                    setIsSuccess(true);
                    setIsLoading(false)
                  } else {
                    alert('Error occurend while creating card:' + response.data)
                  }
                }
        } else if(switchwallet === 'owallet') {
          const response = await axios.post('https://c87a-197-211-63-167.ngrok-free.app/create-card', {
            bvn: bvn,
            state: state,
            address: address,
            postal_code: postalcode,
            first_name: user?.firstName,
            last_name: user?.lastName,
            email: userData.email,
            phone: userData.phone,
            id_image: image,
            id_number: id_number
          })
          console.log(response)
          if(response.data.status === 'success'){
            console.log(response.status);
            setIsSuccess(true);
            setIsLoading(false)
          } else {
            alert('Error occurend while creating card:' + response.data)
          }
        }

              
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      } finally{
        setIsLoading(false)
      }
    }
  }


  const checkout = () => {
    router.push('/cards');
    setIsSuccess(false)
  }
  return (
    <KeyboardAvoidingView className='flex-1 bg-white' behavior={`${Platform.OS === 'ios' ? 'padding' : 'height'}`}>

    <ScrollView className='  '>
      <CustomHeader title='Kyc verfication' />

      <View className='p-3'>

        <View className='justify-center items-center pt-4 '>
          <View>
            <TouchableOpacity onPress={pickImageAsyncUpload}>
              {uploadingImage ? <ActivityIndicator /> : (
                <View>
                   {image ?   <Image source={{ uri: image && image} } className='h-24 w-24  rounded-full ' /> :   <Image source={avatar } className='h-24 w-24  rounded-full ' />}
                </View>
              )}
            </TouchableOpacity>
            <Text className='text-center text-[12px] font-semibold pt-4 text-gray-500 '>Upload your image </Text>
          </View>
        </View>

        <CustomForm title='Enter Bvn' placeholder='Enter your bvn ' type='number-pad' onChangeText={setBvn} />
        <CustomForm title='Enter NIN' placeholder='Enter your nin number  ' type='number-pad' onChangeText={setId_number} />
        <CustomForm title='Enter State' placeholder='Enter your location state ' type='text' onChangeText={setstate} />
        <CustomForm title='Enter Address' placeholder='Enter your location address' type='text' onChangeText={setaddress} />
        <CustomForm title='Postal Code' placeholder='Enter postal code' type='text' onChangeText={setPostalcode} />

        <CustomButton name={'Create card for N1000'} onPress={pay} />
      </View>

      <Modal visible={isSuccess} animationType='slide'  >
        <View className='flex-1 items-center justify-center'>
          
          <View>
            <View className='justify-center items-center'>
            <Image source={success} />
            </View>

            <Text className='text-center text-2xl font-semibold'>Card created successfully</Text>
            <Text className='text-center font-light text-base'>Your card is ready to send and accept funds </Text>
            <CustomButton name='Continue to Home page' onPress={checkout} />
          </View>
        </View>
      </Modal>

      {isLoading && (
        <LoadingModal />
      )}
    </ScrollView>

    {open && (
        <Modal transparent={true} animationType='slide'>
           <View className='flex-1 relative top-0'>
          <CustomModal>
            <ScrollView>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <FontAwesome name='close' size={20} color={'gray'}  />
              </TouchableOpacity>

              <Text className='text-center text-2xl font-extrabold'>{formattedCurrency(1000)}</Text>

              <View className='pt-5'>
                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Merchant Name</Text>
                  <Text className='font-semibold text-[12px] '>OPayCard Activate</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Amount</Text>
                  <Text className='font-semibold text-[12px] '>{formattedCurrency(1000)}</Text>
                </View>

                <View className='flex flex-row justify-between items-center p-2'>
                  <Text className='font-semibold text-[12px] text-gray-500 '>Cashback</Text>
                  <Text className='font-semibold text-[12px] '>-{formattedCurrency(0)}</Text>
                </View>

              </View>

              <View className='p-2'>
                <View className='flex flex-row items-center p-1 justify-between'>
                <Text className='font-semibold text-sm'>Payment Method</Text>
                <View className='flex flex-row items-center gap-2 '>
                  <Text className='text-[12px] text-gray-500 '>All</Text>
                  <FontAwesome name='angle-right' color={'#6b7280'} />
                </View>
                </View>

                <View className='p-0.5 pt-4 gap-3'>

                  <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3' 
                  onPress={() => handleWallet('wallet', Balance )} >
                    <View className='flex flex-row items-center gap-3 '>
                      <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                      <FontAwesome name='money' color={'#02bb86'} />
                      </View>
                     
                      <Text className='font-bold '>Wallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(Balance && Balance)})</Text></Text>
                    </View>
                    {switchwallet === 'wallet' &&  <FontAwesome name='check' size={20} color={'#02bb86'}  /> }
                  </TouchableOpacity>

                  <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3'
                   onPress={() => handleWallet('owallet', userData?.amount ?? 0)}
                   >
                    <View className='flex flex-row items-center gap-3 '>
                      <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                      <FontAwesome name='money' color={'#02bb86'} />
                      </View>
                     
                      <Text className='font-bold '>OWallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(11)})</Text></Text>
                    </View>

                    {switchwallet === 'owallet' && <FontAwesome name='check' size={20} color={'#02bb86'}  />}
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {checkoutamount > 1000 ? 
                <View>
                  <Text className='text-center text-sm font-semibold text-red-500'>Insufficient fund, Please fund your wallet</Text>
                  </View>
                : 
                <View>
                  <CustomButton name='Pay' onPress={createCard} />
                </View>
                }

              </View>
            </ScrollView>
          </CustomModal>
        </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  )
}

export default Kyc

const styles = StyleSheet.create({})