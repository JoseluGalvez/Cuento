import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  Download,
  Heart,
  Lightbulb,
  MapPin,
  Paintbrush,
  Pencil,
  Printer,
  RotateCcw,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

type FormData = {
  name: string;
  age: string;
  appearance: string;
  interests: string;
  companions: string;
  hobbies: string;
  setting: string;
  theme: string;
};

type Story = {
  titulo: string;
  edad_objetivo: number;
  cuento: {
    capitulo_1: string;
    capitulo_2: string;
    capitulo_3: string;
  };
  ejercicios_comprension: Array<{
    tipo: string;
    pregunta?: string;
    opciones?: string[];
    respuesta_correcta?: string;
    pauta_guiada?: string;
    consigna?: string;
  }>;
};

const initialForm: FormData = {
  name: "Lola",
  age: "6",
  appearance: "pelo rizado y una sonrisa enorme",
  interests: "las estrellas y los animales del bosque",
  companions: "Nube, una perrita pequeña",
  hobbies: "dibujar mapas y cantar",
  setting: "un bosque que brilla al anochecer",
  theme: "la confianza en uno mismo",
};

const steps = [
  { label: "Tu protagonista", note: "Quién es y qué le hace especial" },
  { label: "Su mundo", note: "Lo que le gusta y a quién lleva consigo" },
  { label: "La aventura", note: "Dónde ocurre y qué descubrirá" },
];

const themes = ["la confianza en uno mismo", "la empatía", "la paciencia", "la amistad", "gestionar el enojo"];
const settings = ["un bosque que brilla al anochecer", "una isla flotante", "una biblioteca secreta", "un pueblo junto al mar"];

function themePrompt(theme: string) {
  const normalized = theme.toLowerCase();
  if (normalized.includes("empat")) return "ponerse en el lugar de los demás";
  if (normalized.includes("pacien")) return "ir sin prisa y esperar el momento adecuado";
  if (normalized.includes("amist")) return "dejarse ayudar y cuidar a quienes están cerca";
  if (normalized.includes("enojo") || normalized.includes("enfado")) return "respirar antes de responder cuando algo no sale bien";
  return "confiar un poquito más en sus propias ideas";
}

function makeStory(data: FormData): Story {
  const name = data.name.trim() || "tu peque";
  const age = Number(data.age) || 6;
  const companion = data.companions.trim() || "su compañero de aventuras";
  const setting = data.setting.trim() || "un lugar lleno de sorpresas";
  const theme = data.theme.trim() || "la confianza en uno mismo";
  const interest = data.interests.trim() || "mirar el mundo con curiosidad";
  const hobby = data.hobbies.trim() || "inventar nuevas ideas";
  const appearance = data.appearance.trim() || "una mirada llena de curiosidad";
  const lesson = themePrompt(theme);

  return {
    titulo: `${name} y la brújula de las estrellas`,
    edad_objetivo: age,
    cuento: {
      capitulo_1: `En ${setting}, justo cuando el cielo se pintó de violeta, vivía ${name}. Tenía ${appearance} y una manera muy especial de mirar las cosas. Le encantaba ${interest} y pasaba las tardes ${hobby}.\n\nAquella noche, ${name} encontró una brújula diminuta bajo una hoja dorada. No señalaba el norte. ¡Señalaba una estrella!\n\n—¿Adónde nos llevará? —preguntó ${name}.\n—¡Guau, guau! —ladró ${companion}, dando un saltito.\n\nLa brújula brilló: ¡clin, clin, clin! Y una lucecita cayó suavemente frente a sus pies.`,
      capitulo_2: `La lucecita necesitaba volver al cielo, pero el camino estaba lleno de niebla. Para avanzar, ${name} tuvo que escuchar los sonidos pequeñitos, observar con cuidado y recordar lo que sabía hacer mejor: ${hobby}.\n\nA mitad del sendero, la niebla se hizo enorme. El corazón de ${name} comenzó a ir rápido, rápido. El verdadero desafío era ${lesson}.\n\n—No sé si podré —susurró.\n\nEntonces ${companion} apoyó la patita junto a la suya. ${name} respiró despacio. Una vez. Y otra vez. Después, dibujó en el suelo un mapa con tres flechas. La primera flecha decía “mirar”, la segunda “probar” y la tercera “volver a intentar”.\n\nPaso a paso, el bosque respondió: ¡fiuuu!, ¡crac!, ¡plin! La niebla empezó a apartarse.`,
      capitulo_3: `Al final del sendero había una colina redonda como una almohada. Desde allí, ${name} levantó la brújula y siguió la luz. No necesitó ser la persona más rápida ni saberlo todo. Solo necesitó recordar que también podía ${lesson}.\n\nLa estrella subió, subió y subió. ¡Pum! Se acomodó en el cielo y encendió una nueva constelación con forma de corazón.\n\n—Lo hice —dijo ${name}, con los ojos brillantes.\n\n${companion} movió la cola. El bosque entero pareció aplaudir. Desde aquella noche, cada vez que ${name} encontraba un reto, miraba hacia arriba y recordaba algo importante: aprender sobre ${theme} podía empezar con un paso muy pequeño. A veces sonaba bajito, como una brújula que decía: “clin, clin, vuelve a intentarlo”.`,
    },
    ejercicios_comprension: [
      {
        tipo: "Literal",
        pregunta: `¿Qué encontró ${name} bajo una hoja dorada?`,
        opciones: ["Una brújula diminuta", "Una corona de flores", "Un libro azul"],
        respuesta_correcta: "Una brújula diminuta",
      },
      {
        tipo: "Literal",
        pregunta: `¿Quién acompañó a ${name} durante el camino?`,
        opciones: [companion, "Una familia de búhos", "Un dragón verde"],
        respuesta_correcta: companion,
      },
      {
        tipo: "Literal",
        pregunta: "¿Qué dibujó el protagonista para cruzar la niebla?",
        opciones: ["Un mapa con tres flechas", "Una casa con ventanas", "Una nube de colores"],
        respuesta_correcta: "Un mapa con tres flechas",
      },
      {
        tipo: "Inferencial / emocional",
        pregunta: `¿Cómo se sintió ${name} cuando la niebla creció? ¿Qué le ayudó a seguir?`,
        pauta_guiada: `Puedes hablar de la duda y de cómo ${name} respiró, recordó sus habilidades y aceptó la ayuda de ${companion}. También podéis comentar qué significa ${theme} en vuestra vida.`,
      },
      {
        tipo: "Actividad creativa",
        consigna: `Dibuja tu propia brújula mágica. En sus tres flechas escribe tres cosas que puedes hacer cuando quieras practicar ${theme}.`,
      },
    ],
  };
}

