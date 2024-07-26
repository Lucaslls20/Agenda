import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Agendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', description: '' });

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ date: '', time: '', description: '' });
    setModalVisible(false);
  };

  const excluir = () => {
    setAppointments((prevAppointments) => prevAppointments.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointment}>
            <Text style={styles.appointmentText}>Date: {item.date}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Description: {item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No Appointments</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={newAppointment.date}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            value={newAppointment.time}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newAppointment.description}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, description: text })}
          />
          <Button title="Add Appointment" onPress={handleAddAppointment} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Pressable style={styles.deleteButton} onLongPress={excluir}>
  <Text style={styles.deleteButtonText}>Delete Last</Text>
</Pressable>

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
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
  
});

export default Agendar;
