import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import CustomPicker from './CustomPicker';

const SearchBar: React.FC = () => {
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
    backgroundColor: '#f0f8ff',
    borderWidth: 3,
    borderColor: '#000',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    fontFamily: 'Pokémon Solid',
    flex: 1,
  },
  searchFilter: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fffacd',
    fontFamily: 'Pokémon Solid',
    flex: 1,
  },
});

export default SearchBar;