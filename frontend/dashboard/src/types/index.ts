// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Product related types
export interface Product {
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: string;
  quantityStock: number;
  productImage: string;
}

// Order related types
export interface Order {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

// Support ticket types
export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
