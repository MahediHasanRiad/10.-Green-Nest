export interface ProductType {
  readonly id?: string;
  name: string,
  description: string,
  price: number,
  category: string,
  availableQuantity: number,
  sustainabilityCardId: string,
  CertificateStatus?: 'PENDING_APPROVAL' | 'ISSUED' | 'REVOKED' | 'EXPIRED'
}
export interface UpdateProductType {
  name?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  category?: string | undefined;
  availableQuantity?: number | undefined;
  sustainabilityCardId?: string | undefined;
}