function Field({ label, hint, value, onChange, placeholder, type = "text" }: { label: string; hint?: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {hint && <span className="field-hint">{hint}</span>}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function StepIcon({ index }: { index: number }) {
  return index === 0 ? <UserRound size={17} /> : index === 1 ? <Heart size={17} /> : <Sparkles size={17} />;
}

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const [story, setStory] = useState<Story | null>(null);
  const [readingChapter, setReadingChapter] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const update = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const progress = story ? 100 : ((step + 1) / steps.length) * 100;
  const chapters = useMemo(() => story ? [story.cuento.capitulo_1, story.cuento.capitulo_2, story.cuento.capitulo_3] : [], [story]);

  const createStory = () => {
    setIsCreating(true);
    window.setTimeout(() => {
      setStory(makeStory(form));
      setReadingChapter(0);
      setAnswers({});
      setIsCreating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  const reset = () => {
    setStory(null);
    setStep(0);
    setReadingChapter(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editStory = () => {
    setStory(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const printStory = () => window.print();

  const downloadJson = () => {
    if (!story) return;
    const blob = new Blob([JSON.stringify(story, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${story.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (story) {
    return (
      <div className="app-shell reader-shell">
        <Header onReset={reset} compact />
        <main className="reader-layout">
          <aside className="reader-aside">
            <div className="eyebrow">Tu cuento está listo</div>
            <div className="reader-title-block">
              <span className="story-sticker"><Star size={13} fill="currentColor" /> hecho para {form.name}</span>
              <h1>{story.titulo}</h1>
              <p>Una aventura sobre {form.theme || "crecer por dentro"}.</p>
            </div>
            <div className="chapter-nav" aria-label="Capítulos">
              {chapters.map((_, index) => (
                <button key={index} className={readingChapter === index ? "active" : ""} onClick={() => setReadingChapter(index)}>
                  <span className="chapter-number">0{index + 1}</span>
                  <span>
                    <strong>{["La lucecita", "La niebla", "La estrella"][index]}</strong>
                    <small>{["Donde todo comienza", "Un paso valiente", "El gran descubrimiento"][index]}</small>
                  </span>
                  {readingChapter > index && <Check size={15} className="chapter-check" />}
                </button>
              ))}
            </div>
            <div className="reader-actions">
              <button className="subtle-button" onClick={editStory}><Pencil size={15} /> Editar detalles</button>
              <button className="subtle-button" onClick={printStory}><Printer size={15} /> Imprimir cuento</button>
              <button className="subtle-button" onClick={downloadJson}><Download size={15} /> Guardar JSON</button>
            </div>
          </aside>

          <section className="reading-column">
            <div className="reading-topline"><span>Capítulo 0{readingChapter + 1} de 03</span><span>{Math.round(((readingChapter + 1) / 3) * 100)}% leído</span></div>
            <div className="reading-progress"><span style={{ width: `${((readingChapter + 1) / 3) * 100}%` }} /></div>
            <article className="story-page">
              <div className="chapter-kicker"><BookOpen size={16} /> Capítulo 0{readingChapter + 1}</div>
              <h2>{["La lucecita", "La niebla", "La estrella"][readingChapter]}</h2>
              <div className="chapter-ornament"><span /><Sparkles size={15} /><span /></div>
              {chapters[readingChapter].split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              <div className="chapter-controls">
                <button className="outline-button" onClick={() => setReadingChapter((current) => Math.max(0, current - 1))} disabled={readingChapter === 0}><ArrowLeft size={16} /> Anterior</button>
                {readingChapter < 2 ? <button className="primary-button" onClick={() => setReadingChapter((current) => current + 1)}>Siguiente capítulo <ArrowRight size={16} /></button> : <button className="primary-button" onClick={() => document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" })}>Ir a las actividades <ArrowRight size={16} /></button>}
              </div>
            </article>

            <section className="activities-section" id="activities">
              <div className="section-heading">
                <div><div className="eyebrow">Para conversar juntos</div><h2>Pequeñas preguntas, grandes descubrimientos</h2></div>
                <span className="activity-badge"><Lightbulb size={15} /> 5 actividades</span>
              </div>
              <div className="activity-grid">
                {story.ejercicios_comprension.map((exercise, index) => (
                  <div className={`activity-card activity-${exercise.tipo.startsWith("Literal") ? "literal" : exercise.tipo.startsWith("Inferencial") ? "emotion" : "creative"}`} key={index}>
                    <div className="activity-card-top"><span className="activity-type">{exercise.tipo}</span><span className="activity-index">0{index + 1}</span></div>
                    {exercise.pregunta && <h3>{exercise.pregunta}</h3>}
                    {exercise.opciones && <div className="answer-options">{exercise.opciones.map((option) => <button key={option} onClick={() => setAnswers((current) => ({ ...current, [index]: option }))} className={answers[index] === option ? (option === exercise.respuesta_correcta ? "correct" : "selected") : ""}>{option}{answers[index] === option && option === exercise.respuesta_correcta && <Check size={14} />}</button>)}</div>}
                    {exercise.pauta_guiada && <div className="guide-note"><CircleHelp size={16} /><span>{exercise.pauta_guiada}</span></div>}
                    {exercise.consigna && <div className="creative-note"><Paintbrush size={18} /><span>{exercise.consigna}</span></div>}
                  </div>
                ))}
              </div>
            </section>
            <div className="reader-footer"><span><Heart size={14} fill="currentColor" /> Creado con cariño en CuentaCrece</span><button onClick={reset}><RotateCcw size={14} /> Crear otro cuento</button></div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header onReset={reset} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Un ratito para imaginar juntos</div>
            <h1>El cuento donde<br /><em>tu peque</em> brilla.</h1>
            <p>Personaliza una aventura única con sus gustos, sus personas favoritas y eso que está aprendiendo a descubrir.</p>
            <div className="hero-meta"><span><Check size={15} /> 3 capítulos mágicos</span><span><Check size={15} /> Actividades para conversar</span></div>
          </div>
          <div className="hero-illustration" aria-hidden="true">
            <div className="sun-glow" /><div className="moon-shape" /><div className="mountain mountain-back" /><div className="mountain mountain-front" />
            <div className="hero-star star-one"><Star size={18} fill="currentColor" /></div><div className="hero-star star-two"><Star size={11} fill="currentColor" /></div><div className="hero-star star-three"><Sparkles size={16} /></div>
            <div className="story-character"><div className="character-head"><span className="character-hair" /><span className="character-eye eye-left" /><span className="character-eye eye-right" /><span className="character-smile" /></div><div className="character-body" /></div>
            <div className="illustration-caption"><BookOpen size={15} /> aquí empieza una historia muy tuya</div>
          </div>
        </section>

        <section className="builder-section" id="builder">
          <div className="builder-intro"><div className="eyebrow">Paso {step + 1} de 3</div><h2>Vamos a darle forma<br />a su aventura.</h2><p>Solo necesitas unas pocas pistas. El resto lo pone la imaginación.</p></div>
          <div className="builder-layout">
            <aside className="stepper" aria-label="Pasos del cuento">
              <div className="stepper-line"><span style={{ height: `${(step / 2) * 100}%` }} /></div>
              {steps.map((item, index) => <button className={`step-item ${step === index ? "active" : ""} ${step > index ? "done" : ""}`} key={item.label} onClick={() => setStep(index)}><span className="step-icon">{step > index ? <Check size={16} /> : <StepIcon index={index} />}</span><span><strong>{item.label}</strong><small>{item.note}</small></span></button>)}
              <div className="tip-card"><Lightbulb size={17} /><p><strong>Tip de CuentaCrece</strong><br />No hay respuestas correctas. Los detalles pequeños hacen las historias enormes.</p></div>
            </aside>

            <div className="form-panel">
              {step === 0 && <div className="step-content"><div className="form-heading"><span className="form-icon coral"><UserRound size={21} /></span><div><h3>Empecemos por quien hace especial el cuento</h3><p>El protagonista siempre será el héroe o la heroína de esta historia.</p></div></div><div className="form-grid"><Field label="¿Cómo se llama?" hint="Su nombre aparecerá en el cuento" value={form.name} onChange={(value) => update("name", value)} placeholder="Ej. Martina" /><Field label="¿Cuántos años tiene?" value={form.age} onChange={(value) => update("age", value)} placeholder="6" type="number" /><Field label="¿Cómo es físicamente?" hint="Un detalle que le haga reconocible" value={form.appearance} onChange={(value) => update("appearance", value)} placeholder="Ej. pecas y pelo rizado" /><Field label="¿Qué le gusta?" hint="Sus intereses llenarán la aventura de pistas" value={form.interests} onChange={(value) => update("interests", value)} placeholder="Ej. los dinosaurios y la luna" /></div></div>}
              {step === 1 && <div className="step-content"><div className="form-heading"><span className="form-icon lavender"><Heart size={21} /></span><div><h3>Ahora, abramos la puerta a su mundo</h3><p>Sus compañeros y aficiones pueden ser la clave para resolver el desafío.</p></div></div><div className="form-grid"><Field label="¿Quién le acompañará?" hint="Nombre y tipo de mascota o compañero" value={form.companions} onChange={(value) => update("companions", value)} placeholder="Ej. Coco, un gato curioso" /><Field label="¿Qué le encanta hacer?" hint="Una afición o talento especial" value={form.hobbies} onChange={(value) => update("hobbies", value)} placeholder="Ej. construir cosas" /></div><div className="quick-picks"><span>Ideas rápidas</span>{["una mascota valiente", "su mejor amigo", "un abuelo aventurero"].map((idea) => <button key={idea} onClick={() => update("companions", idea)}>{idea}</button>)}</div></div>}
              {step === 2 && <div className="step-content"><div className="form-heading"><span className="form-icon yellow"><Sparkles size={21} /></span><div><h3>Elige el lugar y lo que aprenderá</h3><p>Un buen cuento deja una pregunta encendida mucho después del final.</p></div></div><div className="form-grid"><Field label="¿Dónde sucede la aventura?" hint="Escribe un lugar o elige una idea" value={form.setting} onChange={(value) => update("setting", value)} placeholder="Ej. un faro en una isla flotante" /><Field label="¿Qué tema quieres acompañar?" hint="Se convertirá en decisiones dentro del cuento" value={form.theme} onChange={(value) => update("theme", value)} placeholder="Ej. aprender a tener paciencia" /></div><div className="quick-picks"><span>Ideas rápidas</span>{settings.slice(0, 3).map((option) => <button key={option} onClick={() => update("setting", option)}>{option}</button>)}{themes.slice(0, 3).map((option) => <button key={option} onClick={() => update("theme", option)}>{option}</button>)}</div><div className="custom-note"><Pencil size={15} /><span>Cuanto más tuyo sea el detalle, más tuya se sentirá la aventura.</span></div></div>}
              <div className="form-actions">{step > 0 ? <button className="outline-button" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={16} /> Atrás</button> : <span />}{step < 2 ? <button className="primary-button" onClick={() => setStep((current) => current + 1)}>Siguiente paso <ArrowRight size={16} /></button> : <button className="primary-button create-button" onClick={createStory} disabled={isCreating}>{isCreating ? <><span className="button-loader" /> Escribiendo tu aventura...</> : <><Sparkles size={17} /> Escribir mi cuento</>}</button>}</div>
            </div>
          </div>
        </section>
        <footer className="site-footer"><span>CuentaCrece <span className="dot">·</span> cuentos que crecen contigo</span><span>Hecho para leer despacio y conversar mucho</span></footer>
      </main>
    </div>
  );
}

function Header({ onReset, compact = false }: { onReset: () => void; compact?: boolean }) {
  return <header className={`site-header ${compact ? "compact" : ""}`}><button className="brand" onClick={onReset} aria-label="Volver al inicio"><span className="brand-mark"><Star size={18} fill="currentColor" /></span><span>Cuenta<strong>Crece</strong></span></button><div className="header-note"><span className="header-heart"><Heart size={14} fill="currentColor" /></span> Hecho para momentos que se quedan</div></header>;
}
