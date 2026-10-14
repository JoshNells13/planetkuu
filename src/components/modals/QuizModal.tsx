import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle2, AlertCircle, Sparkles, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { SOLAR_SYSTEM_QUIZ } from '../../data/quiz';
import { sound } from '../../utils/sound';

export const QuizModal: React.FC = () => {
  const { closePanel, addXP, completeMission, unlockBadge, showAstroMessage, triggerConfetti } = useGame();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = SOLAR_SYSTEM_QUIZ[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctIndex) {
      sound.playQuizCorrect();
      setScore((prev) => prev + 1);
      showAstroMessage('Jawabanmu tepat sekali! Pintar!', 'celebrating');
    } else {
      sound.playQuizWrong();
      showAstroMessage('Belum tepat, tetapi tidak apa-apa! Yuk pelajari petunjuknya.', 'hint');
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < SOLAR_SYSTEM_QUIZ.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished quiz!
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      const earnedXp = finalScore * 25; // 25 XP per correct answer

      addXP(earnedXp, `Menyelesaikan Kuis Tata Surya (Skor ${finalScore}/5)`);

      if (finalScore >= 3) {
        completeMission('mission-5');
        unlockBadge('badge-solar-system-explorer');
        triggerConfetti();
        sound.playSuccess();
        showAstroMessage(`Luar biasa! Skor akhirmu ${finalScore}/5. Kamu resmi menjadi Penjelajah Tata Surya!`, 'celebrating');
      } else {
        showAstroMessage(`Kamu mendapat skor ${finalScore}/5. Teruslah belajar, kamu pasti bisa mendapatkan nilai sempurna!`, 'waving');
      }
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

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
          maxWidth: '640px',
          maxHeight: '90vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0b0e',
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
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(15, 20, 32, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(168, 85, 247, 0.25)',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc',
              }}
            >
              <HelpCircle size={22} />
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
                Tantangan Kuis Galaksi
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>
                Misi 5 — Uji pengetahuan antariksamu dan raih lencana Penjelajah Tata Surya!
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

        {/* Quiz Body */}
        <div style={{ padding: '24px' }}>
          {!quizFinished ? (
            <div>
              {/* Question Index Progress */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#c084fc',
                  }}
                >
                  Pertanyaan {currentIndex + 1} dari {SOLAR_SYSTEM_QUIZ.length}
                </span>

                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#34d399',
                  }}
                >
                  Skor Sementara: {score}
                </span>
              </div>

              {/* Question Text */}
              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '16px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((opt, idx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.04)';
                  let borderCol = 'rgba(255, 255, 255, 0.12)';
                  let textCol = '#f8fafc';

                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      btnBg = 'rgba(16, 185, 129, 0.25)';
                      borderCol = '#10b981';
                      textCol = '#34d399';
                    } else if (selectedOption === idx) {
                      btnBg = 'rgba(239, 68, 68, 0.25)';
                      borderCol = '#ef4444';
                      textCol = '#f87171';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '14px',
                        border: `1.5px solid ${borderCol}`,
                        backgroundColor: btnBg,
                        color: textCol,
                        textAlign: 'left',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <CheckCircle2 size={18} color="#10b981" />
                      )}
                      {isAnswered && selectedOption === idx && idx !== currentQuestion.correctIndex && (
                        <AlertCircle size={18} color="#ef4444" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div style={{ marginTop: '16px' }}>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor:
                        selectedOption === currentQuestion.correctIndex
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(239, 68, 68, 0.15)',
                      border: `1px solid ${
                        selectedOption === currentQuestion.correctIndex ? '#10b981' : '#ef4444'
                      }`,
                      marginBottom: '16px',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#f8fafc', lineHeight: 1.5 }}>
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleNext}
                      className="cosmic-btn"
                      style={{ padding: '10px 22px', fontSize: '14px' }}
                    >
                      <span>
                        {currentIndex + 1 < SOLAR_SYSTEM_QUIZ.length ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  border: '2px solid #fbbf24',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 0 25px rgba(251, 191, 36, 0.25)',
                }}
              >
                <Trophy size={40} color="#fbbf24" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 8px 0',
                }}
              >
                Kuis Selesai!
              </h3>

              <p style={{ fontSize: '15px', color: '#94a3b8', margin: '0 0 20px 0' }}>
                Kamu menjawab <strong style={{ color: '#fbbf24' }}>{score}</strong> dari{' '}
                <strong style={{ color: '#f8fafc' }}>5</strong> pertanyaan dengan tepat!
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  color: '#fbbf24',
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '24px',
                }}
              >
                <Sparkles size={16} />
                <span>Hadiah: +{score * 25} XP Diperoleh!</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  onClick={handleRestart}
                  className="cosmic-btn cosmic-btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '14px' }}
                >
                  <RotateCcw size={15} />
                  <span>Coba Lagi</span>
                </button>

                <button
                  onClick={closePanel}
                  className="cosmic-btn"
                  style={{ padding: '10px 24px', fontSize: '14px' }}
                >
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
