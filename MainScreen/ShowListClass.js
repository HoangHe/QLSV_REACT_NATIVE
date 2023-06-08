import { Text, View, TouchableOpacity, FlatList, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import ModalView from '../ClassEx/ModalView';

export default function ShowListClass() {
  const [data, setData] = useState([]);
  const [maLop, setMaLop] = useState('');
  const [tenLop, setTenLop] = useState('');
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('')

  React.useEffect(() => {
    getClass();
  }, [])

  const url_CLASS = "http://10.24.20.210:3000/CLASS/"

  const getClass = async () => {
    
    await fetch(url_CLASS)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const deleteClass = (id) => {
    fetch(url_CLASS + id, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status == 200) {
          ToastAndroid.show('Đã Xóa!', ToastAndroid.SHORT);
          getClass();
        }
      })
      .catch((ex) => {
        console.log(ex);
      })
  }

  const editClass = (id, maLop, tenLop) => {
    fetch(url_CLASS + id, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "maLop": maLop,
        "tenLop": tenLop,
      })
    }).then((res) => {
      if (res.status == 200) {
        ToastAndroid.show('Sửa Thành Công!', ToastAndroid.SHORT);
        getClass();
      }
    })
      .catch((ex) => {
        console.log(ex);
      })
  }


  function Item({ maLop, tenLop }) {
    return (
      <View style={{
        alignItems: 'center',
        height: 50,
        backgroundColor: '#3d3f4c',
        padding: 0,
        marginVertical: 3,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 2
      }}>

        <View style={{
          margin: 5,
          marginLeft: 10
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',
              marginRight: 10
            }}>
              Mã Lớp:  </Text>
            <Text style={{
              fontSize: 13,
              color: 'white',

            }}>
              {maLop}</Text>
          </View>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',
              marginRight: 10
            }}>
              Tên Lớp:  </Text>
            <Text style={{
              fontSize: 13,
              color: 'white',
            }}>
              {tenLop}</Text>

          </View>
        </View>
      </View>
    );
  }

  const edit = (id, maLop, tenLop) => {
    setVisible(true)
    setId(id)
    setMaLop(maLop)
    setTenLop(tenLop)
  }

  return (
    <View style={{
      backgroundColor: '#333542',
      flex: 1
    }}>
      <View style={{
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
      }}>
        <ModalView
          title={"Chỉnh Sửa"}
          visible={visible}
          onDismiss={() =>
            setVisible(false)
          }
          onSubmit={() => {
            if (id && maLop && tenLop) {
              editClass(id, maLop, tenLop)
              setVisible(false)
            } else {
              Alert.alert("Lỗi!", "Không được để trống.")
            }
          }
          }

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

        <FlatList
          data={data}
          renderItem={({ item }) =>
          (

            <TouchableOpacity onLongPress={() => {
              Alert.alert('Cảnh Báo !', 'Bạn muốn xóa mục này.', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => {
                    deleteClass(item.id);
                  }
                },
              ]);
            }}
              onPress={() => {
                edit(item.id, item.maLop, item.tenLop)
              }}
            >


              <Item maLop={item.maLop} tenLop={item.tenLop} />
            </TouchableOpacity>
          )
          }
        />

      </View>

    </View>
  )
}