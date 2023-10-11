import { StyleSheet,StatusBar,ScrollView,TextInput,TouchableOpacity,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames'
// import { Link, Tabs } from 'expo-router';
import { Text, View, SafeAreaView } from '../../components/Themed';
import { Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import CartList from '../../components/cartList';
import { CartProvider,useCart } from '../../hooks/cartModule';

export default function profile() {
  const router = useRouter()
  const {state} = useCart()

  return (
    <SafeAreaView style={[styles.container, {marginTop: StatusBar.currentHeight},tw``]} darkColor="black">
        <View style={tw`flex flex-row px-2`}>
            <View style={[{zIndex:99, marginTop: 14},tw` bg-green-700 rounded-2xl flex flex-row items-center items-center w-full px-6 py-2`]}>
                
                <TouchableOpacity>
                <Text onPress={()=>{console.log(state)}} style={tw`font-bold text-white text-2xl`}>
                    Profile
                </Text>
                </TouchableOpacity>
            </View>
        </View>
        
      <ScrollView style={[tw`w-full px-2`]}>
        <View style={tw`w-full flex flex-row items-center justify-center mt-32`}>
          <Image
            style={[{aspectRatio:1,resizeMode:'contain'},tw`rounded-xl opacity-75 h-80 w-4/5`]}
            source={require('../../assets/images/userDefault.png')}
          />
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
  },
  scroll:{
    alignItems:'center',
    justifyContent:'flex-start'
  }
});