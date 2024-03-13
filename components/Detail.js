import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Input from './Input';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/setup.js';
import Popup from './Popup.js';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/setup.js';
import HeaderLeft from '../components/HeaderLeft';
import CommentItem from '../components/CommentItem.js';
import Color from '../components/Color';
import { LinearGradient } from 'expo-linear-gradient';


export default function Detail({ route }) {
  const [cms, setCms] = React.useState([]);
  const [pop, setPop] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setLoggedIn(!!user);
    });
  }, []);

  useEffect(() => {
    const dt = onSnapshot(query(collection(db, "comments"), where("mv", '==', route.params.info.name)), q => {
      const puredt = q.empty ? [] : q.docs.map(doc => doc.data());
      setCms(puredt);
    });
    return () => { dt(); };
  }, []);

  return (
    <LinearGradient 
      colors={[Color.gradientStart, Color.gradientEnd, Color.gradientFinal]}
      style={styles.container}>
      <HeaderLeft title="Detail" />
      <Popup vis={pop} changevis={setPop} />
      <FlatList
        data={cms}
        ListHeaderComponent={() => (
          <>
            <Image
              style={styles.poster}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${route.params.info.poster_path}` }}
            />
            <View style={styles.details}>
              <Text style={styles.title}>{route.params.info.name}</Text>
              <Text style={styles.overview}>{route.params.info.overview}</Text>
              <Input mvname={route.params.info.name} loggedIn={loggedIn} changepop={setPop} />
            </View>
            <CommentSection />
          </>
        )}
        renderItem={({ item }) => <CommentItem comment={item.cm} user={item.user || "Anonymous"} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </LinearGradient>
  );
}

const CommentSection = () => (
  <View style={styles.comments}>
    <Text style={styles.commentsTitle}>Comments</Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  overview: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  comments: {
    padding: 20,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20, 
    backgroundColor: 'rgba(0,0,0,0.02)',  
    borderRadius: 5,
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  commentBody: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#555',
  },
});
