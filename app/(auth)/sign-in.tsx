import { View, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import logo from '@/assets/images/icon.png';
import CustomForm from '@/components/CustomForm';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import axios from 'axios';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { useSignIn } from '@clerk/clerk-expo'
import { ClerkAPIError} from '@clerk/types'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  // USESTATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false)
  const onSignInPress = React.useCallback(async () => {
    setIsLoading(true);
    if (!isLoaded) {
      return
    }
    if (!password || !email) {
      setIsLoading(false);
        console.error('Name and email are required.');
        // setError('Name and email are required.');
        return;
    }
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      if (signInAttempt.status === 'complete') {
        setIsLoading(false);
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError(undefined);
        setIsLoading(false);
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      setIsLoading(false);
      if (isClerkAPIResponseError(err)) setError(err.errors)
        // console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, email, password])

  return (
    <SafeAreaView className='pt-5'>
      <View className='flex items-center p-3'>
        <Image source={logo} className='h-10 w-10' />
      </View>
      <View>
        <Text className='text-2xl font-semibold p-4'>
          Login to Your Opay Account
        </Text>
      </View>

      <View className='p-3'>
        <CustomForm 
          title='Email'
          placeholder='Enter your email'
          type='email-address'
          onChangeText={setEmail}  
        />
          <CustomForm 
          title='Password'
          placeholder='Enter your password'
          type='password'
          onChangeText={setPassword}  
        />
      </View>
      {error && (
        <View
        className=''
        >
          {error.map((el, index) => (
            <Text key={index}
            className='text-red-500 text-center text-md'
            >An Error occured: {el.longMessage}</Text>
          ))}
        </View>
      )}

      <View>
        <CustomButton 
          name='Sign In'
          type={'sign-in'} 
          onPress={onSignInPress}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
