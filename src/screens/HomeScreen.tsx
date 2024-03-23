
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import React, { useEffect, useState } from 'react'
import Animated, { combineTransition, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Catagories from '../components/Catagories'
import axios from 'axios'
import RecipeData from '../components/RecipeData'


const Duration = 1000;

const HomeScreen = () => {
  const [activeCatagory, setActiveCatagory] = useState<string>('Chicken');
  const [catagoriesDataNew, setCatagoriesDataNew] = useState<any[]>([]);
  const [mealss, setMeals] = useState<any[]>([]);

  const fadin1 = useSharedValue(0);

  useEffect(() => {
    fadin1.value = withDelay(1 * 500, withTiming(1, { duration: Duration }));
    getCatagoriesData();
    getRecipeData(activeCatagory);
  }, [])

  const handleChangeCatagory = (catagory: string) => {
    getRecipeData(catagory);
    setActiveCatagory(catagory);
    setMeals([]);
  }

  const getCatagoriesData = async () => {
    try {
      const res = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
      if (res && res.data) {
        setCatagoriesDataNew(res.data.categories)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {

        console.log('Axios error message:', error.message);
      } else {

        console.log('Other error:', error);
      }
    }

  }

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



  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: hp(2.3) }}>
      <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' }}>
        <Image
          style={{ width: hp(7), height: hp(7) }}
          source={require('./assets/images/userpic.png')} />
          
        <BellIcon size={hp(4)} color={'gray'} style={{ marginTop: hp(2) }} />
      </View>
      <View>
        <Text
          style={styles.namestyle}>
          Hello, Foody!
        </Text>
      </View>
      <View style={{ marginTop: hp(1) }}>
        <View style={{ flexDirection: 'row' }}>
          <Animated.Text
            style={[styles.punchlineStyle, { opacity: fadin1 }]}>
            Make your own food,
          </Animated.Text>
        </View>
        <View>
          <Animated.Text style={[styles.punchlineStyle, { opacity: fadin1 }]}>Stay at <Animated.Text style={[styles.punchlineStyle, { opacity: fadin1 }, { color: '#ffa000' }]}>home</Animated.Text></Animated.Text>
        </View>
      </View>

      {/*search bar */}
      <View style={[styles.statusBarStyle, { flexDirection: 'row' }]}>
        <TextInput style={{ marginLeft: hp(2), fontSize: hp(2), flex: 1, color: 'black' }} placeholder='search any recipe' placeholderTextColor={'gray'} />
        <View style={[styles.searchinglass, {}]}>
          <MagnifyingGlassIcon size={hp(3)} strokeWidth={3} color={"gray"} />
        </View>
      </View>

      {/* catagories */}
      <View>
        {catagoriesDataNew && catagoriesDataNew.length > 0 && (
          <Catagories
            catagoriesDataNew={catagoriesDataNew.filter(cat => cat.strCategory !== 'Beef')}
            activeCatagory={activeCatagory}
            handleChangeCatagory={handleChangeCatagory}
          />
        )}     
        </View>
      {/*recipies cards */}
      <View>
        {mealss && catagoriesDataNew.length > 0 && (
          <RecipeData
            meal={mealss}
            catagoriesDataNew={catagoriesDataNew}
           
          />
        )}

        {/* passing data to next screen */}


      </View>
      
    </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  namestyle: {
    color: 'black',

    fontStyle: 'italic',
    fontSize: hp(1.7),
    fontWeight: 'bold'
  },
  punchlineStyle: {
    color: 'black',
    fontFamily: "arial",
    fontSize: hp(3.8),
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  statusBarStyle: {
    backgroundColor: '#d3d3d3',
    // backgroundColor: '#212529',

    borderBlockColor: '#adb5bd',
    height: hp(8),
    width: hp(43),
    marginTop: hp(1.2),
    borderRadius: hp(5),
    shadowColor: '#000',
    shadowOffset: { width: hp(0), height: hp(0.3) }, // Only change the height value to set the shadow at the bottom
    shadowOpacity: hp(0.3),
    shadowRadius: hp(0.3),
    elevation: hp(0.3),
    // justifyContent:'center',
    alignItems: 'center',


  },
  searchinglass: {
    backgroundColor: 'white',
    borderColor: 'white',
    height: hp(6),
    width: hp(6),
    borderRadius: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(1.1)

  }


})