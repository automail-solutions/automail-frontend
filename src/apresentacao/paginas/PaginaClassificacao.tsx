import { useState, useCallback } from 'react'
import { UploadArquivo } from '../componentes/upload/UploadArquivo'
import { InsercaoTexto } from '../componentes/upload/InsercaoTexto'
import { CardResultado } from '../componentes/resultados/CardResultado'
import { RespostaSugerida } from '../componentes/resultados/RespostaSugerida'
import { Botao } from '../componentes/comuns/Botao'
import { Carregando } from '../componentes/comuns/Carregando'
import { useClassificacaoEmail } from '@/aplicacao/hooks/useClassificacaoEmail'
import { ModoEntrada } from '@/dominio/enums/CategoriaEmail'
import { Email, ResultadoClassificacao } from '@/dominio/tipos/Email'
import { MENSAGENS } from '@/dominio/constantes/mensagens'

export const PaginaClassificacao = () => {
  const [modoAtivo, setModoAtivo] = useState<ModoEntrada | null>(null)
  const [emailTexto, setEmailTexto] = useState<Email>({ assunto: '', corpo: '' })
  const [arquivosSelecionados, setArquivosSelecionados] = useState<File[]>([])
  const [indiceResultadoAtual, setIndiceResultadoAtual] = useState(0)

  const {
    carregando,
    resultado,
    erro,
    classificarTexto,
    classificarArquivo,
    classificarArquivos,
    limparEstado
  } = useClassificacaoEmail()

  const handleSelecionarModo = useCallback((modo: ModoEntrada) => {
    setModoAtivo(modo)
    limparEstado()
    setEmailTexto({ assunto: '', corpo: '' })
    setArquivosSelecionados([])
    setIndiceResultadoAtual(0)
  }, [limparEstado])

  const handleClassificar = useCallback(async () => {
    try {
      if (modoAtivo === ModoEntrada.TEXTO && emailTexto.assunto && emailTexto.corpo) {
        await classificarTexto(emailTexto)
      } else if (modoAtivo === ModoEntrada.ARQUIVO && arquivosSelecionados.length > 0) {
        if (arquivosSelecionados.length === 1) {
          await classificarArquivo(arquivosSelecionados[0])
        } else {
          await classificarArquivos(arquivosSelecionados)
        }
      }
    } catch (erro) {
      console.error('Erro na classificação:', erro)
    }
  }, [modoAtivo, emailTexto, arquivosSelecionados, classificarTexto, classificarArquivo, classificarArquivos])

  const handleNovaClassificacao = useCallback(() => {
    setModoAtivo(null)
    limparEstado()
    setEmailTexto({ assunto: '', corpo: '' })
    setArquivosSelecionados([])
    setIndiceResultadoAtual(0)
  }, [limparEstado])

  const isResultadoArray = (resultado: ResultadoClassificacao | ResultadoClassificacao[] | null): resultado is ResultadoClassificacao[] => {
    return Array.isArray(resultado)
  }

  const getResultadoAtual = (): ResultadoClassificacao | null => {
    if (!resultado) return null
    if (isResultadoArray(resultado)) {
      return resultado[indiceResultadoAtual] || null
    }
    return resultado
  }

  const getTotalResultados = (): number => {
    if (!resultado) return 0
    if (isResultadoArray(resultado)) {
      return resultado.length
    }
    return 1
  }

  const handleProximoResultado = useCallback(() => {
    if (isResultadoArray(resultado) && indiceResultadoAtual < resultado.length - 1) {
      setIndiceResultadoAtual(indiceResultadoAtual + 1)
    }
  }, [resultado, indiceResultadoAtual])

  const handleResultadoAnterior = useCallback(() => {
    if (indiceResultadoAtual > 0) {
      setIndiceResultadoAtual(indiceResultadoAtual - 1)
    }
  }, [indiceResultadoAtual])

  const podeClassificar = () => {
    if (modoAtivo === ModoEntrada.TEXTO) {
      return emailTexto.assunto.trim() && emailTexto.corpo.trim()
    }
    if (modoAtivo === ModoEntrada.ARQUIVO) {
      return arquivosSelecionados.length > 0
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {MENSAGENS.INTERFACE.TITULO_PRINCIPAL}
          </h1>
          <p className="text-xl text-gray-600">
            {MENSAGENS.INTERFACE.SUBTITULO}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Seleção de Modo */}
          {!modoAtivo && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                {MENSAGENS.INTERFACE.SELECIONAR_MODO}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleSelecionarModo(ModoEntrada.ARQUIVO)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-blue-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {MENSAGENS.INTERFACE.MODO_ARQUIVO}
                    </h3>
                    <p className="text-gray-600">
                      Envie arquivos .txt ou .pdf
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelecionarModo(ModoEntrada.TEXTO)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-blue-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {MENSAGENS.INTERFACE.MODO_TEXTO}
                    </h3>
                    <p className="text-gray-600">
                      Digite o conteúdo diretamente
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Formulário de Entrada */}
          {modoAtivo && !resultado && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {modoAtivo === ModoEntrada.ARQUIVO ? MENSAGENS.INTERFACE.MODO_ARQUIVO : MENSAGENS.INTERFACE.MODO_TEXTO}
                </h2>
                <Botao
                  onClick={() => setModoAtivo(null)}
                  variante="secundario"
                  tamanho="pequeno"
                >
                  Alterar Modo
                </Botao>
              </div>

              {modoAtivo === ModoEntrada.ARQUIVO ? (
                <UploadArquivo
                  onArquivoSelecionado={setArquivosSelecionados}
                  desabilitado={carregando}
                />
              ) : (
                <InsercaoTexto
                  onTextoAlterado={setEmailTexto}
                  desabilitado={carregando}
                />
              )}

              {erro && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{erro}</p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Botao
                  onClick={handleClassificar}
                  desabilitado={!podeClassificar() || carregando}
                  carregando={carregando}
                  tamanho="grande"
                  className="px-8"
                >
                  {MENSAGENS.INTERFACE.BOTAO_CLASSIFICAR}
                </Botao>
              </div>
            </div>
          )}

          {/* Estado de Carregamento */}
          {carregando && (
            <div className="bg-white rounded-lg shadow-lg p-12">
              <Carregando
                mensagem={MENSAGENS.CARREGANDO.ANALISANDO_EMAIL}
                tamanho="grande"
              />
            </div>
          )}

          {/* Resultados */}
          {resultado && !carregando && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                {isResultadoArray(resultado) && (
                    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 mr-10">
                          <div className="flex items-center space-x-2 max-w-xs">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3
                              className="text-sm font-semibold text-gray-900 truncate"
                              title={getResultadoAtual()?.nomeArquivo || 'Arquivo sem nome'}
                            >
                              {getResultadoAtual()?.nomeArquivo || 'Arquivo sem nome'}
                            </h3>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {indiceResultadoAtual + 1} de {getTotalResultados()}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Botao
                            onClick={handleResultadoAnterior}
                            variante="secundario"
                            tamanho="pequeno"
                            desabilitado={indiceResultadoAtual === 0}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Anterior
                          </Botao>
                          <Botao
                            onClick={handleProximoResultado}
                            variante="secundario"
                            tamanho="pequeno"
                            desabilitado={indiceResultadoAtual >= getTotalResultados() - 1}
                          >
                            Próximo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Botao>
                        </div>
                      </div>
                    </div>
                )}

                <div className="text-center">
                  <Botao
                    onClick={handleNovaClassificacao}
                    variante="primario"
                    tamanho="grande"
                  >
                    {MENSAGENS.INTERFACE.BOTAO_NOVA_CLASSIFICACAO}
                  </Botao>
                </div>
              </div>

              {getResultadoAtual() && (
                <>
                  <CardResultado resultado={getResultadoAtual()!} />
                  <RespostaSugerida
                    resposta={getResultadoAtual()!.respostaSugerida}
                    mostrarNavegacao={isResultadoArray(resultado)}
                    onAnterior={handleResultadoAnterior}
                    onProximo={handleProximoResultado}
                    indiceAtual={indiceResultadoAtual}
                    totalResultados={getTotalResultados()}
                    desabilitadoAnterior={indiceResultadoAtual === 0}
                    desabilitadoProximo={indiceResultadoAtual >= getTotalResultados() - 1}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}