import { SliderBox } from 'react-native-image-slider-box'
import { Text, View, SafeAreaView } from '../components/Themed';
import tw from 'tailwind-react-native-classnames'


const slider = () => {
    const images =[require('../assets/images/fn1.jpg'),
                   require('../assets/images/fn2.jpg'),
                   require('../assets/images/fn3.jpg'),
                   require('../assets/images/fn4.jpg'),
                   require('../assets/images/fn5.jpg')
                ]
  return (
    <View style={tw`mt-4 flex flex-row justify-center items-center pr-2`}>
        <SliderBox
        images={images}
        dotColor="green"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 5}}
        autoplay
        circleLoop
        dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            padding: 0,
            margin: 0
        }}
        />
    </View>
  )
}

export default slider
