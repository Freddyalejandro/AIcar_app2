import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, ImageBackground } from 'react-native';
import{Main} from "./components/Main"
// import{Logo} from "./components/Logo"
import { Carga } from './components/Carga';

const backimag = require('./assets/rm378-08f.jpg')

export default function App() {
  return (
    <Carga>
      <ImageBackground
      source={backimag} // Imagen de fondo
      style={styles.backgroundImage}
      >
      <View style={styles.container}>
        <StatusBar style='auto' /> 
        {/* <Logo/>  */}
        <Main/>
      </View>
    </ImageBackground>
    </Carga>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(187, 164, 165, 0.5)', // Color de fondo semi-transparente
  },
});
