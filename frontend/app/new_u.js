import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Platform, Image } from 'react-native';
const API_URL = Platform.OS === 'android' ? 'http://192.168.1.135:8082/api/signin' : 'http://localhost:8082/api/signin';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';

const SignUp = () => {
  // Estados para almacenar los valores de los campos de entrada
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío de datos
  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Crear el objeto con los datos del usuario
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      // Enviar los datos al backend
      const response = await fetch(API_URL, { // Verifica que el puerto es correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      // Comprobar la respuesta del servidor
      const data = await response.json();
      if (data.success) {
        alert("User created successfully!");
      } else {
        alert("Error creating user: " + data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <Text style={styles.createAccountText}>CREATE YOUR ACCOUNT</Text>
        </View>
        <View style={styles.rightSection}>
          <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          />
          <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          />
          <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          />
          <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
            <Link href="/"> Back </Link>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    //backgroundColor: 'rgba(187, 164, 165, 0.76)', // Color de fondo semi-transparente
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  logo: {
      width: 120, // Ajusta el tamaño de la imagen
      height: 150, // Ajusta el tamaño de la imagen
      resizeMode: 'contain',
      marginRight: 20, // Espacio entre la imagen y el formulario
  },
  createAccountText: {
    fontSize: 24,
    color: '#008080',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightSection: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008080',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },  

});

export default SignUp;
