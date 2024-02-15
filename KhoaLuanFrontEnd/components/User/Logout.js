import React, { useContext } from "react";
import { Text } from "react-native";
import MyContext from "../../configs/MyContext";

const Logout = () => {
    const [user, dispatcher] = useContext(MyContext)

    const logout = () => {
        dispatch({
            "tpye" : "logout"
        })
    }

    if(user===null)
        return <Text>WELCOME</Text>

    return <Button title="Logout" onPress = {logout} />
}

export default Logout