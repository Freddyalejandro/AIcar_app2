import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';
export default function CreateAccountPage() {
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
          <TextInput style={styles.input} placeholder="Full Name" />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
          <TouchableOpacity style={styles.button}>
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
        width: 80,    // Tamaño del logo
        height: 80,
        resizeMode: 'contain',
        marginBottom: 20,
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
