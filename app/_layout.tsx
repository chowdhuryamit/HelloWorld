import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { Colors } from "../constants/Color";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {store} from '../store/store';
import Toast from "react-native-toast-message";

const RootLayout = () => {
  // return (
  //   <View style={{flex:1}}>
  //     {/* <Slot/> */}
  //     <Stack/>
  //     <Text>Footer </Text>
  //   </View>
  // )

  const colorScheme = useColorScheme();
  const theme = colorScheme?Colors[colorScheme]:Colors.light;
  return (
    <Provider store={store}>
      <StatusBar style='auto'/>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }}/>
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
        <Stack.Screen name="(auth)" options={{headerShown:false}}/>
        <Stack.Screen name="(dashboard)" options={{headerShown:false}}/>
      </Stack>
      <Toast/>
    </Provider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
