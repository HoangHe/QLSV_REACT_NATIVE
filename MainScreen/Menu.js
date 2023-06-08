import { Text, StyleSheet, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalView from '../ClassEx/ModalView';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function Menu() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [maLop, setMaLop] = useState('');
    const [tenLop, setTenLop] = useState('');



    React.useEffect(() => {
        getClass();
    }, [])

    const url_CLASS = "http://10.24.20.210:3000/CLASS/"

    const getClass = async () => {
        fetch(url_CLASS + "?tenLop=" + tenLop)
            .then((res) => {
                return res.json();
            })
            .then((res_check) => {
                if (res_check.length == 1) {
                    Alert.alert("Lỗi!", "Đã tồn tại lớp ")
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const addClass = (maLop, tenLop) => {

        fetch(url_CLASS, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "maLop": maLop,
                "tenLop": tenLop,
            })
        })
            .then((res) => {
                if (res.status == 201) {
                    ToastAndroid.show('Thêm Lớp Thành Công.', ToastAndroid.SHORT);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }



    return (
        <SafeAreaView style={{
            backgroundColor: '#333542',
            flex: 1
        }}>
            <ModalView
                title={"Thêm Lớp"}
                visible={visible}

                onDismiss={() =>
                    setVisible(false)
                }

                onSubmit={() => {
                    if (maLop.length <= 0 || tenLop.length <= 0) {
                        Alert.alert("Lỗi!", "Vui lòng nhập đẩy đủ thông tin.")
                    } else {
                        addClass(maLop, tenLop)
                        setVisible(false)
                    }
                }}

                onDelete={() => {
                    setMaLop("")
                    setTenLop("")
                }}

                cancelable
            >

                <TextInput
                    label="Mã Lớp"
                    value={maLop}
                    onChangeText={(text) => setMaLop(text)}
                    mode="outlined"
                />

                <TextInput
                    label="Tên Lớp"
                    value={tenLop}
                    onChangeText={(text) => setTenLop(text)}
                    mode="outlined"
                />

            </ModalView>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Thêm Lớp */}
                <TouchableOpacity style={{
                    height: 150,
                    justifyContent: 'center',
                    marginBottom: 40,
                    width: 150,
                    backgroundColor: '#3d3f4c',
                    alignItems: 'center',
                    borderRadius: 100,

                }}
                    onPress={() => setVisible(true)}>

                    <Image source={require('../ImageEx/AddUser.png')} style={{
                        width: 50,
                        height: 50,
                        marginRight: 5
                    }} />

                    <Text style={{
                        color: 'white',
                        marginTop: 5
                    }}>
                        Thêm Lớp
                    </Text>

                </TouchableOpacity>
                {/* Danh Sách Lớp */}
                <TouchableOpacity style={{
                    height: 150,
                    justifyContent: 'center',
                    marginBottom: 40,
                    width: 150,
                    backgroundColor: '#3d3f4c',
                    alignItems: 'center',
                    borderRadius: 100
                }}
                    onPress={() => {
                        navigation.navigate("ShowListClass")
                    }}>

                    <Image source={require('../ImageEx/DanhSach.png')} style={{
                        width: 50,
                        height: 50,
                        marginRight: 5
                    }} />

                    <Text style={{
                        color: 'white',
                        marginTop: 5
                    }}>
                        Danh Sách Lớp
                    </Text>

                </TouchableOpacity>
                {/* Quản Lý Sinh Viên */}
                <TouchableOpacity style={{
                    height: 150,
                    justifyContent: 'center',
                    marginBottom: 40,
                    width: 150,
                    backgroundColor: '#3d3f4c',
                    alignItems: 'center',
                    borderRadius: 100
                }}
                    onPress={() => {
                        navigation.navigate("StudentManagement")
                    }}>

                    <Image source={require('../ImageEx/QuanLy.png')} style={{
                        width: 50,
                        height: 50,
                        marginRight: 5
                    }} />

                    <Text style={{
                        color: 'white',
                        marginTop: 5
                    }}>
                        Quản Lý Sinh Viên
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})