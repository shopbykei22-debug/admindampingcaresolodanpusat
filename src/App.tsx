import { MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ADMIN_PHONE = '6289672874600';

type Service = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  label: string;
  message: string;
};

const services: Service[] = [
  {
    id: 'caregiver',
    image: '/1_(3).webp',
    title: 'Pendampingan Pasien / Caregiver',
    description: 'Pendampingan pasien di rumah sakit maupun di rumah secara non-medis.',
    label: 'Non-Medis',
    message:
      'Halo Admin Dampingcare, saya ingin menggunakan layanan Pendampingan Pasien / Caregiver. Mohon informasi mengenai layanan, ketersediaan pendamping, dan tarifnya. Terima kasih.',
  },
  {
    id: 'non-pasien',
    image: '/2.png',
    title: 'Pendampingan Non Pasien',
    description: 'Pendampingan untuk kebutuhan pribadi, perjalanan, acara, aktivitas, dan kebutuhan lainnya.',
    label: 'Personal Companion',
    message:
      'Halo Admin Dampingcare, saya ingin menggunakan layanan Pendampingan Non Pasien. Saya ingin mengetahui jenis layanan, ketersediaan pendamping, dan tarifnya. Mohon informasinya ya. Terima kasih.',
  },
  {
    id: 'antar-rs',
    image: '/3_(1).webp',
    title: 'Jasa Titip & Info Antar Ke RS dan Lain-lain',
    description: 'Titip beli makanan, barang, kebutuhan pribadi, serta informasi antar ke rumah sakit dan kebutuhan lainnya.',
    label: 'Jasa Titip & Antar',
    message:
      'Halo Admin Dampingcare, saya ingin menggunakan layanan Jasa Titip & Info Antar Ke RS dan Lain-lain. Mohon informasi mengenai prosedur, ketersediaan, biaya jasa, dan ketentuannya. Terima kasih.',
  },
  {
    id: 'antar-jemput',
    image: '/4.png',
    title: 'Jasa & Info Antar Jemput Ke RS dan Lain-lain',
    description: 'Bantuan antar jemput serta informasi transportasi ke rumah sakit dan tujuan lainnya sesuai kebutuhan.',
    label: 'Antar Jemput',
    message:
      'Halo Admin Dampingcare, saya ingin menggunakan layanan Jasa & Info Antar Jemput Ke RS dan Lain-lain. Mohon informasi mengenai ketersediaan, tarif, dan ketentuannya. Terima kasih.',
  },
  {
    id: 'deal-to-pay',
    image: '/7.png',
    title: 'Deal To Pay',
    subtitle: 'Dengan Syarat Tertentu (Normal / Penawaran)',
    description: 'Solusi pembayaran dengan kesepakatan dan persyaratan tertentu sesuai kebutuhan. Silakan hubungi Admin untuk mengetahui detail dan ketentuannya.',
    label: 'Normal / Penawaran',
    message:
      'Halo Admin Dampingcare, saya ingin mengetahui informasi mengenai layanan Deal To Pay dengan syarat tertentu. Mohon penjelasan mengenai ketentuan, proses, dan penawarannya. Terima kasih.',
  },
];

function openWhatsApp(serviceMessage: string) {
  const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(serviceMessage)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function recordClick(service: Service) {
  try {
    await supabase.from('service_clicks').insert({
      service_id: service.id,
      service_title: service.title,
    });
  } catch {
    // silently ignore — click recording is best-effort
  }
}

function ServiceCard({
  service,
  onClick,
}: {
  service: Service;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap-scale group w-full text-left bg-white rounded-3xl p-5 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white overflow-hidden flex items-center justify-center">
          <img src={service.image} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[15px] leading-tight text-gray-900">{service.title}</h3>
          </div>
          {service.subtitle && (
            <p className="text-[12px] font-medium text-gray-500 mt-0.5 leading-tight">{service.subtitle}</p>
          )}
          <p className="text-[13px] text-gray-600 mt-1.5 leading-snug">{service.description}</p>
          <div className="flex items-center justify-between mt-2.5">
            <span className="inline-block text-[11px] font-semibold text-[#F7559D] bg-[#F7559D]/10 px-2.5 py-1 rounded-full">
              {service.label}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
              Klik untuk chat WhatsApp
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function App() {
  function handleServiceClick(service: Service) {
    recordClick(service);
    openWhatsApp(service.message);
  }

  return (
    <div className="min-h-screen bg-[#E4E4FF] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col px-5 pt-10 pb-8 safe-bottom">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/cropped_circle_image_(1).webp"
              alt="Dampingcare"
              className="w-[156px] h-auto object-contain"
            />
          </div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Pilih Layanan Dampingcare</h1>
          <p className="text-[15px] font-medium text-gray-700 mt-1">Mau dibantu apa hari ini?</p>
          <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">
            Pilih layanan yang kamu butuhkan, lalu langsung hubungi Admin Dampingcare melalui WhatsApp.
          </p>
        </header>

        {/* Service cards */}
        <div className="flex flex-col gap-3.5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
