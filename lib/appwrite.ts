import { Client, Account, Avatars, Databases } from "react-native-appwrite";
export const databaseId = "69b50091001a79996a47";
export const collectionId = "books";
export const client = new Client()
.setEndpoint("https://sgp.cloud.appwrite.io/v1")// replace with your endpoint
.setProject("69abda52000056631b8f") // replace with your project ID
.setPlatform("dev.hello.world"); // replace with your endpoint

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);