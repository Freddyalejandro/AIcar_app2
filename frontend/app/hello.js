import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const logo = require('../assets/Aicar-lg.png');

const API_URL = Platform.OS === 'android'
  ? 'http://10.100.62.71:8082/api/datos'
  : 'http://localhost:8082/api/datos';



export default function WelcomePage() {
  const [userName, setUserName] = useState('');
  const [formCompleted, setFormCompleted] = useState(null); // Nuevo estado
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        console.log('Stored userName:', storedName);
        if (storedName) {
          setUserName(storedName);
        }
        
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });

          const data = await response.json();
          console.log('Datos recibidos del backend:', data);
          // Aquí podrías actualizar estados según lo que necesites
      
  
        const formCompletedValue = await AsyncStorage.getItem('formCompleted');
        console.log('Raw formCompleted value:', formCompletedValue);
  
        const isCompleted = formCompletedValue === 'false';
        setFormCompleted(isCompleted);
        console.log('Parsed formCompleted (boolean):', isCompleted);
  
        if (!isCompleted) {
          console.log('Formulario NO completado. Mostrando mensaje en 10s y redirigiendo en 20s...');
          setTimeout(() => {
            setShowMessage(true);
            console.log('Mensaje: necesitamos más información');
          }, 10000);
  
          setTimeout(() => {
            console.log('Redireccionando a /new_form');
            router.push('/new_form');
          }, 20000);
        } else {
          console.log('Formulario completado. Mostrando mensaje en 5s...');
          setTimeout(() => {
            setShowMessage(true);
            console.log('Mensaje: todo bien, manteniéndote a salvo');
          }, 5000);
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
        <Text style={styles.title}>Welcome, {userName}!</Text>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
      {showMessage && formCompleted !== null && (
  <Text style={styles.warning}>
    {formCompleted === false
      ? 'We need to know more about you...'
      : 'Let\'s keep you safe today ❤️'}
  </Text>
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
  warning: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
