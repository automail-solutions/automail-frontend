import ambiente from '@/infraestrutura/configuracao/ambiente'
import { MENSAGENS } from '@/dominio/constantes/mensagens'

export const validarArquivo = (arquivo: File): string | null => {
  // Validar tipo de arquivo
  const tiposPermitidos = ['.txt', '.pdf']
  const extensao = arquivo.name.toLowerCase().substring(arquivo.name.lastIndexOf('.'))
  
  if (!tiposPermitidos.includes(extensao)) {
    return MENSAGENS.ERRO.ARQUIVO_INVALIDO
  }

  // Validar tamanho
  if (arquivo.size > ambiente.MAX_FILE_SIZE) {
    return MENSAGENS.ERRO.ARQUIVO_MUITO_GRANDE
  }

  // Validar se não está vazio
  if (arquivo.size === 0) {
    return MENSAGENS.ERRO.ARQUIVO_VAZIO
  }

  return null
}

export const validarTextoEmail = (assunto: string, corpo: string): string | null => {
  // Validar assunto
  if (!assunto || !assunto.trim()) {
    return MENSAGENS.ERRO.ASSUNTO_OBRIGATORIO
  }

  // Validar corpo
  if (!corpo || !corpo.trim()) {
    return MENSAGENS.ERRO.CORPO_OBRIGATORIO
  }

  // Validar tamanho mínimo
  if (corpo.trim().length < 10) {
    return MENSAGENS.ERRO.TEXTO_MUITO_CURTO
  }

  // Validar tamanho máximo
  if (corpo.trim().length > 10000) {
    return MENSAGENS.ERRO.TEXTO_MUITO_LONGO
  }

  return null
}

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}