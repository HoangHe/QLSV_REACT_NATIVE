import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../MainScreen/Login';
import Menu from '../MainScreen/Menu';
import AddClass from '../MainScreen/AddClass';
import ShowListClass from '../MainScreen/ShowListClass';
import StudentManagement from '../MainScreen/StudentManagement';

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Menu" component={Menu} />
      <Stack.Screen options={{ title: "Thêm Lớp", headerStyle: {backgroundColor: '#3d3f4c'}, headerTintColor: '#fff'}} name="AddClass" component={AddClass} />
      <Stack.Screen options={{ title: "Danh Sách Lớp", headerStyle: {backgroundColor: '#3d3f4c'}, headerTintColor: '#fff' }} name="ShowListClass" component={ShowListClass} />
      <Stack.Screen options={{ title: "Quản Lý Sinh Viên", headerStyle: {backgroundColor: '#3d3f4c'}, headerTintColor: '#fff' }} name="StudentManagement" component={StudentManagement} />
    </Stack.Navigator>
  );
}

export default class StackScreen extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})