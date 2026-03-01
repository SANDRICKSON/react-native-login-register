import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Registration from './Registration';



const Stack = createStackNavigator();




export default function MainStackNavigator() {

    return (<NavigationContainer>
        <Stack.Navigator initialRouteName="Registration">
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}></Stack.Screen>
            <Stack.Screen name="Registration" component={Registration} options={{ title: 'Registration' }}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

