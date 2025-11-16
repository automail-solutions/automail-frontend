export const formatarTempo = (segundos: number): string => {
  if (segundos < 1) {
    return `${Math.round(segundos * 1000)}ms`
  }
  return `${segundos.toFixed(2)}s`
}

export const formatarConfianca = (confianca: number): string => {
  return `${Math.round(confianca * 100)}%`
}

export const formatarTamanhoArquivo = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const tamanhos = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + tamanhos[i]
}

export const copiarParaAreaTransferencia = async (texto: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    // Fallback para navegadores mais antigos
    try {
      const elementoTexto = document.createElement('textarea')
      elementoTexto.value = texto
      document.body.appendChild(elementoTexto)
      elementoTexto.select()
      document.execCommand('copy')
      document.body.removeChild(elementoTexto)
      return true
    } catch {
      return false
    }
  }
}

export const truncarTexto = (texto: string, tamanhoMaximo: number): string => {
  if (texto.length <= tamanhoMaximo) return texto
  return texto.substring(0, tamanhoMaximo) + '...'
}