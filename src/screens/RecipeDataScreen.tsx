import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}
interface  Props {
  meal:Recipe[]
}

const RecipeDataScreen:React.FC<Props> = ({meal}) => {

console.log(meal)
    
  return (
    <View>

      <Text style={{color:"black"}}>RecipeDataScreensssss</Text>
    </View> 
  )
}

export default RecipeDataScreen

const styles = StyleSheet.create({})