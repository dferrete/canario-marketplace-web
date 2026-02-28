# Canário Marketplace Web

Este é o frontend do projeto Canário Marketplace, construído com [Next.js](https://nextjs.org) e focado em conectar criadores de canários a compradores interessados.

## 🚀 Arquitetura e Estrutura Atual

O projeto adota uma arquitetura moderna baseada no **Next.js App Router (15+)** e **React 19**, utilizando **Tailwind CSS** para estilização e componentes de UI reutilizáveis focados em uma estética visual limpa, fluida e com suporte a *dark mode/glassmorphism*.

## 🏗️ Principais Recursos e Telas (MVP)

1.  **Vitrine (Home):** Exibição das aves com foco em usabilidade e conversão. **[Layout Responsivo e Adaptativo]**, onde os *Cards* se organizam de single-column no Mobile para um Super-Grid Desktop conforme o viewport.
2.  **Detalhes da Ave:** Informações completas do animal (raça, sexo, formato), valorização visual e prova social através do "Vendido por S-ID#". Estruturados modularmente empilhando colunas em dispositivos móveis (*flex-col*).
3.  **Checkout Sem Fricção:** Fluxo que isola o comprador, enfatizando segurança, formas de entrega e resumo limpo dos valores. Possui margens adaptativas (*safe spacing*) para rodar perfeitamente em telas 320px+.
4.  **Área Autenticada:** Controle de permissão com ContextAPI, garantindo que "Aves, Rifas, Leilões e Lotes" no Menu (com aba expansível tipo **Mobile Drawer** `Hamburger Menu` para smartphones).
5.  **Autenticação e Social Login:** Telas separadas de *Login*, *Registro* e *Esqueceu a Senha* contendo opções via provedor tradicional ou Mock para redes sociais. Totalmente desenhadas sob conceitos de *glassmorphism* com grades reflexivas flexíveis.
6.  **Internacionalização em Tempo Real (i18n):** Todo o conteúdo suportando Troca Nativa Múltipla (`pt`, `en`, `es`) com menu expansível no cabeçalho, com o estado persistindo em LocalStorage.
7.  **Perfil de Usuário com Avatar Físico:** Sistema de upload de fotos de perfil com compressão visual via UI, integração direta com endpoint `multipart/form-data`, validações de segurança (max 5MB, imagem/jpeg, etc.) através do `AuthContext` e estado propagado via interface dinâmica (ex: Navbar refletindo novo Avatar instantaneamente).

### 🔐 Autenticação e Integração de API
Foi implementado um fluxo completo de autenticação integrado com a API Go/Python/Java de backend. A estrutura inclui:
- **`src/contexts/AuthContext.tsx`**: Gerencia de forma global o estado do usuário logado e o token JWT via `localStorage`. Utiliza hooks customizados (`useAuth`) para simplificar o consumo nos componentes da aplicação.
- **`src/services/auth.service.ts`**: Foca em isolar as chamadas de API (Login e Cadastro), com Axios lidando com a formatação e payload.
- **`src/lib/api.ts`**: Instância global do Axios configurada com interceptadores (*interceptors*). Anexa automaticamente o token JWT (`Authorization: Bearer <token>`) em todas as requisições autenticadas.
- **Páginas de Login (`/login`) e Registro (`/register`)**: Interfaces de usuário desenhadas seguindo a estética de design da aplicação (Cards glassmorphism, feedbacks de carregamento com `lucide-react`, tratamento de erros).

### 📁 Estrutura de Diretórios
- `src/app/` - Páginas, rotas baseadas no App Router e templates visuais (`layout.tsx`).
- `src/app/(auth)/` - Rotas focadas no fluxo de conta (Login e Registro).
- `src/components/ui/` - Componentes base de interface altamente reutilizáveis (Botões, Cards, etc).
- `src/components/layout/` - Estruturas repetíveis da aplicação, como `Navbar` (que reage dinamicamente ao estado de autenticação) e `Footer`.
- `src/contexts/` - Gerenciamento de estados globais (como `AuthContext`).
- `src/services/` - Integrações diretas de módulos com chamadas da API externa.
- `src/lib/` - Utilitários globais e bibliotecas auxiliares (como Axios configurado com tokens JWT dinâmicos).

## 🏃‍♂️ Como Executar

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado prático.
Qualquer edição nos arquivos sob `src/` acionará o Hot Reload automagicamente.
