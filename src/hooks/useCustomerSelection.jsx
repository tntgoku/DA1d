import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/UserService';

export const useCustomerSelection = () => {
  const [listCustomer, setListCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load customers khi component mount
  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        if (response && response.data) {
          setListCustomer(response.data);
          console.log('Loaded customers:', response.data.length);
        }
      } catch (error) {
        console.error('Error loading customers:', error);
        // Fallback: tạo danh sách customer mẫu nếu API lỗi
        setListCustomer([]);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = listCustomer.filter(customer => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (customer.fullName || customer.name || "").toLowerCase().includes(searchLower) ||
      (customer.phone || "").includes(searchTerm) ||
      (customer.email || "").toLowerCase().includes(searchLower)
    );
  });

  // Get customer by ID
  const getCustomerById = (id) => {
    return listCustomer.find(c => c.id == id);
  };

  // Auto-fill customer info
  const fillCustomerInfo = (customer, handleInputChange) => {
    if (customer) {
      console.log('🔄 Filling customer info:', customer);
      
      try {
        // Fill customer ID first
        if (customer.idUser || customer.id) {
          handleInputChange({ target: { name: "customer", value: customer.idUser || customer.id } });
          console.log('✅ Customer ID filled:', customer.idUser || customer.id);
        }
        
        // Fill customer name
        if (customer.fullName || customer.name) {
          handleInputChange({ target: { name: "customerName", value: customer.fullName || customer.name } });
          console.log('✅ Name filled:', customer.fullName || customer.name);
        }
        
        // Fill phone
        if (customer.phone) {
          handleInputChange({ target: { name: "customerPhone", value: customer.phone } });
          console.log('✅ Phone filled:', customer.phone);
        }
        
        // Fill email
        if (customer.email) {
          handleInputChange({ target: { name: "customerEmail", value: customer.email } });
          console.log('✅ Email filled:', customer.email);
        }
        
        // Fill address
        if (customer.address) {
          handleInputChange({ target: { name: "shippingAddress", value: customer.address } });
          handleInputChange({ target: { name: "customerAddress", value: customer.address } });
          console.log('✅ Address filled:', customer.address);
        }
        
        console.log('🎉 Customer info filled successfully!');
        
        // Return success status
        return {
          success: true,
          filledFields: {
            id: !!(customer.idUser || customer.id),
            name: !!(customer.fullName || customer.name),
            phone: !!customer.phone,
            email: !!customer.email,
            address: !!customer.address
          }
        };
      } catch (error) {
        console.error('❌ Error filling customer info:', error);
        return { success: false, error: error.message };
      }
    } else {
      console.log('❌ No customer provided to fill info');
      return { success: false, error: 'No customer provided' };
    }
  };

  // Clear customer info
  const clearCustomerInfo = (handleInputChange) => {
    handleInputChange({ target: { name: "customer", value: null } });
    handleInputChange({ target: { name: "customerName", value: "" } });
    handleInputChange({ target: { name: "customerPhone", value: "" } });
    handleInputChange({ target: { name: "customerEmail", value: "" } });
    handleInputChange({ target: { name: "shippingAddress", value: "" } });
    handleInputChange({ target: { name: "customerAddress", value: "" } });
  };

  return {
    listCustomer,
    filteredCustomers,
    loading,
    searchTerm,
    setSearchTerm,
    getCustomerById,
    fillCustomerInfo,
    clearCustomerInfo
  };
};
