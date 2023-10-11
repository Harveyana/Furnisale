import { StyleSheet,ActivityIndicator,StatusBar,ScrollView,TextInput,TouchableOpacity,FlatList,Image,View as view} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useRouter, Link } from 'expo-router';
import { useState,useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useCart} from '../hooks/cartModule';


const cartList = () => {
    const router = useRouter()
    const {state,dispatch} = useCart()
    // const {isLoading,data,refetch} = useFetch()

    useEffect(()=>{
        console.log(state)
    },[]);

    if(!state.length){
        return (
            <View style={tw`w-full flex flex-row items-center mt-32`}>
            <Image
              style={[{aspectRatio:1,resizeMode:'contain'},tw`rounded-xl border-2 opacity-75 h-80 w-4/5`]}
              source={require('../assets/images/Pose23.png')}
            />
          </View>
          
        )
    } 


  return (
    <View style={tw`w-full`}>
      <FlatList
            data={state}
            numColumns={1}
            renderItem={({item}) => (
                    <TouchableOpacity style={tw`w-full bg-blue-100 my-2 rounded-xl`} onPress={()=>{router.push({ pathname: "/productDetails", params:item})}}>
                        <View style={[tw` w-full flex flex-row justify-between bg-transparent rounded-xl px-2.5 py-2`]}>

                            <View style={tw`flex flex-row bg-transparent`}>
                                <View style={tw`w-20 mr-2 flex flex-row items-start rounded-xl bg-transparent`}>
                                    <Image
                                        style={[{aspectRatio:1,resizeMode:'cover'},tw`rounded-xl bg-transparent w-full`]}
                                        source={require('../assets/images/fn1.jpg')}
                                    />
                                </View>
                                
                                <View style={tw`bg-transparent`}>
                                    <Text numberOfLines={1} style={tw`font-bold text-lg`} darkColor='black'>{item.title}</Text>
                                    <Text numberOfLines={1} style={tw`font-bold text-gray-500`}>{item.supplier}</Text>
                                    <Text style={tw`font-bold text-green-800 text-lg`}>${item.price}</Text>
                                </View> 

                            </View>

                            <View style={tw`px-2 ml-2 bg-transparent`}>
                                    <View style={tw` bg-transparent flex flex-row items-center mt-2`}>
                                        <TouchableOpacity onPress={()=>{dispatch({type:'INCREASE_QUANTITY',payload: item._id})}}>
                                        <SimpleLineIcons style={tw`bg-white rounded-2xl`} name="plus" size={28} color="black" />
                                        </TouchableOpacity>

                                        <Text style={tw`text-xl px-1 rounded-lg mx-2`}>{item.quantity}</Text>

                                        <TouchableOpacity onPress={()=>{dispatch({type:'DECREASE_QUANTITY',payload: item._id})}}>
                                        <SimpleLineIcons style={tw`bg-white rounded-2xl`} name="minus" size={28} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={()=>{dispatch({type:'REMOVE_FROM_CART',payload: item._id})}} style={tw`absolute bottom-1 right-1`}>
                                    <Ionicons style={tw`bg-red-800 w-8 px-1.5 py-1 rounded-xl mx-1.5`} name="trash" size={20} color="white" />
                                    </TouchableOpacity>

                            </View>
                            
                            

                            
                            
                
                        </View>
                    </TouchableOpacity>
                
    
            )}
            contentContainerStyle={[{columnGap:16},tw`mt-4`]}
        />
    </View>
  )
}

export default cartList

const styles = StyleSheet.create({})