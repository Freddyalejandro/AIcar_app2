import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';
export default function LoginPage() {
  return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image
            source={logo}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>HELLO SIGN IN!</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
            <Link href="/"> Back </Link>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  image: {
    width: 150, // Ajusta el tamaño de la imagen
    height: 150, // Ajusta el tamaño de la imagen
    resizeMode: 'contain',
    marginRight: 20, // Espacio entre la imagen y el formulario
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#008080',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
