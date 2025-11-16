import React, { useState, useCallback } from 'react'
import { useValidacao } from '@/aplicacao/hooks/useValidacao'
import { MENSAGENS } from '@/dominio/constantes/mensagens'
import { Email } from '@/dominio/tipos/Email'

interface PropriedadesInsercaoTexto {
  onTextoAlterado: (email: Email) => void
  desabilitado?: boolean
}

export const InsercaoTexto: React.FC<PropriedadesInsercaoTexto> = ({
  onTextoAlterado,
  desabilitado = false
}) => {
  const [assunto, setAssunto] = useState('')
  const [corpo, setCorpo] = useState('')
  const { validarCampoTexto, obterErro } = useValidacao()

  const handleAssuntoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const novoAssunto = e.target.value
    setAssunto(novoAssunto)
    
    if (novoAssunto.trim() && corpo.trim()) {
      validarCampoTexto('email', corpo, novoAssunto)
    }
    
    onTextoAlterado({
      assunto: novoAssunto,
      corpo
    })
  }, [corpo, validarCampoTexto, onTextoAlterado])

  const handleCorpoChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novoCorpo = e.target.value
    setCorpo(novoCorpo)
    
    if (assunto.trim() && novoCorpo.trim()) {
      validarCampoTexto('email', novoCorpo, assunto)
    }
    
    onTextoAlterado({
      assunto,
      corpo: novoCorpo
    })
  }, [assunto, validarCampoTexto, onTextoAlterado])

  const erro = obterErro('email')
  const contadorCaracteres = corpo.length

  return (
    <div className="w-full space-y-4">
      {/* Campo Assunto */}
      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
          Assunto do Email *
        </label>
        <input
          id="assunto"
          type="text"
          value={assunto}
          onChange={handleAssuntoChange}
          placeholder={MENSAGENS.INTERFACE.ASSUNTO_PLACEHOLDER}
          disabled={desabilitado}
          className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            ${erro ? 'border-red-400 bg-red-50' : 'border-gray-300'}
            ${desabilitado ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
          `}
        />
      </div>

      {/* Campo Corpo */}
      <div>
        <label htmlFor="corpo" className="block text-sm font-medium text-gray-700 mb-2">
          Conteúdo do Email *
        </label>
        <textarea
          id="corpo"
          value={corpo}
          onChange={handleCorpoChange}
          placeholder={MENSAGENS.INTERFACE.CORPO_PLACEHOLDER}
          disabled={desabilitado}
          rows={8}
          className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical
            ${erro ? 'border-red-400 bg-red-50' : 'border-gray-300'}
            ${desabilitado ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
          `}
        />
        
        {/* Contador de caracteres */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            * Campos obrigatórios
          </div>
          <div className={`text-xs ${contadorCaracteres > 10000 ? 'text-red-600' : 'text-gray-500'}`}>
            {contadorCaracteres}/10000 caracteres
          </div>
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      )}

      {/* Indicador de preenchimento válido */}
      {assunto.trim() && corpo.trim() && !erro && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-green-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-green-700">
              Email pronto para classificação
            </p>
          </div>
        </div>
      )}
    </div>
  )
}