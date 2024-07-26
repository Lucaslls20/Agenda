import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Initial = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/09/16/30/barbers-chair-2387365_1280.jpg' }}
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Bem-vindo ao Agendamentos</Text>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 20,
    height: 100,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 12,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Initial;
