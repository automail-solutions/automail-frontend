import React from 'react'

interface PropriedadesBotao {
  children: React.ReactNode
  onClick?: () => void
  tipo?: 'button' | 'submit' | 'reset'
  variante?: 'primario' | 'secundario' | 'perigo'
  tamanho?: 'pequeno' | 'medio' | 'grande'
  desabilitado?: boolean
  carregando?: boolean
  className?: string
}

export const Botao: React.FC<PropriedadesBotao> = ({
  children,
  onClick,
  tipo = 'button',
  variante = 'primario',
  tamanho = 'medio',
  desabilitado = false,
  carregando = false,
  className = ''
}) => {
  const classesBase = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const classesTamanho = {
    pequeno: 'px-3 py-2 text-sm',
    medio: 'px-4 py-2 text-base',
    grande: 'px-6 py-3 text-lg'
  }

  const classesVariante = {
    primario: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secundario: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    perigo: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300'
  }

  const classesFinais = `
    ${classesBase}
    ${classesTamanho[tamanho]}
    ${classesVariante[variante]}
    ${desabilitado || carregando ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim()

  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={desabilitado || carregando}
      className={classesFinais}
    >
      {carregando && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}