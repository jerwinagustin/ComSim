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
import Introduction from './Learning_Modules/Introduction';
import Parts from './Learning_Modules/Parts'
import How_To from './Learning_Modules/How_To'
import After_Build from './Learning_Modules/After_Build'
import ComponentsQuiz from './Quizzes/ComponentsQuiz';
import PartsQuiz from './Quizzes/PartsQuiz';
import BuildQuiz from './Quizzes/BuildQuiz';
import AfterBuildingQuiz from './Quizzes/AfterBuildingQuiz';

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
        />
        <Stack.Screen 
          name="Parts"
          component={Parts}
          options={{
            title: "Parts Selection Guide",
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },

          }}/>
          <Stack.Screen 
          name="How_To"
          component={How_To}
          options={{
            title: " How to Build a PC",
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },

          }}/>

      <Stack.Screen 
          name="After_Build"
          component={After_Build}
          options={{
            title: "What to Do After Building Your PC",
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 300 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },

          }}/>

          <Stack.Screen 
            name = "ComponentsQuiz"
            component={ComponentsQuiz}
            options={{
              title: "Quizzes For Pc Components",
              gestureEnabled: false,
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 300 } },
                close: { animation: 'timing', config: { duration: 300 } }
              }
            }}
          />

          <Stack.Screen 
            name = "PartsQuiz"
            component={PartsQuiz}
            options={{
              title: "Quizzes for Parts",
              gestureEnabled: false,
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 300 } },
                close: { animation: 'timing', config: { duration: 300 }}
              }
            }}
          />

          <Stack.Screen 
            name = "BuildQuiz"
            component={BuildQuiz}
            options={{
              title: "Quizzes for Building your PC",
              gestureEnabled: false,
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 300 } },
                close: { animation: 'timing', config: { duration: 300 }}
              }
            }}
          />

          <Stack.Screen 
            name = "AfterBuildingQuiz"
            component={AfterBuildingQuiz}
            options={{
              title: "Quizzes for PC Setup",
              gestureEnabled: false,
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 300 } },
                close: { animation: 'timing', config: { duration: 300 }}
              }
            }}
          />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
