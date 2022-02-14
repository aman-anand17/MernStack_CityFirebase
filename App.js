import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screen/Login';
import Signup from './Screen/Signup';
import HomeScreen from './Screen/HomeScreen';
import InputData from './Screen/InputData';
import LoginContextState from './Contexts/LoginContextState';
import ProfileSetting from './Screen/ProfileSetting';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();



function App() {

  const [loaded] = useFonts({
    Myfont: require('./assets/Quintessential-Regular.ttf'),
    HeadingFont: require('./assets/AkayaTelivigala-Regular.ttf'),
    myfont1: require('./assets/ArchitectsDaughter-Regular.ttf')
  });
  if (!loaded) {
    return null;
  }
  
  return (
    <LoginContextState>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        initialRoute:"Home",
        headerShown:false,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />       
        <Stack.Screen name="inputData" component={InputData} />
        <Stack.Screen name="profile" component={ProfileSetting} />
      </Stack.Navigator>
    </NavigationContainer>

    </LoginContextState>
    
  );
}

export default App;