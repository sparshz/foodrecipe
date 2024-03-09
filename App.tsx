// index.tsx (or whatever the filename is)
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer,RouteProp} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import React from 'react'
import RecipeDataScreen from './src/screens/RecipeDataScreen'

interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}


type stackScreens = {
  Home: undefined;
  Welcome:undefined;
  RecipeDataDetail:{meals:Recipe[]};
};



// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
// type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;




const Stack  = createNativeStackNavigator<stackScreens>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="RecipeDataDetail" component={RecipeDataScreen}  />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App // Ensure correct export

const styles = StyleSheet.create({}) // Styles should be defined before exporting


