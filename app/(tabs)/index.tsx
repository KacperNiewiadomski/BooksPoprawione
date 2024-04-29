import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button, TouchableOpacity } from 'react-native';

const getAllBooks = async () => {
  try {
    const response = await fetch('https://test-api.dev.eura7.com/api/get-all-books', {
      method: 'GET',
      headers: {
        'accept': 'application/ld+json',
        'Authorization': 'Bearer QU5PB5BQ4pKFd6cM2kcwSax8wXFybA8EfS3PX4YuqwgyZSbzUGL9XtAhZ5whWpFl',
      },
    });
//Nie dodaje danych logowania do ENV ponieważ GIT usuwa te pliki i przez to może nie działać
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Error fetching books. Please try again.');
  }
};

const TabOneScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await getAllBooks();
      setBooks(booksData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteBook = async () => {
    if (selectedBookId !== null) {
      try {
        const response = await fetch(`https://test-api.dev.eura7.com/api/delete-book/${selectedBookId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer QU5PB5BQ4pKFd6cM2kcwSax8wXFybA8EfS3PX4YuqwgyZSbzUGL9XtAhZ5whWpFl',
          },
        });
//Nie dodaje danych logowania do ENV ponieważ GIT usuwa te pliki i przez to może nie działać
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        setBooks(prevBooks => prevBooks.filter(book => book.id !== selectedBookId));
        alert('Book deleted successfully!');
        setSelectedBookId(null);
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  const handleBookPress = (id) => {
    if (selectedBookId === id) {
      setSelectedBookId(null);
    } else {

      setSelectedBookId(id);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookPress(item.id)}> 
      <View style={[styles.item, selectedBookId === item.id && styles.selectedItem]}> 
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>ISBN: {item.isbn}</Text>
        <Text style={styles.description}>Category: {item.category}</Text>
        <Text style={styles.description}>Price: {item.price}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
        {selectedBookId === item.id && ( 
          <TouchableOpacity onPress={handleDeleteBook}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>   
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false} 
        />
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  
  description: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'right', 
  },
  selectedItem: {
    backgroundColor: '#f490ff',
  },
});

export default TabOneScreen;
