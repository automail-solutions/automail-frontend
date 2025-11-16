import React, { useState } from 'react'
import { Botao } from '../comuns/Botao'
import { copiarParaAreaTransferencia } from '@/compartilhado/utils/formatadores'
import { MENSAGENS } from '@/dominio/constantes/mensagens'

interface PropriedadesRespostaSugerida {
  resposta: string
  className?: string
  mostrarNavegacao?: boolean
  onAnterior?: () => void
  onProximo?: () => void
  indiceAtual?: number
  totalResultados?: number
  desabilitadoAnterior?: boolean
  desabilitadoProximo?: boolean
}

export const RespostaSugerida: React.FC<PropriedadesRespostaSugerida> = ({
  resposta,
  className = '',
  mostrarNavegacao = false,
  onAnterior,
  onProximo,
  indiceAtual = 0,
  totalResultados = 1,
  desabilitadoAnterior = false,
  desabilitadoProximo = false
}) => {
  const [copiado, setCopiado] = useState(false)
  const [copiando, setCopiando] = useState(false)

  const handleCopiar = async () => {
    setCopiando(true)
    
    try {
      const sucesso = await copiarParaAreaTransferencia(resposta)
      
      if (sucesso) {
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
      }
    } catch (erro) {
      console.error('Erro ao copiar:', erro)
    } finally {
      setCopiando(false)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {MENSAGENS.INTERFACE.RESPOSTA_SUGERIDA_LABEL}
        </h3>
        
        <Botao
          onClick={handleCopiar}
          variante="secundario"
          tamanho="pequeno"
          carregando={copiando}
          className="flex items-center space-x-2"
        >
          {copiado ? (
            <>
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-600">Copiado!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{MENSAGENS.INTERFACE.BOTAO_COPIAR_RESPOSTA}</span>
            </>
          )}
        </Botao>
      </div>

      {/* Conteúdo da resposta */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {resposta}
          </p>
        </div>
      </div>

      {/* Navegação entre resultados (apenas para múltiplos arquivos) */}
      {mostrarNavegacao && totalResultados > 1 && (
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Botao
              onClick={onAnterior}
              variante="secundario"
              tamanho="pequeno"
              desabilitado={desabilitadoAnterior}
              className="flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Anterior</span>
            </Botao>
            <span className="text-sm text-gray-600">
              {indiceAtual + 1} de {totalResultados}
            </span>
            <Botao
              onClick={onProximo}
              variante="secundario"
              tamanho="pequeno"
              desabilitado={desabilitadoProximo}
              className="flex items-center space-x-1"
            >
              <span>Próximo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Botao>
          </div>
        </div>
      )}

      {/* Rodapé com dica */}
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Esta resposta foi gerada automaticamente pela IA. Revise antes de enviar.</span>
      </div>
    </div>
  )
}