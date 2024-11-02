import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from '@/app/(authScreen)/LoginScreen'; // Asegúrate de que la ruta sea correcta
import HomeScreen from '@/app/(mainInterface)/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
