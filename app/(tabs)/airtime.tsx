import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '@/components/CustomHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { airtimePlans, formattedCurrency, providers } from '@/lib/data';
import airtel from '@/assets/images/airtel.png';
import glo from '@/assets/images/glo.png';
import mtn from '@/assets/images/mtn.png';
import mobile from '@/assets/images/9mobile.png';
import LoadingModal from '@/components/LoadingModal';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import { useUserData } from '@/lib/zustand';
import axios from 'axios';
import { router } from 'expo-router';

const Airtime = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(glo); // Default provider
    const [isLoading, setIsLoading] = useState(false)
    const [openCustomModal, setOpenCustomModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [checkoutPrice, setCheckoutPrice] = useState(0)
     const [Balance, setBalance] = useState(0);
     const [paymentMethod, setPaymentMethod] = useState('wallet')
     const [providerName, setProviderName] = useState('glo')
    
    const userData = useUserData((state) => state.data);
    const [phoneNumber, setPhoneNumber] = useState(userData.phone);
    

    // Prefix to provider mapping
    const prefixToProvider = {
        '070': glo,   // Glo
        '080': glo,   // Glo
        '081': mtn,   // MTN
        '082': mtn,   // MTN
        '083': mtn,   // MTN
        '084': mtn,   // MTN
        '085': mtn,   // MTN
        '086': mtn,   // MTN
        '087': mtn,   // MTN
        '088': mtn,   // MTN
        '090': airtel,   // Airtel
        '091': mobile,   // 9Mobile
        '092': mobile,   // 9Mobile
        '093': mobile,   // 9Mobile
        '094': mobile,   // 9Mobile
        '095': mobile,   // 9Mobile
        '096': mobile,   // 9Mobile
    };
    

    // Function to map phone number prefix to provider
    const getProviderFromPhoneNumber = (number: string) => {
        const prefix = number.slice(0, 3); // Extract the first 3 digits
        const provider = prefixToProvider[prefix];
        if (provider) {
            setSelectedProvider(provider); // Update the provider based on the prefix
        }
    };

    // Handle phone number input change
    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
        getProviderFromPhoneNumber(text);
    };

    // Function to select a provider manually from the modal
    const selectProvider = (item: any, name: string) => {
        setProviderName(name)
        setSelectedProvider(item);
        setOpenModal(false);
    };

    const customModal = async  (price : number) => {
        if(!phoneNumber) {
            alert('Please Enter a valid phone number')
        } else {
            setOpenCustomModal(true)
            setPrice(price)
        }
    }

    const switchwallet = ( wallet: string, price: number) => {
        setPaymentMethod(wallet);
        setCheckoutPrice(price)
    }

    useEffect(() => {
        const getBalance = async () => {
          try {
            const response = await axios.get(
              `https://api.flutterwave.com/v3/payout-subaccounts/${userData.accountRef}/balances?currency=NGN`,
              {
                headers: {
                  Authorization: `Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X` // Replace with your actual secret key
                }
              }
            );
            const fetchedBalance = response.data.data.available_balance; 
            setBalance(fetchedBalance);
            // console.log(fetchedBalance)
          } catch (error) {
            console.error('Error fetching balance:', error);
          }
        };
    
        getBalance();
      }, [userData.accountRef]);


      const buyAirtime = async  () => {
        if(checkoutPrice < price ) {
            alert('Insufficient fund, please fund your wallet')
        } else {
            setIsLoading(true);
            console.log(price)
            try {

                // MAKE TRANSFER TO THE OWNER ACCOUNT

                const sendMoney = await axios.post('https://4193-197-211-63-167.ngrok-free.app/transfer', {
                            account_number: '1542363659',
                            account_bank: '044',
                            amount: price,
                            debit_subaccount: userData.accountRef,
                            narration: `Airtime Purchased by ${userData.firstName} ${userData.lastName}`,
                            currency: 'NGN'
                });

                if(sendMoney.data.staus === 'success') {
                       // BUY AIRTIME
                const response = await axios.get(`https://vtu.ng/wp-json/api/v1/airtime?username=Cybergirl&password=Cybergirl@2005&phone=${phoneNumber}&network_id=${providerName}&amount=${price}`);
              console.log(response.data);
              if(response.data.code === 'success') {
                setIsLoading(false);

                await axios.post('https://4193-197-211-63-167.ngrok-free.app/transaction', {
                    ref: sendMoney.data.data.id,
                    userId: userData.clerkId,
                    type: 'airtime',
                    points: 2
                   }).then(() => {
                    setIsLoading(false)
                    // PUSH TO RECIPT SCREEN 
                router.push({
                    pathname: '/transaction-details',
                    params: {
                        remark: response.data.message,
                        amount: price,
                        date: sendMoney.data.data.created_at
                    }
                });
                })


              }
                }


                setIsLoading(false)
                
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
      }

    return (
        <>
        <View>
            <CustomHeader title='Airtime' left='History' leftLink='/' />

            <ScrollView>
            <View>
                <View className='bg-white border-b border-gray-200 p-5 flex-row items-center justify-between'>
                    <View className='flex-row items-center justify-center gap-3 p-1'>
                        <TouchableOpacity
                            className='flex flex-row items-center gap-2'
                            onPress={() => setOpenModal(!openModal)}
                        >
                            <Image source={selectedProvider} className='w-8 h-8 rounded-full' />
                            <FontAwesome name='angle-down' size={17} color={'gray'} />
                        </TouchableOpacity>

                        <View className='top-1'>
                            <TextInput
                                placeholder='Enter phone Number'
                                keyboardType='number-pad'
                                value={phoneNumber}
                                onChangeText={handlePhoneNumberChange}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome name='user-circle-o' color={'#22c55e'} size={20} />
                    </TouchableOpacity>
                </View>

                {openModal && (
                    <Modal visible={openModal} animationType="slide" transparent={true} onRequestClose={() => setOpenModal(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    className='justify-end items-end p-3 bottom-[10%]'
                                    onPress={() => setOpenModal(false)}
                                >
                                    <FontAwesome name='close' size={20} />
                                </TouchableOpacity>
                                <View style={styles.providerContainer}>
                                    {providers.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.providerItem}
                                            onPress={() => selectProvider(item.icon, item.name)}
                                        >
                                            <Image source={item.icon} style={styles.providerIcon} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>

            <View className='p-4'>
            <View style={styles.topUpSection}>
        <Text style={styles.topUpText}>Top Up</Text>
        <View style={styles.plansContainer}>
          {airtimePlans.map((plan) => (
            <TouchableOpacity key={plan.id} style={styles.planButton} className='bg-gray-50 border border-green-100' onPress={() => customModal(plan.price)}>
              <Text style={styles.planText}>{formattedCurrency(plan.price)}</Text>
              <Text className='text-[8px]  pt-3 text-gray-500 font-semibold '>Pay {formattedCurrency(plan.price)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className='flex-row p-2 justify-between items-center'>
            <View className='w-[200px]'>
            <View className='flex-row p-1 items-center gap-2 top-2'>
                <Text>N</Text>
                <TextInput placeholder='50 - 99,999' keyboardType='number-pad' />
                
            </View>
            <View className='border border-gray-300 border-b-0' />
            </View>

            <View className='top-3'>
            <TouchableOpacity 
    className='bg-green-400 w-[60px] h-[30px] rounded-full flex items-center justify-center shadow-md'
    style={{
        elevation: 1,  // For Android shadow
        shadowColor: '#000',  // For iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }}
>
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Pay</Text>
</TouchableOpacity>
            </View>
          
           
        </View>
      </View>
            </View>

            </ScrollView>
        </View>

        {openCustomModal && (
                <Modal transparent={true} animationType='slide'>
                <View className='flex-1 relative top-0'>
               <CustomModal>
                 <ScrollView showsVerticalScrollIndicator={false}>
                   <TouchableOpacity onPress={() => setOpenCustomModal(!openCustomModal)}>
                     <FontAwesome name='close' size={20} color={'gray'}  />
                   </TouchableOpacity>
     
                   <Text className='text-center text-2xl font-extrabold'>{formattedCurrency(price)}</Text>
     
                   <View className='pt-5'>
                     <View className='flex flex-row justify-between items-center p-2'>
                       <Text className='font-semibold text-[12px] text-gray-500 '>Product Name</Text>
                       <View className='flex-row items-center  gap-1'>
                        <Image  source={selectedProvider} className='w-5 h-5 ' />
                       <Text className='font-semibold text-[12px] '>Airtime</Text>
                       </View>
                     </View>

                     <View className='flex flex-row justify-between items-center p-2'>
                       <Text className='font-semibold text-[12px] text-gray-500 '>Phone Number</Text>
                       <Text className='font-semibold text-[12px] '>{phoneNumber}</Text>
                     </View>
     
     
                     <View className='flex flex-row justify-between items-center p-2'>
                       <Text className='font-semibold text-[12px] text-gray-500 '>Amount</Text>
                       <Text className='font-semibold text-[12px] '>{formattedCurrency(price)}</Text>
                     </View>

                     <View className='flex flex-row justify-between items-center p-2'>
                       <Text className='font-semibold text-[12px] text-gray-500 '>Bonus to Earn</Text>
                       <Text className='font-semibold text-[12px] text-green-500 '>+2 points</Text>
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
     
                       <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3' onPress={() => switchwallet('wallet', Balance)}>
                         <View className='flex flex-row items-center gap-3 '>
                           <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                           <FontAwesome name='money' color={'#02bb86'} />
                           </View>
                          
                           <Text className='font-bold '>Wallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(Balance && Balance)})</Text></Text>
                         </View>
                         {paymentMethod === 'wallet' && (  <FontAwesome name='check' size={20} color={'#02bb86'}  /> )}
                        
                       </TouchableOpacity>
     
                       <TouchableOpacity className='flex flex-row items-center justify-between rounded-lg bg-gray-100 p-3' onPress={() => switchwallet('owallet', userData.amount)}>
                         <View className='flex flex-row items-center gap-3 '>
                           <View className='bg-green-100 w-fit h-fit p-2 rounded-full'>
                            
                           <FontAwesome name='money' color={'#02bb86'} />
                           </View>
                          
                           <Text className='font-bold '>OWallet <Text className='text-gray-500 font-semibold'>({formattedCurrency(userData?.amount)})</Text></Text>
                         </View>
     
                         {paymentMethod === 'owallet' && (  <FontAwesome name='check' size={20} color={'#02bb86'}  /> )}
                       </TouchableOpacity>
                     </View>
                   </View>
     
                   <View>
                     {Balance < price ? 
                     <View>
                       <Text className='text-center text-sm font-semibold text-red-500'>Insufficient fund, Please fund your wallet</Text>
                       </View>
                     : 
                     <View>
                       <CustomButton name='Pay' onPress={buyAirtime} />
                     </View>
                     }
     
                   </View>
                 </ScrollView>
               </CustomModal>
             </View>
             </Modal>
            )}

            {isLoading && <LoadingModal />}
        </>
    );
};

export default Airtime;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        padding: 20,
    },
    providerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    providerItem: {
        marginBottom: 10,
    },
    providerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    topUpSection: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
      topUpText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        paddingLeft: 12
      },
      plansContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10, 
        padding: 12
    },
    planButton: {
        // backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        width: '30%',  // Adjusted for 3 items per row
        alignItems: 'center',
        height: 75,
        
    },
    
      planText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'black',
      },
});
