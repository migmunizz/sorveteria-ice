import { EmptyState } from '../components/ui/States';
import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container section">
      <EmptyState
        title="Página não encontrada"
        text="Essa página derreteu ou nunca existiu."
        action={<ButtonLink to="/">Voltar ao início</ButtonLink>}
      />
    </div>
  );
}
