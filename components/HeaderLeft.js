import React, { useEffect } from 'react';
import { View, Pressable } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import Color from '../components/Color';

const HeaderLeft = ({ title }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        backgroundColor: Color.Header,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={30} color="yellow" />
          </Pressable>
        </View>
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [navigation]);

  return null;
};

export default HeaderLeft;
