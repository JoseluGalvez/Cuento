import { ArrowLeft, ArrowRight, BookOpen, Check, CircleHelp, Download, Pause, Play, Printer, RotateCcw, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./StoryReader.css";

export type StoryReaderData = {
  titulo: string;
  edad_objetivo: number;
  cuento: string[];
  ejercicios_comprension: Array<{
    tipo: string;
    pregunta?: string;
    opciones?: string[];
    respuesta_correcta?: string;
    pauta_guiada?: string;
    consigna?: string;
  }>;
};

type StoryReaderProps = {
  storyData: StoryReaderData;
  formName: string;
  theme: string;
  onEdit: () => void;
  onReset: () => void;
  onPrint: () => void;
  onDownload: () => void;
};

const chapterTitles = [
  { title: "La brújula escondida", subtitle: "Donde todo comienza" },
  { title: "La primera pista", subtitle: "Una señal entre las hojas" },
  { title: "El puente de los susurros", subtitle: "Escuchar para avanzar" },
  { title: "La montaña de niebla", subtitle: "Un reto enorme" },
  { title: "El jardín de los intentos", subtitle: "Probar, parar y volver" },
  { title: "El mapa que cambia", subtitle: "Una decisión valiente" },
  { title: "La colina de estrellas", subtitle: "La luz más esperada" },
  { title: "Una luz para volver", subtitle: "Lo aprendido se queda" },
] as const;

const chapterNumber = (index: number) => String(index + 1).padStart(2, "0");

export default function StoryReader({ storyData, formName, theme, onEdit, onReset, onPrint, onDownload }: StoryReaderProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const chapters = useMemo(() => storyData.cuento.map((text, index) => ({ ...chapterTitles[index], text })), [storyData.cuento]);
  const totalPages = chapters.length + 1;
  const isExercisesPage = currentChapter >= chapters.length;
  const progress = isExercisesPage ? 100 : ((currentChapter + 1) / chapters.length) * 100;

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
  }, [currentChapter]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const toggleAudio = () => {
    if (!window.speechSynthesis) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    const text = isExercisesPage ? "Estas son las actividades para conversar juntos." : chapters[currentChapter].text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const goToPage = (page: number) => {
    setCurrentChapter(Math.max(0, Math.min(chapters.length, page)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="reader-container story-reader">
      <header className="reader-toolbar">
        <button className="btn-icon" onClick={onReset} aria-label="Volver al inicio"><ArrowLeft size={16} /> Volver</button>
        <div className="toolbar-center"><span className="story-title">{storyData.titulo}</span></div>
        <div className="toolbar-controls">
          <button className="font-control" onClick={() => setFontSize((current) => current === "large" ? "medium" : current === "medium" ? "large" : "medium")} aria-label="Cambiar tamaño de texto">A<sup>+</sup></button>
          <button className="audio-control" onClick={toggleAudio} aria-pressed={isPlayingAudio}>{isPlayingAudio ? <><Pause size={14} /> Pausar narración</> : <><Play size={14} /> Escuchar</>}</button>
        </div>
      </header>

      <main className="reader-body">
        {!isExercisesPage ? (
          <div className={`chapter-view font-${fontSize}`}>
            <div className="chapter-media" aria-label={`Ilustración del capítulo ${chapterNumber(currentChapter)}`}>
              <div className="chapter-art-glow" />
              <Star className="chapter-art-star" size={38} fill="currentColor" />
              <span className="chapter-art-number">{chapterNumber(currentChapter)}</span>
              <span className="chapter-art-caption">{chapters[currentChapter].subtitle}</span>
            </div>
            <div className="chapter-text-container">
              <div className="chapter-kicker"><BookOpen size={15} /> Capítulo {chapterNumber(currentChapter)} de {chapterNumber(chapters.length - 1)}</div>
              <h2>{chapters[currentChapter].title}</h2>
              <div className="chapter-ornament"><span /><Sparkles size={15} /><span /></div>
              {chapters[currentChapter].text.split("\n\n").map((paragraph, index) => <p className="chapter-paragraph" key={index}>{paragraph}</p>)}
            </div>
          </div>
        ) : (
          <div className="exercises-view">
            <div className="chapter-kicker"><BookOpen size={15} /> Cierre del cuento</div>
            <h2><span aria-hidden="true">🧩</span> Ejercicios de comprensión</h2>
            <p className="exercises-intro">Para conversar juntos sobre lo que descubrieron {formName} y su compañero de aventura.</p>
            {storyData.ejercicios_comprension.map((exercise, index) => (
              <div key={index} className={`exercise-card exercise-${exercise.tipo.startsWith("Literal") ? "literal" : exercise.tipo.startsWith("Inferencial") ? "emotion" : "creative"}`}>
                <div className="exercise-topline"><span className="badge">{exercise.tipo}</span><span className="exercise-index">{chapterNumber(index)}</span></div>
                <p className="exercise-question">{exercise.pregunta || exercise.consigna}</p>
                {exercise.opciones && <div className="options-grid">{exercise.opciones.map((option) => <button key={option} className={`btn-option ${answers[index] === option ? (option === exercise.respuesta_correcta ? "correct" : "selected") : ""}`} onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}>{option}{answers[index] === option && option === exercise.respuesta_correcta && <Check size={15} />}</button>)}</div>}
                {exercise.pauta_guiada && <div className="exercise-note"><CircleHelp size={16} /><span>{exercise.pauta_guiada}</span></div>}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="reader-pagination">
        <button disabled={currentChapter === 0} onClick={() => goToPage(currentChapter - 1)} className="btn-page"><ArrowLeft size={15} /> Anterior</button>
        <div className="page-indicator"><span>Página {currentChapter + 1} de {totalPages}</span><div className="page-progress"><span style={{ width: `${progress}%` }} /></div></div>
        <button disabled={isExercisesPage} onClick={() => goToPage(currentChapter + 1)} className="btn-page btn-next">{currentChapter === chapters.length - 1 ? <>Ver ejercicios <ArrowRight size={15} /></> : <>Siguiente <ArrowRight size={15} /></>}</button>
      </footer>

      <div className="reader-quick-actions">
        <button onClick={onEdit}><span aria-hidden="true">✎</span> Editar detalles</button>
        <button onClick={onPrint}><Printer size={14} /> Imprimir</button>
        <button onClick={onDownload}><Download size={14} /> Guardar JSON</button>
        <button onClick={onReset}><RotateCcw size={14} /> Crear otro cuento</button>
      </div>
      <p className="reader-theme-note">Una aventura sobre {theme || "crecer por dentro"} · hecha para {formName}</p>
    </div>
  );
}
