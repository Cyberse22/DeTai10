import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "../../styles/HomeStyle";

const HomeScreenGVK = () => {
    const navigation = useNavigation();

    return (
        <View style={HomeStyle.container}>
            <View style={HomeStyle.row}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Quản lý khóa luận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Quản lý hội đồng")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Quản lý hội đồng</Text>
                </TouchableOpacity>
            </View>
            <View style={HomeStyle.row}>
                <TouchableOpacity onPress={() => navigation.navigate("Quản lý quy quy định chấm điểm")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Quản lý quy quy định chấm điểm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Thống kê")} style={HomeStyle.button}>
                    <Text style={HomeStyle.buttonText}>Thống kê</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreenGVK;