import { StyleSheet,StatusBar,ScrollView,TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../../components/Themed';
import Homeview from '../../components/homeview';
import { Ionicons } from '@expo/vector-icons'
import { CartProvider } from '../../hooks/cartModule';


export default function index() {
  return (
    <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight},tw`flex flex-col items-center justify-center`]} darkColor="black">
      <View style={tw`w-full flex flex-row justify-between mt-6 px-4`}>
        <Ionicons style={tw``} name="location-outline" size={28} color="gray" />
        <Text style={tw`text-xl font-bold`} lightColor='gray' darkColor='white'>Lagos Nigeria</Text>
        <Link href="/(tabs)/cart">
          <View style={tw`h-10 flex flex-row justify-end px-2`}>
            <Text style={[{zIndex:999,borderRadius:20},tw`text-xs w-4 h-4 text-white font-bold bg-green-500 rounded-2xl pl-1`]} lightColor='black' darkColor='white'>1</Text>
            <Ionicons style={tw`absolute mt-1`} name="cart" size={28} color="black" />
          </View>
        </Link>
      </View>

      <ScrollView style={tw`px-2 mb-2`}>
          <Homeview/>        
      </ScrollView>

      <StatusBar barStyle={'default'}/>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
