import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'



const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
      style={styles.loader} 
      source={require('../screens/assets/animations/burger.json')}
      autoPlay 
      loop
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

    loader:{
        flex:1 , 
        justifyContent:'center' , 
        alignItems:'center',
        height:110,
        width:110,
    
      },
})