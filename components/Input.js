import { View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { add, set } from '../firebase/util.js';
import { auth } from '../firebase/setup.js';

export default function Input({ mvname, loggedIn, changepop }) {
  const [text, setText] = React.useState('');
  return (
    <View style={{ margin: 20, padding: 10, borderColor: 'grey', borderBottomWidth: 2 }}>
      <Text>Leave your comment</Text>
      <TextInput
        placeholder="Comment"
        onChangeText={function (tx) { setText(tx); }}
        multiline={true}
        numberOfLines={4}
        style={{ minHeight: 80, borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 10 }} // 输入框的样式
      >
        {text}
      </TextInput>
      <Pressable
        style={[Style.button, { width: '50%' }]}
        onPress={function () {
          if (loggedIn) {
            add('comments', { cm: text, mv: mvname, user: auth.currentUser.uid });
            set('uid-email', { id:auth.currentUser.uid, email: auth.currentUser.email });
            setText('');
            alert('comment added');
          } else {
            changepop(true);
          }
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Post</Text> 
      </Pressable>
    </View>
  );
}
