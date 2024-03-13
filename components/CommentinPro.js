import { View, FlatList, StyleSheet, Pressable, TextInput, Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../firebase/setup.js';
import { db } from '../firebase/setup.js';
import { remove, update } from '../firebase/util.js';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function CommentinPro() {
    const [cm, setCm] = React.useState([]);

    useEffect(() => {
        const dt = onSnapshot(query(collection(db, "comments"), where("user", '==', auth.currentUser.uid)), q => {
            const puredt = q.empty ? [] : q.docs.map(function(i){return {...i.data(), id: i.id}});
            setCm(puredt);
        })
        return () => { dt() };
      }, []);

    return (
        <View>
            <FlatList data={cm} renderItem={({ item }) => <CommentItem i={item} />}/>
        </View>
    );
}

const CommentItem = ({ i }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(i.cm);

    const handleConfirm = async () => {
        if (editedComment !== i.cm) {
            await update('comments', i.id, { cm: editedComment });
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert(
            "Alert",
            "Do you want to delete this comment?",
            [
                {
                    text: "No",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        remove('comments', i.id);
                        alert('Comment deleted');
                    }
                }
            ],
            { cancelable: true }
        );
    };

    if (isEditing) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    value={editedComment}
                    onChangeText={setEditedComment}
                    style={[styles.commentText, { marginBottom: 10 }]}
                />
                <Pressable onPress={handleConfirm} style={styles.confirmContainer}>
                    <FontAwesome name="check" size={20} color="dodgerblue" />
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.commentText}>{i.cm} from {i.mv}</Text>
            </View>
            <Pressable onPress={() => setIsEditing(true)} style={styles.iconContainer}>
                <AntDesign name="edit" size={20} color="dodgerblue" />
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.iconContainer}>
                <AntDesign name="delete" size={20} color="dodgerblue" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    commentText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
    },
    iconContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    confirmContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 10,
        borderRadius: 5,
    },
});
