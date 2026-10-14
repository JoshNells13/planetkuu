import React, { useState } from 'react';
import { X, BookOpen, ArrowRightLeft, Compass } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { PLANETS_DATA } from '../../data/planets';
import type { PlanetData } from '../../types/astronomy';
import { sound } from '../../utils/sound';

export const EncyclopediaModal: React.FC = () => {
  const { closePanel, selectPlanet } = useGame();

  const [mode, setMode] = useState<'catalog' | 'compare'>('catalog');
  const [selectedItem, setSelectedItem] = useState<PlanetData>(PLANETS_DATA[2]); // Default Earth

  // Comparison state
  const [planetA, setPlanetA] = useState<PlanetData>(PLANETS_DATA[2]); // Earth
  const [planetB, setPlanetB] = useState<PlanetData>(PLANETS_DATA[4]); // Jupiter

  return (
    <div
      className="modal-backdrop-mobile"
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
        className="glass-panel-glow modal-container-mobile"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 10, 14, 0.98) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <BookOpen size={22} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Ensiklopedia Antariksa
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Pelajari karakteristik setiap benda langit dan bandingkan planet secara berdampingan.
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

        {/* Tab switch */}
        <div
          style={{
            display: 'flex',
            padding: '10px 24px',
            backgroundColor: 'rgba(8, 9, 12, 0.8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '10px',
          }}
        >
          <button
            onClick={() => { sound.playTabSwitch(); setMode('catalog'); }}
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              border: 'none',
              background: mode === 'catalog' ? '#ffffff' : 'transparent',
              color: mode === 'catalog' ? '#000000' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <BookOpen size={14} />
            <span>Katalog Planet</span>
          </button>

          <button
            onClick={() => { sound.playTabSwitch(); setMode('compare'); }}
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              border: 'none',
              background: mode === 'compare' ? '#ffffff' : 'transparent',
              color: mode === 'compare' ? '#000000' : '#94a3b8',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowRightLeft size={14} />
            <span>Bandingkan 2 Planet</span>
          </button>
        </div>

        {/* Body content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {mode === 'catalog' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
              {/* Left Planet List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {PLANETS_DATA.map((p) => {
                  const isSelected = selectedItem.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => { sound.playPlanetSelect(); setSelectedItem(p); }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSelected ? '#ffffff' : '#94a3b8',
                        fontFamily: 'var(--font-display)',
                        fontSize: '14px',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: p.color,
                          flexShrink: 0,
                        }}
                      />
                      <span>{p.indonesianName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Planet Detail Preview */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0,
                      }}
                    >
                      {selectedItem.indonesianName} ({selectedItem.name})
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#fbbf24', fontSize: '13.5px', fontWeight: 600 }}>
                      {selectedItem.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      closePanel();
                      selectPlanet(selectedItem);
                    }}
                    className="cosmic-btn"
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                  >
                    <Compass size={14} />
                    <span>Periksa di 3D</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Diameter</div>
                    <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{selectedItem.scientificData.diameterKm}</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Jarak dari Matahari</div>
                    <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{selectedItem.scientificData.distanceFromSunKm}</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Suhu Permukaan</div>
                    <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{selectedItem.scientificData.surfaceTemperature}</div>
                  </div>
                  <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Jumlah Satelit</div>
                    <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{selectedItem.scientificData.moonsCount} Bulan</div>
                  </div>
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#ffffff', marginBottom: '8px' }}>
                  Fakta Menarik:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '13.5px', lineHeight: 1.6 }}>
                  {selectedItem.funFacts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {/* Planet Comparison Tool */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Select Planet A */}
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                    Planet Pertama:
                  </label>
                  <select
                    value={planetA.id}
                    onChange={(e) => {
                      const p = PLANETS_DATA.find((x) => x.id === e.target.value);
                      if (p) setPlanetA(p);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(15, 20, 32, 0.95)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  >
                    {PLANETS_DATA.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.indonesianName} ({p.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Planet B */}
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                    Planet Kedua:
                  </label>
                  <select
                    value={planetB.id}
                    onChange={(e) => {
                      const p = PLANETS_DATA.find((x) => x.id === e.target.value);
                      if (p) setPlanetB(p);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(15, 20, 32, 0.95)',
                      border: '1.5px solid #f59e0b',
                      color: '#ffffff',
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  >
                    {PLANETS_DATA.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.indonesianName} ({p.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Table */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                      <th style={{ padding: '12px 16px', color: '#94a3b8', width: '30%' }}>Parameter Sains</th>
                      <th style={{ padding: '12px 16px', color: '#fbbf24', fontWeight: 800, width: '35%' }}>
                        {planetA.indonesianName}
                      </th>
                      <th style={{ padding: '12px 16px', color: '#fbbf24', fontWeight: 800, width: '35%' }}>
                        {planetB.indonesianName}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Tipe Planet', planetA.type.replace('_', ' ').toUpperCase(), planetB.type.replace('_', ' ').toUpperCase()],
                      ['Diameter', planetA.scientificData.diameterKm, planetB.scientificData.diameterKm],
                      ['Jarak ke Matahari', planetA.scientificData.distanceFromSunKm, planetB.scientificData.distanceFromSunKm],
                      ['Gravitasi', planetA.scientificData.gravity, planetB.scientificData.gravity],
                      ['Suhu', planetA.scientificData.surfaceTemperature, planetB.scientificData.surfaceTemperature],
                      ['Lama 1 Hari', planetA.scientificData.dayLength, planetB.scientificData.dayLength],
                      ['Lama 1 Tahun', planetA.scientificData.yearLength, planetB.scientificData.yearLength],
                      ['Jumlah Bulan', `${planetA.scientificData.moonsCount} satelit`, `${planetB.scientificData.moonsCount} satelit`],
                      ['Cincin Planet', planetA.hasRings ? 'Ada' : 'Tidak Ada', planetB.hasRings ? 'Ada' : 'Tidak Ada'],
                    ].map(([label, valA, valB], i) => (
                      <tr
                        key={i}
                        style={{
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{label}</td>
                        <td style={{ padding: '12px 16px', color: '#f8fafc', fontWeight: 600 }}>{valA}</td>
                        <td style={{ padding: '12px 16px', color: '#f8fafc', fontWeight: 600 }}>{valB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
