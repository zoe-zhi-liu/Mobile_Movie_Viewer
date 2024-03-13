import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/setup.js';
import { useEffect, useState } from 'react';
import MovieNotification from './components/MovieNotification';
import TabNavigator from './components/TabNavigator';
import Detail from './components/Detail';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setLoggedIn(!!user);
        });
    }, []);

    return (
        <NavigationContainer>
            <MovieNotification />
            <Stack.Navigator>
                <Stack.Screen name="VanMovie" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
