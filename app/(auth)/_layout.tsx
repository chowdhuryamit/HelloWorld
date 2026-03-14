import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "expo-router";


export default function AuthLayout(){
    const user = useSelector((state:RootState) => state.user)
    const router = useRouter();
    useEffect(()=>{
      if(user.email && user.id && user.name){
        router.replace('/profile');
      }
    },[user,router])
    return(
        <>
         <StatusBar style="auto"/>
         <Stack screenOptions={{headerShown:false,animation:"none"}}/>
        </>
    )
}