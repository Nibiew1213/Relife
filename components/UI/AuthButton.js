import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/authStyles';

function AuthButton({ children, onPress }) {
  return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.authButton, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default AuthButton;

const styles = StyleSheet.create({
  authButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});