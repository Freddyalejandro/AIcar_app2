import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const logo = require('../assets/Aicar-lg.png');

const API_URL = Platform.OS === 'android' ? 'http://10.100.62.71:8082/api/datos' : 'http://localhost:8082/api/datos';

export default function WelcomePage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }

        const formCompleted = await AsyncStorage.getItem('formCompleted');

        if (!formCompleted) {
          setTimeout(() => {
            setShowMessage(true); // Muestra el mensaje antes de la redirección
          }, 10000); // Muestra el mensaje a los 20 segundos

          setTimeout(() => {
            router.push('/new_form'); // Redirige después de 30 segundos
          }, 20000);
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
      {showMessage && <Text style={styles.warning}>We need to know more about you...</Text>}
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
