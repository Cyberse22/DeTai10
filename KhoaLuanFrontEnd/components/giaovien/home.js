import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "../../styles/HomeStyle";


const HomeScreenGV = () => {
    return (
<View style={HomeStyle.container}>
            <View style={HomeStyle.row}>
                <TouchableOpacity onPress={() => navigator.navigate("Hội đồng")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Hội đồng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate("Khóa luận")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Khóa luận</Text>
                </TouchableOpacity>
            </View>
            <View style={HomeStyle.row}>
                <TouchableOpacity onPress={() => navigator.navigate("Chấm điểm")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>chấm điểm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate("Thống kê")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Thống kê</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreenGV;