import { Client, Account, Avatars } from "react-native-appwrite";

export const client = new Client()
.setEndpoint("https://sgp.cloud.appwrite.io/v1")// replace with your endpoint
.setProject("69abda52000056631b8f") // replace with your project ID
.setPlatform("dev.hello.world"); // replace with your endpoint

export const account = new Account(client);
export const avatars = new Avatars(client);