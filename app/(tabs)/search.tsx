import React from 'react'
import { Text, View, SafeAreaView } from '../../components/Themed';
import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image,FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useCart} from '../../hooks/cartModule';


type furniture = {
  _id:string
  title:string
  supplier:string
  price:number
  imageUrl:string
  description:string
  product_Location:string
}

export default function search() {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState<furniture[]>([])
    const {state,dispatch} = useCart()


    const handleSearch = async()=>{
      try {
        const response = await axios.get(`https://furnisale-backend.onrender.com/api/products/search/${searchInput}`)
        setSearchResult(response.data)
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight}]} darkColor="black">
      <View style={tw`w-full flex flex-row items-center justify-center mt-4 ml-2`}>
          <View style={tw`w-4/5 h-12 flex flex-row items-center bg-blue-200 rounded-xl`}>
            <Ionicons onPressIn={()=>{}} style={tw`w-12 px-2`} name="search" size={28} color="black" />
            <TextInput
                
                style={tw`bg-transparent w-3/4 h-full `}
                placeholder="what are you looking for"
                onChangeText={setSearchInput}
                value={searchInput}
                keyboardType="default"
            />            
          </View>
          <TouchableOpacity onPress={()=>{handleSearch()}}>
            <Ionicons style={tw`bg-green-800 w-12 px-2.5 py-2 rounded-xl mx-1`} name="search" size={28} color="white" />
          </TouchableOpacity>
          
      </View>

      <ScrollView style={tw`w-full`}>
        <View style={tw`w-full px-2 h-full`}>
          {searchResult.length ? (
            <FlatList
            data={searchResult}
            numColumns={1}
            renderItem={({item}) => (
                    <TouchableOpacity style={tw`bg-blue-100 my-2 mx-2 rounded-xl`} onPress={()=>{router.push({ pathname: "/productDetails", params:item})}}>
                        <View style={[tw` w-full flex flex-row items-start bg-transparent rounded-xl px-2.5 py-2`]}>
                            <View style={tw`w-36 mr-2 flex flex-row rounded-xl justify-center items-center bg-transparent`}>
                              <Image
                                style={[{aspectRatio:1,resizeMode:'cover'},tw`rounded-xl bg-transparent w-full`]}
                                source={require('../../assets/images/fn1.jpg')}
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
        />):(
            <View style={tw`w-full flex flex-row items-center mt-32`}>
              <Image
                style={[{aspectRatio:1,resizeMode:'contain'},tw`rounded-xl border-2 opacity-75 h-80 w-4/5`]}
                source={require('../../assets/images/Pose23.png')}
              />
            </View>
          )}

        </View>
      </ScrollView>
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
  

