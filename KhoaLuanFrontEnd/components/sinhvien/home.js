import React from "react";
import { Text, View } from "react-native";
import HomeStyle from "../../styles/HomeStyle";


const HomeScreenSV = () => {
    return (
        <View style={HomeStyle.text}>
            <Text>Tên Khóa Luận:</Text>
            <Text>ID Khóa Luận:</Text>
            <Text>Giảng Viên Hướng Dẫn</Text>
            <Text>Giảng Viên Phản Biện:</Text>
            <Text>Ngày Bảo Vệ:</Text>
            <Text>Trạng Thái:</Text>
        </View>
    );
}

export default HomeScreenSV;