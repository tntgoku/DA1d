import axios from 'axios';
import { apiClient } from './getAPI';

// Create a payment
export const createPayment = async(paymentData) => {
    try {
        const response = await apiClient.post('/payments', paymentData);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

// Get payment status
export const getPaymentStatus = async(paymentId) => {
    try {
        const response = await apiClient.get(`/payments/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw error;
    }
};