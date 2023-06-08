import { Text, View, TouchableOpacity, FlatList, Alert, ToastAndroid, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalView from '../ClassEx/ModalView';


export default function StudentManagement() {
  const [tenLop, setTenLop] = useState(null);
  const [data, setData] = useState([]);
  const [dataFilter, setFilterData] = useState([]);
  const [dataClass, setDataClass] = useState([]);
  const [tenSV, setTenSV] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('')

  React.useEffect(() => {
    getQLSV();
    getClass();
  }, [])

  const url_QLSV = "http://10.24.20.210:3000/QLSV/"
  const url_Class = "http://10.24.20.210:3000/CLASS/"

  const getQLSV = async () => {
    await fetch(url_QLSV)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFilterData(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getClass = async () => {
    await fetch(url_Class)
      .then((res) => res.json())
      .then((res) => {
        setDataClass(res);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const addSinhVien = (tenLop, tenSV, ngaySinh) => {
    fetch(url_QLSV, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tenLop": tenLop,
        "name": tenSV,
        "date": ngaySinh
      })
    })
      .then((res) => {
        if (res.status == 201) {
          getQLSV()
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteSinhVien = (id) => {
    fetch(url_QLSV + id, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status == 200) {
          ToastAndroid.show('Đã Xóa!', ToastAndroid.SHORT);
          getQLSV();
        }
      })
      .catch((ex) => {
        console.log(ex);
      })
  }

  const edit = (id, tenLop, tenSV, ngaySinh) => {
    setVisible(true)
    setId(id)
    setTenLop(tenLop)
    setTenSV(tenSV)
    setNgaySinh(ngaySinh)
  }
  const editStudent = (id, tenLop, tenSV, ngaySinh) => {
    fetch(url_QLSV + id, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "date": ngaySinh,
        "name": tenSV,
        "tenLop": tenLop,
      })
    }).then((res) => {
      if (res.status == 200) {
        ToastAndroid.show('Sửa Thành Công!', ToastAndroid.SHORT);
        getClass();
        getQLSV();
      }
    })
      .catch((ex) => {
        console.log(ex);
      })
  }

  const FilterData = (text) => {
    if (text) {
      const newData = dataFilter.filter((item) => {
        const itemData = item.tenLop ? item.tenLop.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData)
      setTenLop(text)
    } else {
      setData(dataFilter)
      setTenLop(text)
    }
  }

  function Item({ name, date }) {
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
            }}>
              Tên Sinh Viên:  </Text>
            <Text style={{
              fontSize: 13,
              color: 'white',

            }}>
              {name}</Text>
          </View>

          <View style={{
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',

              marginRight: 20
            }}>
              Ngày Sinh:  </Text>
            <Text style={{
              fontSize: 13,
              color: 'white',
            }}>
              {date}</Text>


          </View>
        </View>
      </View>
    );
  }


  return (
    <View style={{
      backgroundColor: '#333542',
      flex: 1
    }}>

      <View style={{
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 1,
        marginTop: 10
      }}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'space-between',

        }}>
          <Text style={{
            paddingTop: 10,
            color: '#999999'
          }}>
            Lớp:
          </Text>
          <Dropdown style={{
            width: 200,
            
          }}
            data={dataClass}
            labelField="tenLop"
            valueField='tenLop'
            placeholder="Chọn Lớp"
            onChange={item => {
              setTenLop(item.tenLop);
            }}

            value={tenLop}
            onChangeText={() => {
              FilterData(tenLop)
            }}

            renderItem={item =>            
              <View style={{
                padding: 17,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#3d3f4c',
              }}>
                <Text style={{
                  color: 'white',
                  flex: 1,
                  fontSize: 16,
                }}>
                  {item.tenLop}</Text>

                  
                {item.tenLop === tenLop && (
                  <AntDesign
                    style={{
                      marginRight: 5,
                    }}
                    color="white"
                    name="Safety"
                    size={20}
                  />
                )}
              </View>
            }
          />

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
            Tên Sinh Viên:
          </Text>
          <TextInput style={{
            borderBottomWidth: 1,
            width: 200,
            color: 'white'
          }}
            value={tenSV}
            onChangeText={(text) => setTenSV(text)}
            mode="outlined"
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
            Ngày Sinh:
          </Text>
          <TextInput style={{
            borderBottomWidth: 1,
            width: 200,
            color: 'white'
          }}
            value={ngaySinh}
            onChangeText={(text) => setNgaySinh(text)}
            mode="outlined"
          >

          </TextInput>
        </View>

        <View style={{
          alignItems: 'center'
        }}>
          <TouchableOpacity style={{
            height: 50,
            justifyContent: 'center',
            width: 200,
            backgroundColor: '#3d3f4c',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 10
          }}
            onPress={() => {
              if (tenLop == null) {
                Alert.alert("Lỗi!", "Vui lòng Chọn Lớp")
              } else if (tenSV.length <= 0 || ngaySinh.length <= 0) {
                Alert.alert("Lỗi!", "Vui lòng nhập đầy đủ thông tin")
              } else {
                addSinhVien(tenLop, tenSV, ngaySinh)
                setTenSV('')
                setNgaySinh('')
              }
            }
            }
          >
            <Text style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'white'
            }}>
              Thêm Sinh Viên
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
          onDismiss={() =>{
            setVisible(false)
            }
          }
          onSubmit={() => {
            if (tenSV && tenLop && ngaySinh) {
              editStudent(id, tenLop, tenSV, ngaySinh)
              setTenLop(null)
              setVisible(false)
            } else {
              Alert.alert("Lỗi!", "Không được để trống.")
            }
          }
          }
          onDelete={() => {
            setNgaySinh("")
            setTenSV("")
            setTenLop("")
          }}

          cancelable
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',
            }}>
              Lớp :  </Text>


            <Dropdown style={{
              width: 200,
              color: 'white',
            }}
              data={dataClass}
              labelField="tenLop"
              valueField='tenLop'
              placeholder="Chọn Lớp"
              onChange={item => {
                setTenLop(item.tenLop);
              }}
              value={tenLop}
              onChangeText={(text) => setTenLop(text)}

              renderItem={item =>
                <View style={{
                  padding: 17,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#3d3f4c',
                }}>
                  <Text style={{
                    color: 'white',
                    flex: 1,
                    fontSize: 16,
                  }}>
                    {item.tenLop}</Text>

                  {item.tenLop === tenLop && (
                    <AntDesign
                      style={{
                        marginRight: 5,
                      }}
                      color="white"
                      name="Safety"
                      size={20}
                    />
                  )}
                </View>
              }
            />
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',
            }}>
              Tên Sinh Viên:  </Text>
            <TextInput style={{
              width: 180,
            }}
              label="Tên Sinh Viên"
              value={tenSV}
              onChangeText={(text) => setTenSV(text)}
              mode="outlined"
            />
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3
          }}>
            <Text style={{
              fontSize: 12,
              color: '#999999',
            }}>
              Ngày Sinh:  </Text>
            <TextInput style={{
              width: 180,
            }}
              label="Ngày Sinh"
              value={ngaySinh}
              onChangeText={(text) => setNgaySinh(text)}
              mode="outlined"
            />

            

          </View>

        </ModalView>

        <FlatList
          data={data}
          renderItem={({ item }) =>
            <TouchableOpacity onLongPress={() => {
              Alert.alert('Cảnh Báo !', 'Bạn muốn xóa mục này.', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => {
                    deleteSinhVien(item.id);
                  }
                },
              ]);
            }}
              onPress={() => {
                edit(item.id, item.tenLop, item.name, item.date)
              }}
            >

              <Item name={item.name} date={item.date} />
            </TouchableOpacity>}
          keyExtractor={ (item) => item.id }
        />

      </View>

    </View>
  )
}
