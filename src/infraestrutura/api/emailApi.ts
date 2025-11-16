import clienteApi from './clienteApi'
import { Email, ResultadoClassificacao } from '@/dominio/tipos/Email'
import { CategoriaEmail } from '@/dominio/enums/CategoriaEmail'

interface RespostaClassificacao {
  category: string
  confidence: number
  suggested_response: string
  metadata: {
    processing_time: number
    timestamp: string
  }
}

interface RespostaClassificacaoBatch {
  total_files: number
  successful: number
  failed: number
  results: Array<{
    filename: string
    status: string
    category: string | null
    confidence: number | null
    suggested_response: string | null
    processing_time: number | null
    error: string | null
  }>
  metadata: {
    processing_time: number
    timestamp: string
  }
}

export class EmailApi {
  async classificarEmail(email: Email): Promise<ResultadoClassificacao> {
    const resposta = await clienteApi.post<RespostaClassificacao>('/api/v1/classify', {
      email_subject: email.assunto,
      email_body: email.corpo,
      sender: email.remetente
    })

    return {
      categoria: resposta.data.category === 'Produtivo' ? CategoriaEmail.PRODUTIVO : CategoriaEmail.IMPRODUTIVO,
      confianca: resposta.data.confidence,
      respostaSugerida: resposta.data.suggested_response,
      metadata: {
        tempoProcessamento: resposta.data.metadata.processing_time,
        timestamp: resposta.data.metadata.timestamp
      }
    }
  }

  async classificarArquivo(arquivo: File): Promise<ResultadoClassificacao> {
    const formData = new FormData()
    formData.append('files', arquivo)

    const resposta = await clienteApi.post<RespostaClassificacaoBatch>('/api/v1/classify/batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const resultado = resposta.data.results[0]

    if (!resultado || resultado.status !== 'success') {
      throw new Error(resultado?.error || 'Erro ao processar arquivo')
    }

    return {
      categoria: resultado.category === 'Produtivo' ? CategoriaEmail.PRODUTIVO : CategoriaEmail.IMPRODUTIVO,
      confianca: resultado.confidence || 0,
      respostaSugerida: resultado.suggested_response || '',
      nomeArquivo: resultado.filename,
      metadata: {
        tempoProcessamento: resultado.processing_time || 0,
        timestamp: resposta.data.metadata.timestamp
      }
    }
  }

  async classificarArquivos(arquivos: File[]): Promise<ResultadoClassificacao[]> {
    const formData = new FormData()
    arquivos.forEach(arquivo => formData.append('files', arquivo))

    const resposta = await clienteApi.post<RespostaClassificacaoBatch>('/api/v1/classify/batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return resposta.data.results
      .filter(resultado => resultado.status === 'success')
      .map(resultado => ({
        categoria: resultado.category === 'Produtivo' ? CategoriaEmail.PRODUTIVO : CategoriaEmail.IMPRODUTIVO,
        confianca: resultado.confidence || 0,
        respostaSugerida: resultado.suggested_response || '',
        nomeArquivo: resultado.filename,
        metadata: {
          tempoProcessamento: resultado.processing_time || 0,
          timestamp: resposta.data.metadata.timestamp
        }
      }))
  }
}

export const emailApi = new EmailApi()