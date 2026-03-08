import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  style?:any;
};

const PrimaryButton = ({ text, onPress, loading, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,style]} disabled={loading}>
      {loading?<ActivityIndicator color="#fff" />:<Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
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
});