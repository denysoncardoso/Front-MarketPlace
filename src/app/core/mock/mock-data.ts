/* ========================================
   MOCK DATA — Demo PharmaB2B Marketplace
   ======================================== */

export const PRODUCTS = [
  { id: '001', name: 'Dipirona 500mg', description: 'Analgésico e antitérmico — caixa com 20 comprimidos', price: 12.50, stock: 5000, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '002', name: 'Amoxicilina 500mg', description: 'Antibiótico — caixa com 21 cápsulas', price: 35.90, stock: 3200, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '003', name: 'Losartana 50mg', description: 'Anti-hipertensivo — caixa com 30 comprimidos', price: 22.80, stock: 4100, unit: 'cx', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', isActive: true },
  { id: '004', name: 'Omeprazol 20mg', description: 'Inibidor de bomba de prótons — caixa com 14 cápsulas', price: 19.90, stock: 2800, unit: 'cx', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', isActive: true },
  { id: '005', name: 'Metformina 850mg', description: 'Antidiabético oral — caixa com 30 comprimidos', price: 15.40, stock: 6000, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '006', name: 'Atorvastatina 20mg', description: 'Hipolipemiante — caixa com 30 comprimidos', price: 28.60, stock: 3500, unit: 'cx', supplierId: 'SUP3', supplierName: 'Pharma Norte', isActive: true },
  { id: '007', name: 'Loratadina 10mg', description: 'Antialérgico — caixa com 12 comprimidos', price: 11.70, stock: 4200, unit: 'cx', supplierId: 'SUP3', supplierName: 'Pharma Norte', isActive: true },
  { id: '008', name: 'Paracetamol 750mg', description: 'Analgésico e antitérmico — caixa com 20 comprimidos', price: 9.80, stock: 7500, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '009', name: 'Azitromicina 500mg', description: 'Antibiótico macrolídeo — caixa com 3 comprimidos', price: 42.50, stock: 1800, unit: 'cx', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', isActive: true },
  { id: '010', name: 'Captopril 25mg', description: 'Anti-hipertensivo — caixa com 30 comprimidos', price: 14.20, stock: 850, unit: 'cx', supplierId: 'SUP3', supplierName: 'Pharma Norte', isActive: true },
  { id: '011', name: 'Enalapril 10mg', description: 'Anti-hipertensivo — caixa com 20 comprimidos', price: 16.70, stock: 2100, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '012', name: 'Fluoxetina 20mg', description: 'Antidepressivo — caixa com 20 cápsulas', price: 31.90, stock: 1500, unit: 'cx', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', isActive: true },
  { id: '013', name: 'Ranitidina 150mg', description: 'Anti-ulceroso — caixa com 28 comprimidos', price: 24.30, stock: 900, unit: 'cx', supplierId: 'SUP3', supplierName: 'Pharma Norte', isActive: true },
  { id: '014', name: 'Cetirizina 10mg', description: 'Antialérgico — caixa com 10 comprimidos', price: 13.50, stock: 3400, unit: 'cx', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', isActive: true },
  { id: '015', name: 'Sinvastatina 20mg', description: 'Hipolipemiante — caixa com 30 comprimidos', price: 26.40, stock: 2200, unit: 'cx', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', isActive: true },
  { id: '016', name: 'Soro Fisiológico 500ml', description: 'Solução injetável 0,9% — caixa com 10 frascos', price: 45.00, stock: 120, unit: 'cx', supplierId: 'SUP3', supplierName: 'Pharma Norte', isActive: true },
];

export const ORDERS = [
  {
    id: 'ORD-4f8b2a1c',
    buyerId: 'BUY1',
    status: 3,
    totalAmount: 489.70,
    createdAt: '2025-03-01T10:30:00Z',
    items: [
      { id: 'ITEM-1', productId: '001', productName: 'Dipirona 500mg', quantity: 10, unitPrice: 12.50 },
      { id: 'ITEM-2', productId: '008', productName: 'Paracetamol 750mg', quantity: 5, unitPrice: 9.80 },
      { id: 'ITEM-3', productId: '003', productName: 'Losartana 50mg', quantity: 15, unitPrice: 22.80 },
    ]
  },
  {
    id: 'ORD-7c3d9e5f',
    buyerId: 'BUY1',
    status: 1,
    totalAmount: 1254.00,
    createdAt: '2025-03-15T14:20:00Z',
    items: [
      { id: 'ITEM-4', productId: '005', productName: 'Metformina 850mg', quantity: 20, unitPrice: 15.40 },
      { id: 'ITEM-5', productId: '006', productName: 'Atorvastatina 20mg', quantity: 10, unitPrice: 28.60 },
      { id: 'ITEM-6', productId: '002', productName: 'Amoxicilina 500mg', quantity: 15, unitPrice: 35.90 },
      { id: 'ITEM-7', productId: '009', productName: 'Azitromicina 500mg', quantity: 5, unitPrice: 42.50 },
    ]
  },
  {
    id: 'ORD-1a2b3c4d',
    buyerId: 'BUY1',
    status: 0,
    totalAmount: 342.60,
    createdAt: '2025-03-28T09:10:00Z',
    items: [
      { id: 'ITEM-8', productId: '007', productName: 'Loratadina 10mg', quantity: 10, unitPrice: 11.70 },
      { id: 'ITEM-9', productId: '004', productName: 'Omeprazol 20mg', quantity: 8, unitPrice: 19.90 },
      { id: 'ITEM-10', productId: '010', productName: 'Captopril 25mg', quantity: 12, unitPrice: 14.20 },
    ]
  },
  {
    id: 'ORD-9e8d7c6b',
    buyerId: 'BUY1',
    status: 2,
    totalAmount: 756.20,
    createdAt: '2025-03-10T16:45:00Z',
    items: [
      { id: 'ITEM-11', productId: '012', productName: 'Fluoxetina 20mg', quantity: 10, unitPrice: 31.90 },
      { id: 'ITEM-12', productId: '015', productName: 'Sinvastatina 20mg', quantity: 8, unitPrice: 26.40 },
      { id: 'ITEM-13', productId: '014', productName: 'Cetirizina 10mg', quantity: 12, unitPrice: 13.50 },
    ]
  },
  {
    id: 'ORD-5f4e3d2c',
    buyerId: 'BUY1',
    status: 4,
    totalAmount: 168.00,
    createdAt: '2025-02-20T08:00:00Z',
    items: [
      { id: 'ITEM-14', productId: '011', productName: 'Enalapril 10mg', quantity: 20, unitPrice: 16.70 },
    ]
  }
];

export const QUOTE_REQUESTS = [
  {
    id: 'QR-001',
    pharmacyId: 'Farmácia Saúde Popular',
    productName: 'Cloridrato de Metadona 40mg',
    quantity: 50,
    description: 'Comprimido para tratamento — alta demanda mensal',
    status: 0,
    createdAt: '2025-03-25T08:00:00Z',
  },
  {
    id: 'QR-002',
    pharmacyId: 'Drogaria Bem Estar',
    productName: 'Insulina NPH 100UI',
    quantity: 100,
    description: 'Solução injetável — frasco com 10ml',
    status: 0,
    createdAt: '2025-03-26T10:30:00Z',
  },
  {
    id: 'QR-003',
    pharmacyId: 'Farmácia Saúde Popular',
    productName: 'Glicose 50% injetável',
    quantity: 200,
    description: 'Ampola 10ml — urgência hospitalar',
    status: 1,
    createdAt: '2025-03-20T14:00:00Z',
  },
  {
    id: 'QR-004',
    pharmacyId: 'Farmácia Viver Bem',
    productName: 'Vitamina B12 injetável',
    quantity: 80,
    description: 'Ampola 1ml — uso contínuo',
    status: 1,
    createdAt: '2025-03-18T09:00:00Z',
  },
];

export const QUOTE_RESPONSES: Record<string, any[]> = {
  'QR-003': [
    { id: 'RSP-1', quoteRequestId: 'QR-003', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', unitPrice: 3.20, deliveryDays: 3, notes: 'Entrega em até 3 dias úteis. Frete grátis acima de 500 unidades.', createdAt: '2025-03-21T08:00:00Z' },
    { id: 'RSP-2', quoteRequestId: 'QR-003', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', unitPrice: 2.95, deliveryDays: 5, notes: 'Prazo de 5 dias. Desconto progressivo para 500+ unidades.', createdAt: '2025-03-21T10:00:00Z' },
    { id: 'RSP-3', quoteRequestId: 'QR-003', supplierId: 'SUP3', supplierName: 'Pharma Norte', unitPrice: 3.50, deliveryDays: 2, notes: 'Entrega expressa em 48h. Produto com selo de qualidade ANVISA.', createdAt: '2025-03-22T09:00:00Z' },
  ],
  'QR-004': [
    { id: 'RSP-4', quoteRequestId: 'QR-004', supplierId: 'SUP1', supplierName: 'Distribuidora FarmaVida', unitPrice: 8.50, deliveryDays: 4, notes: 'Produto importado, procedência garantida.', createdAt: '2025-03-19T08:00:00Z' },
    { id: 'RSP-5', quoteRequestId: 'QR-004', supplierId: 'SUP2', supplierName: 'MedSul Distribuidora', unitPrice: 7.80, deliveryDays: 6, notes: 'Melhor preço do mercado. Lote válido até dez/2026.', createdAt: '2025-03-19T14:00:00Z' },
  ]
};

export const CART_ITEMS = [
  { id: 'CART-1', productId: '001', productName: 'Dipirona 500mg', unitPrice: 12.50, quantity: 5, total: 62.50 },
  { id: 'CART-2', productId: '008', productName: 'Paracetamol 750mg', unitPrice: 9.80, quantity: 3, total: 29.40 },
];
