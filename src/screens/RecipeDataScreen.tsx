// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// interface Recipe {
//   strMeal: string;
//   strMealThumb: string;
//   idMeal: number;
// }

// interface RecipeDataScreenProps {
//   mealData: Recipe[]; // Define mealData prop as an array of Recipe objects
// }


// const RecipeDataScreen:React.FC<RecipeDataScreenProps> = ({mealData}) => {
//   console.log(mealData);

//   return (
//     <View>
//       <Text>RecipeDataScreen</Text>
//     </View>
//   )
// }

// export default RecipeDataScreen

// const styles = StyleSheet.create({})

// RecipeDataScreen.tsx

import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from './App';
import { Image } from 'react-native-svg';
import axios from 'axios'


type RecipeDataScreenProps = {
  route: RouteProp<StackParamList, 'RecipeDataDetail'>;
};

const RecipeDataScreen: React.FC<RecipeDataScreenProps> = (prop) => {
  // const [recipe, setRecipe] = useState(route.params?.meals)
  // console.log(prop.route.params?.data);
  // const {meals } = route.params; // Access meals from route.params
  const [meals2, setMeals] = useState<any[]>([]);

  const getRecipeData = async (catagory: string = "Chicken") => {
    try {
      const res = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${catagory}`);
      // console.log(res.data);
      if (res && res.data) {
        setMeals(res.data.meals)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError specifically
        console.log('Axios error message:', error.message);
      } else {
        // Handle other types of errors
        console.log('Other error:', error);
      }
    }

  }

  // console.log(meals);

  return (
    <ScrollView
    className='bg-white flex1'
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:30}}
    >
      {/* <StatusBar  barStyle="dark" /> */}
      {/* recipe image */}
      <View
       className='flex-row justify-center'>
        <Image
        // uri={{}}
        />
      </View>
    </ScrollView>
  );
};

export default RecipeDataScreen;

const styles = StyleSheet.create({});