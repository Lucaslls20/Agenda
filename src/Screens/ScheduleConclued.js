import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AgendamentosConcluidos = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const fetchedAppointments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const completed = fetchedAppointments.filter(appointment => appointment.completed);
      setCompletedAppointments(completed);
    };

    fetchCompletedAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={completedAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointment}>
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Description: {item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum agendamento concluído</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#02735E',
  },
  appointment: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  appointmentText: {
    fontSize: 16,
    color: 'white',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'white',
  },
});

export default AgendamentosConcluidos;
