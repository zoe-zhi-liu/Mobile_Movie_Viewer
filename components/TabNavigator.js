import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Cinema from '../screens/Cinema';
import Color from '../components/Color';

const Tab = createBottomTabNavigator();

const ICON_SIZE = {
    focused: 28,
    default: 24
};

const getTabBarIcon = ({ name, focused, color }) => {
    let iconName;

    switch (name) {
        case 'Movies':
            iconName = focused ? 'movie-filter' : 'movie-filter-outline';
            break;
        case 'Cinemas':
            iconName = focused ? 'map-marker-radius' : 'map-marker-radius-outline';
            break;
        default:
            iconName = 'alert-circle-outline';  // More general icon for unknown routes
            break;
    }

    const iconSize = focused ? ICON_SIZE.focused : ICON_SIZE.default;

    return <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />;
};

const tabBarOptions = {
    tabBarActiveTintColor: 'yellow',
    tabBarInactiveTintColor: 'white',
    tabBarStyle: {
        backgroundColor: Color.TabNavigator,
        height: 65,
        borderTopWidth: 0,
        elevation: 10,
        shadowOpacity: 0.1,
        paddingBottom: 5,
    },
    tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 4,
    }
};

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: (props) => getTabBarIcon({ ...props, name: route.name }),
            ...tabBarOptions
        })}
    >
        <Tab.Screen name="Movies" component={Home} />
        <Tab.Screen name="Cinemas" component={Cinema} />
    </Tab.Navigator>
);

export default TabNavigator;
