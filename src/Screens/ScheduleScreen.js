import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native';
import {db} from '../services/firebaseConfig'
import { collection, addDoc, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

const Agendamentos = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', description: '' });

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const fetchedAppointments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);

  const handleAddAppointment = async () => {
    const docRef = await addDoc(collection(db, 'appointments'), newAppointment);
    setAppointments([...appointments, { ...newAppointment, id: docRef.id }]);
    setNewAppointment({ date: '', time: '', description: '' });
    setModalVisible(false);
  };

  const excluir = async (appointmentToDelete) => {
    await deleteDoc(doc(db, 'appointments', appointmentToDelete.id));
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentToDelete.id)
    );
  };

  const excluirTudo = async () => {
    const batch = writeBatch(db);
    appointments.forEach((appointment) => {
      const docRef = doc(db, 'appointments', appointment.id);
      batch.delete(docRef);
    });
    await batch.commit();
    setAppointments([]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => excluir(item)}
            style={styles.appointment}
          >
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Description: {item.description}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem Agendamentos</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={newAppointment.date}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            value={newAppointment.time}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newAppointment.description}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, description: text })}
            placeholderTextColor='black'
          />
          <View style={[styles.viewButton]}>
            <TouchableOpacity style={styles.button} onPress={handleAddAppointment}>
              <Text style={styles.textButton}>Add Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ width: '80%' }}>
        <TouchableOpacity style={[styles.button, { borderColor: 'black' }]} onPress={excluirTudo}>
          <Text>Excluir tudo</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  appointmentText: {
    fontSize: 16,
    color: 'black',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'white',
  },
  addButton: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#919167',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
  },
  viewButton: {
    width: '100%'
  },
  button: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#3d9a98',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default Agendamentos;
