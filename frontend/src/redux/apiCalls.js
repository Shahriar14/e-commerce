import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    console.log("Logging in with:", user); // Add this line
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("Login Error:", err.response.data); // Improve error logging
        dispatch(loginFailure(err.response.data.message || "Login failed"));
        // dispatch(loginFailure());
    }
};