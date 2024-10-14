
export interface Driver {
  driver_id: string;
  name: string | null;
  gender: string;
  email: string;
  phone_number?: string | null;
  avatar: string | null;
  is_active: boolean | number;
  unBring: number;
  driver_state: string;
  plate_number?: string | null;
  lamp_number?: string | null;
  has_taxi: boolean | number;

}

export interface DriversResponse {
  data: Driver[];
}
