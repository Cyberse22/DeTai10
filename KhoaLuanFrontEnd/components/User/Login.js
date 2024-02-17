import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import UserStyle from "../../styles/UserStyle";

const Login = ({ Navigation }) => {
    const login = () => {
    }
        return (
            <View style = {UserStyle.container1}>
                <Text style = {UserStyle.subject}>ĐĂNG NHẬP</Text>

                <TextInput style = {UserStyle.input} placeholder="Tên đăng nhập..." />
                <TextInput style = {UserStyle.input} placeholder="Mật khẩu..."/>
                    <TouchableOpacity onPress={login}>
                        <Text style = {UserStyle.button1}>Đăng nhập</Text>
                    </TouchableOpacity>
                    {/* {loading === true?<ActivityIndicator/>:<>
                        <TouchableOpacity onPress={login}>
                            <Text style = {UserStyle.button}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </> */}
                    {/* <Text style = {UserStyle.button2}>Google</Text>
                    <Text style = {UserStyle.button3}>Facebook</Text> */}
            </View>
        );
}

export default Login;