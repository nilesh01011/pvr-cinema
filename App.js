import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/StackNavigator';
import { PlaceContext } from './PlaceContext';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  return (
    <>
      <PlaceContext>
        <Navigation />
        <ModalPortal />
      </PlaceContext>
    </>
  );
}
