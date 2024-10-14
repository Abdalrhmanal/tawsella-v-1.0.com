export interface DashboardResponse {
  message: string;
  data: DashboardData;
}

export interface DashboardData {
  long: any;
  lat: any;
  totalDrivers: number;
  totalTaxi: number;
  calculations: number;
  requests: number;
  lifeTaxiMovements: LifeTaxiMovement[];
}

export interface LifeTaxiMovement {
  id: string;
  start_address: string;
  destination_address: string;
  gender: number;
  start_latitude: number;
  start_longitude: number;
  avatar: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  type: string | null;
  time: string;
}
export interface DashboardDetailseResponse {
  message: string;
  data: DataDetails;
}
export interface DataDetails {
  id: string;
  start_address: string;
  destination_address: string;
  gender: string;
  start_latitude: number;
  start_longitude: number;
  avatar: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  type: string | null;
  time: string;
}
export interface RequestDataDTO {
  message: string;
  data: MovementDTO[];
}

export interface MovementDTO {
  movement_id: string;
  start_address: string;
  destination_address: string;
  gender: string;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  path: path[];
  driver_email: string;
  customer_email: string;
  driver_name: string;
  driver_phone: string;
  customer_name: string;
  customer_phone: string;
  taxi_id: string;
  car_name: string;
  is_redirected?: number;
  car_lamp_number: string | null;
  car_plate_number: string | null;
  request_state: number | null;
  is_canceled: number | null;
  type: string;
  price: number;
  date: string;
}
export interface path {
  latitude: number;
  longitude: number;
}
export interface RequestData {
  index: number;
  drivers: Driver[];
  request_id: string | null;
  customer: Customer;
  gender: number;
  start_address: string | null;
  destination_address: string | null;
  start_latitude: number;
  start_longitude: number;
  time: string;
}
export interface Driver {
  id: string;
  name: string;
  gender: 'male' | 'female';
  avatar: string;
}

export interface Customer {
  id: string;
  email: string;
  email_verified_at: string | null;
  driver_state: number;
  is_active: number;
  mail_code_verified_at: string | null;
  mail_verify_code: string | null;
  mail_code_attempts_left: number;
  mail_code_last_attempt_date: string | null;
  mail_verify_code_sent_at: string | null;
  rating: number;
  created_at: string;
  updated_at: string;
}
