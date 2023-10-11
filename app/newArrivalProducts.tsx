import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import ProductList from '../components/productList';
import { useState } from 'react';
import { CartProvider } from '../hooks/cartModule';

const newArrivalProducts = () => {
   const router = useRouter()
  return (
    <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight},tw`px-1`]} darkColor="black">
        <View style={tw`flex flex-row px-2`}>
            <View style={[{zIndex:99, marginTop: 14},tw` bg-green-700 rounded-2xl flex flex-row items-center items-center w-full px-2 py-1`]}>
                <TouchableOpacity onPressIn={()=>{router.back()}}>
                <Ionicons style={tw`px-2`} name="chevron-back-circle" size={35} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                <Text style={tw`font-bold text-white text-2xl`}>
                    New Arrivals
                </Text>
                </TouchableOpacity>
            </View>
        </View>
        
      <ScrollView>
        <ProductList/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default newArrivalProducts

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });
  