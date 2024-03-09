import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React from 'react'
import Animated , { FadeInDown, FadeOut } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}


interface CatagoriesPropes {
  catagoriesDataNew: Category[],  
  activeCatagory: string,
  handleChangeCatagory: (activeCatagory: string) => void;
}

const Catagories: React.FC<CatagoriesPropes> = ({catagoriesDataNew , activeCatagory, handleChangeCatagory }) => {
// console.log(catagoriesDataNew)
  return (
    <Animated.View entering={FadeInDown.duration(500).springify().damping(9)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: hp(2) }}
        className='space-x-4'
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          catagoriesDataNew.map((cat, index) => {
            let isActive = cat.strCategory == activeCatagory;
            let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCatagory(cat.strCategory)}
                // className="flex items-center space-y-1"
                style={{flex:1 , alignItems:'center'}}
              >
                
                  <View className= {activeButtonClass} style={styles.catagoriesBackground} >
                    <Image
                      source={{ uri: cat.strCategoryThumb }}
                      style={{ width: hp(6), height: hp(6) }}
                      className="rounded-full" />
                  </View>
                  <Text
                    
                    style={{ fontSize: hp(1.6) }} className="text-neutral-600 " >
                    {cat.strCategory}
                  </Text>
                


              </TouchableOpacity>
            )
          })
        }


      </ScrollView>

    </Animated.View>
  )
}


export default Catagories;
const styles = StyleSheet.create({
  catagoriesBackground:{
    height:hp(7.4) , 
    width:hp(7.4) , 
    alignItems:'center' , 
    justifyContent:'center', 
    borderRadius:hp(3.7)
  }
})