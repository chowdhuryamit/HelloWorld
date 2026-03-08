import { StyleSheet, Text, Image, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import PrimaryButton from '../../components/ButtonPrimary';
import { account } from '../../lib/appwrite';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { logout } from '../../store/userSlice';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const user = useSelector((state:RootState) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            setLoading(true);
            await account.deleteSession("current");
            dispatch(logout());
            router.replace('/signin');
        } catch (error:any) {
            setErrorMessage(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileCard}>
          
          <Image
            source={{
              uri: "https://wwwimage-us.pplusstatic.com/thumbnails/photos/w1920-q80/marquee/1037823/26/44/01/asset_marquee_2df2b5e7-080a-426c-9135-3060307b9e44.jpg?format=webp"
            }}
            style={styles.avatar}
          />
    
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
    
          <View style={styles.divider} />
          {errorMessage && <Text style={{color:'red',marginBottom:10}}>{errorMessage}</Text> }
          <PrimaryButton
            text="Logout"
            onPress={handleLogout}
            loading={loading}
            style={styles.logoutButton}
          />
    
        </View>
      </SafeAreaView>
    );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    elevation: 6,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  email: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 25,
  },

  logoutButton: {
    width: "100%",
    marginTop: 10,
  },
});