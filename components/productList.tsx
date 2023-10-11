import { StyleSheet,ActivityIndicator,StatusBar,ScrollView,TextInput,TouchableOpacity,FlatList,Image,View as view} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useRouter, Link } from 'expo-router';
import { useState,useEffect } from 'react';
import useFetch from '../hooks/useFetch';
// import useCart from '../hooks/useCart';
import { useCart } from '../hooks/cartModule';


const productList = () => {
    const router = useRouter()
    const {isLoading,data,refetch} = useFetch()
    const {state,dispatch} = useCart()
    useEffect(()=>{
        refetch()
    },[]);

    if(isLoading){
        return (
        <View style={[{flex: 1,alignItems: 'center',justifyContent: 'flex-start'},tw`absolute top-1/2 flex flex-row items-center justify-center`]}>
            <ActivityIndicator style={{}} size={35} color={'black'}/>
        </View>
          
        )
    }
  return (
    <View>
      <FlatList
                data={data}
                numColumns={2}
                renderItem={({item}) => (
                        <TouchableOpacity style={tw`bg-blue-100 my-2 mx-2 rounded-xl`} onPress={()=>{router.push({ pathname: "/productDetails", params:item})}}>
                            <View style={[tw`w-40 bg-transparent rounded-xl mt-2 px-2.5 py-1`]}>
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
                // ItemSeparatorComponent={(<View style={tw`h-8`} />)}
                contentContainerStyle={[{columnGap:16},tw`mt-4`]}
            />
    </View>
  )
}

export default productList

const styles = StyleSheet.create({})