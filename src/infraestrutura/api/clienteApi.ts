import axios, { AxiosInstance, AxiosError } from 'axios'
import ambiente from '../configuracao/ambiente'
import { MENSAGENS } from '@/dominio/constantes/mensagens'

class ClienteApi {
  private instancia: AxiosInstance

  constructor() {
    this.instancia = axios.create({
      baseURL: ambiente.API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.configurarInterceptors()
  }

  private configurarInterceptors(): void {
    // Interceptor de requisição
    this.instancia.interceptors.request.use(
      (config) => {
        if (ambiente.DEV) {
          console.log('Requisição:', config.method?.toUpperCase(), config.url)
        }
        return config
      },
      (erro) => Promise.reject(erro)
    )

    // Interceptor de resposta
    this.instancia.interceptors.response.use(
      (resposta) => {
        if (ambiente.DEV) {
          console.log('Resposta:', resposta.status, resposta.config.url)
        }
        return resposta
      },
      (erro: AxiosError) => {
        const mensagemErro = this.tratarErroHttp(erro)
        return Promise.reject(new Error(mensagemErro))
      }
    )
  }

  private tratarErroHttp(erro: AxiosError): string {
    if (!erro.response) {
      return MENSAGENS.ERRO.SEM_CONEXAO
    }

    switch (erro.response.status) {
      case 400:
        return 'Dados inválidos enviados'
      case 500:
        return MENSAGENS.ERRO.SERVIDOR_INDISPONIVEL
      default:
        return MENSAGENS.ERRO.ERRO_INESPERADO
    }
  }

  get axios(): AxiosInstance {
    return this.instancia
  }
}

export const clienteApi = new ClienteApi()
export default clienteApi.axios