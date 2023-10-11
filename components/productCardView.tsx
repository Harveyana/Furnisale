import { Text, View, SafeAreaView } from '../components/Themed';
import { TouchableOpacity,Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation,useRouter } from 'expo-router';

type furniture = {
    _id:string
    title:string
    supplier:string
    price:number
    imageUrl:string
    description:string
    product_Location:string
}

export default function productCardView ({_id,
    title,
    supplier,
    price,
    imageUrl,
    description,
    product_Location,}:furniture) {
    const router = useRouter()

  return (
    <TouchableOpacity style={tw`bg-blue-100 rounded-xl`} onPress={()=>{router.push('/productDetails')}}>
        <View style={[tw`w-40 bg-transparent rounded-xl mt-2 px-2 mx-1`]}>
            <View style={tw`w-full flex flex-row rounded-xl justify-center items-center bg-transparent`}>
                <Image
                    style={[{aspectRatio:1,resizeMode:'cover'},tw`rounded-xl bg-transparent w-full h-32`]}
                    source={require('../assets/images/fn1.jpg')}
                />
            </View>
            <View style={tw`bg-transparent`}>
                <Text numberOfLines={1} style={tw`font-bold text-lg`} darkColor='black'>{title}</Text>
                <Text numberOfLines={1} style={tw`font-bold text-gray-500`}>supplier</Text>
                <Text style={tw`font-bold text-green-800 text-lg`}>$600</Text>
            </View>
            <TouchableOpacity style={tw`absolute bottom-2 right-2`}>
              <Ionicons style={tw`bg-green-800 w-10 px-2.5 py-2 rounded-xl mx-1.5`} name="add-circle" size={20} color="white" />
            </TouchableOpacity>

        </View>
    </TouchableOpacity>
    
  )
}


