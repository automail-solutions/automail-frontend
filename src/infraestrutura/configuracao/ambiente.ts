interface VariaveisAmbiente {
  API_BASE_URL: string
  ENVIRONMENT: string
  MAX_FILE_SIZE: number
  DEV: boolean
  PROD: boolean
}

export const ambiente: VariaveisAmbiente = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
}

// Validação das variáveis de ambiente
if (!ambiente.API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL é obrigatória')
}

export default ambiente