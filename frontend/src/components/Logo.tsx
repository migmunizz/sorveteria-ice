import { Link } from 'react-router-dom';
import { Mascot } from './Mascot';
import { site } from '../config/site';

// Logo provisório (Design System §8): rosto do mascote + nome em Fredoka Bold.
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${site.fullName} — início`}>
      <Mascot pose="face" size={44} />
      <span>{site.name}</span>
    </Link>
  );
}
