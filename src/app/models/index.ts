export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  expiresAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export enum UserRole {
  Pharmacy = 0,
  Supplier = 1
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  supplierId: string;
  isActive: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

export interface CartItemDto {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface OrderDto {
  id: string;
  buyerId: string;
  status: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface QuoteRequestDto {
  id: string;
  pharmacyId: string;
  productName: string;
  quantity: number;
  description: string;
  status: number;
  createdAt: string;
}

export interface QuoteResponseDto {
  id: string;
  quoteRequestId: string;
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  deliveryDays: number;
  notes: string;
  createdAt: string;
}

export interface CreateQuoteRequest {
  productName: string;
  quantity: number;
  description: string;
}

export interface CreateQuoteResponse {
  unitPrice: number;
  deliveryDays: number;
  notes: string;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export enum QuoteStatus {
  Open = 'Open',
  Responded = 'Responded',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Expired = 'Expired'
}
