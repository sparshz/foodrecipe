
import { FlatList, Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { withSpring, FadeInDown } from 'react-native-reanimated';
import Loader from './Loader';
import {useNavigation} from '@react-navigation/native';



interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}
interface RecipeProps {
  meal: Recipe[];
  catagoriesDataNew: Category[],
}


const RecipeData: React.FC<RecipeProps> = ({ meal, catagoriesDataNew }) => {


  // console.log(meal)

  const navigation  = useNavigation();
  return (
    <Animated.View className="mx-4 space-y-3" entering={FadeInDown.duration(600).springify().damping(8)}>
      <Text style={styles.textRecipi}>Recipes</Text>
      <View style={{ height: hp(46), borderRadius: hp(2) }}>
        {
          catagoriesDataNew.length == 0 || meal.length == 0 ? 
            <Loader />
            : (
              <MasonryList
                data={meal}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item, i }) => <RecipeCard item={item as Recipe} index={i} navigation={navigation} />}
                onEndReachedThreshold={0.1}
              />
            )
        }
      </View>


    </Animated.View>
  )
}



interface RecipiProp {
  item: Recipe;
  index: number;
  navigation:any;
}


const RecipeCard: React.FC<RecipiProp> = ({ item, index , navigation }) => {
  let isEven = index % 2 == 0;
  return (

    <Pressable 
    style={[{ paddingLeft: isEven ? 0 : 8, width: '100%', marginBottom: hp(2), paddingRight: isEven ? 8 : 0 }]}
    onPress={() => navigation.navigate("RecipeDataDetail " , {...item})}
    >
      <Image source={{ uri: item.strMealThumb }} style={[styles.image, { height: index % 3 == 0 ? hp(25) : hp(35) }]} />
      <Text style={{ color: 'black', fontSize: hp(1.5), fontWeight: '800' }}>
        {
          item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
        }

      </Text>
    </Pressable>

  )
}

export default RecipeData;

const styles = StyleSheet.create({
  textRecipi: {
    color: 'black',
    fontSize: 25,
    marginLeft: hp(1),
    marginTop: hp(1),
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(6),
    width: hp(6),

  },
  recipeContainer: {
    marginBottom: hp(4),
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: hp(3), 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  image: {
    width: '100%',
    height: hp(35),
    borderRadius: hp(3),
  },

});
