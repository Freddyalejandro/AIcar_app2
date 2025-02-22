import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View} from 'react-native';
import{Main} from "./components/Main"



export default function App() {
  return (

      <View>
        <StatusBar style='auto' /> 
        {/* <Logo/>  */}
        <Main/>
      </View>
  );
}


