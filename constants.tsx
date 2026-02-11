
import React from 'react';
import { 
  Droplets, 
  Hammer, 
  BrickWall, 
  Zap, 
  Lock, 
  Grid
} from 'lucide-react';
import { ServiceType } from './types';

export const SERVICES: { type: ServiceType; description: string; icon: React.ReactNode; image: string; imageBefore: string }[] = [
  { 
    type: 'Canalização', 
    description: 'Diga adeus às infiltrações e humidade. Implementamos sistemas hidráulicos inteligentes que poupam água e protegem a estrutura do seu imóvel com tecnologia de ponta.',
    icon: <Droplets />,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1595231712414-06c8b9287c24?auto=format&fit=crop&q=30&w=800'
  },
  { 
    type: 'Carpintaria', 
    description: 'Transformamos madeira em arte e funcionalidade. Desde cozinhas planejadas a portas de alta segurança, unimos o design moderno ao acabamento artesanal de luxo.',
    icon: <Hammer />,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1565551390313-094199c0d9a6?auto=format&fit=crop&q=30&w=800'
  },
  { 
    type: 'Alvenaria', 
    description: 'Construção robusta com acabamento de elite. Criamos espaços duradouros utilizando materiais certificados, garantindo que a sua obra seja um investimento para a vida toda.',
    icon: <BrickWall />,
    image: 'https://images.unsplash.com/photo-1590059132718-56829df18b5b?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=30&w=800'
  },
  { 
    type: 'Eletricidade', 
    description: 'Energia estável e sem riscos. Realizamos diagnósticos térmicos e instalações certificadas para proteger a sua família e os seus equipamentos eletrónicos mais valiosos.',
    icon: <Zap />,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&q=30&w=800'
  },
  { 
    type: 'Serralheria', 
    description: 'A segurança que a sua família merece com o estilo que a sua casa exige. Portões automatizados e estruturas metálicas com tratamento anticorrosivo de alta durabilidade.',
    icon: <Lock />,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1534394414421-70966f959f6d?auto=format&fit=crop&q=30&w=800'
  },
  { 
    type: 'Ladrilho', 
    description: 'Simetria perfeita e alinhamento milimétrico. Elevamos o padrão estético dos seus ambientes com aplicações de porcelanato e cerâmica que valorizam cada metro quadrado.',
    icon: <Grid />,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=45&w=800',
    imageBefore: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=30&w=800'
  },
];

export const LUANDA_DISTRICTS = [
  'Talatona', 'Belas', 'Viana', 'Maianga', 'Kilamba Kiaxi', 'Cacuaco', 'Cazenga', 'Luanda (Centro)', 'Icolo e Bengo', 'Quiçama'
];
