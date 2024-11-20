import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface ProfileImageSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (imageUri: string) => void;
}

const profileImages = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
];

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3;

export const ProfileImageSelectorModal: React.FC<ProfileImageSelectorModalProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
  const handleImageSelect = (imageUri: string) => {
    onSelectImage(imageUri);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Profile Image</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={profileImages}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => handleImageSelect(item)}
              >
                <Image source={{ uri: item }} style={styles.image} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  closeButton: {
    padding: 4,
  },
  gridContainer: {
    padding: 8,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
});