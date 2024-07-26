import React, { useState } from "react";
import { registerUser } from '../services/AuthService';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setError(null);
    registerUser(email, password)
      .then(user => {
        console.log('User registered', user);
        navigation.navigate('Home', { email }); // Passa o email como parâmetro
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <ImageBackground source={{ uri: 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737_1280.jpg' }} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.text}>Você está na tela de Cadastro, crie sua Conta</Text>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Email"
            placeholderTextColor='black'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor='black'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button title="Register" onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
  },
  text: {
    color: 'black',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  viewInput: {
    width: '80%',
  },
});

export default RegisterScreen;
