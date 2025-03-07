import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logo  = require('../assets/Aicar-lg.png')
const API_URL = Platform.OS === 'android' ? 'http://192.168.1.135:8082/api/datos' : 'http://localhost:8082/api/datos';


export default function WelcomePag() {
      
      return (
        <View style={styles.container}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.logo}>Aicar.</Text>
            <Text style={styles.title}>Welcome,!</Text>
            <Text style={styles.title}>Loading...</Text>
          
    
          {isFirstTime && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Formulario de Registro</Text>
              {/* Aquí puedes agregar los campos de tu formulario */}
            </View>
          )}
        </View>
      );  
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    image: {
      width: 200,    // Ajusta el tamaño de la imagen
      height: 250,   // Ajusta el tamaño de la imagen
      resizeMode: 'contain', // Ajusta cómo se escala la imagen
    },
    logo: {
      fontSize: 48,
      marginBottom: 20,
      color: '#008080',
    },
    title: {
      fontSize: 24,
    },
  });