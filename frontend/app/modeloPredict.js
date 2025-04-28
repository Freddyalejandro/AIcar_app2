import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  
  const sendBPMData = async () => {
    try {
      // Suponiendo que tienes los BPM del smartwatch en una variable llamada bpmValues
      const bpmValues = [72, 80, 78, 74];  // Ejemplo de datos de BPM
      
      const response = await axios.post('http://localhost:5000/predict', {
        bpm: bpmValues
      });
      
      // Obtener y mostrar la predicción
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error en la predicción:', error);
    }
  };
  
  return (
    <View>
      <Button title="Obtener Predicción" onPress={sendBPMData} />
      {prediction && <Text>Predicción: {prediction}</Text>}
    </View>
  );
};

export default App;
