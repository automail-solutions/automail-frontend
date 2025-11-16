# Automail Solutions Frontend

Interface web para classificação automática de emails usando IA, desenvolvida com React 18, TypeScript e Vite.

## 🚀 Funcionalidades Principais

- **Classificação Inteligente**: Determina se um email é Produtivo ou Improdutivo usando IA
- **Duplo Modo de Entrada**: Upload de arquivos (.txt, .pdf) ou inserção direta de texto
- **Processamento em Lote**: Suporte para múltiplos arquivos simultaneamente
- **Resposta Sugerida**: Gera automaticamente uma resposta apropriada para cada email
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Feedback em Tempo Real**: Validação instantânea e indicadores de progresso
- **Experiência Intuitiva**: Design limpo e fluxo de usuário otimizado
- **Acessibilidade**: Tooltips para nomes de arquivos longos e navegação por teclado

## 🛠️ Tecnologias Utilizadas

### Core

- **React 18** - Biblioteca principal com hooks e concurrent features
- **TypeScript 5** - Tipagem estática para maior segurança e DX
- **Vite 5** - Build tool moderna com HMR extremamente rápido
- **Axios 1.6** - Cliente HTTP robusto para comunicação com API

### Styling & UI

- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Inter Font** - Tipografia moderna e legível

### Arquitetura

- **Clean Architecture** - Separação clara de responsabilidades
- **SOLID Principles** - Código manutenível e extensível
- **Component-based** - Componentes reutilizáveis e modulares

## 🏗️ Arquitetura Implementada

### Camadas da Aplicação

```plaintext
src/
├── apresentacao/          # Camada de Apresentação
│   ├── componentes/       # Componentes React
│   └── paginas/          # Páginas da aplicação
├── aplicacao/            # Camada de Aplicação
│   ├── hooks/            # Custom hooks
│   ├── contextos/        # Context API
│   └── servicos/         # Lógica de negócio
├── dominio/              # Camada de Domínio
│   ├── tipos/            # Interfaces TypeScript
│   ├── enums/            # Enumerações
│   └── constantes/       # Constantes do domínio
├── infraestrutura/       # Camada de Infraestrutura
│   ├── api/              # Clientes HTTP
│   └── configuracao/     # Configurações
└── compartilhado/        # Utilitários
    ├── utils/            # Funções utilitárias
    └── estilos/          # Estilos globais
```

### Princípios SOLID Aplicados

1. **Single Responsibility**: Cada componente tem uma única responsabilidade
2. **Open/Closed**: Componentes abertos para extensão, fechados para modificação
3. **Liskov Substitution**: Interfaces bem definidas e substituíveis
4. **Interface Segregation**: Interfaces específicas e focadas
5. **Dependency Inversion**: Dependências abstraídas através de hooks e services

## 📋 Pré-requisitos

- **Node.js**: 22.16.0 ou superior (recomendado)
- **npm**: 10.9.2 ou superior (incluído com Node.js)
- **Backend**: API Automail Solutions rodando (padrão: [http://localhost:8000](http://localhost:8000))

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/automail-solutions/automail-frontend.git
cd automail-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
# URL base da API backend
VITE_API_BASE_URL=http://localhost:8000

# Ambiente de execução
VITE_ENVIRONMENT=development

# Tamanho máximo de arquivo em bytes (5MB)
VITE_MAX_FILE_SIZE=5242880
```

### 4. Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento com HMR
npm run dev

# Build de produção
npm run build

# Preview do build local
npm run preview

# Verificação de tipos
npm run type-check

# Linting do código
npm run lint
```

## 🌐 Variáveis de Ambiente

Todas as variáveis devem começar com `VITE_` para serem expostas no cliente:

| Variável | Descrição | Exemplo | Obrigatória |
|----------|-----------|---------|-------------|
| `VITE_API_BASE_URL` | URL base da API backend | `http://localhost:8000` | ✅ |
| `VITE_ENVIRONMENT` | Ambiente de execução | `development` | ❌ |
| `VITE_MAX_FILE_SIZE` | Tamanho máximo de arquivo (bytes) | `5242880` | ❌ |

## 📱 Guia de Uso da Aplicação

### 1. Seleção do Modo

- Escolha entre **Upload de Arquivo** ou **Inserção Direta**
- Cada modo tem validações específicas

### 2. Upload de Arquivo

- Arraste e solte arquivos .txt ou .pdf
- Ou clique para selecionar arquivo
- Validação automática de tipo e tamanho

### 3. Inserção Direta

- Preencha o assunto (obrigatório)
- Digite o conteúdo do email (obrigatório)
- Validação em tempo real

### 4. Classificação

- Clique em "Classificar Email"
- Aguarde o processamento (indicador visual)
- Visualize os resultados

### 5. Resultados

- **Categoria**: Produtivo ou Improdutivo com indicador visual
- **Confiança**: Percentual de certeza da IA
- **Resposta Sugerida**: Texto gerado automaticamente com opção de cópia
- **Navegação**: Para múltiplos arquivos, controles Anterior/Próximo
- **Metadados**: Tempo de processamento e timestamp
- **Acessibilidade**: Tooltips para nomes de arquivos truncados

### 6. Ações Disponíveis

- **Copiar Resposta**: Copia a resposta sugerida para área de transferência
- **Navegação**: Para múltiplos arquivos, navegue entre resultados
- **Nova Classificação**: Reinicia o processo para nova análise

## ⚙️ Configuração do Vite

O projeto usa Vite com as seguintes otimizações:

- **HMR**: Hot Module Replacement para desenvolvimento rápido
- **Code Splitting**: Divisão automática de código
- **Tree Shaking**: Remoção de código não utilizado
- **Proxy**: Redirecionamento de API para desenvolvimento
- **Aliases**: Imports simplificados com `@/`

### Configuração de Proxy

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

## 🚀 Deploy na Vercel

### 1. Configuração Automática

O projeto já está configurado com `vercel.json` otimizado.

### 2. Variáveis de Ambiente na Vercel

Configure no dashboard da Vercel:

- `VITE_API_BASE_URL`: URL da API em produção
- `VITE_ENVIRONMENT`: `production`
- `VITE_MAX_FILE_SIZE`: `5242880`

### 3. Deploy

```bash
# Via CLI da Vercel
vercel --prod

# Ou conecte o repositório no dashboard
```

### 4. Domínio Customizado

Configure no dashboard da Vercel após o deploy.

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS

```plaintext
Access to XMLHttpRequest at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solução**: Verifique se o backend está configurado para aceitar requisições do frontend.

#### 2. Variáveis de Ambiente Não Carregam

```plaintext
import.meta.env.VITE_API_BASE_URL is undefined
```

**Solução**: Certifique-se que as variáveis começam com `VITE_` e reinicie o servidor.

#### 3. Erro de Build

```plaintext
Module not found: Error: Can't resolve '@/...'
```

**Solução**: Verifique se o alias está configurado no `vite.config.ts` e `tsconfig.json`.

#### 4. Upload de Arquivo Falha

**Solução**: Verifique se o backend aceita `multipart/form-data` e se o arquivo não excede o limite.

### Logs de Debug

Para habilitar logs detalhados em desenvolvimento:

```typescript
// Em ambiente.ts
if (ambiente.DEV) {
  console.log('Debug mode enabled')
}
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
