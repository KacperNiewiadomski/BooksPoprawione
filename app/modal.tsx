import { Platform, StyleSheet } from 'react-native';
import { View, useThemeColor } from '@/components/Themed';
import { TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const FormField = ({ placeholder, value, onChangeText }) => {
  const textColor = useThemeColor({}, 'text'); 

  return (
    <TextInput
      style={[styles.input, { color: textColor}]} 
      placeholderTextColor={textColor}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};
const ModalScreen = () => {
  const [name, setName] = useState('');
  const [ISBN, setISBN] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleAddBook = async () => {
    if (!name || !price) {
      alert('Name and price are required!');
      return;
    }
  
    const newBook = {
      "@context": "string",
      "@type": "string",
      "id": 0,
      "name": name,
      "isbn": ISBN,
      "description": description,
      "price": parseFloat(price),
      "token": "string", 
      "category": category
    };
  
    try {
      const response = await fetch('https://test-api.dev.eura7.com/api/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer QU5PB5BQ4pKFd6cM2kcwSax8wXFybA8EfS3PX4YuqwgyZSbzUGL9XtAhZ5whWpFl',
        },
        body: JSON.stringify(newBook),
      });
  //Nie dodaje danych logowania do ENV ponieważ GIT usuwa te pliki i przez to może nie działać
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
  
      alert('Book added successfully!');
      setName('');
      setISBN('');
      setDescription('');
      setPrice('');
      setCategory('');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.form}>
        <FormField
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <FormField
          placeholder="ISBN"
          value={ISBN}
          onChangeText={setISBN}
        />
        <FormField
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <FormField
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
        <FormField
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <Button title="Add" onPress={handleAddBook} />
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    width: '80%', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
