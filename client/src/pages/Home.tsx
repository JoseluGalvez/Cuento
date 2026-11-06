import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  Lightbulb,
  Pencil,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import StoryReader, { type StoryReaderData } from "@/components/StoryReader";

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

type Story = StoryReaderData;

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
    cuento: [
      `En ${setting}, justo cuando el cielo se pintó de violeta, vivía ${name}. Tenía ${appearance} y una manera muy especial de mirar las cosas. Le encantaba ${interest} y pasaba las tardes ${hobby}.\n\nAquella noche, ${name} encontró una brújula diminuta bajo una hoja dorada. No señalaba el norte. ¡Señalaba una estrella!\n\n—¿Adónde nos llevará? —preguntó ${name}.\n—¡Guau, guau! —ladró ${companion}, dando un saltito.\n\nLa brújula brilló: ¡clin, clin, clin! Y una lucecita cayó suavemente frente a sus pies.`,
      `La lucecita temblaba como una luciérnaga. Quería volver al cielo, pero solo podía hacerlo si encontraba el camino de las ocho señales. La primera apareció sobre una piedra: tres puntitos dorados formando una flecha.\n\n${name} guardó la brújula en el bolsillo y siguió a ${companion} entre helechos altos. Cada vez que daban un paso, la aguja decía “clin”. Cada vez que se detenían a mirar, la estrella se iluminaba un poco más.\n\nAl final del sendero encontraron una puerta hecha de ramas. No tenía cerradura, solo una pregunta: “¿Qué sabes hacer cuando algo te da curiosidad?”. ${name} sonrió y respondió: “Observar, probar y preguntar”. La puerta se abrió con un suave ¡crac!`,
      `Detrás de la puerta había un puente de madera sobre un arroyo oscuro. El agua cantaba bajito, pero los tablones susurraban cosas diferentes. Unos decían “corre”; otros, “vuelve”; otros, “espera”.\n\n${name} quiso cruzar deprisa, aunque el puente se movía un poquito. Entonces ${companion} apoyó una patita en el primer tablón. ${name} escuchó con atención y descubrió que el puente seguro sonaba “plin”.\n\nPaso a paso, los dos siguieron el sonido. Al llegar al otro lado, una segunda señal apareció en el aire: una estrella con forma de oreja. La brújula les enseñaba que escuchar también podía ser una manera de encontrar el camino.`,
      `El sendero subía hacia una montaña de niebla. Desde abajo parecía enorme, como un gigante dormido. El corazón de ${name} comenzó a ir rápido, rápido. El verdadero desafío era ${lesson}.\n\n—No sé si podré —susurró.\n\nLa niebla se acercó hasta tapar casi todo. ${companion} se quedó junto a su lado. ${name} respiró despacio. Una vez. Y otra vez. Después, dibujó en el suelo un mapa con tres flechas: “mirar”, “probar” y “volver a intentar”.\n\nLa primera flecha encontró una roca. La segunda encontró un camino. La tercera ayudó a ${name} a levantarse cuando resbaló. La montaña no se hizo más pequeña, pero ${name} sí se sintió un poco más grande por dentro.`,
      `En la mitad de la montaña apareció un jardín lleno de flores cerradas. Cada flor guardaba una pequeña puerta y cada puerta tenía un botón de color. ${name} pulsó el amarillo: nada. Pulsó el azul: tampoco. Pulsó el rojo y una flor hizo “¡puf!”, llenando el aire de polen brillante.\n\n${name} tosió y luego se rio. No era una prueba para acertar a la primera. Era una invitación a aprender. Junto a ${companion}, probó combinaciones, observó las pistas de las hojas y descansó cuando lo necesitó.\n\nPor fin, una flor abrió sus pétalos y mostró la tercera señal: un pequeño corazón rodeado de huellas. La brújula marcó el siguiente paso.`,
      `La cuarta señal llevó a ${name} a un claro donde había un mapa dibujado sobre la hierba. Pero el mapa cambiaba cada vez que alguien lo miraba. Un camino se convertía en dos; un río aparecía donde antes había un puente.\n\n—¿Y si elegimos el camino equivocado? —preguntó ${name}.\n\n${companion} señaló una huella pequeña que se repetía siempre: dos pasos y una pausa. ${name} comprendió que no hacía falta conocer todo el recorrido. Bastaba con tomar una decisión, mirar qué ocurría y ajustar el siguiente paso.\n\nEligieron el camino que subía. El mapa se quedó quieto y dibujó una nueva señal: una flecha que volvía sobre sí misma. A veces volver a empezar también era avanzar.`,
      `Al caer la noche, el sendero terminó en una colina redonda como una almohada. Desde allí, ${name} pudo ver las siete señales brillando detrás: la pregunta, el puente, la montaña, el jardín y el mapa. Cada una parecía una ventanita encendida en el bosque.\n\nLa lucecita se colocó sobre la brújula. La aguja giró una última vez y señaló el cielo. ${name} levantó el brazo, pero la luz no subió. Faltaba una cosa: recordar por qué había comenzado.\n\n${name} pensó en ${theme}. Pensó en todas las veces que había respirado, escuchado, pedido ayuda y vuelto a intentar. Entonces dijo en voz alta: “Puedo avanzar a mi manera”. La estrella comenzó a subir, subiendo despacito.`,
      `La estrella llegó hasta lo alto y encendió una nueva constelación con forma de corazón. ¡Pum! El cielo entero pareció aplaudir. ${companion} movió la cola y la brújula se quedó calentita entre las manos de ${name}.\n\nEn el camino de vuelta, el bosque ya no parecía misterioso. El puente seguía susurrando, la montaña seguía siendo grande y el jardín aún guardaba botones de muchos colores. Pero ${name} sabía algo importante: aprender sobre ${theme} podía empezar con un paso muy pequeño.\n\nDesde aquella noche, cada vez que aparecía un reto, ${name} miraba hacia arriba y recordaba las ocho señales. A veces la respuesta sonaba bajito, como una brújula: “clin, clin, vuelve a intentarlo”.`,
    ],
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
        pregunta: `¿Cómo se sintió ${name} cuando la montaña parecía enorme? ¿Qué le ayudó a seguir?`,
        pauta_guiada: `Puedes hablar de la duda y de cómo ${name} respiró, recordó sus habilidades y aceptó la ayuda de ${companion}. También podéis comentar qué significa ${theme} en vuestra vida.`,
      },
      {
        tipo: "Actividad creativa",
        consigna: `Dibuja tu propia brújula mágica. En sus ocho señales escribe ocho cosas que puedes hacer cuando quieras practicar ${theme}.`,
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
  const [isCreating, setIsCreating] = useState(false);
  const update = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const createStory = () => {
    setIsCreating(true);
    window.setTimeout(() => {
      setStory(makeStory(form));
      setIsCreating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  const reset = () => {
    setStory(null);
    setStep(0);
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
    return <StoryReader storyData={story} formName={form.name} theme={form.theme} onEdit={editStory} onReset={reset} onPrint={printStory} onDownload={downloadJson} />;
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
            <div className="hero-meta"><span><Check size={15} /> 8 capítulos mágicos</span><span><Check size={15} /> Actividades para conversar</span></div>
          </div>
          <div className="hero-illustration" aria-hidden="true">
            <div className="sun-glow" /><div className="moon-shape" /><div className="mountain mountain-back" /><div className="mountain mountain-front" />
            <div className="hero-star star-one"><Star size={18} fill="currentColor" /></div><div className="hero-star star-two"><Star size={11} fill="currentColor" /></div><div className="hero-star star-three"><Sparkles size={16} /></div>
            <div className="story-character"><div className="character-head"><span className="character-hair" /><span className="character-eye eye-left" /><span className="character-eye eye-right" /><span className="character-smile" /></div><div className="character-body" /></div>
            <div className="illustration-caption"><BookOpen size={15} /> aquí empieza una historia muy tuya</div>
          </div>
        </section>
        <section className="builder-section" id="builder">
          <div className="builder-intro"><div><div className="eyebrow">Paso {step + 1} de 3</div><h2>Vamos a darle forma<br />a su aventura.</h2></div><p>Solo necesitas unas pocas pistas. El resto lo pone la imaginación.</p></div>
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
  return <header className={`site-header ${compact ? "compact" : ""} reader-toolbar`}><button className="brand" onClick={onReset} aria-label="Volver al inicio"><span className="brand-mark"><Star size={18} fill="currentColor" /></span><span>Cuenta<strong>Crece</strong></span></button><div className="header-note"><span className="header-heart"><Heart size={14} fill="currentColor" /></span> Hecho para momentos que se quedan</div></header>;
}
