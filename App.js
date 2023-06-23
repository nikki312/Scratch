import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import NewScreen from './NewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerTitle: () => (
              <View>
                <Image source={require('./assets/ss.png')} style={styles.headerImage} />
              </View>
            ),
          }}/>   
        <Stack.Screen name="NewScreen" component={NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: 400,
    height: 50,
    resizeMode: 'contain',
  },
});


export default App;
      
