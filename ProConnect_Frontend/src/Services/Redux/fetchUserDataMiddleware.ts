import { Middleware } from "redux";
import { GetUserApiArg, User, api } from "./Api";
import { setUserAccount, setUserCredential } from "./Slices/AuthSlice";

/**
 * Middleware to fetch user data when setUserCredential action is dispatched.
 * 
 * This middleware listens for the setUserCredential action. When this action is dispatched,
 * it initiates an API call to fetch the user data associated with the user ID (uid) in the action payload.
 * If the user ID is undefined, null, or an empty string, the middleware does nothing.
 * If the user ID is valid, it dispatches the getUser endpoint of the API service to fetch the user data.
 * Once the user data is fetched, it dispatches the setUserAccount action to store the user data in the Redux store.
 * 
 * @param {Object} arg - The middleware API object.
 * @param {function} arg.dispatch - The Redux dispatch function.
 * @returns {function} The next middleware in the chain or the Redux dispatch function if the end of the chain has been reached.
 */
export const fetchUserDataMiddleware: Middleware =  ({ dispatch }) =>  (next) =>  async (action: any) => { 

    next(action);
    if (setUserCredential.match(action)) {

      const uid = action.payload.uid;
      if (uid === undefined || uid === null || uid === "" || uid.length < 5) return;
      const getUserArgs: GetUserApiArg = {
        userId: uid,
      };
      const promise = dispatch(api.endpoints.getUser.initiate(getUserArgs));
      const { data } = await promise;
      dispatch(setUserAccount(data as User)); // Typecast 'data' to 'User'
      console.log("Payload: " + JSON.stringify(data));
    }
  };
