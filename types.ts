
export type ServiceType = 'Canalização' | 'Carpintaria' | 'Alvenaria' | 'Eletricidade' | 'Serralheria' | 'Ladrilho';

export interface ServiceRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  description: string;
  location: string;
  date: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluído';
  attachments: { name: string; data: string; type: string }[];
  viewed: boolean;
}

export interface CEOInfo {
  name: string;
  role: string;
  photo: string;
  objective: string;
  experience: string;
  skills: string[];
  education: string;
}

export interface SiteInfo {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  operatingHours: {
    week: string;
    saturday: string;
    sunday: string;
  };
  ceo: CEOInfo;
}
