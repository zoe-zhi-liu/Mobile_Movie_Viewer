import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Signup from './Signup';
import Login from './Login';
import { LinearGradient } from 'expo-linear-gradient';
import Color from './Color';

export default function Popup({ vis, changevis }) {
  const [isSignup, setIsSignup] = React.useState(true);
  
  return (
    <Modal visible={vis} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <LinearGradient 
          colors={[Color.gradientStart, Color.gradientEnd, Color.gradientFinal]}
          style={styles.modalContainer}>
          <Pressable onPress={() => { changevis(false); }} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Don't want to be a member?</Text>
          </Pressable>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => setIsSignup(true)} style={[styles.button, isSignup && styles.activeButton]}>
              <Text style={isSignup ? styles.activeText : styles.inactiveText}>Signup</Text>
            </Pressable>
            <Pressable onPress={() => setIsSignup(false)} style={[styles.button, !isSignup && styles.activeButton]}>
              <Text style={!isSignup ? styles.activeText : styles.inactiveText}>Login</Text>
            </Pressable>
          </View>
          {isSignup ? <Signup fail={changevis} /> : <Login fail={changevis} />}
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
  modalContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: Color.gradientFinal,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  closeButtonText: {
    fontSize: 15,
    color: '#555',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderBottomWidth: 2,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Button,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: Color.Header,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 10,
  },
  activeText: {
    color: 'white',
    fontSize: 18,
  },
  inactiveText: {
    color: 'white',
    fontSize: 18,
  },
});
