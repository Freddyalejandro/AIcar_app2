
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, ActivityIndicator} from 'react-native';
const logo  = require('../assets/Aicar-lg.png')


export function Main() {
  return (
    <View style={styles.container}>
        <Image
            source={logo}
            style={styles.image}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 48,
    marginBottom: 20,
    color: '#008080',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  googleButton: {
    marginTop: 20,
  },
  googleText: {
    color: '#008080',
    fontSize: 16,
  },
  image: {
    width: 200,    // Ajusta el tamaño de la imagen
    height: 250,   // Ajusta el tamaño de la imagen
    resizeMode: 'contain', // Ajusta cómo se escala la imagen
  },
});
