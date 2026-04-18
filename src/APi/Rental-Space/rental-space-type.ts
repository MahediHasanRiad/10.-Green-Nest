export interface RentalInputType {
  location: string;
  size: string;
  price: number;
  availability: boolean;
}
export interface UpdateRentalInputType {
  location?: string | undefined;
  size?: string | undefined;
  price?: number | undefined;
  availability?: boolean | undefined;
}