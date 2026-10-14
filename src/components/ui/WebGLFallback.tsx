import React from 'react';
import { AlertTriangle, BookOpen } from 'lucide-react';
import { PLANETS_DATA } from '../../data/planets';

interface WebGLFallbackProps {
  onRetry?: () => void;
  onOpenEncyclopedia?: () => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ onRetry, onOpenEncyclopedia }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#030712',
        color: '#ffffff',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <AlertTriangle size={36} color="#ef4444" />
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 10px 0' }}>
        Akselerasi 3D (WebGL) Tidak Tersedia
      </h2>

      <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '480px', lineHeight: 1.6, margin: '0 0 24px 0' }}>
        Peramban atau perangkatmu belum mengaktifkan fitur grafis 3D WebGL. Kamu tetap dapat menikmati seluruh materi sains tata surya dan misi melalui mode ensiklopedia!
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <button onClick={onRetry} className="cosmic-btn cosmic-btn-secondary" style={{ padding: '10px 20px' }}>
            <span>Coba Muat Ulang</span>
          </button>
        )}

        {onOpenEncyclopedia && (
          <button onClick={onOpenEncyclopedia} className="cosmic-btn" style={{ padding: '10px 24px' }}>
            <BookOpen size={16} />
            <span>Buka Ensiklopedia Planet</span>
          </button>
        )}
      </div>

      {/* 2D Fallback Planet Grid */}
      <div
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {PLANETS_DATA.map((p) => (
          <div
            key={p.id}
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: p.color,
                margin: '0 auto 8px auto',
              }}
            />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700 }}>
              {p.indonesianName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
