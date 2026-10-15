import normal512 from '../assets/mascot/mascot-normal-512.webp';
import normal1024 from '../assets/mascot/mascot-normal.webp';
import face from '../assets/mascot/mascot-face.webp';

export type MascotPose =
  | 'normal' | 'waving' | 'eating' | 'happy' | 'sleeping'
  | 'thumbs-up' | 'surprised' | 'sign' | 'melting' | 'face' | 'wink';

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  float?: boolean;
  className?: string;
}

const alts: Record<MascotPose, string> = {
  normal: 'Mascote da sorveteria, um sorvete de casquinha de óculos escuros',
  waving: 'Mascote da sorveteria acenando',
  eating: 'Mascote da sorveteria comendo',
  happy: 'Mascote da sorveteria feliz',
  sleeping: 'Mascote da sorveteria dormindo',
  'thumbs-up': 'Mascote da sorveteria fazendo joinha',
  surprised: 'Mascote da sorveteria surpreso',
  sign: 'Mascote da sorveteria segurando uma placa',
  melting: 'Mascote da sorveteria derretendo',
  face: 'Rosto do mascote da sorveteria',
  wink: 'Mascote da sorveteria piscando',
};

// Enquanto as outras poses não existem, todas usam a pose "normal" (Design System §7.3).
// Quando gerar uma pose nova, importe o arquivo e adicione aqui.
const sources: Partial<Record<MascotPose, { src: string; srcSet?: string }>> = {
  normal: { src: normal512, srcSet: `${normal512} 1x, ${normal1024} 2x` },
  face: { src: face },
};

export function Mascot({ pose = 'normal', size = 320, float, className = '' }: MascotProps) {
  const img = sources[pose] ?? sources.normal!;
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      alt={alts[pose]}
      width={size}
      height={size}
      className={`mascot ${float ? 'mascot--float' : ''} ${className}`}
      draggable={false}
    />
  );
}
