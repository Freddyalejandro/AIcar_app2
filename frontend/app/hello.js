import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, Platform } from 'react-native';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';
const API_URL = Platform.OS === 'android' ? 'http://192.168.1.135:8082/api/datos' : 'http://localhost:8082/api/datos';

export default function WelcomePage() {
  const [userName, setUserName] = useState('');
  const [data, setData] = useState([]);
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    
        const json = await response.json();
        if (json.length > 0) {
          setUserName(json[0].first_name);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.logo}>Aicar.</Text>
        {userName ? (
          <Text style={styles.title}>Welcome, {userName}!</Text> // Muestra el nombre del usuario
        ) : (
          <Text style={styles.title}>Loading...</Text> // Muestra 'Loading' mientras se carga el nombre
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

