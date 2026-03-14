import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  title:string;
  author:string;
  description:string;
  publicationDate?: string | null;
  genre?: string | null;
  language?: string | null;
  createdAt: string;
  updatedAt: string;
  userID: string;
}

interface BookState{
    books: Book[];
}

const initialState: BookState = {
    books: []
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
    },
    removeBook: (state, action: PayloadAction<string>) => {
        state.books = state.books.filter(book => book.id !== action.payload);
    },
  },
});

export const { setBooks, addBook, updateBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;