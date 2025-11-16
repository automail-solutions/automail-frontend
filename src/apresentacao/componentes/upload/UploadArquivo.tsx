import React, { useCallback, useState } from 'react'
import { useValidacao } from '@/aplicacao/hooks/useValidacao'
import { MENSAGENS } from '@/dominio/constantes/mensagens'
import { formatarTamanhoArquivo } from '@/compartilhado/utils/formatadores'

interface PropriedadesUploadArquivo {
  onArquivoSelecionado: (arquivos: File[]) => void
  desabilitado?: boolean
}

export const UploadArquivo: React.FC<PropriedadesUploadArquivo> = ({
  onArquivoSelecionado,
  desabilitado = false
}) => {
  const [arquivosSelecionados, setArquivosSelecionados] = useState<File[]>([])
  const [arrastando, setArrastando] = useState(false)
  const { validarCampoArquivo, obterErro } = useValidacao()

  const processarArquivos = useCallback((arquivos: File[]) => {
    const arquivosValidos = arquivos.filter(arquivo => validarCampoArquivo(arquivo))
    if (arquivosValidos.length > 0) {
      setArquivosSelecionados(arquivosValidos)
      onArquivoSelecionado(arquivosValidos)
    }
  }, [validarCampoArquivo, onArquivoSelecionado])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setArrastando(false)

    if (desabilitado) return

    const arquivos = Array.from(e.dataTransfer.files)
    if (arquivos.length > 0) {
      processarArquivos(arquivos)
    }
  }, [processarArquivos, desabilitado])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!desabilitado) {
      setArrastando(true)
    }
  }, [desabilitado])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setArrastando(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivos = e.target.files
    if (arquivos && arquivos.length > 0) {
      processarArquivos(Array.from(arquivos))
    }
  }, [processarArquivos])

  const erro = obterErro('arquivo')

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${arrastando ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
          ${desabilitado ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'}
          ${erro ? 'border-red-400 bg-red-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !desabilitado && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".txt,.pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={desabilitado}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {MENSAGENS.INTERFACE.ARRASTAR_ARQUIVO}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {MENSAGENS.INTERFACE.TIPOS_ACEITOS}
            </p>
          </div>
        </div>
      </div>

      {arquivosSelecionados.length > 0 && !erro && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 text-green-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-900">
              {arquivosSelecionados.length} arquivo(s) selecionado(s)
            </p>
          </div>
          <div className="space-y-1">
            {arquivosSelecionados.map((arquivo, index) => (
              <div key={index} className="text-xs text-green-700">
                {arquivo.name} ({formatarTamanhoArquivo(arquivo.size)})
              </div>
            ))}
          </div>
        </div>
      )}

      {erro && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      )}
    </div>
  )
}