import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface LinkModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (url: string, title: string) => void;
}

export default function LinkModal({
  visible,
  onClose,
  onSubmit,
}: LinkModalProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    onSubmit(url, title);
    setUrl("");
    setTitle("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Insert Link</Text>

          <TextInput
            placeholder="Link Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="https://example.com"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAdd} style={styles.add}>
              <Text style={{ color: "#fff" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancel: {
    padding: 10,
    marginRight: 10,
  },

  add: {
    backgroundColor: "#6366F1",
    padding: 10,
    borderRadius: 8,
  },
});