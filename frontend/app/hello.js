import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const logo = require('../assets/Aicar-lg.png');

const API_URL = Platform.OS === 'android' ? 'http://192.168.1.135:8082/api/datos' : 'http://localhost:8082/api/datos';

export default function WelcomePage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Obtener el nombre del usuario
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }

        // Verificar si el usuario ya completó el formulario
        const formCompleted = await AsyncStorage.getItem('formCompleted');

        if (!formCompleted) {
          // Si el formulario no está completado, redirigir a la página del formulario
          navigation.navigate('new_form');; // Asegúrate de que la ruta existe
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUserStatus();
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
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
