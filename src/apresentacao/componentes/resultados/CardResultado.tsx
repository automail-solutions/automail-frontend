import React from 'react'
import { ResultadoClassificacao } from '@/dominio/tipos/Email'
import { CategoriaEmail } from '@/dominio/enums/CategoriaEmail'
import { formatarConfianca, formatarTempo } from '@/compartilhado/utils/formatadores'
import { MENSAGENS } from '@/dominio/constantes/mensagens'

interface PropriedadesCardResultado {
  resultado: ResultadoClassificacao
  className?: string
}

export const CardResultado: React.FC<PropriedadesCardResultado> = ({
  resultado,
  className = ''
}) => {
  const isProdutivo = resultado.categoria === CategoriaEmail.PRODUTIVO

  const corCategoria = isProdutivo ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
  const iconeCategoria = isProdutivo ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
      {/* Cabeçalho com categoria */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${corCategoria}`}>
            {iconeCategoria}
            <span className="ml-2">{resultado.categoria}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {MENSAGENS.INTERFACE.CONFIANCA_LABEL}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formatarConfianca(resultado.confianca)}
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Metadados */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div>
          <span className="text-gray-500">{MENSAGENS.INTERFACE.TEMPO_PROCESSAMENTO_LABEL}:</span>
          <span className="ml-2 font-medium text-gray-900">
            {formatarTempo(resultado.metadata.tempoProcessamento)}
          </span>
        </div>
        
        <div>
          <span className="text-gray-500">Processado em:</span>
          <span className="ml-2 font-medium text-gray-900">
            {new Date(resultado.metadata.timestamp).toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Indicador visual de confiança */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Confiança da Classificação</span>
          <span>{formatarConfianca(resultado.confianca)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              resultado.confianca >= 0.8 ? 'bg-green-500' : 
              resultado.confianca >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${resultado.confianca * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}