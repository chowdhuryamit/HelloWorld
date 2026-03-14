import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { act, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book, removeBook } from "../../store/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getBooks } from "./helper";
import { deleteBook } from "./helper";
import { setBooks } from "../../store/booksSlice";
import { showError, showSuccess } from "../../utils/toast";
import PrimaryButton from "../../components/ButtonPrimary";

const { width } = Dimensions.get("window");

const Books = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const books = useSelector((state: RootState) => state.book.books);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooks(activeUser.id || "");
      dispatch(setBooks(res));
      showSuccess(
        "Books fetched successfully!",
        "Your book list has been updated."
      );
    } catch (error: any) {
      showError("Failed to fetch books", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteBook(id);
      if (res) {
        showSuccess(
          "Book deleted successfully!",
          "The book has been removed from your collection."
        );
        dispatch(removeBook(id));
      }
    } catch (error) {
      showError(
        "An error occurred while deleting the book",
        "Please try again later."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = async (id: string) => {
    // Logic for edit
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>
            Hi, {activeUser.name || "User"}
          </Text>
          <Text style={styles.headerTitle}>Your Book List</Text>
        </View>
        <PrimaryButton
          text="Get New"
          onPress={fetchBooks}
          style={styles.fetchButton}
          loading={loading}
        />
      </View>
      {/* <FlatList/> i can also use this react native component to show the list of iteams */}
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No books found. Try fetching!</Text>
          }
          renderItem={({ item: book }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.title} >
                    {book.title}
                  </Text>
                  <Text style={styles.dateText}>
                    {book.publicationDate
                      ? new Date(book.publicationDate).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </View>

                <Text style={styles.author}>by {book.author}</Text>

                <Text style={styles.description} numberOfLines={3}>
                  {book.description || "No description provided."}
                </Text>

                <View style={styles.badgeRow}>
                  <View style={[styles.badge, styles.genreBadge]}>
                    <Text style={styles.genreTagText}>
                      {book.genre || "N/A"}
                    </Text>
                  </View>

                  <View style={[styles.badge, styles.langBadge]}>
                    <Text style={styles.langTagText}>
                      {book.language || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.buttonGroup}>
                <PrimaryButton
                  text="Edit"
                  onPress={() => handleEdit(book.id)}
                  style={[styles.editButton]}
                />

                <PrimaryButton
                  text="Delete"
                  onPress={() => handleDelete(book.id)}
                  style={[styles.deleteButton]}
                  loading={deletingId === book.id}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Books;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  fetchButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    height: 40,
  },
  fetchButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 10,
  },
  author: {
    fontSize: 15,
    color: "#6C757D",
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#868E96",
    lineHeight: 20,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures responsiveness on small screens
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genreBadge: {
    backgroundColor: "#cefac5",
    borderWidth: 1,
    borderColor: "#6cd957",
  },
  langBadge: {
    backgroundColor: "#abfff7",
    borderWidth: 1,
    borderColor: "#24c7b7",
  },
  genreTagText: {
    color: "#37c71a",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  langTagText: {
    color: "#10ad9e",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 12,
    color: "#ADB5BD",
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff5f42",
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#ADB5BD",
    marginTop: 40,
    fontSize: 16,
  },
});
