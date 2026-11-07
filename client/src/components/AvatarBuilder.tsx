import { Check, Glasses, Heart, Sparkles, Star, Volume2 } from "lucide-react";
import { useMemo } from "react";
import "./AvatarBuilder.css";

export type AvatarData = {
  skinTone?: string;
  hair?: string;
  hairColor?: string;
  eyes?: string;
  glasses?: boolean;
  freckles?: boolean;
  hearingAid?: boolean;
  mobilityAid?: string;
  clothing?: string;
  accessory?: string;
};

type AvatarBuilderProps = {
  value?: AvatarData;
  onChange: (value: AvatarData) => void;
};

type Choice = {
  value: string;
  label: string;
  emoji?: string;
};

const skinTones: Choice[] = [
  { value: "claro", label: "Claro", emoji: "◐" },
  { value: "medio", label: "Medio", emoji: "◑" },
  { value: "oliva", label: "Oliva", emoji: "◒" },
  { value: "oscuro", label: "Oscuro", emoji: "◓" },
  { value: "", label: "Sin elegir", emoji: "·" },
];

const hairStyles: Choice[] = [
  { value: "liso", label: "Liso", emoji: "〰" },
  { value: "rizado", label: "Rizado", emoji: "〰" },
  { value: "ondulado", label: "Ondulado", emoji: "∿" },
  { value: "corto", label: "Corto", emoji: "⌁" },
  { value: "sin especificar", label: "Sin elegir", emoji: "·" },
];

const hairColors: Choice[] = [
  { value: "castaño", label: "Castaño" },
  { value: "negro", label: "Negro" },
  { value: "rubio", label: "Rubio" },
  { value: "pelirrojo", label: "Pelirrojo" },
  { value: "fantasía", label: "Fantasía" },
];

const eyeColors: Choice[] = [
  { value: "marrones", label: "Marrones", emoji: "●" },
  { value: "verdes", label: "Verdes", emoji: "●" },
  { value: "azules", label: "Azules", emoji: "●" },
  { value: "grises", label: "Grises", emoji: "●" },
  { value: "sin especificar", label: "Sin elegir", emoji: "·" },
];

const mobilityOptions: Choice[] = [
  { value: "", label: "Ninguna o sin elegir", emoji: "·" },
  { value: "silla de ruedas", label: "Silla de ruedas", emoji: "♿" },
  { value: "bastón", label: "Bastón", emoji: "⌁" },
  { value: "andador", label: "Andador", emoji: "⌁" },
];

const clothingOptions: Choice[] = [
  { value: "coral", label: "Coral", emoji: "●" },
  { value: "lavanda", label: "Lavanda", emoji: "●" },
  { value: "amarillo", label: "Amarillo", emoji: "●" },
  { value: "verde", label: "Verde", emoji: "●" },
];

const accessoryOptions: Choice[] = [
  { value: "", label: "Sin accesorio", emoji: "·" },
  { value: "sombrero", label: "Sombrero", emoji: "♢" },
  { value: "corona de flores", label: "Flores", emoji: "✿" },
  { value: "gorro", label: "Gorro", emoji: "⌂" },
];

const skinClass = (value?: string) => value ? `skin-${value}` : "skin-default";
const hairClass = (value?: string) => value ? `hair-${value.replace(" ", "-")}` : "hair-default";
const clothingClass = (value?: string) => value ? `clothing-${value}` : "clothing-default";

