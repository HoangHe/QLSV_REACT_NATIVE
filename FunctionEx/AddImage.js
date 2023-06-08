import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const AddImage = () => {
    const [data, setData] = useState([]);

    React.useEffect(() => {
        getClass();
    }, [])


    const getClass = async () => {
        await fetch("http://10.24.8.123:3000/IMAGE")
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <View>
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
                       
                    >
                    <Image style={{
                        height: 100,
                        width: 100
                    }} source={{uri:  item.uri}}/>
                    </TouchableOpacity>
                )
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default AddImage