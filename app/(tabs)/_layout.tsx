import { Stack } from 'expo-router';


const Layout = () => {

  return (
      <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="card-application" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout