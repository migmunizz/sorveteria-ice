import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, RequireAuth } from './components/layout/Layout';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Pedido from './pages/Pedido';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MinhaConta from './pages/MinhaConta';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/pedido/:id" element={<RequireAuth><Pedido /></RequireAuth>} />
          <Route path="/minha-conta" element={<RequireAuth><MinhaConta /></RequireAuth>} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/cadastro" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
