# assets/ — imagens do projeto

Pasta com as **imagens-fonte** (originais e em alta). O frontend usa cópias otimizadas em `frontend/src/assets/mascot/` e `frontend/public/`. Ao adicionar uma imagem nova aqui, copie a versão otimizada para o frontend.

## mascote/

O mascote é um **sorvete de casquinha**: bola de baunilha com cobertura de chocolate e granulado rosa/laranja, óculos escuros retangulares pretos com lentes roxas/rosadas, olhar relaxado e sorriso de canto, casquinha waffle, contorno preto grosso, borda neon magenta (#E000E8) e círculo roxo atrás. Na pose atual ele faz “arminha”/joinha com a mão direita e apoia a esquerda na cintura.

| Arquivo | Tamanho | Descrição | Uso |
|---|---|---|---|
| `mascot-original-fundo-preto.png` | 1254×1254 | Arte original extraída do PDF do Design System, **com fundo preto**. Não usar no site; é a matriz. | Referência para gerar novas poses |
| `mascot-normal.png` | 1024×1024 | Pose normal com **fundo transparente** (preto removido), centralizada. | Fonte para exportações |
| `mascot-normal.webp` | 1024×1024 | Mesma, WebP. | `srcset` 2x no site |
| `mascot-normal-512.webp` | 512×512 | Mesma, WebP leve. | `srcset` 1x no site (hero, sobre, estados) |
| `mascot-face.png` / `.webp` | 512 / 256 | Recorte do rosto dentro de um círculo roxo #7B1FA2. | Logo provisório, avatar, navbar |

### Poses (Design System §7.1)

| Pose | Arquivo esperado | Onde usar | Status |
|---|---|---|---|
| Normal | `mascot-normal` | Hero, avatar padrão, sobre | ✅ |
| Só o rosto | `mascot-face` | Favicon, logo, navbar mobile | ✅ |
| Acenando | `mascot-waving` | Hero da home, boas-vindas | ⬜ |
| Comendo | `mascot-eating` | Cardápio | ⬜ |
| Feliz | `mascot-happy` | Pedido concluído | ⬜ |
| Dormindo | `mascot-sleeping` | Banner “estamos fechados” | ⬜ |
| Aprovando (joinha) | `mascot-thumbs-up` | Confirmações, sugestões | ⬜ |
| Surpreso | `mascot-surprised` | Promoções | ⬜ |
| Segurando placa | `mascot-sign` | 404, carrinho vazio, “em breve” | ⬜ |
| Derretendo/suando | `mascot-melting` | Erro de servidor, loading longo | ⬜ |
| Piscando | `mascot-wink` | Contato | ⬜ |

Enquanto uma pose não existe, o componente `Mascot` usa a pose normal automaticamente.

### Como gerar as poses que faltam

Use `mascot-original-fundo-preto.png` como **imagem de referência** em um gerador de imagens com edição por referência (ou redesenhe no Krita) para manter o mesmo personagem. Prompt base:

> Cartoon mascot of an ice cream cone character, same character as the reference image: vanilla scoop with dripping chocolate topping and pink, orange and purple sprinkles, black rectangular sunglasses with purple-pink lenses, relaxed half-closed eyes, waffle cone body, small cream-colored cartoon hands, thick black outline, neon magenta outer stroke, purple circle behind. Sticker style, flat colors, solid pure black background, centered, full body, square 1:1. **POSE: …**

Troque o final por:

| Pose | Complemento do prompt |
|---|---|
| waving | `waving hello with the right hand raised, big friendly smile` |
| eating | `holding a small spoon with a scoop of ice cream near its mouth, happy` |
| happy | `both arms up celebrating, wide open smile, small sparkles around` |
| sleeping | `eyes closed behind sunglasses pushed up on the forehead, small "Z z" above, slightly melted, peaceful` |
| thumbs-up | `giving a big thumbs up with the right hand, confident smile` |
| surprised | `sunglasses slightly down the nose, eyes wide open, mouth in an "O" shape, hands on cheeks` |
| sign | `holding a blank rectangular wooden sign with both hands in front of the cone` |
| melting | `sweating drops, scoop melting and dripping more than usual, worried smile` |
| wink | `lifting the sunglasses with one hand and winking with one eye, playful smile` |

**Depois de gerar:**
1. Remover o fundo preto (no Krita: *Seleção por cor* no preto de fora → apagar; ou o script abaixo).
2. Exportar 1024×1024 PNG transparente aqui em `mascote/` com o nome da tabela.
3. Exportar WebP 512 e 1024 para `frontend/src/assets/mascot/` e registrar no objeto `sources` de `frontend/src/components/Mascot.tsx`.

Script usado para remover o fundo da pose normal (Python + Pillow; preenche a partir das bordas só os pixels quase pretos, então o contorno preto do personagem é preservado porque fica dentro da borda magenta):

```bash
pip install pillow
python remove_fundo.py entrada.png saida.png
```

```python
# remove_fundo.py
import sys
from collections import deque
from PIL import Image, ImageFilter
im = Image.open(sys.argv[1]).convert("RGBA"); w, h = im.size; px = im.load()
mask = Image.new("L", (w, h), 255); mp = mask.load(); seen = set()
q = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
while q:
    x, y = q.popleft()
    if (x, y) in seen or not (0 <= x < w and 0 <= y < h): continue
    seen.add((x, y))
    if max(px[x, y][:3]) >= 40: continue
    mp[x, y] = 0
    q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
im.putalpha(mask.filter(ImageFilter.GaussianBlur(1.2)))
im.crop(im.getbbox()).save(sys.argv[2])
```

## favicon/

Gerados a partir do rosto do mascote (círculo roxo, fundo transparente). Cópias já estão em `frontend/public/`.

| Arquivo | Tamanho | Uso |
|---|---|---|
| `favicon-32.png` | 32×32 | Aba do navegador |
| `apple-touch-icon.png` | 180×180 | Atalho no iPhone |
| `icon-512.png` | 512×512 | PWA / compartilhamento |

## produtos/

Vazia. Fotos dos produtos (card 16 “Lista Real” e card 15 “Pasta de imagens”).

- Nome = id do produto em kebab-case: `1-baunilha-com-calda.webp`, `9-acai-300ml.webp`…
- Proporção **4:3**, 800×600, WebP, fundo escuro ou transparente (combina com o card roxo).
- Depois de salvar: copiar para `frontend/public/produtos/` e preencher `imageUrl: '/produtos/<arquivo>'` no seed do backend (Fase 5) e no mock do frontend.

## referencias/

Prints do frontend da Fase 1 (modo mock), para o README, a apresentação e para comparar se algo quebrar depois.

| Arquivo | Tela |
|---|---|
| `tela-home.png` | Home completa, desktop 1280px |
| `tela-mobile.png` | Home no celular (390px) |
| `tela-cardapio.png` | Cardápio com filtros |
| `tela-produto.png` | Detalhe do produto (Pistache) |
| `tela-carrinho.png` | Carrinho com 2 itens |
| `tela-checkout-err.png` | Checkout com validação de endereço |
| `tela-pedido.png` | Pedido concluído com o mascote |
