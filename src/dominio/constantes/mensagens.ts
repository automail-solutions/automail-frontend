export const MENSAGENS = {
  ERRO: {
    ARQUIVO_INVALIDO: 'Apenas arquivos .txt e .pdf são permitidos',
    ARQUIVO_MUITO_GRANDE: 'Arquivo muito grande. Tamanho máximo: 5MB',
    ARQUIVO_VAZIO: 'O arquivo não pode estar vazio',
    ASSUNTO_OBRIGATORIO: 'O assunto é obrigatório',
    CORPO_OBRIGATORIO: 'O corpo do email é obrigatório',
    TEXTO_MUITO_CURTO: 'O texto deve ter pelo menos 10 caracteres',
    TEXTO_MUITO_LONGO: 'O texto não pode ter mais de 10000 caracteres',
    SERVIDOR_INDISPONIVEL: 'Servidor temporariamente indisponível. Tente novamente.',
    ERRO_INESPERADO: 'Ocorreu um erro inesperado. Tente novamente.',
    SEM_CONEXAO: 'Sem conexão com a internet. Verifique sua conexão.'
  },
  SUCESSO: {
    CLASSIFICACAO_CONCLUIDA: 'Classificação realizada com sucesso!',
    RESPOSTA_COPIADA: 'Resposta copiada para a área de transferência!'
  },
  CARREGANDO: {
    ANALISANDO_EMAIL: 'Analisando email...',
    PROCESSANDO_ARQUIVO: 'Processando arquivo...',
    AGUARDE: 'Aguarde um momento...'
  },
  INTERFACE: {
    TITULO_PRINCIPAL: 'Classificação Inteligente de Emails',
    SUBTITULO: 'Descubra se seu email é produtivo ou improdutivo com IA',
    SELECIONAR_MODO: 'Como você deseja enviar o email?',
    MODO_ARQUIVO: 'Upload de Arquivo',
    MODO_TEXTO: 'Inserção Direta',
    ARRASTAR_ARQUIVO: 'Arraste um arquivo aqui ou clique para selecionar',
    TIPOS_ACEITOS: 'Apenas arquivos .txt e .pdf',
    ASSUNTO_PLACEHOLDER: 'Digite o assunto do email...',
    CORPO_PLACEHOLDER: 'Digite o conteúdo do email...',
    BOTAO_CLASSIFICAR: 'Classificar Email',
    BOTAO_NOVA_CLASSIFICACAO: 'Nova Classificação',
    BOTAO_COPIAR_RESPOSTA: 'Copiar Resposta',
    CATEGORIA_LABEL: 'Categoria',
    CONFIANCA_LABEL: 'Confiança',
    RESPOSTA_SUGERIDA_LABEL: 'Resposta Sugerida',
    TEMPO_PROCESSAMENTO_LABEL: 'Tempo de Processamento'
  }
} as const