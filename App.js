import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StackScreen from './ClassEx/StackScreen';
import AddImage from './FunctionEx/AddImage';
import DialogDemo from './FunctionEx/DialogDemo';
import DropdownComponent from './FunctionEx/DropdownComponent';
import Login from './MainScreen/Login';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StackScreen></StackScreen>
      {/* <DropdownComponent></DropdownComponent> */}
      {/* <AddImage></AddImage> */}
      {/* <DialogDemo></DialogDemo> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
  }
});
