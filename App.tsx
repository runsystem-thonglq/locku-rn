import 'react-native-gesture-handler';

import "@/global.css";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, } from '@react-navigation/native';
import Login from './screens/login';
import Home from './screens/home';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { useEffect } from 'react';
import secureStorage from '@/utils/secure-store';
export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities} >
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
