import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

const ListThesis = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ListThesis" component={ListThesis} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ListThesis;