
import { FlatList, Pressable, StyleSheet, Text, View, Image, ActivityIndicator, Modal, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { withSpring, FadeInDown } from 'react-native-reanimated';
import Loader from './Loader';
import { useNavigation } from '@react-navigation/native';
import RecipeDetailLorem from './RecipeDetailLorem';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';



type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
type Recipe = {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}
type RecipeProps = {
  meal: Recipe[];
  catagoriesDataNew: Category[],

}
type RecipiProp = {
  item: Recipe;
  index: number;
  catagory: String;
}
interface CategoryRecipeProps {
  // items: Recipe;
  meal: Recipe[];
  activeCatagory: String;
}






const RecipeData: React.FC<RecipeProps> = ({ meal, catagoriesDataNew }) => {

  const [detailShow, setDetailShow] = useState<boolean>(true);
  const [catagoryShow, setCatagoryShow] = useState<String>("Chicken");
  // console.log(meal)
  const filteredMeal = meal.filter(item => item.strMeal === catagoryShow);
  const RecipeCard: React.FC<RecipiProp> = ({ item, index }) => {
    let isEven = index % 2 == 0;
    return (

      <Pressable
        style={[{ paddingLeft: isEven ? 0 : 8, width: '100%', marginBottom: hp(2), paddingRight: isEven ? 8 : 0 }]}
        onPress={() => [setDetailShow(!detailShow), setCatagoryShow(item.strMeal)]}
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

  const CatagoryRecipe: React.FC<RecipiProp> = ({ item, index, catagory }) => {

    return (
      <View >

        <Modal
          animationType='slide'
          transparent={true}

          onRequestClose={() => {
            setDetailShow(!detailShow);
          }}>


          <View style={styles.modleStyle}>
            <Image source={{ uri: item.strMealThumb }} style={{ width: hp(40), height: hp(30), marginTop: hp(4), borderRadius: hp(3) }} />
            <Text style={{ color: 'black', fontSize: hp(3) }}>{item.strMeal}</Text>
            <ScrollView>
              {
                <RecipeDetailLorem/>
              }
            </ScrollView>
          </View>

        </Modal>
      </View>

    )
  }


  const navigation = useNavigation();
  return (
    <View>
      {
        detailShow ? <Animated.View className="mx-4 space-y-3" entering={FadeInDown.duration(600).springify().damping(8)}>
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
                    renderItem={({ item, i }) =>
                      <RecipeCard
                        item={item as Recipe}
                        index={i}
                        catagory={catagoryShow}
                      // navigation={navigation}
                      />}
                    onEndReachedThreshold={0.1}
                  />
                )
            }
          </View>
        </Animated.View>
          : <CatagoryRecipe item={filteredMeal[0]} index={0} catagory={catagoryShow} />
      }

    </View>

  )
}

export default RecipeData;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modleStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: hp(20),
    marginLeft: hp(1),
    width: hp(46),
    height: hp(80),
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),

  },
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
