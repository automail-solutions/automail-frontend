import React from 'react'

interface PropriedadesCarregando {
  mensagem?: string
  tamanho?: 'pequeno' | 'medio' | 'grande'
  className?: string
}

export const Carregando: React.FC<PropriedadesCarregando> = ({
  mensagem = 'Carregando...',
  tamanho = 'medio',
  className = ''
}) => {
  const tamanhoSpinner = {
    pequeno: 'h-6 w-6',
    medio: 'h-8 w-8',
    grande: 'h-12 w-12'
  }

  const tamanhoTexto = {
    pequeno: 'text-sm',
    medio: 'text-base',
    grande: 'text-lg'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`animate-spin ${tamanhoSpinner[tamanho]}`}>
        <svg className="w-full h-full text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>
      </div>
      <p className={`text-gray-600 ${tamanhoTexto[tamanho]}`}>
        {mensagem}
      </p>
    </div>
  )
}