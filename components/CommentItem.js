import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {get,} from '../firebase/util.js'
import { ref, getDownloadURL} from 'firebase/storage';
import { storage } from "../firebase/setup.js";


export default function CommentItem({ comment, user }) {
    const [email,setEmail]=useState(null)
    const [showuri,setShowuri]=useState(null)
    useEffect(() => {
        async function getemailandpic() {
            const dt = await get('uid-email',user);
            const dt2=await get('users',user)
            if(dt){
                setEmail(dt.email)
            }
            if(dt2){
                let imagelink=dt2.image
                if(imagelink){
                    const reference = ref(storage,imagelink);
                    const downloadUri = await getDownloadURL(reference);
                    setShowuri(downloadUri);
                }
            }
        }
        getemailandpic()
    })
  return (
    <View style={styles.commentContainer}>
    <View style={styles.avatar}>
        {showuri?<Image source={{ uri: showuri }} style={styles.avatar} />:null}
    </View>
    <View style={styles.commentBody}>
      <Text style={styles.commentUser}>{email}</Text>
      <Text style={styles.commentText}>{comment}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    poster: {
      width: '100%',
      height: 300,
    },
    details: {
      padding: 20,
      backgroundColor: '#fff',
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
      backgroundColor: '#fff',
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
  