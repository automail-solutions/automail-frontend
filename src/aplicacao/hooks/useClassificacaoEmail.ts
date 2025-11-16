import { useState, useCallback } from 'react'
import { emailApi } from '@/infraestrutura/api/emailApi'
import { Email, EstadoClassificacao } from '@/dominio/tipos/Email'

export const useClassificacaoEmail = () => {
  const [estado, setEstado] = useState<EstadoClassificacao>({
    carregando: false,
    resultado: null,
    erro: null
  })

  const classificarTexto = useCallback(async (email: Email) => {
    setEstado(prev => ({ ...prev, carregando: true, erro: null }))
    
    try {
      const resultado = await emailApi.classificarEmail(email)
      setEstado({
        carregando: false,
        resultado,
        erro: null
      })
      return resultado
    } catch (erro) {
      const mensagemErro = erro instanceof Error ? erro.message : 'Erro desconhecido'
      setEstado({
        carregando: false,
        resultado: null,
        erro: mensagemErro
      })
      throw erro
    }
  }, [])

  const classificarArquivo = useCallback(async (arquivo: File) => {
    setEstado(prev => ({ ...prev, carregando: true, erro: null }))

    try {
      const resultado = await emailApi.classificarArquivo(arquivo)
      setEstado({
        carregando: false,
        resultado,
        erro: null
      })
      return resultado
    } catch (erro) {
      const mensagemErro = erro instanceof Error ? erro.message : 'Erro desconhecido'
      setEstado({
        carregando: false,
        resultado: null,
        erro: mensagemErro
      })
      throw erro
    }
  }, [])

  const classificarArquivos = useCallback(async (arquivos: File[]) => {
    setEstado(prev => ({ ...prev, carregando: true, erro: null }))

    try {
      const resultados = await emailApi.classificarArquivos(arquivos)
      setEstado({
        carregando: false,
        resultado: resultados,
        erro: null
      })
      return resultados
    } catch (erro) {
      const mensagemErro = erro instanceof Error ? erro.message : 'Erro desconhecido'
      setEstado({
        carregando: false,
        resultado: null,
        erro: mensagemErro
      })
      throw erro
    }
  }, [])

  const limparEstado = useCallback(() => {
    setEstado({
      carregando: false,
      resultado: null,
      erro: null
    })
  }, [])

  return {
    ...estado,
    classificarTexto,
    classificarArquivo,
    classificarArquivos,
    limparEstado
  }
}