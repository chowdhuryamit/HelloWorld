import { collectionId } from "../../lib/appwrite";
import { databaseId } from "../../lib/appwrite";
import { databases } from "../../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { CreateBookPayload } from "./create";
import { Book } from "../../store/booksSlice";

export const getBooks = async (id: string) => {
  try {
    const res = await databases.listDocuments(databaseId, collectionId,[Query.equal("userID", id)]);
    const books: Book[] = res.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title,
        author: doc.author,
        description: doc.description,
        genre: doc.genre ?? null,
        language: doc.language ?? null,
        publicationDate: doc.publicationDate ?? null,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
        userID: doc.userID,
      }));
    return books;
  } catch (error) {
    throw error;
  }
};

export const getParticularBook = async (id: string) => {};

export const createNewBook = async (bookData: CreateBookPayload) => {
  try {
    const newBook = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      bookData,
      [
        Permission.read(Role.user(bookData.userID)),
        Permission.update(Role.user(bookData.userID)),
        Permission.delete(Role.user(bookData.userID)),
      ]
    );
    return {
      id: newBook.$id,
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      publicationDate: newBook.publicationDate,
      genre: newBook.genre,
      language: newBook.language,
      createdAt: newBook.$createdAt,
      updatedAt: newBook.$updatedAt,
      userID: newBook.userID,
    };
  } catch (error) {
    throw error;
  }
};

export const updateParticularBook = async (
  id: string,
  bookData: CreateBookPayload
) => {
  console.log("Updating book with ID:", id, "and data:", bookData);
};

export const deleteBook = async (id: string) => {
    try {
        await databases.deleteDocument(databaseId, collectionId, id);
        return true;
    } catch (error) {
        throw error;
    }
};
