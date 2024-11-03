import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import CustomPicker from './CustomPicker';


const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for a new life`);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="looking for a new reason to live ..."
        style={styles.searchInput}
      />
{/*       <CustomPicker
        selectedValue={filter}
        onValueChange={setFilter}
        style={styles.searchFilter}
      /> */}
      <Button title="Search" onPress={handleSearch} color="#ff0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#000',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  searchInput: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    fontFamily: 'Pokémon Solid',
    flex: 1,
  },
  searchFilter: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#e6e6e6',
    fontFamily: 'Pokémon Solid',
    flex: 1,
  },
});

export default SearchBar;