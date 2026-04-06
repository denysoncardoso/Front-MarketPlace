import { Injectable, signal } from '@angular/core';
import { PRODUCTS, ORDERS, QUOTE_REQUESTS, QUOTE_RESPONSES, CART_ITEMS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private _products = [...PRODUCTS];
  private _orders = [...ORDERS];
  private _quotes = [...QUOTE_REQUESTS];
  private _responses = { ...QUOTE_RESPONSES };
  private _cart = [...CART_ITEMS];

  // Products
  getProducts(search?: string): any[] {
    let list = this._products.filter(p => p.isActive);
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async createProduct(dto: { name: string; description: string; price: number; stock: number; unit: string }) {
    const p = { ...dto, id: `P-${Date.now()}`, supplierId: 'SUP1', supplierName: 'Local', isActive: true };
    this._products.push(p);
    return p;
  }

  async updateProduct(id: string, dto: { name: string; description: string; price: number; stock: number; unit: string }) {
    const idx = this._products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this._products[idx] = { ...this._products[idx], ...dto };
      return this._products[idx];
    }
    throw new Error('Produto não encontrado');
  }

  async deleteProduct(id: string) {
    const idx = this._products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this._products[idx].isActive = false;
    }
  }

  // Orders
  getOrders(): any[] {
    return [...this._orders];
  }

  async createOrder(): Promise<any> {
    const newOrder = {
      id: `ORD-${Date.now().toString(16).slice(-8)}`,
      buyerId: 'BUY1',
      status: 0,
      totalAmount: CART_ITEMS.reduce((s, i) => s + i.total, 0),
      createdAt: new Date().toISOString(),
      items: this._cart.map(item => ({
        id: `ITEM-${Date.now()}-${item.id}`,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
    };
    this._orders.unshift(newOrder);
    this._cart = [];
    return newOrder;
  }

  // Cart
  getCart(): any[] {
    return [...this._cart];
  }

  async addToCart(req: { productId: string; quantity: number }) {
    const existing = this._cart.find(i => i.productId === req.productId);
    if (existing) {
      existing.quantity += req.quantity;
      existing.total = existing.quantity * existing.unitPrice;
    } else {
      const prod = this._products.find(p => p.id === req.productId);
      if (!prod) throw new Error('Produto não encontrado');
      this._cart.push({
        id: `CART-${Date.now()}`,
        productId: prod.id,
        productName: prod.name,
        unitPrice: prod.price,
        quantity: req.quantity,
        total: req.quantity * prod.price,
      });
    }
    return this._cart.find(i => i.productId === req.productId)!;
  }

  async updateCartItem(id: string, quantity: number) {
    const item = this._cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      item.total = quantity * item.unitPrice;
      return { ...item };
    }
    throw new Error('Item não encontrado');
  }

  async removeCartItem(id: string) {
    this._cart = this._cart.filter(i => i.id !== id);
  }

  async clearCart() {
    this._cart = [];
  }

  // Quotes
  getQuotes(): any[] {
    return [...this._quotes];
  }

  async createQuote(req: { productName: string; quantity: number; description: string }): Promise<any> {
    const qr = {
      id: `QR-${Date.now()}`,
      pharmacyId: 'Farmácia Local',
      productName: req.productName,
      quantity: req.quantity,
      description: req.description,
      status: 0,
      createdAt: new Date().toISOString(),
    };
    this._quotes.unshift(qr);
    return qr;
  }

  async respondQuote(id: string, _req: { unitPrice: number; deliveryDays: number; notes: string }) {
    const qr = this._quotes.find(q => q.id === id);
    if (qr) {
      qr.status = 1;
    }
    if (!this._responses[id]) this._responses[id] = [];
    const rsp = {
      id: `RSP-${Date.now()}`,
      quoteRequestId: id,
      supplierId: 'SUP1',
      supplierName: 'Meu Fornecedor',
      unitPrice: _req.unitPrice,
      deliveryDays: _req.deliveryDays,
      notes: _req.notes,
      createdAt: new Date().toISOString(),
    };
    this._responses[id].push(rsp);
    return rsp;
  }

  getQuoteResponses(id: string): any[] {
    return this._responses[id] || [];
  }
}
