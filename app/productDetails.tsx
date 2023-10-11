import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useRouter,useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useCart} from '../hooks/cartModule';


type furniture = {
  _id:string
  title:string
  supplier:string
  price:string
  imageUrl:string
  description:string
  product_Location:string
}

export default function productDetails() {
  const [count, setCount] =useState(1)
  const {title,price,description,product_Location} = useLocalSearchParams<furniture>();


  const increment =()=>{
    setCount(count + 1)
  }
  const decrement =()=>{
    if(count > 1) setCount(count - 1)
  }

  const router = useRouter()
  return (
    <View style={[{flex:1},tw`w-full`]}>
      <View style={[{zIndex:99, marginTop: StatusBar.currentHeight},tw`absolute bg-transparent flex flex-row justify-between items-center w-full px-2`]}>
        <TouchableOpacity onPressIn={()=>{router.back()}}>
          <Ionicons style={tw`px-2`} name="chevron-back-circle" size={42} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons style={tw`px-2`} name="heart" size={38} color="green" />
        </TouchableOpacity>
      </View>
      <Image
        style={[{resizeMode:'cover',height:335},tw`rounded-xl w-full`]}
        source={require('../assets/images/fn1.jpg')}
      />

      <ScrollView style={tw`w-full`}>

        <View style={tw`w-full px-2 py-2`}>
              <View style={tw`w-full flex flex-row justify-between items-center px-2 mt-2`}>
                <Text style={tw`text-2xl font-bold`} numberOfLines={1}>{title}</Text>
                <View style={tw`bg-blue-100 px-2 rounded-lg`}>
                  <Text style={tw`font-bold text-2xl`} darkColor='black'>${price}</Text>
                </View>
              </View>

              <View style={tw`w-full flex flex-row justify-between items-center px-2 mt-2`}>
                <View style={tw`flex flex-row items-center`}>
                  {[1,2,3,4,5].map((index: number) => (
                    <Ionicons key={index} style={tw``} name="star" size={24} color="gold" />
                  ))}
                  <Text style={tw`text-xl px-1`}>(4.5)</Text>
                </View>
                <View style={tw`flex flex-row items-center mt-2`}>
                  <TouchableOpacity onPress={()=>{increment()}}>
                    <SimpleLineIcons style={tw`bg-white rounded-2xl`} name="plus" size={32} color="black" />
                  </TouchableOpacity>
                  <Text style={tw`text-xl px-2 rounded-lg mx-2`}>{count}</Text>
                  <TouchableOpacity onPress={()=>{decrement()}}>
                    <SimpleLineIcons style={tw`bg-white rounded-2xl`} name="minus" size={32} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={tw`w-full mt-2 px-2`}>
                <Text style={tw`font-bold text-2xl`}>Description</Text>
                <Text style={[{textAlign:'justify'},tw`text-sm w-full`]}>
                  {description}
                </Text>
              </View>

              <View style={tw`px-2 mt-4`}>
                <View style={tw`bg-blue-100 px-2 py-2 w-full rounded-xl flex flex-row justify-between items-center`}>

                  <View style={tw`bg-transparent w-1/2 flex flex-row justify-start items-center`}>
                    <Ionicons style={tw`mx-2`} name="location-outline" size={24} color="black" />
                    <Text style={tw`text-xl w-3/5 text-left font-bold`} numberOfLines={1} lightColor='black' darkColor='white'>{product_Location}</Text>
                  </View>

                  <View style={tw`bg-transparent flex flex-row justify-start items-center`}>
                    <FontAwesome style={tw``} name="truck" size={24} color="black" />
                    <Text style={tw`text-xl mx-2`} numberOfLines={1} lightColor='black' darkColor='white'>Free shipping</Text>
                  </View>

                </View>
              </View>

              <View style={tw`px-2 mt-4 flex flex-row justify-between items-center`}>

                <TouchableOpacity style={tw`w-1/2`}>
                  <View style={tw`w-full flex flex-row items-center justify-center px-2 py-2 rounded-xl `} darkColor='white' lightColor='black'>
                    <Text style={tw`text-xl font-bold`} numberOfLines={1} lightColor='white' darkColor='black'>Buy Now</Text>
                  </View>
                </TouchableOpacity>  

                <FontAwesome style={tw`mx-2 px-2 py-2 bg-black rounded-2xl`} name="shopping-bag" size={24} color="white" />
              </View>
        </View>
      </ScrollView>

      

    </View>
  )
}

const styles = StyleSheet.create({})