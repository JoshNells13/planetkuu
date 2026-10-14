import React, { useState } from 'react';
import { X, Navigation, Eye } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CELESTIAL_GUIDE_ITEMS, type GuideItem } from '../../data/guide';
import { PLANETS_DATA } from '../../data/planets';
import { sound } from '../../utils/sound';
import { getCelestialPosition } from '../../utils/celestialRegistry';

export const CelestialGuideModal: React.FC = () => {
  const {
    closePanel,
    flyCameraTo,
    selectPlanet,
    openPanel,
    showAstroMessage,
  } = useGame();

  const [filter, setFilter] = useState<'all' | 'planet' | 'human_tech' | 'comet_belt'>('all');

  const filteredItems = CELESTIAL_GUIDE_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'planet') return item.category === 'planet';
    if (filter === 'human_tech') return item.category === 'human_tech';
    if (filter === 'comet_belt') return item.category === 'comet_belt' || item.category === 'dwarf_planet';
    return true;
  });

  const handleFocusItem = (item: GuideItem) => {
    sound.playTourStep();

    const entityId =
      item.relatedPlanetId ||
      (item.id === 'guide-sun'
        ? 'sun'
        : item.id === 'guide-iss'
        ? 'iss'
        : item.id === 'guide-moon'
        ? 'moon'
        : item.id === 'guide-comet'
        ? 'comet'
        : item.id === 'guide-jwst'
        ? 'jwst'
        : item.id === 'guide-voyager'
        ? 'voyager'
        : item.id === 'guide-pluto'
        ? 'pluto'
        : item.id === 'guide-asteroids'
        ? 'asteroids'
        : undefined);

    const livePos = (entityId ? getCelestialPosition(entityId) : null) || {
      x: item.targetPosition[0],
      y: item.targetPosition[1],
      z: item.targetPosition[2],
    };

    // Fly camera directly to target with live tracking lock
    flyCameraTo([livePos.x, livePos.y, livePos.z], item.camOffset, entityId);

    // Contextual Astro voice
    if (item.relatedPlanetId) {
      const planet = PLANETS_DATA.find((p) => p.id === item.relatedPlanetId);
      showAstroMessage(`Mengarahkan teropong ke ${planet ? planet.indonesianName : item.name}! ${item.quickFact}`, 'explaining');
    } else {
      showAstroMessage(`Mengarahkan teropong ke ${item.name}! ${item.quickFact}`, 'explaining');
    }
    closePanel();
  };

  const handleInspectDetails = (item: GuideItem) => {
    sound.playClick();
    if (item.relatedPlanetId) {
      const planet = PLANETS_DATA.find((p) => p.id === item.relatedPlanetId);
      if (planet) {
        selectPlanet(planet);
        return;
      }
    }

    if (item.specialPanelId) {
      openPanel(item.specialPanelId);
    }
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
        padding: '16px',
        backgroundColor: 'rgba(3, 7, 18, 0.85)',
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
          maxWidth: '820px',
          maxHeight: '92vh',
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
            padding: '18px 24px',
            borderBottom: '1px solid var(--space-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 20, 32, 0.9) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Navigation size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '21px',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Pemandu Navigasi Tata Surya (Guide)
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  16 Destinasi Kosmik
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Pilih objek apa saja di bawah ini untuk mengarahkan kamera langsung ke tujuannya!
              </p>
            </div>
          </div>

          <button
            onClick={closePanel}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
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

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            padding: '8px 24px',
            backgroundColor: 'rgba(8, 12, 22, 0.8)',
            borderBottom: '1px solid var(--space-border)',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'all', label: 'Semua Objek (16)' },
            { id: 'planet', label: '8 Planet Utama' },
            { id: 'human_tech', label: 'Teknologi Manusia' },
            { id: 'comet_belt', label: 'Komet & Kerdil' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playTabSwitch();
                setFilter(tab.id as typeof filter);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: filter === tab.id ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: filter === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: filter === tab.id ? '#ffffff' : '#94a3b8',
                fontFamily: 'var(--font-display)',
                fontSize: '12.5px',
                fontWeight: filter === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Guide Grid List */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '14px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                transition: 'all 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#f8fafc',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {item.quickFact}
                </p>

                <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '6px', fontWeight: 600 }}>
                  Jarak: {item.distanceFromSun}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <button
                  onClick={() => handleFocusItem(item)}
                  className="cosmic-btn"
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    fontSize: '11.5px',
                    background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                  }}
                  title="Arahkan kamera 3D ke objek ini"
                >
                  <Eye size={13} />
                  <span>Arahkan</span>
                </button>

                {(item.relatedPlanetId || item.specialPanelId) && (
                  <button
                    onClick={() => handleInspectDetails(item)}
                    className="cosmic-btn cosmic-btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '11.5px' }}
                    title="Buka data sains lengkap"
                  >
                    <span>Detail</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
