import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { descrição } from '../Description/Descrição';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toDateString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
    });
  }, [navigation]);

  const email = route.params?.email || '';

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/31/20/31/amazed-1295833_1280.png' }}
            style={styles.avatar}
          />
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
     
      <ScrollView style={styles.scrollView}>
        <View style={{alignItems:'center'}}>
            <Text style={{color:'black', fontSize:13, fontWeight:'bold'}}>Descrição</Text>
          <Text style={styles.descriptionTitle}>{descrição}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('Agendamentos')}
          >
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('Agendamentos Concluidos')}
          >
            <Text style={styles.buttonText}>Agendamentos Concluidos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#02735E'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  email: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  dateContainer: {
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    color: 'black',
  },
  descriptionTitle: {
    fontSize: 11,
    color: 'black',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scheduleButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
