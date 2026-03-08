import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'//in place of button we use TouchableOpacity for better styling and animation
//also in place of TouchableOpacity we can use Pressable for better touch handling and feedback 
import React from 'react'
import { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import PrimaryButton from '../../components/ButtonPrimary'
import { Ionicons } from '@expo/vector-icons'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '../../store/store'
import { account } from '../../lib/appwrite'
import { ID } from 'react-native-appwrite'
import { setUser } from '../../store/userSlice'
import { useRouter } from 'expo-router'

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [authState, setAuthState] = useState("siginin");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
  
    const handleLogin = async () => {
      try {
        setErrorMessage(null);
        setLoading(true);
        await account.createEmailPasswordSession(email, password);
        const response = await account.get();
        dispatch(setUser({name:response.name,email:response.email,id:response.$id}));
        router.replace('/profile');
      } catch (error:any) {
        setErrorMessage(error.message);
      }
      finally{
        setLoading(false);
      }
    };

    const handleSignup = async () => {
      try {
        setErrorMessage(null);
        setLoading(true);
        await account.create(ID.unique(), email, password, name);
        // After successful signup, you can automatically log the user in or redirect them to the login screen
        await handleLogin();
      } catch (error:any) {
        setErrorMessage(error.message);
      }
      finally{
        setLoading(false);
      }
    }
  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <ThemedView style={styles.container}>
    {authState === "signup" ? <Text style={styles.title}>Create an Account</Text>:<Text style={styles.title}>Login</Text>}

    {authState==="signup" && 
    <TextInput
      placeholder="Name"
      value={name}
      onChangeText={setName}
      style={styles.input}
      autoCapitalize="none"
    />}

    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={styles.input}
      autoCapitalize="none"
      keyboardType='email-address'
    />

    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={22}
          color="gray"
        />
      </TouchableOpacity>
    </View>

    {errorMessage && <Text style={{color:'red',marginBottom:10}}>{errorMessage}</Text>}

    {authState === "signup"?
    <PrimaryButton text='Create an Account' onPress={handleSignup} loading={loading}/>:
    <PrimaryButton text='Login' onPress={handleLogin} loading={loading}/>}
    <View style={styles.registerContainer}>
        {authState === "signup" ?
         <>
         <Text style={styles.registerText}>Already have an account? </Text>
         <TouchableOpacity onPress={()=>setAuthState("signin")}>
            <Text style={styles.registerLink}>Login</Text>
         </TouchableOpacity></>:
         <>
         <Text style={styles.registerText}>Don't have an account? </Text>
         <TouchableOpacity onPress={()=>setAuthState("signup")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity></>}
    </View>
    </ThemedView>
   </TouchableWithoutFeedback>
  )
}

export default Signin

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 40,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 12,
      borderRadius: 8,
      paddingRight: 40,
      marginVertical:5
    },
    button: {
      height: 50,
      backgroundColor: "#007AFF",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    inputContainer: {
      position: "relative",
      justifyContent: "center",
      
    },
    eyeIcon: {
      position: "absolute",
      right: 10,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
      },
      registerText: {
        fontSize: 14,
        color: "#555",
      },
      registerLink: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
      },
  });