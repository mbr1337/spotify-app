import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getApiConfig from "./axiosConfig";
import { setToken } from "../store";
import { useEffect } from "react";


export function GetRefreshToken() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        async function refresh() {
            try {
                const response = await axios.get('/auth/refresh_token', getApiConfig(token));
                const json = response.data;
                dispatch(setToken(json.refreshToken));
            } catch (error) {
                console.error(error);
            }
        }

        refresh();
    }, [dispatch, token]);
    return null;
}