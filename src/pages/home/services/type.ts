export interface MovementType {
  id: string;
  type: string;
  description: string | null;
  is_onKM: number | null;
  price: number;
  payment: string;
  is_general: number;
}

export interface Movement {
  id: string;
  type: string;
  description: string | null;
  is_onKM: number | null;
  price: number;
  payment: string;
  is_general: number;
}

export interface MovementTypeResponse {
  message: string;
  data: {
    movementTypes: MovementType[];
    movements: Movement[];
  };
}
