import { ActivityIndicator, StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,FlatList,Image } from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Text, View, SafeAreaView } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation,useRouter } from 'expo-router';
import Slider from '../components/slider'
import ProductCardView from './productCardView';
import useFetch from '../hooks/useFetch';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useCart } from '../hooks/cartModule';



export default function homeview() {
    type furniture = {
        _id:string
        title:string
        supplier:string
        price:number
        imageUrl:string
        description:string
        product_Location:string
    }
    const router = useRouter()

    const {data,isLoading,error,refetch} = useFetch()
    const {dispatch} = useCart()

    useEffect(()=>{
        refetch()
    },[]);
    
  return (
        <>
        
        <Text style={tw`text-4xl font-bold mt-4`} lightColor='black' darkColor='white'>Find the most <Text style={tw`text-green-500 font-bold`}>Luxurious Furniture</Text></Text>
        <View style={tw`w-full flex flex-row items-center justify-center mt-4`}>
          <View style={tw`w-4/5 h-12 flex flex-row items-center bg-blue-200 rounded-xl`}>
            <Ionicons style={tw`w-12 px-2`} name="search" size={28} color="black" />
            <TextInput
                onPressIn={()=>{router.push('/(tabs)/search')}}
                style={tw`bg-transparent w-3/4 h-full `}
                placeholder="what are you looking for"
                keyboardType="default"
            />            
          </View>
          <TouchableOpacity onPress={()=>{}}>
            <Ionicons  style={tw`bg-green-800 w-12 px-2.5 py-2 rounded-xl mx-1.5`} name="camera-outline" size={28} color="white" />
          </TouchableOpacity>
          
        </View>
        
        <View style={tw`w-full flex flex-row justify-center items-center px-2`}>
           <Slider/> 
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-2 px-1`}>
            <Text style={tw`font-bold text-2xl`}>
                New Arrivals
            </Text>
            <TouchableOpacity onPress={()=>{router.push('/newArrivalProducts')}}>
                <Ionicons style={tw`bg-green-800 w-10 px-2.5 py-2 rounded-xl mx-1.5`} name="grid" size={20} color="white" />
            </TouchableOpacity>
        </View>
        <View style={tw``}>
            {isLoading ? (<ActivityIndicator size={32} color={'black'}/>) 
            : error ? (<Text style={tw`font-bold text-2xl`}>{error}</Text>) 
            :(<FlatList
                data={data}
                horizontal
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`bg-blue-100 rounded-xl`} onPress={()=>{router.push({ pathname: "/productDetails", params:item})}}>
                    <View style={[tw`w-40 bg-transparent rounded-xl mt-2 px-2 mx-1`]}>
                        <View style={tw`w-full flex flex-row rounded-xl justify-center items-center bg-transparent`}>
                            <Image
                                style={[{aspectRatio:1,resizeMode:'cover'},tw`rounded-xl bg-transparent w-full h-32`]}
                                source={require('../assets/images/fn1.jpg')}
                            />
                        </View>
                        <View style={tw`bg-transparent`}>
                            <Text numberOfLines={1} style={tw`font-bold text-lg`} darkColor='black'>{item.title}</Text>
                            <Text numberOfLines={1} style={tw`font-bold text-gray-500`}>{item.supplier}</Text>
                            <Text style={tw`font-bold text-green-800 text-lg`}>${item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{dispatch({type:'ADD_TO_CART',payload: {...item,quantity:1}})}} style={tw`absolute bottom-2 right-2`}>
                          <Ionicons style={tw`bg-green-800 w-10 px-2.5 py-2 rounded-xl mx-1.5`} name="add-circle" size={20} color="white" />
                        </TouchableOpacity>
            
                    </View>
                </TouchableOpacity>
        
                )}
                contentContainerStyle={[{columnGap:16},tw`mt-4`]}
            />)}
            
        </View>
        
        </>
    
  )
}
