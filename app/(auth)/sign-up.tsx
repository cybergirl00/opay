import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import logo from '@/assets/images/icon.png'
import CustomForm from '@/components/CustomForm'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import { ClerkAPIError} from '@clerk/types'
import axios from 'axios'
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  // USESTATES
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [customError, setCustomError] = useState('')
  const [error, setError] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false)

  
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)
    if(!firstName ||  !lastName ||  !email ||  !phone ||  !password || !cpassword) {
      setIsLoading(false);
      setCustomError('Please fill all the fields properly')
    } else if(password !== cpassword) {
      setIsLoading(false);
      setCustomError('Passwords does not match!')
    } else {
      try {
   const  response =   await signUp.create({
          emailAddress: email,
          password,
          unsafeMetadata: {
          firstName: firstName,
          lastName: lastName,
          }
        })
  
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        router.replace({
          pathname: '/otp',
          params: {
            email,
            firstName,
            lastName,
            phone,
            clerkId: response.id
          }
        })
      } catch (err: any) {
        if (isClerkAPIResponseError(err)) setError(err.errors)
        console.error(JSON.stringify(err, null, 2))
        setIsLoading(false)
      }
    }
    // IF AUTHENTICATION IS PROCESSED MOVE TO THE OTP SCREEN
    // console.log('Pressed')
  }
  return (
    <ScrollView className='pt-12'>
    
    <View className='flex items-center p-3'>
      <Image
      source={logo}
      className='h-10 w-10'
       />
    </View>
    <View>
      <Text className='text-2xl  font-semibold p-4'
      >Get an Opay Account</Text>
    </View>

    <View className='p-3'>

    <CustomForm 
      title='First Name'
      placeholder='Enter your first name'
      type='text'
      onChangeText={setFirstName} 
      />
      <CustomForm 
      title='Last Name'
      placeholder='Enter your last name'
      type='text'
      onChangeText={setLastName} 
      />
      <CustomForm 
      title='Email'
      placeholder='Enter your email'
      type='email-address'
      onChangeText={setEmail} 
      />
       <CustomForm 
      title='Phone Number'
      placeholder='Enter your email'
      type='phone-pad'
      onChangeText={setPhone} 
      />
       <CustomForm 
      title='Password'
      placeholder='Enter your password'
      type='password'
      onChangeText={setPassword} 
      />
       <CustomForm 
      title='Confirm Password'
      placeholder='Enter your password'
      type='password'
      onChangeText={setCpassword} 
      />
    </View>

    <View
    >
      {customError && (
          <Text
          className='text-red-500 text-center text-md'
          >
            {customError}
          </Text>
      )}
      {error?.map((el, index) => (
            <Text key={index}
            className='text-red-500 text-center text-md'
            >An Error occured: {el.longMessage}</Text>
          ))}
    </View>

    <View className='pb-[100px]'>
      <CustomButton 
      name='Sign Up'
      type={'sign-up'} 
      onPress={onSignUpPress}
    isLoading={isLoading}
       />
    </View>
   </ScrollView>
  )
}

export default SignUp