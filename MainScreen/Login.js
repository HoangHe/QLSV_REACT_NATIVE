import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    isShow: true,
    bgr: '#009966',
    showText: true
  }
  

  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          flex: 3,
          backgroundColor: '#333542',
        }}>

          <View style={{
            alignItems: 'center',
          }} >

            <Text style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: 'white',
              marginTop: 50,
            }}>
              WELCOME
            </Text>

            <Text style={{
              marginBottom: 40,
              borderBottomWidth: 3,
              borderBottomColor: '#3d3f4c',
              width: 70
            }}></Text>

          </View>

          <View style={{
            alignItems: 'center'
          }}>
            <TouchableOpacity style={{
              height: 100,
              justifyContent: 'center',
              marginBottom: 40,
              width: 100,
              backgroundColor: '#3d3f4c',
              alignItems: 'center',
              borderRadius: 50
            }}>
              <Image source={require('../ImageEx/Camera.png')} style={{
                tintColor: 'white',
                width: 30,
                height: 30,
                marginRight: 5
              }} />

            </TouchableOpacity>

          </View>

          <View style={{
            flexDirection: 'row',
            marginRight: 50,
            alignItems: 'center',
            marginLeft: 50,
            backgroundColor: '#474955',
            height: 40,
            paddingLeft: 10,
            marginBottom: 15
          }}>

            <Image source={require('../ImageEx/Email.png')} style={{
              tintColor: '#333542',
              width: 20,
              height: 20,
              marginRight: 5
            }} />

            <TextInput placeholder='E-mai address' >
            </TextInput>

          </View>

          <View style={{
            flexDirection: 'row',
            marginRight: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 50,
            backgroundColor: '#474955',
            height: 40,
            paddingLeft: 10,
          }}>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image source={require('../ImageEx/Email.png')} style={{
                tintColor: '#333542',
                width: 20,
                height: 20,
                marginRight: 5
              }} />

              <TextInput placeholder='*********'
                secureTextEntry={this.state.isShow}
                onChangeText={(pass) => {
                  this.setState({ passWord: pass })
                  if (this.state.passWord.length > 4) {
                    this.setState({ bgr: "#0bd38a" })
                  } else {
                    this.setState({ bgr: "#009966" })
                  }

                }}>
              </TextInput>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.setState({ isShow: !this.state.isShow })
              }}>

              {
                (this.state.isShow) ?
                  <Image source={require('../ImageEx/hidden.png')} style={{
                    tintColor: '#333542',
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }} /> :
                  <Image source={require('../ImageEx/Eyes.png')} style={{
                    tintColor: '#333542',
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                  />
              }
            </TouchableOpacity>

          </View>

          <TouchableOpacity style={{
            backgroundColor: this.state.bgr,
            height: 40,
            marginLeft: 50,
            marginRight: 50,
            marginTop: 30,
            marginBottom: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}
            onPress={() => {
              
                navigation.navigate("Menu")
              

            }}>

            <Text style={{
              color: 'white',
              fontWeight: 'bold'
            }}>Sign in</Text>

          </TouchableOpacity>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text style={{
              color: 'white'
            }}>
              Don't have a account?
            </Text>
            <TouchableOpacity>
            <Text style={{
              color: '#27c18b',
              fontWeight: 'bold',
              marginLeft: 5
            }}>
              Sign Up
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({})