export type LessonLab = {
  title: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  minutes: number;
  goal: string;
  datasetName: string;
  datasetCsv: string;
  code: string;
  expected: string;
  challenge: string;
  hint: string;
};

export const lessonLabs: Record<string, LessonLab> = {
  "ia-mapa": {
    "title": "Comparando regras com um modelo simples",
    "level": "Iniciante",
    "minutes": 20,
    "goal": "Perceber a diferença entre uma regra explícita e uma previsão calculada a partir de exemplos.",
    "datasetName": "leituras_motor.csv",
    "datasetCsv": "rpm,temperatura,alerta_humano\n900,68,0\n1100,71,0\n1300,74,0\n1500,79,0\n1700,83,1\n1900,88,1\n2100,92,1\n2300,97,1",
    "code": "const leituras = [\n  { rpm: 900, temperatura: 68, alerta: 0 },\n  { rpm: 1100, temperatura: 71, alerta: 0 },\n  { rpm: 1300, temperatura: 74, alerta: 0 },\n  { rpm: 1500, temperatura: 79, alerta: 0 },\n  { rpm: 1700, temperatura: 83, alerta: 1 },\n  { rpm: 1900, temperatura: 88, alerta: 1 },\n  { rpm: 2100, temperatura: 92, alerta: 1 },\n  { rpm: 2300, temperatura: 97, alerta: 1 }\n];\n\n// Regra fixa: foi escrita por uma pessoa.\nconst regra = (temperatura) => temperatura >= 85 ? 1 : 0;\n\n// Modelo didático: calcula uma média por classe e compara a leitura.\nconst medias = [0, 1].map(classe => {\n  const grupo = leituras.filter(item => item.alerta === classe);\n  return grupo.reduce((soma, item) => soma + item.temperatura, 0) / grupo.length;\n});\n\nconst novaLeitura = 82;\nconst classeMaisProxima = medias\n  .map((media, classe) => ({ classe, distancia: Math.abs(media - novaLeitura) }))\n  .sort((a, b) => a.distancia - b.distancia)[0].classe;\n\nconsole.log(\"Média sem alerta:\", medias[0].toFixed(1));\nconsole.log(\"Média com alerta:\", medias[1].toFixed(1));\nconsole.log(\"Regra fixa:\", regra(novaLeitura));\nconsole.log(\"Modelo didático:\", classeMaisProxima);\nconsole.log(\"Atenção: exemplo sintético; não é diagnóstico de motor.\");",
    "expected": "O programa compara uma regra de temperatura com um classificador didático baseado na distância entre médias. Os resultados podem divergir: isso é justamente o que deve ser analisado.",
    "challenge": "Mude a nova leitura para 90. Depois acrescente um ponto extremo aos dados e observe como as médias mudam.",
    "hint": "A regra usa um limite fixo. O modelo resume os exemplos de cada classe; nenhum dos dois é automaticamente correto."
  },
  "tipos-aprendizado": {
    "title": "Classificação e agrupamento de leituras",
    "level": "Iniciante",
    "minutes": 25,
    "goal": "Comparar uma tarefa supervisionada com uma exploração não supervisionada usando o mesmo conjunto de dados.",
    "datasetName": "vibracao.csv",
    "datasetCsv": "id,rms,rotacao,falha_confirmada\nA,1.2,900,0\nB,1.4,950,0\nC,1.1,920,0\nD,3.8,1800,1\nE,4.1,1850,1\nF,3.6,1780,1",
    "code": "const dados = [\n  { id: \"A\", rms: 1.2, rpm: 900, falha: 0 },\n  { id: \"B\", rms: 1.4, rpm: 950, falha: 0 },\n  { id: \"C\", rms: 1.1, rpm: 920, falha: 0 },\n  { id: \"D\", rms: 3.8, rpm: 1800, falha: 1 },\n  { id: \"E\", rms: 4.1, rpm: 1850, falha: 1 },\n  { id: \"F\", rms: 3.6, rpm: 1780, falha: 1 }\n];\n\n// Supervisionado: os rótulos de falha já são conhecidos.\nconst rotulos = dados.map(item => ({ id: item.id, classeConhecida: item.falha }));\n\n// Não supervisionado simplificado: separa por uma distância RMS definida\n// para este exercício; não aprende grupos automaticamente.\nconst grupos = dados.map(item => ({\n  id: item.id,\n  grupoExploratorio: item.rms < 2 ? \"baixo RMS\" : \"alto RMS\"\n}));\n\nconsole.log(\"Rótulos disponíveis:\", rotulos);\nconsole.log(\"Grupos exploratórios:\", grupos);\nconsole.log(\"Importante: agrupamento não comprova modo de falha.\");",
    "expected": "Os seis registros aparecem com seus rótulos e com grupos exploratórios. O exercício mostra a diferença de informação disponível, não treina um algoritmo sofisticado.",
    "challenge": "Troque o limite de RMS de 2 para 3. Quais registros mudam de grupo? O que acontece se a rotação variar muito?",
    "hint": "Supervisionado usa a coluna de resposta conhecida. Não supervisionado não recebe essa coluna como alvo; aqui usamos um corte manual apenas para ilustrar agrupamento."
  },
  "pipeline-ia": {
    "title": "Auditoria de dados e prevenção de vazamento",
    "level": "Iniciante",
    "minutes": 30,
    "goal": "Encontrar dados ausentes e reconhecer uma variável que só existe depois do evento previsto.",
    "datasetName": "ordens_manutencao.csv",
    "datasetCsv": "ordem,horas_operacao,temperatura,diagnostico_final,intervencao_realizada\n101,1200,72,normal,nao\n102,1500,89,falha,sim\n103,1400,,normal,nao\n104,1800,94,falha,sim",
    "code": "const registros = [\n  { ordem: 101, horas: 1200, temperatura: 72, diagnosticoFinal: \"normal\", intervencao: \"nao\" },\n  { ordem: 102, horas: 1500, temperatura: 89, diagnosticoFinal: \"falha\", intervencao: \"sim\" },\n  { ordem: 103, horas: 1400, temperatura: null, diagnosticoFinal: \"normal\", intervencao: \"nao\" },\n  { ordem: 104, horas: 1800, temperatura: 94, diagnosticoFinal: \"falha\", intervencao: \"sim\" }\n];\n\nconst campos = [\"horas\", \"temperatura\", \"diagnosticoFinal\", \"intervencao\"];\nfor (const campo of campos) {\n  const ausentes = registros.filter(item => item[campo] === null || item[campo] === \"\").length;\n  console.log(campo + \": \" + ausentes + \" valor(es) ausente(s)\");\n}\n\n// Se o objetivo é prever falha antes da manutenção,\n// diagnosticoFinal e intervencao não podem entrar como preditores.\nconst disponiveisAntesDaDecisao = [\"horas\", \"temperatura\"];\nconsole.log(\"Preditores permitidos no cenário:\", disponiveisAntesDaDecisao);\nconsole.log(\"Campos suspeitos de vazamento:\", [\"diagnosticoFinal\", \"intervencao\"]);",
    "expected": "O campo temperatura possui um valor ausente. Diagnóstico final e intervenção são informações posteriores ao evento e não devem ser usadas para prever antecipadamente esse mesmo evento.",
    "challenge": "Adicione um campo data_confirmacao e explique por que ele também pode vazar informação. Proponha como tratar a temperatura ausente sem apagar a linha.",
    "hint": "Pergunte sempre: esta informação já estaria disponível no instante em que o sistema precisaria fazer a previsão?"
  },
  "anomalias": {
    "title": "Detectando leituras incomuns com z-score",
    "level": "Intermediário",
    "minutes": 30,
    "goal": "Calcular média, desvio-padrão e z-score, entendendo por que um valor extremo é apenas um sinal para investigar.",
    "datasetName": "temperatura.csv",
    "datasetCsv": "amostra,temperatura_c\n1,70\n2,71\n3,69\n4,72\n5,70\n6,71\n7,95",
    "code": "const valores = [70, 71, 69, 72, 70, 71, 95];\nconst media = valores.reduce((s, x) => s + x, 0) / valores.length;\nconst variancia = valores.reduce((s, x) => s + (x - media) ** 2, 0) / valores.length;\nconst desvio = Math.sqrt(variancia);\n\nconsole.log(\"Média:\", media.toFixed(2));\nconsole.log(\"Desvio-padrão:\", desvio.toFixed(2));\n\nfor (const valor of valores) {\n  const z = (valor - media) / desvio;\n  console.log(\"Leitura \" + valor + \" °C | z-score = \" + z.toFixed(2) +\n    (Math.abs(z) >= 2 ? \" | investigar\" : \" | dentro da faixa didática\"));\n}\nconsole.log(\"Limite ±2 é didático; não é limite de segurança de equipamento.\");",
    "expected": "A leitura de 95 °C terá z-score elevado em relação às demais. O critério ±2 é apenas demonstrativo e precisa ser calibrado e contextualizado em qualquer aplicação real.",
    "challenge": "Remova 95 e acrescente 80. Compare o z-score. Depois acrescente uma leitura legítima de partida a frio e discuta por que regime operacional importa.",
    "hint": "Z-score mede distância em desvios-padrão em relação à média. Distribuições assimétricas e valores extremos podem distorcer a interpretação."
  },
  "preditiva": {
    "title": "Tendência e estimativa didática de degradação",
    "level": "Intermediário",
    "minutes": 35,
    "goal": "Calcular média móvel e ajustar uma reta simples a uma tendência sintética, sem confundir projeção com previsão confiável de falha.",
    "datasetName": "vibracao_por_ciclo.csv",
    "datasetCsv": "ciclo,rms\n1,1.0\n2,1.1\n3,1.2\n4,1.4\n5,1.6\n6,1.8\n7,2.0",
    "code": "const serie = [1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 2.0];\nconst janela = 3;\n\nconst mediasMoveis = serie.map((_, indice) => {\n  const inicio = Math.max(0, indice - janela + 1);\n  const trecho = serie.slice(inicio, indice + 1);\n  return trecho.reduce((s, x) => s + x, 0) / trecho.length;\n});\n\n// Regressão linear simples: y = a + b*x.\nconst xs = serie.map((_, i) => i + 1);\nconst n = xs.length;\nconst mediaX = xs.reduce((s, x) => s + x, 0) / n;\nconst mediaY = serie.reduce((s, y) => s + y, 0) / n;\nconst b = xs.reduce((s, x, i) => s + (x - mediaX) * (serie[i] - mediaY), 0) /\n  xs.reduce((s, x) => s + (x - mediaX) ** 2, 0);\nconst a = mediaY - b * mediaX;\n\nconsole.log(\"Médias móveis:\", mediasMoveis.map(x => x.toFixed(2)));\nconsole.log(\"Inclinação por ciclo:\", b.toFixed(3));\nconsole.log(\"Projeção didática para ciclo 8:\", (a + b * 8).toFixed(2));\nconsole.log(\"Não interprete a projeção como RUL validada.\");",
    "expected": "A série mostra crescimento e a regressão projeta o valor do próximo ciclo. Isso não estima vida útil remanescente sem critério de falha, dados representativos e validação.",
    "challenge": "Altere o ponto do ciclo 4 para 2.4. Compare a inclinação. Depois explique por que uma mudança de carga poderia criar uma falsa tendência.",
    "hint": "A média móvel suaviza ruído. A regressão ajusta uma linha. Nenhuma delas entende sozinha o contexto físico do equipamento."
  },
  "visao-qualidade": {
    "title": "Inspeção visual: matriz de confusão",
    "level": "Intermediário",
    "minutes": 30,
    "goal": "Calcular precision e recall e entender o custo de falsos negativos em inspeção.",
    "datasetName": "inspecao_resultados.csv",
    "datasetCsv": "peca,defeito_real,modelo\nP01,1,1\nP02,1,0\nP03,1,1\nP04,0,1\nP05,0,0\nP06,0,0\nP07,1,0\nP08,0,0",
    "code": "const casos = [\n  { real: 1, previsto: 1 }, { real: 1, previsto: 0 },\n  { real: 1, previsto: 1 }, { real: 0, previsto: 1 },\n  { real: 0, previsto: 0 }, { real: 0, previsto: 0 },\n  { real: 1, previsto: 0 }, { real: 0, previsto: 0 }\n];\n\nlet tp = 0, fp = 0, fn = 0, tn = 0;\nfor (const caso of casos) {\n  if (caso.real === 1 && caso.previsto === 1) tp++;\n  else if (caso.real === 0 && caso.previsto === 1) fp++;\n  else if (caso.real === 1 && caso.previsto === 0) fn++;\n  else tn++;\n}\nconst precision = tp / (tp + fp);\nconst recall = tp / (tp + fn);\n\nconsole.log({ verdadeirosPositivos: tp, falsosPositivos: fp,\n  falsosNegativos: fn, verdadeirosNegativos: tn });\nconsole.log(\"Precision:\", (precision * 100).toFixed(1) + \"%\");\nconsole.log(\"Recall:\", (recall * 100).toFixed(1) + \"%\");\nconsole.log(\"Falsos negativos merecem análise de risco na inspeção.\");",
    "expected": "O exercício contabiliza acertos e erros. Precision responde: entre os itens sinalizados, quantos realmente tinham defeito? Recall responde: entre os defeitos reais, quantos foram encontrados?",
    "challenge": "Ajuste os resultados para reduzir falsos negativos, mesmo que aumentem falsos positivos. Discuta o impacto de retrabalho versus defeito não detectado.",
    "hint": "Precision = TP/(TP+FP). Recall = TP/(TP+FN). A métrica prioritária depende do custo do erro e do processo de inspeção."
  },
  "rag": {
    "title": "Mini-RAG lexical com citações de origem",
    "level": "Intermediário",
    "minutes": 35,
    "goal": "Construir uma busca lexical pequena e retornar trechos com identificador de fonte, entendendo o que falta para um RAG de produção.",
    "datasetName": "trechos_documentos.csv",
    "datasetCsv": "id,documento,pagina,texto\nD01,Manual didático A,4,Verificar nível de óleo antes da operação\nD02,Manual didático A,8,Investigar aumento anormal de temperatura\nD03,Procedimento B,2,Registrar vibração e condição de carga",
    "code": "const documentos = [\n  { id: \"D01\", documento: \"Manual didático A\", pagina: 4, texto: \"Verificar nível de óleo antes da operação\" },\n  { id: \"D02\", documento: \"Manual didático A\", pagina: 8, texto: \"Investigar aumento anormal de temperatura\" },\n  { id: \"D03\", documento: \"Procedimento B\", pagina: 2, texto: \"Registrar vibração e condição de carga\" }\n];\n\nfunction tokens(texto) {\n  return texto.toLowerCase().normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\")\n    .split(/[^a-z0-9]+/).filter(Boolean);\n}\nfunction buscar(pergunta) {\n  const termos = new Set(tokens(pergunta));\n  return documentos.map(doc => {\n    const palavras = tokens(doc.texto);\n    const pontuacao = palavras.filter(palavra => termos.has(palavra)).length;\n    return { ...doc, pontuacao };\n  }).filter(doc => doc.pontuacao > 0)\n    .sort((a, b) => b.pontuacao - a.pontuacao);\n}\n\nconst resultados = buscar(\"temperatura anormal\");\nconsole.log(\"Trechos recuperados:\", resultados);\nconsole.log(\"A resposta deve citar documento e página.\");\nconsole.log(\"Sem resultado não significa que o procedimento não exista.\");",
    "expected": "A busca retorna o trecho D02, acompanhado do nome do documento e da página. É uma busca lexical, não embeddings nem um sistema RAG completo.",
    "challenge": "Experimente a pergunta 'calor excessivo'. Por que a busca lexical pode não recuperar 'temperatura'? Que papel embeddings ou sinônimos poderiam desempenhar?",
    "hint": "Um RAG precisa de ingestão, metadados, recuperação, filtros de versão, geração ancorada e avaliação. Nunca invente uma citação."
  },
  "automacao-mcp": {
    "title": "Automação idempotente com validação",
    "level": "Intermediário",
    "minutes": 25,
    "goal": "Simular um fluxo que valida uma solicitação e evita criar duas ordens com o mesmo identificador.",
    "datasetName": "solicitacoes.csv",
    "datasetCsv": "id,cliente,assunto\nREQ-01,Cliente A,Agendamento\nREQ-02,Cliente B,Orçamento\nREQ-01,Cliente A,Agendamento",
    "code": "const solicitacoes = [\n  { id: \"REQ-01\", cliente: \"Cliente A\", assunto: \"Agendamento\" },\n  { id: \"REQ-02\", cliente: \"Cliente B\", assunto: \"Orçamento\" },\n  { id: \"REQ-01\", cliente: \"Cliente A\", assunto: \"Agendamento\" }\n];\nconst ordensCriadas = new Map();\n\nfunction processar(item) {\n  if (!item.id || !item.cliente || !item.assunto) {\n    return { status: \"rejeitada\", motivo: \"Campo obrigatório ausente\" };\n  }\n  if (ordensCriadas.has(item.id)) {\n    return { status: \"ignorada\", motivo: \"Solicitação já processada\", id: item.id };\n  }\n  ordensCriadas.set(item.id, { ...item, status: \"aguardando aprovação humana\" });\n  return { status: \"criada\", id: item.id };\n}\n\nfor (const item of solicitacoes) console.log(processar(item));\nconsole.log(\"Total de ordens:\", ordensCriadas.size);\nconsole.log(\"Nenhuma ação técnica ou compra foi executada.\");",
    "expected": "A primeira solicitação é criada, a segunda também e a repetida é ignorada. Isso ilustra idempotência em uma simulação local.",
    "challenge": "Adicione um item sem cliente. Depois simule uma falha entre gravar a ordem e enviar uma notificação. Como evitar perder ou duplicar o evento?",
    "hint": "Em sistemas reais, use chave idempotente persistida no banco, transações ou padrão outbox, logs e autorização para ações externas."
  },
  "engenharia": {
    "title": "Cálculo de tensão axial e verificação de unidade",
    "level": "Iniciante",
    "minutes": 25,
    "goal": "Aplicar uma equação de engenharia simples e validar unidades antes de pensar em um modelo de IA.",
    "datasetName": "casos_tracao.csv",
    "datasetCsv": "caso,forca_n,area_mm2\nA,10000,100\nB,15000,150\nC,20000,125",
    "code": "const casos = [\n  { id: \"A\", forcaN: 10000, areaMm2: 100 },\n  { id: \"B\", forcaN: 15000, areaMm2: 150 },\n  { id: \"C\", forcaN: 20000, areaMm2: 125 }\n];\n\nfor (const caso of casos) {\n  // N / mm² = MPa\n  const tensaoMPa = caso.forcaN / caso.areaMm2;\n  console.log(caso.id + \": \" + tensaoMPa.toFixed(1) + \" MPa\");\n}\nconsole.log(\"Este cálculo idealizado não inclui concentração de tensão, fadiga ou fator de segurança.\");",
    "expected": "As tensões são calculadas em MPa porque 1 N/mm² equivale a 1 MPa. A equação simples é uma referência física, não uma análise completa de componente.",
    "challenge": "Converta a área para m² e calcule o resultado em Pa. Compare os valores e explique por que misturar mm² e m² sem conversão gera erro de um milhão.",
    "hint": "Antes de usar ML em engenharia, crie uma referência física verificável, confira unidade e hipóteses."
  },
  "negocios": {
    "title": "Calculadora de custo, preço e margem de um serviço",
    "level": "Iniciante",
    "minutes": 20,
    "goal": "Estimar custo operacional e preço mínimo para uma oferta de serviço com IA.",
    "datasetName": "custos_servico.csv",
    "datasetCsv": "item,valor_brl\nhoras,4\nvalor_hora,35\nferramentas,25\nimpostos_percentual,8\nmargem_alvo_percentual,25",
    "code": "const horas = 4;\nconst valorHora = 35;\nconst ferramentas = 25;\nconst impostos = 0.08;\nconst margemAlvo = 0.25;\n\nconst custo = horas * valorHora + ferramentas;\n// Preço P com imposto e margem calculados sobre o preço de venda.\nconst preco = custo / (1 - impostos - margemAlvo);\nconst impostoEstimado = preco * impostos;\nconst margemEmReais = preco * margemAlvo;\n\nconsole.log(\"Custo estimado: R$ \" + custo.toFixed(2));\nconsole.log(\"Preço de referência: R$ \" + preco.toFixed(2));\nconsole.log(\"Impostos estimados: R$ \" + impostoEstimado.toFixed(2));\nconsole.log(\"Margem alvo: R$ \" + margemEmReais.toFixed(2));\nconsole.log(\"Validar enquadramento tributário e custos omitidos.\");",
    "expected": "O script calcula um preço que cobre custo direto, percentual estimado de impostos e margem-alvo. Não substitui contador nem considera todos os custos indiretos.",
    "challenge": "Inclua 1 hora de suporte pós-entrega e custo de aquisição do cliente. Como o preço muda? Qual parte do escopo precisa ser limitada?",
    "hint": "Preço não é só o tempo que a IA leva. Inclua descoberta, revisão, suporte, ferramentas, impostos, risco e margem."
  },
  "trend-motores": {
    "title": "Normalização didática de tendência por condição",
    "level": "Avançado",
    "minutes": 35,
    "goal": "Perceber que parâmetros de motor não devem ser comparados sem considerar a condição operacional e sem método documentado.",
    "datasetName": "trend_sintetico.csv",
    "datasetCsv": "amostra,condicao,egt_c\n1,A,650\n2,A,652\n3,B,680\n4,B,682\n5,A,655",
    "code": "const amostras = [\n  { id: 1, condicao: \"A\", egt: 650 },\n  { id: 2, condicao: \"A\", egt: 652 },\n  { id: 3, condicao: \"B\", egt: 680 },\n  { id: 4, condicao: \"B\", egt: 682 },\n  { id: 5, condicao: \"A\", egt: 655 }\n];\n\n// Demonstração: comparar cada amostra somente com sua condição.\nconst grupos = {};\nfor (const item of amostras) {\n  (grupos[item.condicao] ??= []).push(item.egt);\n}\nfor (const [condicao, valores] of Object.entries(grupos)) {\n  const media = valores.reduce((s, x) => s + x, 0) / valores.length;\n  console.log(\"Condição \" + condicao + \" | média EGT sintética: \" + media.toFixed(1) + \" °C\");\n}\nconsole.log(\"Dados fictícios. Não são limites nem parâmetros de um motor real.\");\nconsole.log(\"Normalização aeronáutica exige metodologia e dados aplicáveis aprovados.\");",
    "expected": "As médias são calculadas separadamente para as condições A e B, evitando uma comparação bruta enganosa. O exercício não implementa correção aeronáutica real.",
    "challenge": "Misture as condições e calcule uma média única. Explique por que isso pode esconder tendências. Quais outros metadados seriam necessários?",
    "hint": "Registre configuração, potência, altitude, temperatura ambiente, bleed, instrumento, revisão do método e demais condições aplicáveis."
  },
  "visao-defeitos": {
    "title": "Projeto progressivo: avaliação de detector de defeitos",
    "level": "Avançado",
    "minutes": 40,
    "goal": "Criar uma matriz de confusão e definir uma política de encaminhamento para casos incertos.",
    "datasetName": "deteccao_defeitos.csv",
    "datasetCsv": "peca,real,score\nP01,1,0.92\nP02,1,0.48\nP03,0,0.71\nP04,0,0.18\nP05,1,0.83\nP06,0,0.42",
    "code": "const amostras = [\n  { id: \"P01\", real: 1, score: 0.92 },\n  { id: \"P02\", real: 1, score: 0.48 },\n  { id: \"P03\", real: 0, score: 0.71 },\n  { id: \"P04\", real: 0, score: 0.18 },\n  { id: \"P05\", real: 1, score: 0.83 },\n  { id: \"P06\", real: 0, score: 0.42 }\n];\nconst limiar = 0.7;\nconst zonaRevisao = [0.4, 0.7];\nlet tp = 0, fp = 0, fn = 0, tn = 0;\n\nfor (const item of amostras) {\n  const previsto = item.score >= limiar ? 1 : 0;\n  if (item.score >= zonaRevisao[0] && item.score < zonaRevisao[1]) {\n    console.log(item.id + \": revisão humana (score \" + item.score + \")\");\n  }\n  if (item.real && previsto) tp++;\n  else if (!item.real && previsto) fp++;\n  else if (item.real && !previsto) fn++;\n  else tn++;\n}\nconsole.log({ tp, fp, fn, tn });\nconsole.log(\"A zona de revisão é uma política de triagem didática, não critério de aceitação.\");",
    "expected": "O programa calcula resultados para um limiar e identifica uma zona intermediária de revisão. A política real depende de validação e análise de risco.",
    "challenge": "Altere o limiar para 0.5 e compare falsos positivos e negativos. Defina quando uma imagem deve ser recusada por baixa qualidade.",
    "hint": "Uma confiança numérica não substitui calibração, validação por classe, qualidade de imagem nem decisão técnica."
  }
};
