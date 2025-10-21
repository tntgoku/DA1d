import {apiClient} from './getAPI';
export class DiscountService {
  /**
   * Get all discounts from DiscountController
   */
  static async getAllDiscounts() {
    try {
      const response = await apiClient.get(`discounts`);
      // Ensure we always return an array
      return Array.isArray(response.data.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching discounts:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  }

  static async getAllDiscountCampaigns() {
    try {
      const response = await apiClient.get(`discounts/campaigns`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching discount campaigns:', error);
      return [];
    }
  }
  /**
   * Get all vouchers from PromotionController
   */
  static async getAllVouchers() {
    try {
      const response = await apiClient.get(`promotion/voucher`);
      // Ensure we always return an array
      console.log(response.data.data);
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  }

  /**
   * Fetch all data (discounts, vouchers)
   */
  static async fetchAllData() {
    try {
      const [discounts, vouchers] = await Promise.all([
        this.getAllDiscounts(),
        this.getAllVouchers()
      ]);

      return {
        discounts: Array.isArray(discounts) ? discounts : [],
        vouchers: Array.isArray(vouchers) ? vouchers : []
      };
    } catch (error) {
      console.error('Error fetching all data:', error);
      // Return empty arrays on error
      return {
        discounts: [],
        vouchers: []
      };
    }
  }

  /**
   * Create a new discount campaign
   */
  static async createCampaign(campaignData) {
    try {
      const response = await apiClient.post('discounts/campaigns', campaignData);
      return response.data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw new Error(error.response?.data?.message || 'Không thể tạo chiến dịch');
    }
  }

  /**
   * Update an existing discount campaign
   */
  static async updateCampaign(campaignId, campaignData) {
    try {
      const response = await apiClient.put(`discounts/campaigns/${campaignId}`, campaignData);
      return response.data;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật chiến dịch');
    }
  }

  /**
   * Delete a discount campaign
   */
  static async deleteCampaign(campaignId) {
    try {
      const response = await apiClient.delete(`discounts/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw new Error(error.response?.data?.message || 'Không thể xóa chiến dịch');
    }
  }

  /**
   * Get campaign by ID
   */
  static async getCampaignById(campaignId) {
    try {
      const response = await apiClient.get(`discounts/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin chiến dịch');
    }
  }

  /**
   * Toggle campaign active status
   */
  static async toggleCampaignStatus(campaignId, isActive) {
    try {
      const response = await apiClient.patch(`discounts/campaigns/${campaignId}/status`, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error toggling campaign status:', error);
      throw new Error(error.response?.data?.message || 'Không thể thay đổi trạng thái chiến dịch');
    }
  }
}

export class VoucherService {
  static async createVoucher(voucherData) {
    try {
      const response = await apiClient.post('promotion/voucher', voucherData);
      return response.data;
    } catch (error) {
      console.error('Error creating voucher:', error);
      throw new Error(error.response?.data?.message || 'Không thể tạo voucher');
    }
  }
  static async updateVoucher(voucherId, voucherData) {
    try {
      const response = await apiClient.put(`/voucher/${voucherId}`, voucherData);
      return response.data;
    } catch (error) {
      console.error('Error updating voucher:', error);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật voucher');
    }
  }
  static async deleteVoucher(voucherId) {
    try {
      const response = await apiClient.delete(`promotion/voucher/${voucherId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting voucher:', error);
      throw new Error(error.response?.data?.message || 'Không thể xóa voucher');
    }
  }
  static async getVoucherById(voucherId) {
    try {
      const response = await apiClient.get(`promotion/voucher/${voucherId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching voucher:', error);
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin voucher');
    }
  }
  static async toggleVoucherStatus(voucherId, isActive) {
    try {
      const response = await apiClient.patch(`promotion/voucher/${voucherId}/status`, { isActive });
      return response.data;
    } catch (error) {
      console.error('Error toggling voucher status:', error);
      throw new Error(error.response?.data?.message || 'Không thể thay đổi trạng thái voucher');
    }
  }
  static async getAllVouchers() {
    try {
      const response = await apiClient.get('promotion/voucher');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      throw new Error(error.response?.data?.message || 'Không thể lấy tất cả vouchers');
    }
  }
  static async getVoucherByCode(voucherCode) {
    try {
      const response = await apiClient.get(`voucher/get-voucher/${voucherCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching voucher by code:', error);
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin voucher');
    }
  }

}