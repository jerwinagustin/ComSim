import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// CHANGED: Import createSharedElementStackNavigator from react-navigation-shared-element
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';


import HomeScreen from './index';
import Introduction from './Introduction';
import module2 from './module2';
import React from 'react';


SplashScreen.preventAutoHideAsync();


const Stack = createSharedElementStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen 
          name="index" 
          component={HomeScreen} 
          options={{ title: "Home", headerShown: false }} 
        />
        {/*Register Introduction screen with shared element config */}
        <Stack.Screen 
          name="Introduction" 
          component={Introduction} 
          options={{
            title: "Introduction to PC Components",
            // Customize the transition timing for a smooth effect
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },
          }}
          sharedElements={(route, otherRoute, showing) => {
            // The shared element id must match on both screens.
            return ["module-intro"];
          }}
        />
          {/* Module 2 Screen */}
          <Stack.Screen 
          name="Module2" 
          component={module2} 
          options={{
            title: "Module 2: Parts Selection",
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },
          }}
          sharedElements={(route, otherRoute, showing) => {
            return ["module2-intro"];
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
