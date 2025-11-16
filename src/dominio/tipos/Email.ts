import { CategoriaEmail } from '../enums/CategoriaEmail'

export interface Email {
  assunto: string
  corpo: string
  remetente?: string
}

export interface EmailParaClassificacao extends Email {
  arquivo?: File
}

export interface ResultadoClassificacao {
  categoria: CategoriaEmail
  confianca: number
  respostaSugerida: string
  metadata: {
    tempoProcessamento: number
    timestamp: string
  }
  nomeArquivo?: string // Para resultados de arquivo
}

export interface EstadoClassificacao {
  carregando: boolean
  resultado: ResultadoClassificacao | ResultadoClassificacao[] | null
  erro: string | null
}