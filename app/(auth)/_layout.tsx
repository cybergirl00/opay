import AuthFooter from '@/components/AuthFooter';
import { Redirect, Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo'

const Layout = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth()

  
  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
      </Stack>

      {pathname !== '/otp' && (
        <View> 
        <AuthFooter />
       </View>
      )}
</>
  );
}

export default  Layout