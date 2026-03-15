import {

  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Platform } from "react-native";
import { createNewBook } from "./helper";
import { addBook } from "../../store/booksSlice";
import { showError} from "../../utils/toast";
import { showSuccess } from "../../utils/toast";
import PrimaryButton from "../../components/ButtonPrimary";
import { Book } from "../../store/booksSlice";

export type CreateBookPayload = {
  title: string;
  author: string;
  description: string;
  publicationDate?: Date | null;
  genre?: string | null;
  language?: string | null;
  userID: string;
};

const Create = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<CreateBookPayload>({
    title: "",
    author: "",
    description: "",
    publicationDate: null,
    genre: null,
    language: null,
    userID: activeUser.id || "",
  });

  const handleChange = (field: keyof CreateBookPayload, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createNewBook(formData);
      // dispatch(addBook(res));
      showSuccess("Book created successfully!","Your book has been added to your collection.");
      setFormData({
        title: "",
        author: "",
        description: "",
        publicationDate: null,
        genre: null,
        language: null,
        userID: activeUser.id || "",
      })
    } catch (error:any) {
      showError("Failed to create book. Please try again.",error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Add New Book</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter book title"
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
          />

          <Text style={styles.label}>Author</Text>
          <TextInput
            placeholder="Enter author name"
            style={styles.input}
            value={formData.author}
            onChangeText={(text) => handleChange("author", text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Write book description"
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <Text style={styles.label}>Genre</Text>
          <TextInput
            placeholder="e.g. Fiction, Sci-Fi"
            style={styles.input}
            value={formData.genre || ""}
            onChangeText={(text) => handleChange("genre", text)}
          />

          <Text style={styles.label}>Language</Text>
          <TextInput
            placeholder="e.g. English"
            style={styles.input}
            value={formData.language || ""}
            onChangeText={(text) => handleChange("language", text)}
          />

          <Text style={styles.label}>Publication Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: formData.publicationDate ? "#000" : "#666" }}>
              {formData.publicationDate
                ? formData.publicationDate.toDateString()
                : "Select Publication Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={formData.publicationDate || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date(1000, 0, 1)}
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setFormData({
                    ...formData,
                    publicationDate: selectedDate,
                  });
                }
              }}
            />
          )}
          <PrimaryButton text="Create Book" onPress={handleSubmit} loading={loading} style={styles.button}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#d2d7d9",
    flexGrow: 1,
    paddingTop: 40,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#186bf0",
    paddingLeft: 75,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#186bf0",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },

  input: {
    backgroundColor: "#f1f3f5",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#186bf0",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
