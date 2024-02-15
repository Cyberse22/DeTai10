import React from "react";
import { Image, Text, View } from "react-native";
import UserStyle from "../../styles/UserStyle";

const UserProfile = () => {
    return (
        <View style = {UserStyle.container}>
            <View style = {UserStyle.leftPanel}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dnjupjumj/image/upload/f_auto,q_auto/sv8psa19dfauktio31is' }}
                    style = {UserStyle.image}
                />
            </View>
            <View style = {UserStyle.rightPanel}>
                <Text>ID: </Text>
                <Text>Name: </Text>
                <Text>Email: </Text>
            </View>
        </View>
    );
}

export default UserProfile;