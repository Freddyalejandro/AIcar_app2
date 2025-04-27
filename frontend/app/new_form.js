import React, { useState,useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { Platform } from 'react-native';
const API_URL = Platform.OS === 'android' ? 'http://10.100.62.71:8082/api/user_info' : 'http://localhost:8082/api/user_info';
import { Picker } from '@react-native-picker/picker';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';


const logo  = require('../assets/Aicar-lg.png');

  //luna.velez@gmail.com
const FormularioValoracion = () => {
  const [formData, setFormData] = useState({
    gender: "",
    height: "",
    weight: "",
    age: "",
    diabetes: "",
    familyHistoryArrhythmias: "",
    highBloodPressure: "",
    highCholesterol: "",
    obesity: "",
    autoimmuneDiseases: "",
    kidneyDisease: "",
    metabolicSyndrome: "",
    myocardialInfarction: "",
    sleepHours: "",
    activity: "",
    smoke: "",
    drugs: "",
    caffeine: "",
    stressLevel: "",
    emergencyContact1: { name: "", number1: ""},
    emergencyContact2: { name: "", number1: ""},
  });
  useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          setFormData(prevData => ({
            ...prevData,
            user_id: decodedToken.userId
          }));
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };
    fetchUserId();
  }, []);


  const handleUserDataSubmit = async () => {
    const token = AsyncStorage.getItem('token');  // Obtener el token desde localStorage
  
    if (!formData) {
      alert("Missing form data.");
      return;
    }
  
    if (!token) {
      alert("User is not authenticated. Please login first.");
      return;
    }
  
    try {
      // Decodificar el token JWT
      const decodedToken = jwt_decode(token);  // Aquí es donde se usa jwt_decode
  
      const userId = decodedToken.userId;
  
      if (!userId) {
        alert("User ID not found in token.");
        return;
      }
  
      // Agregar el user_id a los datos del formulario
      const formDataWithUserId = { ...formData, user_id: userId };
  
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // Aquí va el token JWT
        },
        body: JSON.stringify(formDataWithUserId),
      });
  
      const data = await response.json();
      
      if (data.message === "User data saved successfully!") {
        alert("User data saved successfully!");
        console.log(`User ID (${userId}) saved successfully!`);  // Mostrar el userId en consola
      } else {
        alert("Error saving user data: " + data.error);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      {/* <Image
            source={logo}
            style={styles.logo}
        /> */}
      <Text style={styles.title}>We want to know more about you</Text>

      <Text>Gender:</Text>
      <Picker selectedValue={formData.gender} onValueChange={(itemValue) => setFormData({ ...formData, gender: itemValue })}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />

      </Picker>
      <View style={styles.box}>
      <Text>Height:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setFormData({ ...formData, height: text })} />

      <Text>Weight:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setFormData({ ...formData, weight: text })} />

      <Text>Age:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setFormData({ ...formData, age: text })} />

      <Text style={styles.sectionTitle}>Medical Information</Text>
      {[
        "diabetes",
        "familyHistoryArrhythmias",
        "highBloodPressure",
        "highCholesterol",
        "obesity",
        "autoimmuneDiseases",
        "kidneyDisease",
        "metabolicSyndrome",
        "myocardialInfarction",
      ].map((field) => (
        <View key={field} style={styles.radioContainer}>
          <Text>{field.replace(/([A-Z])/g, " $1").trim()}:</Text>
          <Picker
            selectedValue={formData[field]}
            onValueChange={(value) => setFormData({ ...formData, [field]: value })}>
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>
        </View>
      ))}

{[
        { field: 'sleepHours', label: 'Hours of Sleep', type: 'text' },
        { field: 'stressLevel', label: 'Stress Level', type: 'text' },
      ].map(({ field, label, type }) => (
        <View key={field}>
          <Text>{label}:</Text>
          <TextInput
            style={styles.input}
            value={formData[field]}
            onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          />
        </View>
      ))}

      {[
        { field: 'activity', label: 'Activity Level', options: ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'] },
        { field: 'smoke', label: 'Smoke', options: ['Never', 'Occasionally', 'Regularly'] },
        { field: 'drugs', label: 'Drugs', options: ['Never', 'Occasionally', 'Regularly'] },
        { field: 'caffeine', label: 'Caffeine', options: ['None', 'Low', 'Moderate', 'High'] },
      ].map(({ field, label, options }) => (
        <View key={field}>
          <Text>{label}:</Text>
          <Picker
            selectedValue={formData[field]}
            style={styles.input}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, [field]: itemValue })
            }
          >
            {options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Emergency Contact</Text>
      {[1, 2].map((contact) => (
        <View key={contact}>
          <Text>Contact {contact}:</Text>
          <TextInput placeholder="Name" style={styles.input} onChangeText={(text) => setFormData({ ...formData, [`emergencyContact${contact}`]: { ...formData[`emergencyContact${contact}`], name: text } })} />
          <TextInput placeholder="Number 1" style={styles.input} keyboardType="phone-pad" onChangeText={(text) => setFormData({ ...formData, [`emergencyContact${contact}`]: { ...formData[`emergencyContact${contact}`], number1: text } })} />
        </View>
      ))}
      <Button title="Done" onPress={handleUserDataSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: { 
    padding: 20 
  },
  // logo: {
  //   fontSize: 48,
  //   marginBottom: 20,
  //   color: '#008080',
  // },
  title: { fontSize: 22,
  fontWeight: "bold",
   marginBottom: 20
  },
  sectionTitle: { 
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },
  input: { 
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor:'rgb(255, 255, 255)'
  },
  radioContainer: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5
   },
});

export default FormularioValoracion;
