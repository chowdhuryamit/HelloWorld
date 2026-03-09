import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout(){
    return(
        <>
         {/* <StatusBar style="auto"/>
         <Stack screenOptions={{animation:"none"}}/> */}
         <Tabs
         screenOptions={{
            headerShown:false,
            tabBarStyle:{
                backgroundColor:"#fafafa",
                borderTopColor:"#186bf0",
                height:55,
                borderTopWidth:1
            },
            tabBarActiveTintColor:"#e62ef0",
            tabBarInactiveTintColor:"#186bf0",}}
         >
                <Tabs.Screen 
                  name="profile" 
                  options={{title:"Profile",tabBarIcon:({focused})=>(
                    <Ionicons name={focused?"person":"person-outline"} size={24} color={focused?"#e62ef0":"#186bf0"}/>
                )}}/>
                <Tabs.Screen 
                  name="books" 
                  options={{title:"Books", tabBarIcon:({focused})=>(
                    <Ionicons name={focused?"book":"book-outline"} size={24} color={focused?"#e62ef0":"#186bf0"}/>
                  )}}/>
                <Tabs.Screen 
                  name="create" 
                  options={{title:"Create",tabBarIcon:({focused})=>(
                    <Ionicons name="add" size={24} color={focused?"#e62ef0":"#186bf0"}/>
                  )}}/>
         </Tabs>
        </>
    )
}