function ChoiceGroup({ label, hint, choices, value, onSelect }: { label: string; hint?: string; choices: Choice[]; value?: string; onSelect: (value: string) => void }) {
  return (
    <fieldset className="avatar-choice-group">
      <legend>{label}</legend>
      {hint && <p className="avatar-choice-hint">{hint}</p>}
      <div className="avatar-choice-list">
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <button key={choice.value || "empty"} type="button" className={`avatar-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => onSelect(choice.value)}>
              {choice.emoji && <span className="avatar-choice-emoji" aria-hidden="true">{choice.emoji}</span>}
              <span>{choice.label}</span>
              {selected && <Check size={14} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function AvatarBuilder({ value, onChange }: AvatarBuilderProps) {
  const avatar = value ?? {};
  const set = (key: keyof AvatarData, nextValue: string | boolean) => onChange({ ...avatar, [key]: nextValue });
  const selectedFeatures = useMemo(() => [
    avatar.glasses && "gafas",
    avatar.freckles && "pecas",
    avatar.hearingAid && "audífono",
    avatar.mobilityAid,
  ].filter(Boolean) as string[], [avatar]);

  const applyPreset = (preset: "curious" | "adventurer" | "open") => {
    if (preset === "curious") onChange({ ...avatar, hair: "ondulado", hairColor: "castaño", eyes: "verdes", glasses: true, freckles: true, clothing: "amarillo", accessory: "corona de flores" });
    if (preset === "adventurer") onChange({ ...avatar, hair: "corto", hairColor: "negro", eyes: "marrones", glasses: false, freckles: false, clothing: "verde", accessory: "gorro" });
    if (preset === "open") onChange({ ...avatar, hair: "sin especificar", eyes: "sin especificar", glasses: false, freckles: false, hearingAid: false, mobilityAid: "", accessory: "" });
  };

  return (
    <section className="avatar-builder" aria-labelledby="avatar-builder-title">
      <div className="avatar-builder-heading">
        <div className="avatar-builder-icon"><Sparkles size={19} aria-hidden="true" /></div>
        <div>
          <p className="avatar-builder-kicker">Opcional y a tu manera</p>
          <h3 id="avatar-builder-title">Dibuja a su protagonista</h3>
          <p>Elige solo lo que quieras. Nada es obligatorio y siempre puedes dejarlo sin especificar.</p>
        </div>
      </div>

      <div className="avatar-builder-layout">
        <div className="avatar-preview-column">
          <div className="avatar-preview" aria-label="Previsualización del avatar">
            <div className="avatar-preview-sparkle sparkle-left"><Star size={15} fill="currentColor" aria-hidden="true" /></div>
            <div className="avatar-preview-sparkle sparkle-right"><Sparkles size={15} aria-hidden="true" /></div>
            <div className={`avatar-person ${skinClass(avatar.skinTone)}`}>
              <div className={`avatar-hair ${hairClass(avatar.hair)} ${avatar.hairColor ? `color-${avatar.hairColor}` : ""}`} />
              <div className="avatar-face"><span className={`avatar-eye eye-left ${avatar.eyes ? `eyes-${avatar.eyes}` : ""}`} /><span className={`avatar-eye eye-right ${avatar.eyes ? `eyes-${avatar.eyes}` : ""}`} />{avatar.freckles && <span className="avatar-freckles" aria-hidden="true">• • •</span>}<span className="avatar-smile" /></div>
              {avatar.glasses && <Glasses className="avatar-glasses" size={38} aria-label="Lleva gafas" />}
              {avatar.hearingAid && <Volume2 className="avatar-hearing" size={16} aria-label="Lleva audífono" />}
              <div className={`avatar-body ${clothingClass(avatar.clothing)}`} />
              {avatar.mobilityAid === "silla de ruedas" && <span className="avatar-mobility wheelchair" aria-label="Usa silla de ruedas">♿</span>}
              {avatar.mobilityAid === "bastón" && <span className="avatar-mobility cane" aria-label="Usa bastón">⌁</span>}
              {avatar.mobilityAid === "andador" && <span className="avatar-mobility walker" aria-label="Usa andador">⌁</span>}
              {avatar.accessory && <span className={`avatar-accessory accessory-${avatar.accessory.replaceAll(" ", "-")}`} aria-hidden="true">{avatar.accessory === "corona de flores" ? "✿" : avatar.accessory === "sombrero" ? "♢" : "⌂"}</span>}
            </div>
            <div className="avatar-preview-caption"><Heart size={13} fill="currentColor" aria-hidden="true" /> Así podría aparecer en el cuento</div>
          </div>
          <div className="avatar-features" aria-live="polite">{selectedFeatures.length > 0 ? <>Ha elegido: {selectedFeatures.join(", ")}</> : <>Puede dejar su apariencia abierta a la imaginación.</>}</div>
        </div>

        <div className="avatar-options">
          <div className="avatar-suggestions" aria-label="Sugerencias rápidas">
            <div><strong>¿Quieres una idea para empezar?</strong><span>Después puedes cambiar cualquier detalle.</span></div>
            <div className="avatar-preset-list">
              <button type="button" onClick={() => applyPreset("curious")}><Sparkles size={14} /> Curioso/a</button>
              <button type="button" onClick={() => applyPreset("adventurer")}><Star size={14} /> Aventurero/a</button>
              <button type="button" onClick={() => applyPreset("open")}><Heart size={14} /> Sin definir</button>
            </div>
          </div>

          <ChoiceGroup label="Tono de piel" hint="Puedes combinarlo con cualquier estilo." choices={skinTones} value={avatar.skinTone} onSelect={(nextValue) => set("skinTone", nextValue)} />
          <ChoiceGroup label="Pelo" choices={hairStyles} value={avatar.hair} onSelect={(nextValue) => set("hair", nextValue)} />
          <ChoiceGroup label="Color del pelo" choices={hairColors} value={avatar.hairColor} onSelect={(nextValue) => set("hairColor", nextValue)} />
          <ChoiceGroup label="Color de ojos" choices={eyeColors} value={avatar.eyes} onSelect={(nextValue) => set("eyes", nextValue)} />
          <ChoiceGroup label="Ropa" choices={clothingOptions} value={avatar.clothing} onSelect={(nextValue) => set("clothing", nextValue)} />
          <ChoiceGroup label="Accesorio" choices={accessoryOptions} value={avatar.accessory} onSelect={(nextValue) => set("accessory", nextValue)} />
          <ChoiceGroup label="Ayuda para moverse" hint="Elige una opción solo si quieres que aparezca." choices={mobilityOptions} value={avatar.mobilityAid} onSelect={(nextValue) => set("mobilityAid", nextValue)} />

          <div className="avatar-toggle-grid" role="group" aria-label="Detalles opcionales">
            <button type="button" className={`avatar-toggle ${avatar.glasses ? "selected" : ""}`} aria-pressed={avatar.glasses ?? false} onClick={() => set("glasses", !avatar.glasses)}><Glasses size={18} aria-hidden="true" /><span><strong>Gafas</strong><small>Un detalle reconocible</small></span>{avatar.glasses && <Check size={15} />}</button>
            <button type="button" className={`avatar-toggle ${avatar.freckles ? "selected" : ""}`} aria-pressed={avatar.freckles ?? false} onClick={() => set("freckles", !avatar.freckles)}><span className="avatar-toggle-symbol" aria-hidden="true">• • •</span><span><strong>Pecas</strong><small>Pequeños puntitos</small></span>{avatar.freckles && <Check size={15} />}</button>
            <button type="button" className={`avatar-toggle ${avatar.hearingAid ? "selected" : ""}`} aria-pressed={avatar.hearingAid ?? false} onClick={() => set("hearingAid", !avatar.hearingAid)}><Volume2 size={18} aria-hidden="true" /><span><strong>Audífono</strong><small>Representación opcional</small></span>{avatar.hearingAid && <Check size={15} />}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
