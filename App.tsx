
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, ArrowRight, ShieldCheck, 
  Upload, Check, Zap, Layers, Trash2, 
  MapPin, Clock, Lock, LogOut, MessageSquare, Star, Image as ImageIcon,
  Download, FileText as FileIcon, Calendar, Users, ExternalLink,
  AlertCircle, Briefcase, Award, Target, ClipboardList, 
  Search, HardHat, FileCheck, ShieldAlert, Instagram, Facebook, MessageCircle,
  CheckCircle2, PlayCircle, Paperclip, FileText, XCircle, LayoutDashboard, Settings, Edit3, Plus, Eye,
  ThumbsUp, Send, Coffee, Loader2, Wrench, BarChart3, TrendingUp, ChevronRight, Globe, Droplets, Paperclip as PaperclipIcon,
  PlusCircle, Save, Sparkles, HeartHandshake, ShieldQuestion, Construction
} from 'lucide-react';
import { SERVICES as INITIAL_SERVICES, LUANDA_DISTRICTS } from './constants';
import { ServiceType, ServiceRequest, SiteInfo } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'services' | 'admin' | 'booking' | 'about' | 'gallery' | 'login'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(() => {
    try {
      const saved = localStorage.getItem('bengui_siteInfo_v12');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return {
      name: 'BENGUI Hidráulica & Serviços',
      slogan: 'O Padrão Ouro na Manutenção: Excelência Técnica que Valoriza o Seu Imóvel.',
      description: 'Líder em Luanda há mais de 20 anos, a BENGUI redefine a manutenção residencial e industrial. Oferecemos soluções definitivas com rigor técnico germânico, limpeza premium pós-obra e garantia certificada, garantindo a longevidade do seu património.',
      phone: '+244 923 687 478',
      email: 'advaldoloop@gmail.com',
      address: 'Golf 1, Rua Caminhos de Ferro, Luanda',
      social: {
        facebook: 'https://facebook.com/benguihidraulica',
        instagram: 'https://instagram.com/bengui_servicos',
        whatsapp: '244923687478'
      },
      operatingHours: {
        week: 'Segunda a Sexta: 08:00 - 18:00',
        saturday: 'Sábado: 08:00 - 13:00',
        sunday: 'Disponível para Emergências'
      },
      ceo: {
        name: 'Equipa BENGUI',
        role: 'Direção Técnica',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=40&w=400',
        objective: 'Entregar tranquilidade absoluta através de obras limpas, seguras e com acabamento de elite.',
        experience: 'Especialistas em Gestão de Manutenção Preventiva e Corretiva.',
        skills: ['Rigor Técnico', 'Limpeza Premium', 'Prazos Rigorosos', 'Segurança Certificada'],
        education: '20+ Anos de Atuação em Luanda'
      }
    };
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('bengui_services_v12');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_SERVICES.map(s => ({...s, id: Math.random().toString(36).substr(2, 9)}));
  });

  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem('bengui_portfolio_v12');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return [
      { id: '1', title: "Reabilitação Hidráulica Premium", client: "Condomínio Talatona", type: "Canalização", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=40&w=600" },
      { id: '2', title: "Sistema Elétrico Certificado", client: "Edifício Marginal", type: "Eletricidade", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=40&w=600" },
    ];
  });

  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem('bengui_requests_v12');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return [];
  });

  const [attachments, setAttachments] = useState<{ name: string; data: string; type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('bengui_siteInfo_v12', JSON.stringify(siteInfo));
    localStorage.setItem('bengui_services_v12', JSON.stringify(services));
    localStorage.setItem('bengui_portfolio_v12', JSON.stringify(portfolio));
    localStorage.setItem('bengui_requests_v12', JSON.stringify(requests));
  }, [siteInfo, services, portfolio, requests]);

  const [formData, setFormData] = useState({
    customerName: '', phone: '', email: '', serviceType: 'Canalização' as ServiceType, description: '', location: LUANDA_DISTRICTS[0]
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachments(prev => [...prev, {
          name: file.name,
          data: event.target?.result as string,
          type: file.type
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || formData.phone.length < 9) {
      alert("Por favor, preencha os dados de contacto.");
      return;
    }
    const newReq: ServiceRequest = {
      id: `req-${Date.now()}`,
      ...formData,
      date: new Date().toLocaleDateString('pt-AO'),
      status: 'Pendente',
      viewed: false,
      attachments: [...attachments]
    };
    setRequests(prev => [newReq, ...prev]);
    setFormData({ ...formData, customerName: '', phone: '', email: '', description: '' });
    setAttachments([]);
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); changeView('home'); }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Woncru30bengui') {
      setIsAuthenticated(true);
      setLoginError(false);
      changeView('admin');
      setPassword('');
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const changeView = (v: typeof activeView) => {
    if (v === 'admin' && !isAuthenticated) {
      setActiveView('login');
    } else {
      setActiveView(v);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-[9999]" role="alert" aria-busy="true">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={40} aria-hidden="true" />
        <p className="font-bold text-slate-900 tracking-tighter text-lg uppercase">BENGUI Serviços</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 selection:bg-orange-500/30">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.05]" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale" 
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-transparent to-slate-200" />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled > 50 ? 'py-3 glass border-b border-slate-300 shadow-lg' : 'py-6 lg:py-10 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
          <button 
            className="group flex items-start gap-3 text-left focus-visible:outline-orange-600" 
            onClick={() => changeView('home')}
            aria-label="Ir para a página inicial da BENGUI"
          >
             <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0" aria-hidden="true">
               <div className="absolute inset-0 bg-orange-600 rounded-xl md:rounded-2xl shadow-lg transition-transform group-hover:rotate-6 duration-300"></div>
               <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xl md:text-2xl">B</div>
             </div>
             <div className="flex flex-col">
               <span className={`font-black uppercase text-xl md:text-2xl tracking-tighter transition-colors ${scrolled > 50 ? 'text-slate-900' : 'text-slate-800'}`}>BENGUI</span>
               <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase transition-colors ${scrolled > 50 ? 'text-slate-500' : 'text-slate-600'}`}>Engenharia & Reparação</span>
             </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação Principal">
            {[
              { id: 'home', label: 'Início' },
              { id: 'services', label: 'Serviços' },
              { id: 'gallery', label: 'Portfólio' },
              { id: 'about', label: 'Quem Somos' }
            ].map(view => (
              <button 
                key={view.id} 
                onClick={() => changeView(view.id as any)} 
                className={`relative font-bold text-[11px] uppercase tracking-widest transition-all ${activeView === view.id ? 'text-orange-600 nav-link-active' : 'text-slate-600 hover:text-orange-600 nav-link'}`}
                aria-current={activeView === view.id ? 'page' : undefined}
              >
                {view.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <button 
               onClick={() => changeView('booking')} 
               className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 bg-orange-600 text-white shadow-xl shadow-orange-600/20"
             >
               Agendar Visita
             </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)} 
            className={`lg:hidden p-2.5 rounded-xl transition-all ${scrolled > 50 ? 'bg-slate-200 text-slate-900 backdrop-blur-md' : 'bg-slate-200/50 text-slate-800'}`} 
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={changeView} />

      <main id="main-content">
        {activeView === 'home' && (
          <>
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-heading">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-blue-400/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark border border-slate-300 rounded-full text-orange-700 text-[9px] font-black uppercase tracking-widest mb-6">
                  <Award size={12} aria-hidden="true" /> O Melhor Atendimento de Luanda
                </div>
                <h1 id="hero-heading" className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black text-slate-900 leading-[1] md:leading-[0.85] tracking-tighter mb-8">
                  Excelência Técnica em <br className="hidden md:block"/>
                  <span className="text-orange-600 italic">Cada Detalhe.</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl mb-10 font-medium leading-relaxed">
                  {siteInfo.slogan} Soluções definitivas para a sua manutenção residencial e industrial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => changeView('booking')} className="bg-orange-600 text-white px-8 sm:px-12 py-5 sm:py-6 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-2xl shadow-orange-600/20 group">
                    Resolver Meu Problema <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                  <button onClick={() => changeView('services')} className="glass border-slate-300 text-slate-700 px-8 sm:px-12 py-5 sm:py-6 rounded-2xl font-black text-lg hover:bg-white hover:text-orange-600 transition-all">Ver Nossos Serviços</button>
                </div>
              </div>
            </section>
            
            <section className="py-24 relative overflow-hidden" aria-label="Destaques e funcionalidades">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                   <FeatureCard icon={<Sparkles />} title="Limpeza Premium" desc="O seu espaço imaculado após cada intervenção técnica." />
                   <FeatureCard icon={<ShieldCheck />} title="Rigor Germânico" desc="Precisão absoluta em cada parafuso e ligação hidráulica." />
                   <FeatureCard icon={<Construction />} title="Mestres Certificados" desc="Apenas profissionais com vasta experiência local e técnica." />
                   <FeatureCard icon={<HeartHandshake />} title="Compromisso 24h" desc="Resposta rápida para as emergências do seu dia-a-dia." />
                </div>
              </div>
            </section>

            <StatsSection />
          </>
        )}

        {activeView === 'services' && (
          <div className="pt-28 lg:pt-48 pb-24 max-w-7xl mx-auto px-6 animate-fade-in-up" aria-labelledby="services-heading">
            <header className="text-center mb-16 lg:mb-28">
              <span className="text-orange-700 font-black uppercase tracking-[0.5em] text-[10px]">Catálogo de Especialidades</span>
              <h1 id="services-heading" className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mt-4 leading-tight">Mãos que <br className="hidden sm:block"/><span className="text-slate-600 italic">Constroem Valor.</span></h1>
            </header>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s: any) => (
                <article key={s.id} className="group glass rounded-3xl overflow-hidden border border-slate-300 shadow-sm hover:shadow-2xl hover:border-orange-500/20 transition-all duration-500">
                  <div className="h-64 sm:h-80 overflow-hidden relative">
                    <img loading="lazy" src={s.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Representação visual do serviço de ${s.type}`} />
                  </div>
                  <div className="p-8 sm:p-12">
                    <h2 className="text-2xl sm:text-3xl font-black mb-4 text-slate-900">{s.type}</h2>
                    <p className="text-slate-600 text-base sm:text-lg font-medium mb-8 leading-relaxed line-clamp-3">{s.description}</p>
                    <button 
                      onClick={() => { setFormData({...formData, serviceType: s.type}); changeView('booking'); }} 
                      className="w-full py-4 bg-orange-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-orange-600/10"
                      aria-label={`Solicitar orçamento para ${s.type}`}
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeView === 'gallery' && (
          <div className="pt-28 lg:pt-48 pb-24 max-w-7xl mx-auto px-6 animate-fade-in-up" aria-labelledby="gallery-heading">
            <header className="text-center mb-16 lg:mb-28">
              <span className="text-orange-700 font-black uppercase tracking-[0.5em] text-[10px]">Resultado Final</span>
              <h1 id="gallery-heading" className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mt-4 leading-tight">Obras <br className="hidden sm:block"/><span className="text-slate-600 italic">Terminadas.</span></h1>
            </header>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {portfolio.map((p: any) => (
                <figure key={p.id} className="group relative h-96 sm:h-[500px] rounded-3xl overflow-hidden glass shadow-md border border-white">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={p.title} />
                  <figcaption className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-orange-400 font-black text-[9px] uppercase tracking-widest mb-2 block">{p.type}</span>
                    <h2 className="text-2xl font-black text-white mb-2 leading-none">{p.title}</h2>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest">{p.client}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {activeView === 'booking' && (
          <div className="pt-28 lg:pt-48 pb-24 max-w-4xl mx-auto px-6 animate-fade-in-up">
            <div className="glass p-8 sm:p-16 rounded-[3rem] shadow-2xl border border-slate-300">
               <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900 mb-4 text-center">Inicie o Seu Orçamento</h1>
               <p className="text-center text-slate-600 font-bold uppercase text-[9px] tracking-[0.3em] mb-12">Resposta em menos de 24 horas</p>
               <form onSubmit={handleBookingSubmit} className="space-y-8" aria-label="Formulário de solicitação de serviço">
                  <div className="grid sm:grid-cols-2 gap-6 lg:gap-10">
                     <InputGroup id="customer-name" label="Seu Nome Completo" value={formData.customerName} onChange={(v: string) => setFormData({...formData, customerName: v})} placeholder="Ex: João Manuel" required />
                     <InputGroup id="customer-phone" label="Contacto WhatsApp" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} placeholder="9XX XXX XXX" required type="tel" />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <label htmlFor="location-select" className="text-[10px] font-black uppercase text-slate-600 ml-6 tracking-widest">Zona de Atendimento em Luanda</label>
                    <div className="relative">
                      <select 
                        id="location-select"
                        className="w-full glass-dark p-6 rounded-2xl outline-none font-bold border-2 border-slate-300 focus:border-orange-500/50 transition-all text-lg appearance-none cursor-pointer" 
                        value={formData.location} 
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      >
                        {LUANDA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>
                  <TextareaGroup id="service-desc" label="Relate a sua necessidade técnica" value={formData.description} onChange={(v: string) => setFormData({...formData, description: v})} placeholder="Descreva brevemente o problema ou projeto..." required />
                  
                  <div className="flex flex-col space-y-4">
                    <span className="text-[10px] font-black uppercase text-slate-600 ml-6 tracking-widest flex items-center gap-2">
                      <PaperclipIcon size={14} aria-hidden="true" /> Fotos para Diagnóstico Prévio (Opcional)
                    </span>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()} 
                      className="w-full border-2 border-dashed border-slate-400 glass rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-orange-500/50 hover:bg-white/50 transition-all group focus-visible:outline-orange-600"
                      aria-label="Anexar fotos do problema"
                    >
                      <Upload size={32} className="text-slate-500 group-hover:text-orange-500 transition-colors" aria-hidden="true" />
                      <span className="text-slate-700 font-bold text-sm">Clique para selecionar ficheiros</span>
                      <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    </button>
                  </div>

                  <button type="submit" className="w-full bg-orange-600 text-white py-6 sm:py-8 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all shadow-xl flex items-center justify-center gap-4 group">
                    <Send size={24} aria-hidden="true" /> Enviar Solicitação
                  </button>
               </form>
            </div>
          </div>
        )}

        {activeView === 'login' && (
           <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md glass p-12 sm:p-20 rounded-[3rem] shadow-2xl border border-slate-300 animate-fade-in-up text-center">
              <div className="w-20 h-20 glass-dark rounded-2xl flex items-center justify-center text-slate-900 mx-auto mb-10 shadow-xl border border-slate-300" aria-hidden="true">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 mb-4 leading-none">Portal Administrativo</h1>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="admin-pass" className="sr-only">Palavra-passe administrativa</label>
                  <input 
                    id="admin-pass"
                    type="password" 
                    autoFocus 
                    autoComplete="current-password"
                    className={`w-full glass-dark p-6 rounded-2xl border-2 outline-none font-black text-center text-2xl tracking-[0.4em] text-slate-900 ${loginError ? 'border-red-500 animate-shake' : 'border-slate-300 focus:border-orange-500/50'}`} 
                    placeholder="••••" 
                    value={password} 
                    onChange={e => { setPassword(e.target.value); setLoginError(false); }} 
                    aria-invalid={loginError}
                  />
                  {loginError && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2" role="alert">Palavra-passe incorreta</p>}
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl">Autenticar</button>
              </form>
            </div>
          </div>
        )}

        {activeView === 'admin' && isAuthenticated && (
          <AdminCMS 
            siteInfo={siteInfo} 
            setSiteInfo={setSiteInfo} 
            requests={requests} 
            setRequests={setRequests} 
            services={services} 
            setServices={setServices} 
            portfolio={portfolio} 
            setPortfolio={setPortfolio} 
            onLogout={() => { setIsAuthenticated(false); changeView('home'); }} 
          />
        )}
      </main>

      <footer className="glass-dark mt-24 text-slate-600 pt-24 pb-12 border-t border-slate-300/50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Informações de rodapé</h2>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-10">
              <div className="flex flex-col cursor-pointer" onClick={() => changeView('home')}>
                <span className="text-3xl font-black tracking-tighter uppercase leading-none text-slate-900">BENGUI</span>
                <span className="text-[10px] font-black text-orange-700 tracking-[0.3em] uppercase mt-1 leading-none">Engenharia de Valor</span>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">Elevando o padrão de manutenção em Angola com transparência e inovação técnica.</p>
              <div className="flex gap-4">
                 <FooterSocialIcon href={siteInfo.social.facebook} icon={<Facebook size={18}/>} label="Facebook BENGUI" />
                 <FooterSocialIcon href={siteInfo.social.instagram} icon={<Instagram size={18}/>} label="Instagram BENGUI" />
                 <FooterSocialIcon href={`https://wa.me/${siteInfo.social.whatsapp}`} icon={<MessageCircle size={18}/>} label="WhatsApp Directo" />
              </div>
            </div>

            <nav className="space-y-8" aria-labelledby="footer-nav-heading">
              <h3 id="footer-nav-heading" className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-500">Navegação</h3>
              <div className="flex flex-col gap-5">
                 <FooterLink onClick={() => changeView('home')} label="Início" />
                 <FooterLink onClick={() => changeView('services')} label="O que fazemos" />
                 <FooterLink onClick={() => changeView('gallery')} label="Galeria" />
                 <FooterLink onClick={() => changeView('booking')} label="Contratar" />
              </div>
            </nav>

            <div className="space-y-8">
              <h3 className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-500">Serviços</h3>
              <div className="flex flex-col gap-5">
                 {services.slice(0, 4).map((s:any) => (
                   <button key={s.id} onClick={() => changeView('services')} className="text-left text-lg font-bold text-slate-600 hover:text-orange-600 transition-all flex items-center group">
                      <ChevronRight size={14} className="text-orange-600 mr-2 opacity-0 group-hover:opacity-100 transition-all" aria-hidden="true" />
                      {s.type}
                   </button>
                 ))}
              </div>
            </div>

            <address className="space-y-8 not-italic">
              <h3 className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-500">Contactos</h3>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-orange-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <p className="text-lg font-bold text-slate-700">{siteInfo.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                    <Phone size={18} className="text-orange-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                       <a href={`tel:${siteInfo.phone.replace(/\s+/g, '')}`} className="text-2xl font-black leading-none text-slate-900 hover:text-orange-600 transition-colors">{siteInfo.phone}</a>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-2">Atendimento Prioritário</p>
                    </div>
                 </div>
              </div>
            </address>
          </div>
          <div className="pt-12 border-t border-slate-300/50 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-3 text-slate-500 font-black uppercase text-[9px] tracking-widest">
               <ShieldCheck size={18} className="text-green-600" aria-hidden="true" /> Empresa Luandense Certificada
             </div>
             <p className="text-slate-500 font-black uppercase text-[9px] tracking-[0.3em]">© {new Date().getFullYear()} BENGUI Hidráulica & Serviços</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${siteInfo.social.whatsapp}?text=Olá! Gostaria de solicitar um orçamento rápido para serviços de manutenção.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[150] group flex items-center gap-3"
        aria-label="Contactar via WhatsApp para orçamento rápido"
      >
        <span className="glass px-4 py-2 rounded-xl text-slate-900 font-bold text-sm shadow-xl border border-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 hidden sm:block">
          Orçamento Rápido
        </span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" aria-hidden="true"></div>
          <MessageCircle size={32} />
        </div>
      </a>

      {showSuccess && (
        <div className="fixed bottom-10 right-28 z-[500] animate-fade-in-up" role="status">
          <div className="bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-black text-sm uppercase tracking-widest border border-white/20">
            <CheckCircle2 size={24} /> Pedido Enviado com Sucesso!
          </div>
        </div>
      )}
    </div>
  );
}

function AdminCMS({ siteInfo, setSiteInfo, requests, setRequests, services, setServices, portfolio, setPortfolio, onLogout }: any) {
  const [adminTab, setAdminTab] = useState<'dashboard' | 'content' | 'services' | 'portfolio'>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<ServiceRequest | null>(null);
  
  // States para edição de serviços e portfólio
  const [editingService, setEditingService] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);

  const stats = {
    pending: requests.filter((r: any) => r.status === 'Pendente').length,
    active: requests.filter((r: any) => r.status === 'Em Andamento').length,
    completed: requests.filter((r: any) => r.status === 'Concluído').length,
    total: requests.length
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    setServices(services.map((s: any) => s.id === editingService.id ? editingService : s));
    setEditingService(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject.id === 'new') {
      const newProj = { ...editingProject, id: Math.random().toString(36).substr(2, 9) };
      setPortfolio([newProj, ...portfolio]);
    } else {
      setPortfolio(portfolio.map((p: any) => p.id === editingProject.id ? editingProject : p));
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Tem certeza que deseja remover este projeto da galeria?")) {
      setPortfolio(portfolio.filter((p: any) => p.id !== id));
    }
  };

  return (
    <div className="pt-24 sm:pt-40 pb-24 max-w-7xl mx-auto px-6 relative z-10" aria-label="Painel Administrativo">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <aside className="lg:w-80 space-y-4">
           <div className="p-8 glass rounded-[2.5rem] text-slate-900 shadow-xl border-slate-300">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-600/20" aria-hidden="true"><HardHat size={24} className="text-white"/></div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">Gestão Central</h1>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-2">Painel de Controlo</p>
           </div>
          <nav className="space-y-2" aria-label="Menu Administrativo">
             <AdminNavBtn active={adminTab === 'dashboard'} icon={LayoutDashboard} label="Chamados Técnicos" onClick={() => setAdminTab('dashboard')} badge={stats.pending} />
             <AdminNavBtn active={adminTab === 'content'} icon={Settings} label="Configurações" onClick={() => setAdminTab('content')} />
             <AdminNavBtn active={adminTab === 'services'} icon={Wrench} label="Gerir Especialidades" onClick={() => setAdminTab('services')} />
             <AdminNavBtn active={adminTab === 'portfolio'} icon={ImageIcon} label="Gerir Galeria" onClick={() => setAdminTab('portfolio')} />
          </nav>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-8 py-5 rounded-2xl glass-dark text-red-600 hover:bg-red-600 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all mt-8 border border-red-500/10">
            <LogOut size={16} aria-hidden="true" /> Encerrar Sessão
          </button>
        </aside>
        
        <div className="flex-1 glass rounded-[3rem] border border-slate-300 p-8 sm:p-14 shadow-2xl min-h-[600px]" role="tabpanel">
          {adminTab === 'dashboard' && (
            <div className="space-y-12 animate-fade-in-up">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">Mural de Atendimento</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
                 <MetricBox label="Pendentes" count={stats.pending} color="text-orange-600" bg="glass-dark" />
                 <MetricBox label="Em Curso" count={stats.active} color="text-blue-600" bg="glass-dark" />
                 <MetricBox label="Concluídos" count={stats.completed} color="text-green-600" bg="glass-dark" />
                 <MetricBox label="Histórico" count={stats.total} color="text-slate-700" bg="glass-dark" />
              </div>
              <div className="space-y-4" aria-label="Lista de chamados">
                {requests.length === 0 ? (
                  <p className="text-slate-500 font-bold text-center py-20 uppercase tracking-widest opacity-50">Nenhum chamado registado.</p>
                ) : (
                  requests.map((r: any) => <TicketCardMini key={r.id} ticket={r} onClick={() => setSelectedTicket(r)} />)
                )}
              </div>
            </div>
          )}

          {adminTab === 'content' && (
            <div className="space-y-12 animate-fade-in-up">
               <h2 className="text-3xl font-black tracking-tighter text-slate-900">Configurações do Site</h2>
               <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-b border-slate-200 pb-4">
                      <LayoutDashboard size={20} className="text-orange-600" /> Identidade Visual & Textos
                    </h3>
                    <div className="grid gap-6">
                      <InputGroup id="site-name" label="Nome Institucional" value={siteInfo.name} onChange={(v:any)=>setSiteInfo({...siteInfo, name:v})} />
                      <InputGroup id="site-slogan" label="Slogan de Impacto" value={siteInfo.slogan} onChange={(v:any)=>setSiteInfo({...siteInfo, slogan:v})} />
                      <TextareaGroup id="site-desc" label="Descrição da Empresa" value={siteInfo.description} onChange={(v:any)=>setSiteInfo({...siteInfo, description:v})} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 border-b border-slate-200 pb-4">
                      <Globe size={20} className="text-orange-600" /> Canais de Comunicação & Redes Sociais
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <InputGroup id="site-phone" label="Telefone (Exibição)" value={siteInfo.phone} onChange={(v:any)=>setSiteInfo({...siteInfo, phone:v})} />
                      <InputGroup id="site-whatsapp" label="WhatsApp (Apenas Números)" value={siteInfo.social.whatsapp} onChange={(v:any)=>setSiteInfo({...siteInfo, social: {...siteInfo.social, whatsapp: v}})} />
                      <InputGroup id="site-facebook" label="Link do Facebook" value={siteInfo.social.facebook} onChange={(v:any)=>setSiteInfo({...siteInfo, social: {...siteInfo.social, facebook: v}})} />
                      <InputGroup id="site-instagram" label="Link do Instagram" value={siteInfo.social.instagram} onChange={(v:any)=>setSiteInfo({...siteInfo, social: {...siteInfo.social, instagram: v}})} />
                      <div className="sm:col-span-2">
                        <InputGroup id="site-address" label="Endereço Físico" value={siteInfo.address} onChange={(v:any)=>setSiteInfo({...siteInfo, address:v})} />
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {adminTab === 'services' && (
            <div className="space-y-12 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black tracking-tighter text-slate-900">Especialidades Técnicas</h2>
              </div>
              
              {editingService ? (
                <form onSubmit={handleSaveService} className="glass p-8 rounded-3xl border border-orange-500/20 space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Edit3 size={20} className="text-orange-600" /> Editando {editingService.type}</h3>
                  <InputGroup id="edit-serv-type" label="Título da Especialidade" value={editingService.type} onChange={(v:any)=>setEditingService({...editingService, type: v})} />
                  <TextareaGroup id="edit-serv-desc" label="Descrição Comercial" value={editingService.description} onChange={(v:any)=>setEditingService({...editingService, description: v})} />
                  <InputGroup id="edit-serv-img" label="URL da Imagem (Unsplash)" value={editingService.image} onChange={(v:any)=>setEditingService({...editingService, image: v})} />
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-orange-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg flex items-center justify-center gap-2"><Save size={16} /> Salvar Alterações</button>
                    <button type="button" onClick={()=>setEditingService(null)} className="px-8 py-4 glass-dark text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest">Cancelar</button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-6">
                  {services.map((s: any) => (
                    <div key={s.id} className="glass p-6 rounded-2xl border border-slate-200 flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <img src={s.image} className="w-20 h-20 object-cover rounded-xl shadow-sm" alt={s.type} />
                          <div>
                            <h4 className="text-xl font-black text-slate-900 leading-tight">{s.type}</h4>
                            <p className="text-slate-500 text-xs mt-1 line-clamp-1 max-w-md">{s.description}</p>
                          </div>
                       </div>
                       <button 
                        onClick={() => setEditingService(s)} 
                        className="p-4 glass rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-500/50 transition-all border border-transparent shadow-sm"
                        aria-label={`Editar ${s.type}`}
                       >
                         <Edit3 size={20} />
                       </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {adminTab === 'portfolio' && (
            <div className="space-y-12 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black tracking-tighter text-slate-900">Gestão da Galeria</h2>
                {!editingProject && (
                  <button 
                    onClick={() => setEditingProject({ id: 'new', title: '', client: '', type: 'Canalização', image: '' })}
                    className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-600/20 hover:scale-105 transition-all"
                  >
                    <Plus size={16} /> Adicionar Projeto
                  </button>
                )}
              </div>

              {editingProject ? (
                <form onSubmit={handleSaveProject} className="glass p-8 rounded-3xl border border-orange-500/20 space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    {editingProject.id === 'new' ? <PlusCircle size={20} className="text-orange-600" /> : <Edit3 size={20} className="text-orange-600" />} 
                    {editingProject.id === 'new' ? 'Novo Projeto' : `Editando ${editingProject.title}`}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputGroup id="edit-proj-title" label="Título da Obra" value={editingProject.title} onChange={(v:any)=>setEditingProject({...editingProject, title: v})} />
                    <InputGroup id="edit-proj-client" label="Cliente/Local" value={editingProject.client} onChange={(v:any)=>setEditingProject({...editingProject, client: v})} />
                    <div className="flex flex-col space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-6 tracking-widest">Especialidade Aplicada</label>
                      <select className="w-full glass-dark p-6 rounded-2xl outline-none font-bold border-2 border-slate-300 transition-all text-lg appearance-none cursor-pointer" value={editingProject.type} onChange={e => setEditingProject({...editingProject, type: e.target.value})}>
                        {services.map((s:any) => <option key={s.id} value={s.type}>{s.type}</option>)}
                      </select>
                    </div>
                    <InputGroup id="edit-proj-img" label="URL da Imagem Final" value={editingProject.image} onChange={(v:any)=>setEditingProject({...editingProject, image: v})} />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-orange-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg flex items-center justify-center gap-2"><Save size={16} /> Publicar no Portfólio</button>
                    <button type="button" onClick={()=>setEditingProject(null)} className="px-8 py-4 glass-dark text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest">Cancelar</button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-6">
                  {portfolio.length === 0 ? (
                    <p className="text-center py-20 text-slate-400 font-bold uppercase text-xs opacity-50">Sua galeria está vazia.</p>
                  ) : (
                    portfolio.map((p: any) => (
                      <div key={p.id} className="glass p-6 rounded-2xl border border-slate-200 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <img src={p.image} className="w-24 h-24 object-cover rounded-xl shadow-sm" alt={p.title} />
                            <div>
                              <span className="text-orange-600 font-black text-[8px] uppercase tracking-widest">{p.type}</span>
                              <h4 className="text-xl font-black text-slate-900 leading-tight mt-1">{p.title}</h4>
                              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{p.client}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditingProject(p)} 
                            className="p-4 glass rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-500/50 transition-all border border-transparent"
                            aria-label={`Editar projeto ${p.title}`}
                          >
                            <Edit3 size={20} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(p.id)} 
                            className="p-4 glass rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500/50 transition-all border border-transparent"
                            aria-label={`Remover projeto ${p.title}`}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {selectedTicket && (
        <TicketModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
          onStatusChange={(status: any) => { 
            setRequests(requests.map((req: any) => req.id === selectedTicket.id ? {...req, status} : req)); 
            setSelectedTicket(null); 
          }} 
        />
      )}
    </div>
  );
}

// HELPERS UI COM ACESSIBILIDADE MELHORADA
function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 glass rounded-3xl border border-slate-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
       <div className="w-16 h-16 glass-dark rounded-2xl flex items-center justify-center text-orange-600 shadow-sm mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all border border-slate-300" aria-hidden="true">
          {React.cloneElement(icon, { size: 32 })}
       </div>
       <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
       <p className="text-slate-700 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" aria-label="Estatísticas de confiança">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
        <StatItem count="2k+" label="Soluções Entregues" />
        <StatItem count="20+" label="Anos de Experiência" />
        <StatItem count="14" label="Profissionais Ativos" />
        <StatItem count="100%" label="Índice de Confiança" />
      </div>
      <div className="absolute inset-0 glass-dark opacity-50 z-0" aria-hidden="true" />
    </section>
  );
}

function StatItem({ count, label }: { count: string; label: string }) {
  return (
    <div className="space-y-4">
      <p className="text-5xl sm:text-7xl lg:text-9xl font-black text-slate-900/10 tracking-tighter leading-none">{count}</p>
      <p className="text-[9px] sm:text-[11px] font-black uppercase text-slate-600 tracking-widest">{label}</p>
    </div>
  );
}

function FooterSocialIcon({ href, icon, label }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-slate-600 hover:text-orange-600 hover:shadow-lg transition-all border border-slate-300 shadow-sm" aria-label={label}>
      {React.cloneElement(icon, { 'aria-hidden': 'true' })}
    </a>
  );
}

function FooterLink({ onClick, label }: any) {
  return (
    <button onClick={onClick} className="text-left text-lg font-bold text-slate-600 hover:text-orange-600 transition-all flex items-center group focus-visible:outline-orange-600">
      <ChevronRight size={14} className="mr-2 text-orange-600 opacity-0 group-hover:opacity-100 transition-all" aria-hidden="true" />
      {label}
    </button>
  );
}

function MetricBox({ label, count, color, bg }: any) {
  return (
    <div className={`${bg} p-6 sm:p-10 rounded-3xl border border-slate-300 flex flex-col items-center justify-center gap-2 shadow-sm`} role="listitem">
       <span className={`text-4xl sm:text-5xl font-black ${color} tracking-tighter leading-none`}>{count}</span>
       <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{label}</span>
    </div>
  );
}

function AdminNavBtn({ active, icon: Icon, label, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl transition-all group focus-visible:outline-orange-600 ${active ? 'glass-dark text-slate-900 border border-slate-300 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:glass-dark'}`}
      aria-pressed={active}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className={active ? 'text-orange-600' : 'group-hover:text-orange-600'} aria-hidden="true" />
        <span className="font-black text-[11px] uppercase tracking-widest">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px] font-black" aria-label={`${badge} chamados pendentes`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function TicketCardMini({ ticket, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className="w-full text-left p-6 glass rounded-2xl border border-slate-300 flex items-center justify-between group cursor-pointer hover:border-orange-600 hover:shadow-2xl transition-all focus-visible:outline-orange-600"
      aria-label={`Ver detalhes do chamado de ${ticket.customerName}`}
    >
       <div className="flex gap-4 items-center">
          <div className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center text-slate-500 border border-slate-300 group-hover:text-orange-600 transition-all" aria-hidden="true">
             <MessageSquare size={20}/>
          </div>
          <div>
             <h4 className="text-xl font-black text-slate-900">{ticket.customerName}</h4>
             <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">{ticket.phone} • {ticket.date}</p>
          </div>
       </div>
       <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${ticket.status === 'Concluído' ? 'bg-green-100 text-green-700 border-green-200' : ticket.status === 'Em Andamento' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
            {ticket.status}
          </span>
          <ArrowRight className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" size={20} aria-hidden="true" />
       </div>
    </button>
  );
}

function TicketModal({ ticket, onClose, onStatusChange }: any) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="glass w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-300 animate-fade-in-up" onClick={e => e.stopPropagation()}>
         <div className="p-8 glass-dark border-b border-white flex justify-between items-center text-slate-900">
            <h2 id="modal-title" className="text-3xl font-black tracking-tighter leading-none">{ticket.customerName}</h2>
            <button 
              onClick={onClose} 
              className="p-4 glass rounded-xl shadow-sm hover:bg-slate-200 transition-all text-slate-900 border border-slate-300 focus-visible:outline-orange-600"
              aria-label="Fechar detalhes do chamado"
            >
              <X size={24} aria-hidden="true" />
            </button>
         </div>
         <div className="p-8 overflow-y-auto space-y-12">
            <div className="grid sm:grid-cols-3 gap-10">
               <div><p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-2">Contacto</p><p className="text-2xl font-black text-slate-900">{ticket.phone}</p></div>
               <div><p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-2">Zona de Luanda</p><p className="text-2xl font-black text-slate-900">{ticket.location}</p></div>
               <div><p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-2">Especialidade</p><p className="text-2xl font-black text-orange-600">{ticket.serviceType}</p></div>
            </div>
            <div className="p-8 glass-dark rounded-3xl border-l-[12px] border-orange-600 shadow-inner">
               <h3 className="text-[10px] font-black uppercase text-orange-700 tracking-widest mb-4">Relato do Cliente</h3>
               <p className="text-xl font-medium italic text-slate-800 leading-relaxed">"{ticket.description}"</p>
            </div>
            <div className="pt-12 border-t border-slate-300 flex flex-wrap gap-4 sm:gap-6">
               {ticket.status === 'Pendente' && (
                 <button onClick={() => onStatusChange('Em Andamento')} className="flex-1 min-w-[200px] py-6 bg-orange-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-orange-600/10 flex items-center justify-center gap-3">
                   <CheckCircle2 size={24} aria-hidden="true" /> Aceitar Pedido
                 </button>
               )}
               {ticket.status !== 'Concluído' && (
                 <button onClick={() => onStatusChange('Concluído')} className="flex-1 min-w-[200px] py-6 bg-green-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-600/10 flex items-center justify-center gap-3">
                   <Check size={24} aria-hidden="true" /> Marcar como Finalizado
                 </button>
               )}
               {ticket.status === 'Concluído' && (
                 <div className="flex-1 py-6 bg-green-100 text-green-700 rounded-2xl font-black text-center text-lg uppercase tracking-widest border border-green-200 flex items-center justify-center gap-3">
                    <CheckCircle2 size={24} /> Serviço Concluído
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

function InputGroup({ id, label, value, onChange, placeholder, required = false, type = "text" }: any) {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={id} className="text-[10px] font-black uppercase text-slate-600 ml-6 tracking-widest">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      <input 
        id={id}
        type={type} 
        required={required}
        aria-required={required}
        className="w-full glass-dark p-6 rounded-2xl outline-none font-bold border-2 border-slate-300 focus:border-orange-500/50 transition-all text-lg text-slate-900 shadow-inner" 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}

function TextareaGroup({ id, label, value, onChange, placeholder, required = false }: any) {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={id} className="text-[10px] font-black uppercase text-slate-600 ml-6 tracking-widest">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      <textarea 
        id={id}
        rows={4} 
        required={required}
        aria-required={required}
        className="w-full glass-dark p-8 rounded-2xl outline-none font-medium border-2 border-slate-300 focus:border-orange-500/50 transition-all text-lg resize-none text-slate-900 shadow-inner" 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}

function MobileMenu({ isOpen, onClose, onNavigate }: any) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-700 ${isOpen ? 'visible' : 'invisible'}`} aria-hidden={!isOpen}>
       <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
       <div className={`absolute right-0 top-0 bottom-0 w-[85%] bg-white/95 glass p-12 flex flex-col transition-transform duration-700 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button 
            onClick={onClose} 
            className="self-end p-4 glass rounded-xl text-slate-900 border border-slate-300 mb-16" 
            aria-label="Fechar menu de navegação"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <nav className="flex flex-col gap-10">
             {[
               {id: 'home', label: 'Início'}, 
               {id: 'services', label: 'Serviços'}, 
               {id: 'gallery', label: 'Portfólio'}, 
               {id: 'about', label: 'Quem Somos'}
             ].map(v => (
               <button 
                 key={v.id} 
                 onClick={() => onNavigate(v.id as any)} 
                 className="text-left text-5xl font-black text-slate-300 hover:text-orange-600 transition-colors tracking-tighter duration-200 focus-visible:outline-orange-600"
               >
                 {v.label}
               </button>
             ))}
          </nav>
          <div className="mt-auto">
             <button 
               onClick={() => onNavigate('admin')} 
               className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-4 shadow-xl hover:bg-orange-600 transition-all"
             >
               <Lock size={20} aria-hidden="true" /> Administração
             </button>
          </div>
       </div>
    </div>
  );
}
