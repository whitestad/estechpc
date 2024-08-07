import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "./auth";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const useAxios = (): AxiosInstance => {
    const accessToken = Cookies.get("access_token") || "";
    const refreshToken = Cookies.get("refresh_token") || "";

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    axiosInstance.interceptors.request.use(async (req: AxiosRequestConfig) => {
        if (!isAccessTokenExpired(accessToken)) return req;

        const response = await getRefreshToken(refreshToken);

        setAuthUser(response.access, response.refresh);

        if (req.headers) {
            req.headers.Authorization = `Bearer ${response.access}`;
        }
        return req;
    });

    return axiosInstance;
};

export default useAxios;
