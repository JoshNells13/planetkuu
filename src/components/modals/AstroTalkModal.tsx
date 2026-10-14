import React, { useState } from 'react';
import { X, Sparkles, Send, Compass } from 'lucide-react';
import { AstroMascot } from '../mascot/AstroMascot';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/sound';

interface FAQ {
  q: string;
  a: string;
}

const ASTRO_FAQS: FAQ[] = [
  {
    q: 'Kenapa luar angkasa sangat gelap padahal ada Matahari?',
    a: 'Pertanyaan hebat! Di Bumi, langit kita biru dan terang karena ada atmosfer tebal yang menghamburkan cahaya Matahari ke segala arah. Di luar angkasa hampa udara, tidak ada partikel atmosfer yang menghamburkan cahaya, sehingga sekelilingnya tampak gelap gulita bertabur bintang!',
  },
  {
    q: 'Mengapa Pluto tidak lagi disebut sebagai planet utama?',
    a: 'Pada tahun 2006, para astronom internasional menetapkan bahwa sebuah planet sejati harus mampu "membersihkan lingkungan orbitnya" dari benda-benda lain. Karena Pluto berbagi orbit dengan banyak batuan es di Sabuk Kuiper, Pluto kini digolongkan sebagai Planet Kerdil (Dwarf Planet).',
  },
  {
    q: 'Berapa lama waktu yang dibutuhkan roket untuk pergi ke planet Mars?',
    a: 'Dengan teknologi roket pendorong saat ini, perjalanan dari Bumi menuju Mars membutuhkan waktu sekitar 7 hingga 9 bulan, tergantung pada posisi kedua planet saat peluncuran.',
  },
  {
    q: 'Apakah cincin planet Saturnus padat seperti jalan raya?',
    a: 'Tidak! Dari kejauhan memang tampak padat seperti kaset CD, tetapi jika kamu mendekat, cincin itu terdiri dari miliaran kepingan es air murni dan batuan, dari yang sekecil debu hingga sebesar rumah bertingkat!',
  },
  {
    q: 'Bagaimana cara terbaik menjadi astronot cilik?',
    a: 'Kuncinya adalah rajin belajar sains dan matematika, suka berolahraga agar tubuh bugar dan sehat, selalu ingin tahu, dan tidak mudah menyerah saat menghadapi tantangan!',
  },
];

export const AstroTalkModal: React.FC = () => {
  const { closePanel, showAstroMessage, startGuidedTour } = useGame();
  const [selectedFaq, setSelectedFaq] = useState<FAQ>(ASTRO_FAQS[0]);

  const handleSelectFaq = (faq: FAQ) => {
    sound.playClick();
    setSelectedFaq(faq);
    showAstroMessage(faq.a.slice(0, 100) + '...', 'explaining');
  };

  const handleStartTourFromTalk = () => {
    closePanel();
    startGuidedTour();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePanel();
      }}
    >
      <div
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0b0e',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(251, 191, 36, 0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.12) 0%, rgba(10, 11, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px' }}>
              <AstroMascot mood="happy" size={38} isFloating={false} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Tanya Astro — Sahabat Antariksa
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Ada rahasia antariksa yang membuatmu penasaran? Tanyakan pada Astro!
              </p>
            </div>
          </div>

          <button
            onClick={closePanel}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Astro Answer Speech Bubble */}
          <div
            style={{
              padding: '20px',
              borderRadius: '20px',
              backgroundColor: 'rgba(18, 20, 26, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#fbbf24' }}>
              <Sparkles size={16} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700 }}>
                Astro Menjawab:
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#ffffff', margin: '0 0 10px 0' }}>
              "{selectedFaq.q}"
            </h3>

            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.6, color: '#f1f5f9' }}>
              {selectedFaq.a}
            </p>
          </div>

          {/* Guided Tour Prompt Banner */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fbbf24',
                }}
              >
                <Compass size={20} />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>
                  Ajak Berkeliling Bersama Astro
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  Astro akan membimbingmu menjelajahi seisi tata surya secara langsung!
                </div>
              </div>
            </div>

            <button
              onClick={handleStartTourFromTalk}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: '#fbbf24',
                color: '#000000',
                border: 'none',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Mulai Tur
            </button>
          </div>

          {/* FAQ Prompts */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#94a3b8', marginBottom: '10px' }}>
              Pilih Pertanyaan Lainnya:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ASTRO_FAQS.map((faq, idx) => {
                const isActive = selectedFaq.q === faq.q;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectFaq(faq)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: isActive ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? '#ffffff' : '#e2e8f0',
                      textAlign: 'left',
                      fontFamily: 'var(--font-display)',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{faq.q}</span>
                    <Send size={14} style={{ opacity: isActive ? 1 : 0.4 }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
