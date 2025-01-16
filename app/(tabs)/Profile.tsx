import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const Profile = () => {
  const { signOut} = useAuth();

  const logout = async () => {
    await signOut()
  }
  return (
    <View>
      <TouchableOpacity onPress={logout}>
      <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})