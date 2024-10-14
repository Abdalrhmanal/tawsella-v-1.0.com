interface OffersResponse {
  movement_type_id: string;
  offer: string;
  value_of_discount: number;
  valid_date: string;
  description: string;
}
interface Offer {
  id: string;
  offer: string;
  value_of_discount: number;
  valid_date: string;
  type: string;
  price: number;
  description: string;
}

interface OffersResponse {
  message: string;
  data: Offer[];
}
