import React, { useEffect } from 'react';
import { Image, Pressable, View, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Camera({ showuri, deleteImage, pickImage, pickFromGallery, fetchImageUri, editImage, flag }) {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(false)
  }, [showuri, flag]);

  return (
    <>
      {showuri ? (
        <>
          <Image source={{ uri: showuri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {!loading ? (
              <>
                <Pressable onPress={() => { setLoading(true), editImage() }}>
                  <AntDesign name="edit" size={25} color="dodgerblue" />
                </Pressable>
                <View style={{ width: 20 }} />
                <Pressable onPress={() => { setLoading(true), deleteImage(fetchImageUri) }} style={{ marginLeft: 10 }}>
                  <AntDesign name="delete" size={25} color="dodgerblue" />
                </Pressable>
              </>
            ) : <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </>
      ) : (
        <>
          <MaterialIcons name="portrait" size={100} color="turquoise" style={{ alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {!loading && (
              <>
                <Pressable style={{ marginRight: 20 }} onPress={() => { setLoading(true), pickImage(fetchImageUri) }}>
                  <MaterialIcons name="add-a-photo" size={35} color="dodgerblue" />
                </Pressable>
                <Pressable onPress={() => { setLoading(true), pickFromGallery(fetchImageUri) }}>
                  <FontAwesome name="picture-o" size={34} color="dodgerblue" />
                </Pressable>
              </>
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </>
      )}
    </>
  );
}
