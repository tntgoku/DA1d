import { apiClient } from "./getAPI";

export const getVoucher = async (voucherCode) => {
    const response = await apiClient.get(`/voucher/get-voucher/${voucherCode}`);
    return response.data;
};