import { apiClient } from "./getAPI";

export const commentService = {
    // Create comment
    createComment: async (commentData) => {
        try {
            const response = await apiClient.post('/api/comments', commentData);
            return response.data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },

    // Get comments by product
    getCommentsByProduct: async (productId, page = 0, size = 10, approvedOnly = true) => {
        try {
            const response = await apiClient.get(
                `/api/comments/product/${productId}?page=${page}&size=${size}&approvedOnly=${approvedOnly}`
            );
            return response.data;
        } catch (error) {
            console.error('Error getting comments by product:', error);
            throw error;
        }
    },

    // Get pending comments (admin)
    getPendingComments: async (page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/pending?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting pending comments:', error);
            throw error;
        }
    },

    // Approve comment (admin)
    approveComment: async (commentId) => {
        try {
            const response = await apiClient.put(`/api/comments/${commentId}/approve`);
            return response.data;
        } catch (error) {
            console.error('Error approving comment:', error);
            throw error;
        }
    },

    // Reject comment (admin)
    rejectComment: async (commentId) => {
        try {
            const response = await apiClient.put(`/api/comments/${commentId}/reject`);
            return response.data;
        } catch (error) {
            console.error('Error rejecting comment:', error);
            throw error;
        }
    },

    // Add admin response
    addAdminResponse: async (commentId, response) => {
        try {
            const response = await apiClient.put(`/api/comments/${commentId}/admin-response`, {
                response
            });
            return response.data;
        } catch (error) {
            console.error('Error adding admin response:', error);
            throw error;
        }
    },

    // Delete comment (admin)
    deleteComment: async (commentId) => {
        try {
            const response = await apiClient.delete(`/api/comments/${commentId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    },

    // Get statistics (admin)
    getStatistics: async () => {
        try {
            const response = await apiClient.get('/api/comments/statistics');
            return response.data;
        } catch (error) {
            console.error('Error getting comment statistics:', error);
            throw error;
        }
    },

    // Get comments by user
    getCommentsByUser: async (userId, page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/user/${userId}?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting comments by user:', error);
            throw error;
        }
    },

    // Search comments
    searchComments: async (keyword, page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/search?keyword=${keyword}&page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error searching comments:', error);
            throw error;
        }
    },

    // Get reported comments (admin)
    getReportedComments: async (page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/reported?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting reported comments:', error);
            throw error;
        }
    },

    // Get comments with admin response
    getCommentsWithAdminResponse: async (page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/with-admin-response?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting comments with admin response:', error);
            throw error;
        }
    },

    // Get comments without admin response
    getCommentsWithoutAdminResponse: async (page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/without-admin-response?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting comments without admin response:', error);
            throw error;
        }
    },

    // Get recent comments
    getRecentComments: async (hours = 24) => {
        try {
            const response = await apiClient.get(`/api/comments/recent?hours=${hours}`);
            return response.data;
        } catch (error) {
            console.error('Error getting recent comments:', error);
            throw error;
        }
    },

    // Get top rated products
    getTopRatedProducts: async (minComments = 5, page = 0, size = 10) => {
        try {
            const response = await apiClient.get(`/api/comments/top-rated?minComments=${minComments}&page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            console.error('Error getting top rated products:', error);
            throw error;
        }
    }
};