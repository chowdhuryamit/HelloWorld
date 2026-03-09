import { account } from "../../lib/appwrite";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/userSlice";

export const fetchUser = async (dispatch: AppDispatch) => {
  try {
    const response = await account.get();

    dispatch(
      setUser({
        name: response.name,
        email: response.email,
        id: response.$id,
      })
    );
  } catch (error) {
    console.log("No active session found");
  }
};