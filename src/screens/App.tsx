
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer,RouteProp} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen'
import WelcomeScreen from './WelcomeScreen'
import React from 'react'
import RecipeDataScreen from './RecipeDataScreen'


export type StackParamList = {
  Home: undefined;
  Welcome: undefined;
  RecipeDataDetail: {data:string};
};


type Recipe ={
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}
type item = {
  items:Recipe;
}



const Stack  = createNativeStackNavigator<StackParamList>(); 

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            {/* <Stack.Screen 
            name="RecipeDataDetail" 
            component={RecipeDataScreen}  
            initialParams={{data:" "}} /> */}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App // Ensure correct export

const styles = StyleSheet.create({}) // Styles should be defined before exporting


