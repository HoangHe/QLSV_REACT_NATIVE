import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function AddClass() {
    const [maLop, setMaLop] = useState("")
    const [tenLop, setTenLop] = useState("")


    return (
      <View style={{
        backgroundColor: '#333542',
        flex: 1,
        justifyContent: 'center'
      }}>
        <View style={{
          borderRadius: 10,
          borderWidth: 1,
          margin: 10
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 50,
            marginTop: 10,
            justifyContent: 'space-between',

          }}>
            <Text style={{
              paddingTop: 10,
              color: '#999999'
            }}>
              Mã Lớp:
            </Text>
            <TextInput style={{
              borderBottomWidth: 1,
              width: 200,
              color: 'white'
            }}  
            onChangeText={(MaLop)=>setMaLop(MaLop)}
            value={maLop}
            >

            </TextInput>
          </View>
          <View style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'space-between',
            marginTop: 10
          }}>
            <Text style={{
              paddingTop: 10,
              color: '#999999'
            }}>
              Tên Lớp:
            </Text>
            <TextInput style={{
              borderBottomWidth: 1,
              width: 200,
              color: 'white'
            }}  
            onChangeText={(TenLop)=>setTenLop(TenLop)}
            value={tenLop}
            >

            </TextInput>
          </View>
          <View style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'space-between',
            marginTop: 50
          }}>
            <TouchableOpacity style={{
              height: 50,
              justifyContent: 'center',
              width: 90,
              backgroundColor: '#3d3f4c',
              alignItems: 'center',
              borderRadius: 7,
              marginTop: 20,
              marginBottom: 10
            }}
            onPress={()=>{
                setMaLop("")
                setTenLop("")
                }}
            >
              <Text style={{
                fontWeight: 'bold',
                color: 'white'
              }}
              >
                Xóa Trắng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: 50,
              justifyContent: 'center',
              width: 200,
              backgroundColor: '#3d3f4c',
              alignItems: 'center',
              borderRadius: 7,
              marginTop: 20,
              marginBottom: 10
            }}>
              <Text style={{
                fontWeight: 'bold',
                color: 'white'
              }}>
                Lưu Lớp
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

const styles = StyleSheet.create({})