import Toast from "react-native-toast-message";

export const showSuccess = (message: string, description?: string) => {
  Toast.show({
    type: "success",
    text1: message,
    text2: description,
    position: "top",
  });
};

export const showError = (message: string, description?: string) => {
  Toast.show({
    type: "error",
    text1: message,
    text2: description,
    position: "top",
  });
};

export const showInfo = (message: string, description?: string) => {
  Toast.show({
    type: "info",
    text1: message,
    text2: description,
    position: "top",
  });
};