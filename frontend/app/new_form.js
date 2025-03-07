import React, { useState } from "react";
import { View, Text, TextInput, Picker, Button, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


const logo  = require('../assets/Aicar-lg.png');
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
  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("formCompleted", "true");
      await AsyncStorage.setItem("userData", JSON.stringify(formData));
      router.replace("/WelcomePage");
    } catch (error) {
      console.error("Error saving form data:", error);
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
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
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

      <Text style={styles.sectionTitle}>Habits</Text>
      {[
        "sleepHours",
        "activity",
        "smoke",
        "drugs",
        "caffeine",
        "stressLevel",
      ].map((field) => (
        <View key={field}>
          <Text>{field.replace(/([A-Z])/g, " $1").trim()}:</Text>
          <TextInput style={styles.input} onChangeText={(text) => setFormData({ ...formData, [field]: text })} />
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
      <Button title="Done" onPress={handleSubmit} />
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
