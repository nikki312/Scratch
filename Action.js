import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Action = ({ selectedSubparts, handleRemoveSubpart }) => {
  const [inputValue, setInputValue] = useState('');
  const [subpartSelected, setSelectedSubparts] = useState([])

  const navigation = useNavigation();
  
  const handleAddSubpart = () => {
    if (inputValue) {
      handleRemoveSubpart([...selectedSubparts, inputValue]);
      setInputValue('');
    }
  };
  
  const handleSaveAllInputs = () => {
    storeSelectedSubparts(selectedSubparts);
  };

  const storeSelectedSubparts = (subparts) => {

    console.log('Stored Selected Subparts:', subparts);
    setSelectedSubparts(subparts)
    navigation.navigate('MainScreen',{data:subparts})
  };
  console.log(subparts)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Action</Text>
      <View style={styles.selectedSubpartsContainer}>
        {selectedSubparts.map((subpart) => (
          <View key={subpart} style={styles.selectedSubpart}>
            <Text style={styles.selectedSubpartText}>{subpart}</Text>
            <TouchableOpacity onPress={() => handleRemoveSubpart(subpart)}>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleSaveAllInputs} style={styles.saveAllButton}>
        <Text style={styles.saveAllButtonText}>Save All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedSubpartsContainer: {
    marginTop: 20,
  },
  selectedSubpart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedSubpartText: {
    flex: 1,
    fontSize: 14,
  },
  saveAllButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default Action;
