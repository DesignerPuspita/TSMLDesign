import fetchWithAuth from "../fetchWithAuth";
import { ADMIN_BACKEND_API_URL, ADMIN_BACKEND_BASE_URL } from "../constant";

export const getStatusUsers = async () => {
    let resultStatus = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-status`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return resultStatus;
}

export const addUsers = async (formData) => {
    let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}add-user`, {
        method: 'post',
        body: formData,
        headers: {}
    });
    return result;
}