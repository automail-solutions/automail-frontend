import { useState, useCallback } from 'react'
import { validarArquivo, validarTextoEmail } from '@/compartilhado/utils/validadores'

interface EstadoValidacao {
  erros: Record<string, string>
  valido: boolean
}

export const useValidacao = () => {
  const [estado, setEstado] = useState<EstadoValidacao>({
    erros: {},
    valido: true
  })

  const validarCampoTexto = useCallback((campo: string, valor: string, assunto?: string) => {
    let erro: string | null = null

    if (campo === 'email') {
      erro = validarTextoEmail(assunto || '', valor)
    }

    setEstado(prev => {
      const novosErros = { ...prev.erros }
      
      if (erro) {
        novosErros[campo] = erro
      } else {
        delete novosErros[campo]
      }

      return {
        erros: novosErros,
        valido: Object.keys(novosErros).length === 0
      }
    })

    return erro === null
  }, [])

  const validarCampoArquivo = useCallback((arquivo: File) => {
    const erro = validarArquivo(arquivo)
    
    setEstado(prev => {
      const novosErros = { ...prev.erros }
      
      if (erro) {
        novosErros.arquivo = erro
      } else {
        delete novosErros.arquivo
      }

      return {
        erros: novosErros,
        valido: Object.keys(novosErros).length === 0
      }
    })

    return erro === null
  }, [])

  const limparErros = useCallback(() => {
    setEstado({
      erros: {},
      valido: true
    })
  }, [])

  const obterErro = useCallback((campo: string): string | undefined => {
    return estado.erros[campo]
  }, [estado.erros])

  return {
    erros: estado.erros,
    valido: estado.valido,
    validarCampoTexto,
    validarCampoArquivo,
    limparErros,
    obterErro
  }
}