import {
  Modal,
  TextInput,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import PrimaryButton from "./ButtonPrimary";
import { Book } from "../store/booksSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateParticularBook } from "../app/(dashboard)/helper";
import { showError, showSuccess } from "../utils/toast";

type EditModalProps = {
  selectedBook: Book | null;
  setEditModalVisible: (visible: boolean) => void;
  editModalVisible: boolean;
};

const EditModal = ({
  selectedBook,
  setEditModalVisible,
  editModalVisible,
}: EditModalProps) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [formData, setFormData] = useState<Book | null>(selectedBook);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setFormData(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (field: keyof Book, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEdit = async () => {
    try {
        setLoading(true);
        await updateParticularBook(formData!);
    } catch (error:any) {
        showError("Failed to update book",error.message);
    }
    finally{
        setLoading(false);
        setEditModalVisible(false);
    }
  };

  return (
    <Modal visible={editModalVisible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Edit Book</Text>
  
                <Pressable
                  onPress={() => setEditModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>
  
              <TextInput
                style={styles.input}
                value={formData?.title ?? ""}
                placeholder="Title"
                onChangeText={(text) => handleChange("title", text)}
              />
  
              <TextInput
                style={styles.input}
                value={formData?.author ?? ""}
                placeholder="Author"
                onChangeText={(text) => handleChange("author", text)}
              />
  
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData?.description ?? ""}
                placeholder="Description"
                multiline
                onChangeText={(text) => handleChange("description", text)}
              />
  
              <TextInput
                style={styles.input}
                value={formData?.genre ?? ""}
                placeholder="Genre"
                onChangeText={(text) => handleChange("genre", text)}
              />
  
              <TextInput
                style={styles.input}
                value={formData?.language ?? ""}
                placeholder="Language"
                onChangeText={(text) => handleChange("language", text)}
              />
  
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={{ color: formData?.publicationDate ? "#000" : "#666" }}
                >
                  {formData?.publicationDate
                    ? new Date(formData.publicationDate).toDateString()
                    : "Select Publication Date"}
                </Text>
              </TouchableOpacity>
  
              {showDatePicker && (
                <DateTimePicker
                  value={
                    formData?.publicationDate
                      ? new Date(formData.publicationDate)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setFormData((prev) =>
                        prev
                          ? {
                              ...prev,
                              publicationDate: selectedDate.toISOString(),
                            }
                          : prev
                      );
                    }
                  }}
                />
              )}
  
              <View style={styles.modalButtons}>
                <PrimaryButton
                  text="Update"
                  onPress={handleEdit}
                  loading={loading}
                />
              </View>
            </ScrollView>
  
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  closeButton: {
    padding: 5,
  },

  closeIcon: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },

  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  modalButtons: {
    marginTop: 10,
  },
});
