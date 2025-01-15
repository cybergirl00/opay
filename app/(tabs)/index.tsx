import React from 'react';
import { Redirect } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from './home';
import Profile from './Profile';
import Rewards from './rewards';
import Finance from './finance';
import Cards from './cards';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const { user } = useUser();

  if (!user) return <Redirect href={'/(auth)/sign-in'} />;

  return (
    // <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#02bb86', headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={19} name="home" color={color} />,
            headerShown: false,
          }}
        />
         <Tab.Screen
          name="rewards"
          component={Rewards}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={19} name="diamond" color={color} />,
          }}
        />
         <Tab.Screen
          name="finance"
          component={Finance}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={19} name="money" color={color} />,
          }}
        />
         <Tab.Screen
          name="cards"
          component={Cards}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={19} name="credit-card" color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={19} name="user" color={color} />,
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default HomePage;
