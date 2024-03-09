import { Button, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated  , {useSharedValue,withSpring,withDelay,withTiming}from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';



type RootStackParamList = {
    Home:undefined ;
    Welcome:undefined;
  };
  
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;



const WelcomeScreen: React.FC = () => {
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation<WelcomeScreenNavigationProp>();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(4.5)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(4)), 300);
        setTimeout(()=> navigation.replace("Home"), 1000);
    }, [])
    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>
            <StatusBar barStyle={'light-content'} />

            {/* logo image woth rings */}
            <Animated.View className='bg-white/20 rounded-full ' style={{ padding: ring1padding }}>
                <Animated.View className='bg-white/20 rounded-full ' style={{ padding: ring2padding }}>
                    <Image source={require('./assets/images/foodtop.webp')}
                        style={{ width: hp(30), height: hp(30) }} />
                </Animated.View>
            </Animated.View >




            {/*title and punch line */}
            < View className='flex items-center space-y-2' >
                <Animated.Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(8) }}>
                    Foody
                </Animated.Text>
                <Animated.Text className='font-medium text-white tracking-widest' style={{ fontSize: hp(2.4) }} >
                    Food is always right!
                </Animated.Text>

            </View >
        </View >
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({})