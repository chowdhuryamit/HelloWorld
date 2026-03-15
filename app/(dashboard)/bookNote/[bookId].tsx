import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useLocalSearchParams } from "expo-router";
import LinkModal from "../../../components/LinkPopUp";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateBookNotes } from "../helper";
import { showSuccess } from "../../../utils/toast";
import { showError } from "../../../utils/toast";
import PrimaryButton from "../../../components/ButtonPrimary";

export default function BookNotes() {
  const { bookId } = useLocalSearchParams();
  const id = Array.isArray(bookId) ? bookId[0] : bookId;
  const books = useSelector((state: RootState) => state.book.books);
  const currentBook = books.find((b) => b.id === id);
  const editorRef = useRef<RichEditor | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const res = await updateBookNotes(id, content);
      if (res) {
        showSuccess(
          "Notes updated successfully!",
          "Your thoughts about this book have been saved."
        );
      }
    } catch (error: any) {
      showError("Failed to update notes", error.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentBook) {
      const notes = currentBook.notes || "";
      setContent(notes);
  
      if (editorRef.current) {
        editorRef.current.setContentHTML(notes);
      }
    }
  }, [currentBook]);

  return (
    <SafeAreaView style={styles.container}>
      {currentBook ? (
        <>
          <View style={styles.header}>
            <View>
            <Text style={styles.title}>{currentBook.title}</Text>
            <Text style={styles.authorName}>By - {currentBook.author} </Text>
            </View>
            <PrimaryButton text="Save" onPress={onSave} loading={loading} style={styles.saveBtn}/>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <RichEditor
              ref={editorRef}
              style={styles.editor}
              placeholder="Write your thoughts about this book..."
              onChange={(html) => setContent(html)}
              initialHeight={400}
              useContainer={false}
              initialContentHTML={currentBook.notes || ""}
              editorStyle={{
                cssText: "body {font-size:16px; padding:10px;}",
              }}
            />

            <RichToolbar
              getEditor={() => editorRef.current}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.blockquote,
                actions.code,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.insertLink,
                actions.removeFormat,
              ]}
            />
          </KeyboardAvoidingView>
        </>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  authorName: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 2,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  saveBtn: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  editor: {
    flex: 1,
    padding: 12,
    minHeight: 400,
    backgroundColor: "#FFFFFF",
  },
});
