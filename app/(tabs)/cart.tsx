import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useEffect, useState} from 'react';

import { useRouter } from 'expo-router';
import CartList from '../../components/cartList';
import { CartProvider,useCart } from '../../hooks/cartModule';

interface CartItem {
  _id:string
  title:string
  supplier:string
  price:number
  imageUrl:string
  description:string
  product_Location:string
  quantity: number;

}

export default function cart() {
  const router = useRouter()
  const {state} = useCart()

  const [totalPrice, setTotalPrice] =useState(0)

  const getTotalPrice = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  useEffect(() => {
    // This effect will run whenever the cart state changes
    const newTotal = getTotalPrice(state);
    // Use the newTotal as needed, e.g., update your component's state
    console.log('Total Price Updated: ', newTotal);
    setTotalPrice(newTotal)
  }, [state]); // List the dependencies that trigger the effect when changed


  return (
    <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight},tw``]} darkColor="black">
        <View style={tw`flex flex-row px-2`}>
            <View style={[{zIndex:99, marginTop: 14},tw` bg-green-700 rounded-2xl flex flex-row items-center items-center w-full px-2 py-1`]}>
                <TouchableOpacity onPressIn={()=>{router.back()}}>
                <Ionicons style={tw`px-2`} name="chevron-back-circle" size={35} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                <Text onPress={()=>{console.log(state)}} style={tw`font-bold text-white text-2xl`}>
                    Cart
                </Text>
                </TouchableOpacity>
            </View>
        </View>
        
      <ScrollView style={tw`w-full px-2`}>
            <CartList />
      </ScrollView>
      <View style={tw`w-full px-4`}>
        <View style={tw`w-full flex flex-row items-center justify-between bg-blue-100 my-2 px-2 py-2 rounded-xl`}>
          <Text onPress={()=>{console.log(state)}} style={tw`font-bold text-gray-500 text-2xl`}>
            Total:
          </Text>
          <View style={tw`bg-blue-100 px-2 rounded-lg`}>
            <Text style={tw`font-bold text-2xl`} darkColor='black'>${totalPrice}</Text>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});