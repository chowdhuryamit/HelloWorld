import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import React, { useEffect } from "react"
import { useRouter } from "expo-router"
import { ReactNode } from "react"

interface AuthCheckProps {
    children: ReactNode;
}

export const AuthCheck : React.FC<AuthCheckProps> = ({children}) => {
  const user = useSelector((state:RootState) => state.user)
  const router = useRouter();
  useEffect(()=>{
    if(!user.email && !user.id && !user.name){
      router.replace('/signin');
    }
  },[user,router])

 return children;
}