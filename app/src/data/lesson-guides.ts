export type LessonGuide = {
  lead: string;
  sections: { title:string; explanation:string; points:string[] }[];
  equation?: string;
  lab: { step:string; detail:string }[];
  code?: string;
  assessment: string[];
  references: { title:string; url:string }[];
};

export const lessonGuides: Record<string, LessonGuide> = {
 "ia-mapa": {
  lead:"A pergunta central não é “qual ferramenta de IA devo usar?”, mas “qual problema preciso resolver, que evidência tenho e que tipo de sistema é adequado?”. IA é um campo de métodos; machine learning é uma família de métodos que ajustam modelos a dados; deep learning é uma família de machine learning baseada em redes neurais com múltiplas camadas.",
  sections:[
   {title:"1. Inteligência artificial é o campo, não um único algoritmo",explanation:"IA reúne métodos para construir sistemas que percebem, representam conhecimento, raciocinam, planejam, aprendem ou geram conteúdo. Há sistemas baseados em regras, busca, otimização, lógica, probabilidades e aprendizado estatístico. Um termostato com regra fixa é automação; um planejador que busca uma sequência de ações pode ser IA sem necessariamente usar aprendizado de máquina.",points:["Sistema baseado em regras: comportamento especificado explicitamente por pessoas.","Busca e planejamento: explora estados e ações para encontrar uma solução.","Machine learning: ajusta parâmetros a partir de exemplos ou interação.","IA generativa: modela distribuições e produz novas sequências, imagens, áudio ou outros dados."]},
   {title:"2. O que é um modelo de aprendizado de máquina",explanation:"Um modelo é uma função parametrizada. Recebe uma entrada x e produz uma previsão ŷ. Durante o treinamento, um algoritmo ajusta os parâmetros θ para reduzir uma função de perda em exemplos. O modelo não “entende” automaticamente o significado dos dados; ele aprende regularidades úteis para uma tarefa e distribuição específicas.",points:["Entrada: características disponíveis no momento da previsão.","Parâmetros: valores internos ajustados no treinamento.","Perda: medida matemática de quão distante a previsão está do alvo.","Generalização: capacidade de funcionar em dados novos, não usados no ajuste."]},
   {title:"3. Deep learning: representações aprendidas em camadas",explanation:"Redes profundas compõem várias transformações. Camadas iniciais podem representar padrões simples e camadas posteriores combinar esses padrões em estruturas mais complexas. Em imagens, filtros podem responder a bordas e texturas; em linguagem, representações contextuais ajudam a modelar relações entre tokens. Mais camadas e parâmetros aumentam capacidade, mas também custo, necessidade de dados e risco de sobreajuste.",points:["Uma rede neural é uma composição de operações matemáticas e funções não lineares.","O treinamento usa gradientes e otimização para ajustar pesos.","Deep learning não é sempre melhor: modelos simples podem ser mais baratos, interpretáveis e robustos em dados tabulares pequenos."]},
   {title:"4. Como escolher a abordagem",explanation:"Comece pela tarefa e pelo custo de errar. Se a regra é clara e estável, uma regra explícita pode ser superior. Se há dados rotulados e uma saída definida, classificação ou regressão podem servir. Se não há rótulos, métodos não supervisionados podem explorar estrutura. Se a saída é linguagem flexível, um LLM pode ajudar, mas exige avaliação e controles.",points:["Defina a unidade de análise, a entrada, a saída e a decisão apoiada.","Estabeleça uma linha de base simples antes de testar modelos complexos.","Compare desempenho, latência, custo, manutenção, explicabilidade e risco.","Não automatize uma decisão crítica apenas porque o modelo apresenta uma métrica alta."]}
  ],
  equation:"Modelo: ŷ = f(x; θ)  |  Treinamento: θ* = argminθ (1/n) Σᵢ L(f(xᵢ; θ), yᵢ)",
  lab:[
   {step:"Defina um problema",detail:"Exemplo: classificar mensagens de suporte em três categorias. Especifique quem usará a previsão e o que acontece quando o modelo erra."},
   {step:"Construa uma linha de base",detail:"Implemente uma regra simples ou classificador majoritário. Registre a métrica antes de tentar uma rede neural."},
   {step:"Treine e separe dados",detail:"Separe treino, validação e teste antes de ajustar hiperparâmetros. Nunca use o conjunto de teste para escolher o modelo."},
   {step:"Analise erros",detail:"Inspecione exemplos classificados incorretamente. Agrupe erros por categoria, origem dos dados e impacto para o usuário."}
  ],
  code:`# Exemplo conceitual: modelo como função
# x = características de uma observação
# theta = parâmetros aprendidos no treinamento

def prever(x, theta):
    return modelo(x, theta)

# O treinamento procura parâmetros que reduzam a perda.
# O teste mede a generalização em dados não vistos.`,
  assessment:["Explique por que toda rede neural é um modelo de machine learning, mas nem todo sistema de IA é uma rede neural.","Dê um exemplo em que uma regra explícita é preferível a deep learning.","Por que medir desempenho apenas nos dados de treinamento não demonstra generalização?"],
  references:[{title:"Google Machine Learning Crash Course",url:"https://developers.google.com/machine-learning/crash-course"},{title:"Stanford CS229",url:"https://cs229.stanford.edu/"}]
 },
 "tipos-aprendizado":{
  lead:"A diferença entre os paradigmas de aprendizado está na informação disponível durante o ajuste e no tipo de objetivo. A escolha depende da pergunta, não da popularidade do algoritmo.",
  sections:[
   {title:"1. Aprendizado supervisionado",explanation:"Cada exemplo contém uma entrada x e um alvo y conhecido. O algoritmo aprende uma relação para prever y em exemplos futuros. Classificação prevê categorias; regressão prevê valores numéricos. A qualidade depende da representatividade dos exemplos e da qualidade dos rótulos.",points:["Classificação: fraude/não fraude, espécie A/B/C, defeito/tipo de defeito.","Regressão: demanda, temperatura, tempo estimado ou consumo.","Risco: rótulos inconsistentes, classes raras e vazamento de informação."]},
   {title:"2. Aprendizado não supervisionado",explanation:"Os dados não vêm acompanhados de uma resposta-alvo para cada observação. O objetivo pode ser encontrar grupos, reduzir dimensões ou identificar observações incomuns. Um agrupamento é uma hipótese sobre estrutura, não uma verdade automática sobre o mundo.",points:["Clusterização agrupa observações segundo uma medida de similaridade.","Redução de dimensionalidade comprime representações preservando parte da estrutura.","Detecção de anomalias sinaliza observações raras; raridade não significa necessariamente defeito."]},
   {title:"3. Aprendizado por reforço",explanation:"Um agente interage com um ambiente. Em cada estado escolhe uma ação, recebe uma recompensa e observa um novo estado. O objetivo é aprender uma política que maximize retorno acumulado. Explorar pode revelar ações melhores, mas pode ter custo ou risco no ambiente real.",points:["Estado: informação usada para representar a situação atual.","Ação: escolha disponível ao agente.","Recompensa: sinal numérico definido pelo projeto.","Política: estratégia que relaciona estados a ações."]},
   {title:"4. Paradigmas combinados",explanation:"Projetos reais podem misturar paradigmas: pré-treinamento auto-supervisionado, ajuste supervisionado, feedback humano, busca e regras de segurança. Em dados escassos, transferência de aprendizado e aprendizado semi-supervisionado podem reduzir a necessidade de rótulos.",points:["Auto-supervisionado: o próprio dado fornece sinais de treinamento, como prever partes ocultas.","Semi-supervisionado: combina poucos exemplos rotulados com muitos não rotulados.","Transferência: reutiliza representações aprendidas em outra tarefa ou conjunto de dados."]}
  ],
  equation:"Supervisionado: minimizar Σ L(f(xᵢ), yᵢ)  |  Reforço: maximizar E[Σₜ γᵗ rₜ]",
  lab:[
   {step:"Monte três problemas",detail:"Classificar e-mails rotulados, agrupar leituras de sensores sem rótulos e controlar um agente em um ambiente simulado."},
   {step:"Escolha métricas adequadas",detail:"Classificação: precisão, recall e F1. Agrupamento: análise de separação e interpretação. Reforço: retorno médio e estabilidade entre execuções."},
   {step:"Compare a interpretação",detail:"Explique o que cada método aprende e o que não pode concluir a partir dos dados disponíveis."}
  ],
  assessment:["Por que agrupar sensores por similaridade não prova que cada grupo representa um modo de falha?","Qual a diferença entre classificação e regressão?","Por que treinar por reforço em um ambiente simulado reduz, mas não elimina, o risco de implantação?"],
  references:[{title:"Google ML Crash Course — tipos de aprendizado",url:"https://developers.google.com/machine-learning/crash-course"},{title:"Reinforcement Learning: An Introduction",url:"http://incompleteideas.net/book/the-book-2nd.html"}]
 },
 "pipeline-ia":{
  lead:"Um modelo é apenas uma parte de um sistema. O resultado depende da coleta, definição do alvo, preparação, divisão dos dados, treinamento, avaliação, implantação e monitoramento. Erros nas etapas anteriores não são corrigidos magicamente por um algoritmo sofisticado.",
  sections:[
   {title:"1. Definição do problema e do alvo",explanation:"Transforme uma necessidade operacional em uma pergunta mensurável. Defina a unidade de previsão, o instante em que a previsão será feita, o horizonte temporal, a população atendida e a ação decorrente. Um alvo mal definido produz métricas aparentemente boas e decisões ruins.",points:["Especifique o que será previsto e para quem.","Defina quando cada variável estaria disponível no uso real.","Estabeleça custo de falsos positivos e falsos negativos.","Registre uma linha de base operacional."]},
   {title:"2. Coleta, qualidade e preparação",explanation:"Dados podem conter ausências, duplicatas, unidades incompatíveis, erros de sensor, rótulos ambíguos e mudanças de procedimento. Cada transformação deve ser documentada e reproduzível. Ajuste transformações como normalização usando somente o conjunto de treinamento.",points:["Verifique tipos, faixas, unidades, timestamps e identificadores.","Investigue valores ausentes e valores extremos antes de removê-los.","Evite misturar observações da mesma pessoa, máquina ou período entre treino e teste quando isso causar vazamento.","Mantenha linhagem: origem, versão, licença e responsável pelos dados."]},
   {title:"3. Treinamento e validação",explanation:"Treino ajusta parâmetros; validação ajuda a escolher modelos e hiperparâmetros; teste estima o desempenho final em dados que permaneceram intocados. Em séries temporais, a divisão deve respeitar a ordem do tempo. Em dados agrupados, a divisão deve respeitar a entidade.",points:["Use validação cruzada quando a estrutura dos dados permitir.","Faça pré-processamento dentro de cada fold para evitar vazamento.","Compare com uma linha de base simples.","Registre sementes, versões, parâmetros e métricas."]},
   {title:"4. Implantação e monitoramento",explanation:"Depois de implantado, o sistema recebe dados diferentes dos dados históricos. Monitorar significa observar qualidade de entrada, latência, custo, distribuição, desempenho real e consequências. Quando os rótulos chegam atrasados, use indicadores antecipados e auditorias periódicas.",points:["Monitore data drift e concept drift separadamente.","Defina limites de alerta e procedimento de rollback.","Registre versões do modelo e dos dados usados em cada previsão.","Reavalie após mudanças de equipamento, processo, população ou ambiente."]}
  ],
  equation:"Erro de generalização ≈ desempenho em dados não vistos; não confundir com erro de treinamento.",
  lab:[
   {step:"Desenhe o fluxo",detail:"Documente origem dos dados, transformação, divisão, treinamento, avaliação, entrega e monitoramento."},
   {step:"Procure vazamento",detail:"Pergunte se cada variável existiria no momento real da previsão. Remova qualquer informação criada depois do evento-alvo."},
   {step:"Simule mudança de distribuição",detail:"Separe dados por período e compare desempenho em períodos antigos e recentes."},
   {step:"Escreva critérios de liberação",detail:"Defina métrica mínima, análise de subgrupos, custo operacional, fallback e responsável pela aprovação."}
  ],
  code:`# Exemplo de divisão temporal (conceitual)
# Nunca embaralhe dados temporais sem justificar.

train = dados[dados.data < "2025-01-01"]
valid = dados[(dados.data >= "2025-01-01") &
              (dados.data < "2025-04-01")]
test  = dados[dados.data >= "2025-04-01"]

# Ajuste transformações no treino e aplique-as
# sem recalcular parâmetros usando validação/teste.`,
  assessment:["Explique o que é vazamento de dados e dê um exemplo temporal.","Qual a diferença entre validação e teste?","Quais sinais devem ser monitorados após colocar um modelo em produção?"],
  references:[{title:"Google ML Crash Course — production ML systems",url:"https://developers.google.com/machine-learning/crash-course"},{title:"NIST AI Risk Management Framework",url:"https://www.nist.gov/itl/ai-risk-management-framework"}]
 },
 "llms":{
  lead:"Um modelo de linguagem de grande porte (LLM) aprende padrões estatísticos sobre sequências de tokens. Durante a geração, estima distribuições de probabilidade para o próximo token, condicionadas ao contexto disponível. Isso permite produzir texto coerente, mas não garante que cada afirmação seja verdadeira.",
  sections:[
   {title:"1. Tokenização: texto vira unidades processáveis",explanation:"O modelo não recebe palavras como conceitos prontos. Um tokenizador converte texto em IDs de uma sequência. Um token pode corresponder a uma palavra, parte de palavra, pontuação ou espaço associado. O número de tokens depende do idioma, do conteúdo e do tokenizador.",points:["Token não é sinônimo de palavra ou caractere.","Código, tabelas e idiomas diferentes podem ter custos de tokenização distintos.","O contexto é limitado por uma janela máxima de tokens."]},
   {title:"2. Previsão do próximo token",explanation:"O modelo calcula uma distribuição sobre o vocabulário para a próxima posição. A geração escolhe um token segundo uma estratégia de decodificação e repete o processo. Temperatura e amostragem alteram a diversidade das saídas, não criam verificação factual.",points:["Logits são pontuações anteriores à normalização em probabilidades.","Softmax transforma pontuações em uma distribuição.","Greedy escolhe o token de maior probabilidade; amostragem permite alternativas.","A resposta é produzida passo a passo, condicionada ao texto já gerado."]},
   {title:"3. Transformer e atenção",explanation:"Transformers usam mecanismos de atenção para combinar informações de diferentes posições da sequência. Em atenção escalada por produto interno, consultas (Q), chaves (K) e valores (V) são projetados a partir das representações. A máscara causal impede que um token use posições futuras durante a geração autoregressiva.",points:["Atenção não é uma explicação completa do raciocínio do modelo.","Embeddings representam tokens em vetores numéricos.","Múltiplas cabeças permitem diferentes projeções de relações contextuais.","O custo e a memória dependem do comprimento da sequência e da arquitetura."]},
   {title:"4. Treinamento, ajuste e limites",explanation:"O pré-treinamento costuma otimizar previsão de tokens em grandes coleções de dados. Depois, técnicas de ajuste e alinhamento moldam o comportamento para instruções e preferências. O modelo pode produzir conteúdo plausível sem evidência suficiente, refletir vieses ou falhar em tarefas fora da distribuição.",points:["Pré-treinamento aprende regularidades gerais da distribuição textual.","Ajuste supervisionado ensina padrões de resposta a partir de exemplos.","Preferências humanas podem orientar o comportamento, mas não garantem verdade.","Sistemas confiáveis conectam geração a fontes, ferramentas, testes e revisão."]}
  ],
  equation:"P(xₜ | x₁,…,xₜ₋₁)  |  Atenção(Q,K,V) = softmax(QKᵀ / √dₖ)V",
  lab:[
   {step:"Observe a tokenização",detail:"Compare a contagem de tokens de frases em português, código, números e palavras raras usando um tokenizador público."},
   {step:"Teste a decodificação",detail:"Compare temperatura baixa e alta em uma tarefa criativa e em uma tarefa factual. Registre diversidade e erros."},
   {step:"Teste sensibilidade ao contexto",detail:"Faça a mesma pergunta com contexto ausente, contexto correto e contexto contraditório. Identifique como a saída muda."},
   {step:"Separe fluência de evidência",detail:"Exija fontes verificáveis para afirmações factuais e confira as fontes independentemente."}
  ],
  code:`# Geração autoregressiva: esquema simplificado
contexto = tokenizar(prompt)
while not fim:
    logits = modelo(contexto)
    probabilidades = softmax(logits[-1])
    proximo = estrategia_de_decodificacao(probabilidades)
    contexto.append(proximo)
resposta = decodificar(contexto)`,
  assessment:["Por que um token não equivale necessariamente a uma palavra?","O que a máscara causal impede?","Por que uma resposta fluente não é evidência de que o conteúdo é verdadeiro?"],
  references:[{title:"The Illustrated Transformer",url:"https://jalammar.github.io/illustrated-transformer/"},{title:"Hugging Face Transformers documentation",url:"https://huggingface.co/docs/transformers"},{title:"Attention Is All You Need",url:"https://arxiv.org/abs/1706.03762"}]
 },
 "transformer-embeddings":{
  lead:"Embeddings transformam itens discretos em vetores numéricos. Em modelos modernos, representações contextuais mudam conforme o entorno da palavra ou token. Atenção permite combinar informação entre posições da sequência.",
  sections:[
   {title:"1. Vetores e espaço de representação",explanation:"Um embedding associa um token, trecho ou objeto a um vetor de números. A geometria do espaço pode capturar regularidades úteis para tarefas como busca semântica, agrupamento e classificação. Distância ou similaridade só fazem sentido em relação ao modelo, à normalização e ao objetivo de treinamento.",points:["Dimensão é a quantidade de componentes do vetor.","Similaridade cosseno compara orientação, não magnitude.","Embeddings não são definições completas nem conhecimento perfeito."]},
   {title:"2. Representações contextuais",explanation:"O embedding inicial do token é transformado por camadas da rede. A representação final depende do contexto: uma palavra ambígua pode adquirir vetores diferentes em frases diferentes. Isso é importante para busca semântica e compreensão contextual.",points:["Representação estática: vetor associado ao item independentemente do contexto.","Representação contextual: vetor produzido considerando a sequência.","O pooling transforma vários vetores de tokens em um vetor de documento ou trecho."]},
   {title:"3. Atenção em termos matemáticos",explanation:"Cada posição produz uma consulta, uma chave e um valor. O produto entre consulta e chaves estima compatibilidade; softmax normaliza pesos; a soma ponderada dos valores gera uma representação contextualizada. Multi-head attention executa várias projeções em paralelo.",points:["Q: o que a posição procura.","K: como cada posição pode ser encontrada.","V: informação que será combinada.","A máscara e a codificação posicional ajudam a definir quais relações são permitidas e como a ordem é representada."]},
   {title:"4. Busca vetorial e recuperação",explanation:"Em busca semântica, documentos são divididos em trechos, convertidos em embeddings e indexados. A consulta é vetorizada e comparada aos trechos. O resultado é uma lista de candidatos, não uma prova de relevância; filtros, reranking e avaliação são necessários.",points:["Chunking afeta contexto e granularidade.","Top-k recupera candidatos, mas pode trazer trechos redundantes.","Reranking reordena candidatos usando um modelo mais específico.","Avalie recall@k, precisão e relevância humana."]}
  ],
  equation:"cos(u,v) = (u · v) / (||u|| ||v||)  |  Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V",
  lab:[
   {step:"Crie uma coleção pequena",detail:"Separe 20 documentos curtos em trechos e registre origem, título, data e identificador de cada trecho."},
   {step:"Gere embeddings",detail:"Use um modelo de embeddings documentado. Mantenha a versão do modelo e os parâmetros de divisão."},
   {step:"Compare busca lexical e semântica",detail:"Monte perguntas de teste e avalie quais trechos relevantes aparecem nos primeiros resultados."},
   {step:"Analise falhas",detail:"Procure consultas ambíguas, trechos longos, documentos desatualizados e resultados semanticamente parecidos, mas incorretos."}
  ],
  assessment:["O que a similaridade cosseno mede?","Por que um embedding não deve ser tratado como uma definição textual?","Qual a diferença entre recuperação inicial e reranking?"],
  references:[{title:"Attention Is All You Need",url:"https://arxiv.org/abs/1706.03762"},{title:"Sentence Transformers documentation",url:"https://sbert.net/"},{title:"Hugging Face NLP Course",url:"https://huggingface.co/learn/nlp-course"}]
 },
 "limites-llm":{
  lead:"Confiabilidade de IA é uma propriedade do sistema completo, da tarefa e do contexto de uso. Não basta avaliar se a resposta parece boa: precisamos definir critérios, montar conjuntos de teste e medir erros relevantes.",
  sections:[
   {title:"1. Alucinação e afirmações sem suporte",explanation:"Um LLM pode gerar uma afirmação específica, uma citação ou uma referência que parece plausível, mas não tem suporte. O mecanismo de geração otimiza a sequência provável, não uma consulta obrigatória a uma base de fatos atualizada.",points:["Verifique nomes, datas, números, citações e links.","Exija que a resposta indique quando não há evidência suficiente.","Separe texto recuperado, inferência do modelo e opinião.","Em tarefas críticas, use fonte primária e revisão humana."]},
   {title:"2. Avaliação por tarefa",explanation:"Não existe uma métrica universal para qualidade. Classificação pode usar precisão e recall; extração pode usar F1; geração exige rubricas, avaliação humana e testes específicos. Uma métrica agregada pode esconder falhas em grupos ou cenários raros.",points:["Defina casos normais, limites e adversariais.","Inclua exemplos negativos e perguntas sem resposta.","Avalie consistência, completude, factualidade e citação de fontes.","Faça análise de erro por categoria e impacto."]},
   {title:"3. Confiabilidade de RAG e ferramentas",explanation:"Recuperar documentos não garante que o modelo os interpretará corretamente. Avalie separadamente recuperação, resposta e fidelidade às fontes. Ferramentas precisam de permissões mínimas, validação de entradas e registro de ações.",points:["Recall@k mede se a evidência relevante foi recuperada.","Faithfulness verifica se a resposta está apoiada no contexto fornecido.","Testes devem incluir documentos conflitantes e desatualizados.","Ações externas precisam de confirmação e limites claros."]},
   {title:"4. Monitoramento e melhoria contínua",explanation:"O comportamento pode mudar com nova versão de modelo, prompt, base de dados ou usuário. Mantenha um conjunto de regressão, compare versões e registre incidentes. O objetivo é detectar degradação antes que ela gere impacto.",points:["Versione prompts, modelos, índices e datasets.","Mantenha testes automáticos e revisão humana amostral.","Monitore custo, latência, recusas, erros e uso indevido.","Tenha fallback, rollback e canal de contestação."]}
  ],
  lab:[
   {step:"Crie um conjunto de avaliação",detail:"Escreva perguntas com resposta conhecida, perguntas ambíguas e perguntas cuja resposta não está nos documentos."},
   {step:"Defina uma rubrica",detail:"Pontue correção, evidência, completude, clareza e reconhecimento de incerteza."},
   {step:"Compare duas versões",detail:"Execute os mesmos casos com duas versões de prompt ou modelo e registre regressões."},
   {step:"Faça análise de impacto",detail:"Classifique erros por gravidade e probabilidade, não apenas pela quantidade."}
  ],
  assessment:["Por que uma resposta com citações pode ainda estar errada?","Qual a diferença entre recall de recuperação e fidelidade da resposta?","Por que o conjunto de testes deve conter perguntas sem resposta?"],
  references:[{title:"NIST AI Risk Management Framework",url:"https://www.nist.gov/itl/ai-risk-management-framework"},{title:"Stanford HELM",url:"https://crfm.stanford.edu/helm/latest/"}]
 },
 "rag":{
  lead:"RAG (Retrieval-Augmented Generation) combina recuperação de informação com geração. Em vez de depender apenas dos parâmetros do modelo, o sistema busca trechos em uma coleção externa e fornece esse contexto ao LLM. Isso pode melhorar rastreabilidade e atualização, mas não elimina erros.",
  sections:[
   {title:"1. Preparação e indexação",explanation:"Documentos são coletados, limpos, divididos em trechos e enriquecidos com metadados. Cada trecho recebe um embedding e é armazenado em um índice vetorial ou híbrido. A origem e a versão precisam permanecer associadas ao conteúdo.",points:["Preserve título, página, data, versão e permissões.","Escolha chunk size e overlap por tipo de documento.","Remova duplicatas e identifique conteúdo obsoleto.","Controle acesso antes da recuperação, não apenas na resposta."]},
   {title:"2. Recuperação",explanation:"A pergunta é convertida em consulta. O mecanismo recupera candidatos por busca lexical, vetorial ou híbrida. Filtros por metadados e reranking podem melhorar a precisão. A recuperação deve ser avaliada com consultas de referência.",points:["Busca lexical é útil para códigos, números de peça e termos exatos.","Busca vetorial ajuda quando a formulação difere do documento.","Busca híbrida combina sinais complementares.","Reranking melhora a ordem, mas adiciona custo e latência."]},
   {title:"3. Geração com evidência",explanation:"O LLM recebe a pergunta e os trechos recuperados. Um bom prompt delimita as fontes, exige citações e orienta o sistema a declarar insuficiência de evidência. A interface deve permitir abrir o documento original e conferir o trecho.",points:["Citação deve apontar para a fonte real e trecho correto.","Não invente uma referência quando a recuperação falhar.","Diferencie citação literal, resumo e inferência.","Considere conflito entre versões e datas de vigência."]},
   {title:"4. Avaliação ponta a ponta",explanation:"Avalie recuperação e geração separadamente. Um sistema pode falhar porque não encontrou o documento, porque recuperou o trecho errado ou porque o modelo distorceu a evidência. A análise por etapa permite corrigir a causa.",points:["Recall@k e precisão dos trechos recuperados.","Fidelidade, correção e completude da resposta.","Taxa de respostas sem suporte e taxa de abstenção correta.","Latência, custo por consulta e segurança de acesso."]}
  ],
  lab:[
   {step:"Monte uma coleção pequena",detail:"Use documentos públicos e licenciados, com versões identificáveis. Comece com 10 a 30 arquivos."},
   {step:"Implemente ingestão rastreável",detail:"Extraia texto, divida em trechos e guarde origem, página e data em cada registro."},
   {step:"Crie perguntas de referência",detail:"Para cada pergunta, anote quais documentos e trechos deveriam ser recuperados."},
   {step:"Teste falhas deliberadas",detail:"Pergunte sobre assunto ausente, versão antiga, documento conflitante e termo exato como código de peça."}
  ],
  assessment:["Por que RAG não elimina alucinações?","Quando busca lexical pode superar busca vetorial?","Quais metadados são importantes para rastreabilidade documental?"],
  references:[{title:"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",url:"https://arxiv.org/abs/2005.11401"},{title:"Hugging Face RAG documentation",url:"https://huggingface.co/docs/transformers/model_doc/rag"}]
 },
 "agentes-tools":{
  lead:"Um agente é um sistema que usa um modelo para selecionar passos, ferramentas ou ações em direção a um objetivo. A autonomia precisa ser limitada por permissões, orçamento, validação e supervisão. Um fluxo determinístico pode ser mais seguro e previsível que um agente livre.",
  sections:[
   {title:"1. Componentes de um agente",explanation:"Um agente pode incluir modelo, instruções, estado, ferramentas, memória, observação e política de encerramento. O modelo decide quando chamar uma ferramenta; o executor valida argumentos, aplica permissões e devolve resultados.",points:["Ferramenta é uma função com contrato explícito de entrada e saída.","Estado registra o que já ocorreu e o que falta fazer.","Memória persistente exige política de retenção e privacidade.","O loop precisa de limite de passos e condição de parada."]},
   {title:"2. Orquestração e chamadas de ferramentas",explanation:"O modelo pode propor uma chamada, mas o sistema hospedeiro deve validar esquema, autorização e contexto. Nunca confie em texto gerado como se fosse comando seguro. Ferramentas de escrita ou pagamento devem ter confirmação explícita e trilha de auditoria.",points:["Valide tipos, limites e permissões no servidor.","Use princípio do menor privilégio.","Separe ferramentas de leitura e escrita.","Registre quem solicitou, o que foi executado e qual resultado retornou."]},
   {title:"3. Falhas e ataques",explanation:"Agentes podem entrar em loops, interpretar mal resultados, agir com base em dados maliciosos ou seguir instruções injetadas em documentos. Prompt injection pode vir de conteúdo externo, e não apenas do usuário. Isolamento e políticas externas ao modelo são essenciais.",points:["Defina timeout, limite de chamadas e orçamento.","Trate conteúdo recuperado como dado não confiável.","Não exponha segredos no contexto do modelo.","Exija aprovação para ações irreversíveis ou de alto impacto."]},
   {title:"4. Quando não usar agente",explanation:"Se a tarefa tem etapas fixas, uma automação determinística é geralmente mais fácil de testar, auditar e manter. Use agente quando existe incerteza real de planejamento ou escolha de ferramenta e quando o benefício compensa a variabilidade.",points:["Prefira workflow explícito para processos previsíveis.","Use agente com ferramentas restritas para tarefas abertas e reversíveis.","Defina fallback para intervenção humana.","Meça taxa de conclusão, erros, custo, latência e ações indevidas."]}
  ],
  lab:[
   {step:"Implemente uma ferramenta de leitura",detail:"Crie uma função que consulta uma lista local de documentos e retorna resultados estruturados."},
   {step:"Adicione validação",detail:"Valide argumentos, limite quantidade de resultados e rejeite parâmetros fora do contrato."},
   {step:"Crie limites de execução",detail:"Defina máximo de iterações, timeout, orçamento e condição de encerramento."},
   {step:"Teste prompt injection",detail:"Inclua em um documento uma instrução maliciosa e confirme que o agente a trata como conteúdo, não como política."}
  ],
  assessment:["Por que o modelo não deve ser a única camada de autorização?","Quando um workflow determinístico é preferível a um agente?","Quais limites devem existir antes de permitir ações externas?"],
  references:[{title:"OWASP Top 10 for LLM Applications",url:"https://genai.owasp.org/llm-top-10/"},{title:"Hugging Face Agents Course",url:"https://huggingface.co/learn/agents-course"}]
 },

 "tokens-contexto":{
  lead:"A geração de texto é um processo computacional sobre sequências. Para entender por que um modelo responde de determinada maneira, é preciso acompanhar a transformação de texto em tokens, a construção do contexto e a seleção probabilística do próximo token.",
  sections:[
   {title:"1. Tokenização não é divisão por palavras",explanation:"Um token é uma unidade definida pelo tokenizador: pode ser uma palavra curta, parte de uma palavra, pontuação, espaço associado ou sequência de caracteres. Tokenizadores subword equilibram vocabulário e capacidade de representar palavras raras. Por isso, a mesma frase pode ter contagens diferentes em tokenizadores distintos.",points:["Não estime custo ou limite de contexto contando palavras; use o tokenizador do modelo.","Nomes próprios, código, tabelas e português podem gerar segmentações inesperadas.","A tokenização é uma etapa determinística anterior à geração, não uma interpretação semântica."]},
   {title:"2. Janela de contexto e orçamento",explanation:"A janela de contexto limita a quantidade de tokens processados em uma chamada. Ela inclui instruções, histórico, documentos recuperados e, conforme a arquitetura e API, espaço reservado para a resposta. Um histórico grande pode consumir o orçamento sem acrescentar evidência útil.",points:["Separe tokens de entrada e tokens de saída ao planejar chamadas.","Resuma ou recupere partes relevantes em vez de anexar todo o histórico.","Contexto longo não garante atenção uniforme nem lembrança perfeita de cada detalhe."]},
   {title:"3. Previsão autoregressiva",explanation:"Em geração autoregressiva, o modelo estima uma distribuição para o próximo token condicionada aos tokens anteriores. O token escolhido é acrescentado à sequência e o processo se repete. Temperatura, top-p e limites de saída alteram a estratégia de seleção; não transformam uma previsão em fato verificado.",points:["Logits são pontuações produzidas antes da normalização em probabilidades.","Temperatura modifica a concentração da distribuição.","Top-p restringe a amostragem a um conjunto cumulativo de probabilidade."]},
   {title:"4. Por que contexto muda a resposta",explanation:"A mesma pergunta pode gerar saídas diferentes quando mudam instruções, exemplos, documentos ou histórico. O modelo condiciona a previsão ao conteúdo recebido, mas pode ignorar detalhes, sofrer com instruções conflitantes ou priorizar texto irrelevante. Contexto deve ser organizado por finalidade e autoridade.",points:["Coloque tarefa e restrições explícitas em posição clara.","Diferencie instruções confiáveis de documentos que são apenas dados.","Teste perguntas com contexto ausente, excessivo, contraditório e atualizado."]}
  ],
  equation:"P(xₜ | x₁,…,xₜ₋₁)  |  orçamento ≈ instruções + histórico + evidências + resposta",
  lab:[
   {step:"Inspecione a tokenização",detail:"Use um tokenizador público compatível com um modelo escolhido. Compare uma frase em português, código, números de série e uma tabela."},
   {step:"Faça um orçamento de contexto",detail:"Monte uma chamada com instruções, histórico e três trechos de documento. Meça o espaço consumido e reduza conteúdo redundante."},
   {step:"Compare estratégias de geração",detail:"Repita uma tarefa com temperatura baixa e mais alta. Registre diferenças de diversidade e erros factuais."}
  ],
  assessment:["Por que token não é sinônimo de palavra?","Quais partes de uma chamada consomem a janela de contexto?","Por que aumentar a temperatura não torna o modelo mais criativo de maneira garantida nem mais correto?"],
  references:[{title:"Hugging Face — Tokenizers",url:"https://huggingface.co/docs/transformers/main/en/tokenizer_summary"},{title:"OpenAI — Text generation",url:"https://platform.openai.com/docs/guides/text"}]
 },
 "chatgpt":{
  lead:"Usar um assistente de IA profissionalmente exige decompor tarefas, fornecer contexto suficiente, escolher ferramentas adequadas e verificar resultados. O objetivo não é escrever prompts mágicos, mas construir um fluxo de trabalho reproduzível com critérios de qualidade.",
  sections:[
   {title:"1. Escolha a tarefa antes da ferramenta",explanation:"Classifique a necessidade: explicar, resumir, comparar, extrair campos, gerar rascunho, analisar dados, pesquisar fontes ou executar uma ação. Cada tarefa exige entradas, critérios de aceitação e riscos diferentes. Uma pergunta aberta pode servir para explorar; uma tarefa operacional precisa de formato e validação.",points:["Defina usuário, objetivo, entrada e saída esperada.","Identifique o que deve ser verdadeiro para considerar o resultado correto.","Decida se a tarefa requer pesquisa atualizada, cálculo, código ou leitura de arquivo."]},
   {title:"2. Contexto estruturado e instruções",explanation:"Forneça contexto relevante, restrições, público e formato. Separe fatos fornecidos por você de hipóteses que o modelo deve investigar. Para documentos extensos, peça primeiro um inventário de conteúdo e depois tarefas delimitadas, conferindo referências e omissões.",points:["Inclua exemplos de saída quando o formato for rígido.","Declare limites: o que não pode ser presumido ou alterado.","Peça que incertezas e dados ausentes sejam explicitados."]},
   {title:"3. Ferramentas e verificação",explanation:"Quando disponíveis, ferramentas podem consultar fontes, ler planilhas, executar cálculos ou operar sistemas. O resultado da ferramenta também pode estar incompleto ou desatualizado. Em ações externas, confira os parâmetros, o alvo e o efeito antes de confirmar operações irreversíveis.",points:["Use pesquisa para fatos recentes e fontes primárias para decisões técnicas.","Use planilhas ou código para cálculos repetitivos e auditáveis.","Não confunda uma chamada de ferramenta bem-sucedida com a correção da conclusão."]},
   {title:"4. Fluxo profissional repetível",explanation:"Transforme tarefas frequentes em procedimentos: entrada padronizada, instrução versionada, saída estruturada, critérios de revisão e registro de erros. Compare versões com um conjunto fixo de casos. Isso permite saber se uma mudança melhorou o processo ou apenas produziu uma resposta mais convincente.",points:["Crie modelos de entrada e saída para tarefas recorrentes.","Mantenha exemplos de referência e casos difíceis.","Registre versão do modelo, data, fontes e aprovação humana quando necessário."]}
  ],
  lab:[
   {step:"Escolha uma tarefa real",detail:"Use uma atividade de baixo risco, como resumir solicitações de clientes ou organizar uma lista de peças. Defina a saída esperada antes de abrir o assistente."},
   {step:"Execute em duas etapas",detail:"Peça primeiro uma análise da entrada e dos dados ausentes; depois solicite a entrega final em formato definido."},
   {step:"Audite a resposta",detail:"Confira fatos, números, omissões, fontes e aderência ao formato. Registre o que precisou de correção humana."}
  ],
  assessment:["Por que definir a tarefa antes de escolher a ferramenta melhora o resultado?","Quando pesquisa ou cálculo externo é preferível à resposta direta do modelo?","Quais elementos tornam um fluxo de IA reproduzível?"],
  references:[{title:"OpenAI — Prompt engineering",url:"https://platform.openai.com/docs/guides/prompt-engineering"},{title:"NIST AI Risk Management Framework",url:"https://www.nist.gov/itl/ai-risk-management-framework"}]
 },
 "anatomia-prompt":{
  lead:"Um prompt robusto funciona como uma especificação curta de trabalho. Ele reduz ambiguidades ao declarar objetivo, contexto, dados, restrições, processo esperado e formato de entrega. Bons prompts também definem como o modelo deve agir quando a evidência é insuficiente.",
  sections:[
   {title:"1. Os componentes essenciais",explanation:"Comece pelo papel funcional ou perspectiva, mas não dependa de personas vagas. Declare a tarefa em verbo observável, forneça contexto, delimite os dados de entrada, defina critérios de qualidade e descreva o formato. Para tarefas técnicas, especifique unidades, tolerâncias, período, população e convenções.",points:["Objetivo: qual transformação deve ocorrer.","Contexto: para quem e em qual cenário o resultado será usado.","Restrições: limites, fontes permitidas e ações proibidas.","Saída: campos, ordem, extensão e critérios de aceitação."]},
   {title:"2. Exemplos e decomposição",explanation:"Exemplos demonstram o padrão esperado, especialmente para classificação, extração e estilo. Em tarefas complexas, divida o trabalho em etapas verificáveis: identificar dados, apontar lacunas, executar análise e apresentar conclusão. Evite solicitar uma cadeia longa de ações sem pontos de conferência.",points:["Use exemplos representativos, inclusive casos negativos.","Não misture no mesmo prompt regras incompatíveis.","Peça saída estruturada quando outra aplicação for consumir o resultado."]},
   {title:"3. Evidência, incerteza e limites",explanation:"Inclua uma política de abstenção: se a informação não estiver nos dados, o sistema deve dizer que não encontrou evidência. Exija que afirmações importantes sejam vinculadas a trechos ou fontes. Isso reduz invenções, mas não elimina a necessidade de conferir citações e cálculos.",points:["Diferencie fato fornecido, inferência e recomendação.","Peça referência precisa para cada afirmação crítica.","Defina quando encaminhar para revisão humana."]},
   {title:"4. Teste e iteração",explanation:"Não avalie um prompt com um único exemplo favorável. Monte casos normais, incompletos, ambíguos, contraditórios e adversariais. Altere uma variável por vez e compare os resultados usando uma rubrica fixa. Um prompt mais longo não é automaticamente melhor.",points:["Meça correção, completude, consistência e aderência ao formato.","Inclua entradas que deveriam gerar recusa ou pedido de esclarecimento.","Versione prompts aprovados e mantenha histórico de alterações."]}
  ],
  lab:[
   {step:"Escreva uma especificação",detail:"Crie um prompt para extrair número de peça, descrição, quantidade e unidade de uma solicitação. Defina o que fazer quando um campo estiver ausente."},
   {step:"Crie cinco casos de teste",detail:"Inclua entrada completa, campo faltante, unidade ambígua, texto contraditório e informação inventada pelo solicitante."},
   {step:"Compare versões",detail:"Teste uma versão livre e outra estruturada. Pontue cada saída e mantenha apenas mudanças que melhorem a rubrica."}
  ],
  assessment:["Quais componentes mínimos devem aparecer em um prompt operacional?","Por que exemplos negativos ajudam a definir limites?","Como evitar que o modelo preencha campos ausentes por suposição?"],
  references:[{title:"OpenAI — Prompt engineering",url:"https://platform.openai.com/docs/guides/prompt-engineering"},{title:"Anthropic — Prompt engineering overview",url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"}]
 },
 "avaliar-saida":{
  lead:"Avaliar uma resposta de IA é comparar a saída com critérios explícitos e evidências independentes. Fluência, confiança verbal e formatação não demonstram precisão. A avaliação deve ser desenhada para a tarefa e para o custo de cada tipo de erro.",
  sections:[
   {title:"1. Rubrica por dimensão",explanation:"Uma rubrica transforma qualidade abstrata em critérios observáveis. Para extração, verifique campos corretos e cobertura; para resumo, fidelidade e omissões; para recomendação, adequação às restrições e evidência; para código, testes, segurança e manutenção. Dê pesos maiores a erros de maior impacto.",points:["Correção factual: afirmações sustentadas por evidência.","Completude: elementos necessários não foram omitidos.","Aderência: formato e restrições foram respeitados.","Segurança: dados sensíveis e ações perigosas foram tratados corretamente."]},
   {title:"2. Conjunto de avaliação",explanation:"Monte um conjunto representativo antes de alterar prompts ou modelos. Inclua casos comuns, raros, ambíguos, incompletos e sem resposta possível. Separe exemplos usados para desenvolvimento daqueles reservados para avaliação final, evitando ajustar repetidamente ao mesmo teste.",points:["Registre entrada, resposta esperada, fonte e justificativa.","Inclua exemplos negativos e casos fora do escopo.","Faça amostragem por tipo de usuário, documento ou cenário."]},
   {title:"3. Métricas e revisão humana",explanation:"Métricas automáticas ajudam a comparar, mas podem não capturar significado e impacto. Precisão e recall são úteis em classificação; exatidão de campos pode servir para extração; tarefas abertas exigem rubrica humana e revisão por especialistas. Compare avaliadores e investigue divergências.",points:["Não use uma única nota agregada para esconder falhas graves.","Meça falsos positivos e falsos negativos separadamente.","Faça dupla revisão em amostras de alto risco."]},
   {title:"4. Correção e regressão",explanation:"Ao encontrar erro, identifique a causa: entrada ruim, instrução ambígua, recuperação falha, limite do modelo ou integração defeituosa. Corrija a etapa responsável e rode novamente o conjunto de regressão. Preserve casos de falha como testes permanentes.",points:["Classifique cada erro por causa e gravidade.","Evite remendar uma resposta isolada sem testar casos semelhantes.","Compare custo, latência e qualidade após cada mudança."]}
  ],
  lab:[
   {step:"Monte uma rubrica de cinco critérios",detail:"Defina escala de 0 a 2 para correção, completude, evidência, formato e segurança, com exemplos do que vale cada nota."},
   {step:"Avalie dez respostas",detail:"Use entradas variadas e confira as respostas contra documentos ou gabaritos independentes."},
   {step:"Faça análise de causa",detail:"Agrupe falhas, corrija uma causa de cada vez e repita os mesmos testes para verificar regressões."}
  ],
  assessment:["Por que uma resposta bem escrita pode estar errada?","Qual a diferença entre precisão e recall?","Por que um conjunto de teste deve conter perguntas sem resposta?"],
  references:[{title:"Stanford HELM — Holistic Evaluation of Language Models",url:"https://crfm.stanford.edu/helm/latest/"},{title:"NIST AI Risk Management Framework",url:"https://www.nist.gov/itl/ai-risk-management-framework"}]
 },
 "multimodal":{
  lead:"Sistemas multimodais processam mais de um tipo de informação, como texto, imagem, áudio e vídeo. A capacidade de descrever uma imagem ou resumir um arquivo não equivale a medição certificada, leitura perfeita ou inspeção técnica conclusiva.",
  sections:[
   {title:"1. Modalidades e representação",explanation:"Cada modalidade tem estrutura própria. Imagens são matrizes de pixels; áudio é um sinal amostrado ao longo do tempo; vídeo combina quadros e temporalidade; documentos podem conter texto, tabelas, gráficos e páginas digitalizadas. O sistema precisa converter essas entradas em representações processáveis.",points:["Resolução, compressão e iluminação afetam imagens.","Taxa de amostragem e ruído afetam áudio.","Ordem temporal é essencial em vídeo e séries de quadros.","PDF pode conter texto selecionável ou apenas imagens escaneadas."]},
   {title:"2. O que pedir e o que não presumir",explanation:"Descreva o objetivo da análise e o contexto. Para imagem, peça localização, características visíveis e incertezas; para áudio, diferencie transcrição de interpretação; para documentos, peça extração com página e trecho de origem. Não transforme uma descrição probabilística em laudo ou certificação.",points:["Solicite evidências observáveis, não conclusões além da imagem.","Peça indicação de baixa qualidade, oclusão ou ausência de escala.","Confirme números, unidades e tabelas no documento original."]},
   {title:"3. Fluxo de análise rastreável",explanation:"Um fluxo profissional preserva o arquivo original, identifica versão, registra pré-processamento e mantém vínculo entre resultado e região ou página. Quando uma decisão depende de medição, use instrumento apropriado; IA pode priorizar áreas para revisão, não substituir automaticamente metrologia ou inspeção regulamentada.",points:["Mantenha arquivo original e hash ou identificador.","Registre página, quadro, região e transformação aplicada.","Separe triagem automática de aprovação técnica."]},
   {title:"4. Privacidade e validação",explanation:"Arquivos podem conter rostos, documentos pessoais, dados de clientes ou informações industriais restritas. Verifique autorização, retenção e política do serviço utilizado. Avalie o sistema em imagens reais do ambiente de uso, incluindo defeitos raros e condições adversas.",points:["Remova dados pessoais que não sejam necessários.","Não envie documentos confidenciais a serviços sem autorização.","Meça falsos negativos, especialmente em tarefas de inspeção."]}
  ],
  lab:[
   {step:"Prepare um conjunto multimodal",detail:"Use imagens públicas e documentos sem dados pessoais. Registre origem, resolução, tipo de arquivo e limitações."},
   {step:"Faça extração estruturada",detail:"Peça descrição de imagem ou extração de tabela com referência à página. Compare cada campo com a fonte original."},
   {step:"Teste limites",detail:"Repita com baixa resolução, reflexo, rotação, áudio ruidoso ou página escaneada e registre quando o sistema deve declarar incerteza."}
  ],
  assessment:["Por que descrever uma imagem não equivale a medir uma dimensão?","Qual a diferença entre transcrição e interpretação de áudio?","Quais informações devem ser preservadas para rastrear uma análise de documento?"],
  references:[{title:"WHO — Ethics and governance of AI for health",url:"https://www.who.int/publications/i/item/9789240084759"},{title:"Hugging Face — Multimodal models",url:"https://huggingface.co/docs/transformers/tasks"}]
 },
  ...{
    "agentes": {
    "lead": "Um agente percebe contexto, escolhe ações e observa resultados para perseguir um objetivo. Um chatbot que apenas responde texto não é necessariamente um agente; a diferença aparece quando há planejamento, estado, ferramentas e execução sob limites.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "O ciclo típico é interpretar o objetivo, decompor tarefas, selecionar uma ação, validar permissões, executar uma ferramenta e incorporar o resultado ao estado. O orquestrador controla o ciclo; o modelo propõe ações, mas não concede permissões a si próprio.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Busca em documentos, triagem de chamados, preparação de relatórios e consulta a inventário. Separe leitura, recomendação e escrita; ações irreversíveis exigem confirmação humana.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Limite iterações, tempo, custo e ferramentas. Trate conteúdo recuperado como dado não confiável; valide argumentos; registre entradas, chamadas e resultados. Confiança verbal do modelo não é autorização.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Defina um agente de consulta sobre documentos públicos; crie busca somente leitura; limite chamadas e tamanho do retorno; exija citação; teste documento ausente, instrução maliciosa e ferramenta indisponível."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Qual a diferença entre chatbot e agente?",
      "Por que separar leitura de escrita?",
      "Cite duas ações que exigem aprovação humana.?"
    ],
    "references": [
      {
        "title": "Anthropic — Building effective agents",
        "url": "https://www.anthropic.com/research/building-effective-agents"
      },
      {
        "title": "NIST AI RMF",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ]
  },
  "automacao-mcp": {
    "lead": "Automação conecta eventos, dados e ações entre sistemas. APIs definem operações de software; n8n organiza fluxos; MCP padroniza como aplicações de IA descobrem e invocam ferramentas e recursos.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Um fluxo tem gatilho, validação, transformação, condição, ação e tratamento de falhas. HTTP define métodos e códigos; JSON transporta dados. MCP organiza tools, resources e prompts, mas não substitui autenticação ou autorização.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Integração de formulários com CRM, alertas de estoque, relatórios periódicos, consulta documental e abertura assistida de chamados. Comece com APIs públicas de leitura e depois avance para escrita.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Use credenciais de menor privilégio, segredos fora do código, validação de esquema, limites de repetição e idempotência. Webhooks precisam validar origem; trate timeouts e falhas parciais explicitamente.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Desenhe um fluxo: gatilho → validação → consulta a API pública → transformação → mensagem. Teste timeout, resposta inválida, repetição e segredo ausente; registre logs sem tokens."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Diferencie API, automação e MCP. O que é idempotência?",
      "Por que um webhook não deve confiar cegamente no payload?"
    ],
    "references": [
      {
        "title": "MCP — documentação oficial",
        "url": "https://modelcontextprotocol.io/"
      },
      {
        "title": "n8n documentation",
        "url": "https://docs.n8n.io/"
      },
      {
        "title": "MDN — HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
      }
    ]
  },
  "industria": {
    "lead": "O projeto industrial começa no processo físico e na decisão que precisa melhorar, não no algoritmo. IA pode detectar condição, estimar variável, inspecionar produto ou priorizar manutenção, desde que exista evidência de benefício e segurança.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Dados podem vir de PLC, SCADA, historiadores, MES, ERP e sensores. Tags exigem unidade, frequência, origem, ativo e qualidade. O contexto de carga, velocidade, produto e turno é parte do dado; sem ele, o modelo pode confundir operação normal com defeito.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Inspeção visual, anomalias em vibração, previsão de demanda, otimização energética e apoio à manutenção. Compare com a rotina atual e uma linha de base simples.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Sensores descalibrados, tags mal identificadas e mudanças de processo comprometem o modelo. Não conecte previsão a comandos físicos sem análise de risco, intertravamentos independentes e fallback manual.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Escolha um ventilador industrial; descreva modo de falha, sensores e decisão; audite unidade, timestamp e regime; construa baseline; conte falsos alarmes; escreva plano de modo sombra e revisão técnica."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que regime operacional deve acompanhar a medição?",
      "Cite três fontes de dados industriais. Por que IA não substitui intertravamento?"
    ],
    "references": [
      {
        "title": "OPC Foundation — OPC UA",
        "url": "https://opcfoundation.org/about/opc-technologies/opc-ua/"
      },
      {
        "title": "NIST AI RMF",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ]
  },
  "dados-industriais": {
    "lead": "Uma leitura só ganha significado quando sabemos o que foi medido, por qual instrumento, em qual unidade, em que instante e sob quais condições. Muitas falhas de IA começam em medição ruim, não no algoritmo.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Resolução é o menor incremento indicado; precisão descreve concordância entre medições repetidas; exatidão é proximidade ao valor de referência; calibração estabelece relação com padrões; incerteza quantifica a dispersão atribuível ao mensurando. Casas decimais não garantem exatidão.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Catálogo de tags, auditoria de séries temporais, comparação de sensores, detecção de sensor congelado e preparação de dados para manutenção. Preserve dados brutos e transformações.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Verifique lacunas, duplicatas, fuso, unidade, faixa plausível e timestamp. Não interpole silenciosamente. Distinga data de detecção, diagnóstico e confirmação de falha; controle acesso e retenção.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Crie dicionário de cinco tags com unidade, frequência, faixa, ativo e origem; audite CSV em busca de lacunas e duplicatas; marque qualidade; gere versão limpa sem apagar os dados originais."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que resolução alta não prova exatidão?",
      "Quais metadados acompanham uma tag?",
      "Por que a abertura de uma ordem de serviço não marca necessariamente o início da falha?"
    ],
    "references": [
      {
        "title": "BIPM/JCGM — Guide to the Expression of Uncertainty",
        "url": "https://www.bipm.org/en/committees/jc/jcgm/publications"
      },
      {
        "title": "NIST — Calibration",
        "url": "https://www.nist.gov/calibrations"
      }
    ]
  },
  "anomalias": {
    "lead": "Anomalia é comportamento incomum em relação a uma referência; não é sinônimo de defeito. Uma partida, mudança de carga ou alteração ambiental pode parecer anormal sem representar falha.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Anomalias podem ser pontuais, contextuais ou coletivas. Limites de engenharia, z-score, IQR, MAD, Isolation Forest e métodos temporais respondem a hipóteses diferentes. Z-score é sensível à distribuição; métodos robustos reduzem influência de extremos, mas não substituem contexto.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Monitoramento de vibração, temperatura, pressão, consumo e qualidade. Alertas orientam inspeção e priorização, não diagnosticam automaticamente causa raiz.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Avalie alertas por ativo e regime; use dados temporais separados; inspecione falsos positivos; defina severidade e responsável. Raridade não implica perigo e o modelo pode falhar após mudança de processo.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Gere série sintética com ruído, tendência, pico e mudança de carga; compare limite fixo, z-score e IQR; calcule falsos alarmes; escreva cartão de alerta com ativo, unidade, período, contexto e evidência."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Diferencie anomalia pontual e contextual. Por que partida pode gerar falso alarme?",
      "Por que anomalia não confirma falha?"
    ],
    "references": [
      {
        "title": "Scikit-learn — Outlier detection",
        "url": "https://scikit-learn.org/stable/modules/outlier_detection.html"
      },
      {
        "title": "NIST/SEMATECH e-Handbook",
        "url": "https://www.itl.nist.gov/div898/handbook/"
      }
    ]
  },
  "preditiva": {
    "lead": "Manutenção preditiva usa dados de condição para antecipar necessidades e apoiar planejamento. Não promete data exata de falha: procura melhorar decisões em relação à manutenção corretiva ou preventiva por calendário.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "RUL (Remaining Useful Life) estima tempo ou ciclos até um critério terminal definido. Modelos podem usar física, estatística ou ML. A definição de falha, horizonte, condição e incerteza é indispensável; dados de falha costumam ser escassos.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Vibração, temperatura, análise de óleo, corrente e pressão podem apoiar inspeção e programação de peças. O valor surge quando a previsão muda uma decisão operacional com segurança.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Nem todo ativo justifica monitoramento. Compare custo de sensor com criticidade; evite vazamento temporal; apresente intervalos; não converta score em ordem automática. Registre falhas não previstas e alertas improdutivos.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Escolha ativo e modo de falha; defina sinal e baseline; simule degradação; estime RUL em dados sintéticos; compare erro e antecedência; monte matriz de decisão com custo, risco e disponibilidade."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Diferença entre preventiva e preditiva?",
      "Por que RUL exige critério terminal?",
      "Quais métricas operacionais medem valor além do erro?"
    ],
    "references": [
      {
        "title": "NASA — Prognostics and Health Management",
        "url": "https://www.nasa.gov/intelligent-systems-division/"
      },
      {
        "title": "ISO 17359 — Condition monitoring",
        "url": "https://www.iso.org/standard/71194.html"
      }
    ]
  },
  "engenharia": {
    "lead": "IA pode acelerar exploração de projetos, análise de dados, inspeção e manutenção. Não substitui balanços, equações constitutivas, normas, fatores de segurança ou validação experimental; o engenheiro define hipóteses e verifica resultados.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Modelos substitutos aproximam simulações caras. DOE ajuda a cobrir o espaço de projeto; regressões e redes aproximam entradas e saídas. Restrições físicas, análise dimensional, sensibilidade e incerteza identificam extrapolações inválidas.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Otimização de parâmetros, estimativa de desempenho, análise de vibração, inspeção de componentes, apoio documental e previsão de consumo. Compare com método convencional e registre faixa de validade.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Um modelo que ajusta dados pode violar conservação ou comportamento físico. Verifique unidades, condições de contorno, faixa de treinamento e resultados com solução analítica, solver ou ensaio independente.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Modele uma viga biapoiada; gere casos analíticos variando carga, vão e módulo; treine regressão para deflexão; compare pontos novos; verifique tendências e unidades; documente limites."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "O que é modelo substituto?",
      "Por que bom ajuste não prova validade física?",
      "Quais metadados tornam resultado reproduzível?"
    ],
    "references": [
      {
        "title": "NASA — Systems Engineering Handbook",
        "url": "https://www.nasa.gov/reference/systems-engineering-handbook/"
      },
      {
        "title": "ASME — Digital Twins",
        "url": "https://www.asme.org/topics-resources/content/digital-twins"
      }
    ]
  },
  "cad-cae": {
    "lead": "IA pode sugerir geometrias e acelerar análises, mas uma imagem não é CAD paramétrico e uma simulação visual não é prova de validade. Dimensões, restrições, materiais, malha, cargas e vínculos continuam determinantes.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "CAD paramétrico preserva intenção por operações e restrições. FEA discretiza o domínio; qualidade depende de formulação, malha, contatos, propriedades e condições de contorno. Modelos substitutos aprendem aproximações dentro de uma região validada.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Geração de alternativas, otimização topológica, classificação de desenhos, preparação de malha e aproximação de resultados. A geometria precisa respeitar fabricação, montagem, inspeção e manutenção.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Refino de malha não corrige condição de contorno errada. Verifique equilíbrio, convergência, singularidades e solução de referência. Não fabrique a partir de imagem gerada sem desenho técnico validado.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Crie suporte paramétrico com furos e nervura; defina material e carga; rode análise estática; refine malha; compare deslocamento em regiões válidas; documente versão e hipóteses."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que malha fina não garante simulação correta?",
      "Diferença entre sólido paramétrico e malha?",
      "Quais restrições de fabricação entram na otimização?"
    ],
    "references": [
      {
        "title": "FreeCAD documentation",
        "url": "https://wiki.freecad.org/"
      },
      {
        "title": "SIMULIA Abaqus",
        "url": "https://www.3ds.com/products/simulia/abaqus"
      }
    ]
  },
  "visao-qualidade": {
    "lead": "Visão computacional classifica imagens, localiza objetos ou segmenta defeitos. Em inspeção, câmera, lente, iluminação, foco e posicionamento são parte do sistema de medição e influenciam tanto quanto a rede neural.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Classificação responde o que há; detecção indica onde; segmentação delimita pixels. Dados devem representar peças, lotes e condições reais. Dividir imagens quase idênticas entre treino e teste infla métricas; defeitos raros exigem atenção a falsos negativos.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Inspeção de soldas e superfícies, leitura de códigos, verificação de montagem e classificação de acabamento. Controle de iluminação e captura reduz variação e simplifica o modelo.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Acurácia pode ocultar falhas em classes raras. Avalie precision, recall, F1, IoU e mAP conforme tarefa; crie zona de incerteza e encaminhamento humano; monitore mudança de câmera e fornecedor.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Escolha imagens autorizadas; padronize captura; rotule defeitos; separe por lote; avalie precision/recall por classe; defina conduta para imagem inválida ou confiança baixa."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Quando usar segmentação?",
      "Por que separar por lote?",
      "Qual o risco de otimizar apenas acurácia com defeitos raros?"
    ],
    "references": [
      {
        "title": "Ultralytics — Tasks",
        "url": "https://docs.ultralytics.com/tasks/"
      },
      {
        "title": "MVTec Anomaly Detection",
        "url": "https://www.mvtec.com/company/research/datasets/mvtec-ad"
      }
    ]
  },
  "digital-twin": {
    "lead": "Gêmeo digital é uma representação conectada a um ativo ou processo físico, alimentada por dados e modelos ao longo do ciclo de vida. Um modelo 3D estático ou dashboard isolado não é automaticamente um gêmeo digital.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "A arquitetura associa identidade do ativo, hierarquia, geometria, modelo físico/estatístico e telemetria. Frequência e latência dependem da decisão. Calibração ajusta parâmetros; validação compara previsões com dados independentes.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Planejamento de manutenção, eficiência energética, comissionamento, simulação de cenários e treinamento. O primeiro caso de uso deve ser estreito e mensurável.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Sincronização ruim, sensores defeituosos e modelo desatualizado criam falsa confiança. Defina permissões e não permita comando físico sem análise de segurança, autorização e fallback.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Modele motor ou bomba; crie ID, componentes e tags; associe unidade e qualidade; estime variável por relação física simples; compare com dados; documente frequência, latência e comportamento offline."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "O que diferencia gêmeo de modelo 3D?",
      "Diferença entre calibração e validação?",
      "O que deve existir antes de enviar comandos ao ativo?"
    ],
    "references": [
      {
        "title": "NIST — Digital Twins",
        "url": "https://www.nist.gov/programs-projects/digital-twins"
      },
      {
        "title": "ISO 23247 — Digital twin framework",
        "url": "https://www.iso.org/standard/75066.html"
      }
    ]
  },
  "aeronautica": {
    "lead": "IA pode apoiar trend monitoring, pesquisa documental, triagem de imagens e organização de registros. Aeronavegabilidade depende de dados técnicos aplicáveis, procedimentos vigentes, pessoal habilitado e rastreabilidade; IA não autoriza manutenção nem substitui dados aprovados.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "Parâmetros de motor variam com altitude, temperatura, potência, configuração e condições de medição. Tendências exigem comparabilidade. Imagens dependem de resolução, iluminação, ângulo e escala; resultados inconclusivos seguem o procedimento técnico aplicável.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Apoio à consulta de documentos públicos, identificação preliminar de padrões, análise histórica e priorização de revisão. Toda saída deve ser apoio informativo e encaminhada à pessoa responsável.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não gere instruções de manutenção a partir de respostas do modelo. Verifique revisão, efetividade e aplicabilidade; não declare aeronavegabilidade por score ou imagem; preserve registros e evite viés de automação.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Use dados sintéticos: identifique fase operacional e unidade; compare amostras equivalentes; marque desvio estatístico; escreva nota de apoio sem instrução de manutenção e indique fonte, revisão e revisão humana."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que parâmetros precisam de contexto operacional?",
      "Diferença entre material didático e dado aprovado?",
      "Quais dados tornam uma análise rastreável?"
    ],
    "references": [
      {
        "title": "ANAC — Legislação",
        "url": "https://www.gov.br/anac/pt-br/assuntos/legislacao"
      },
      {
        "title": "FAA — Aviation Maintenance Handbooks",
        "url": "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation"
      }
    ]
  },
  "docs-aeronauticos": {
    "lead": "Documentos técnicos são controlados: emissor, revisão, efetividade, configuração e aplicabilidade importam tanto quanto o texto. Um assistente pode localizar trechos, mas deve preservar referência exata e nunca inventar procedimento.",
    "sections": [
      {
        "title": "1. Fundamentos e conceitos",
        "explanation": "PDFs podem conter texto, tabelas, diagramas e páginas escaneadas. OCR erra símbolos, unidades e códigos. RAG recupera trechos e os fornece ao modelo; a resposta deve incluir documento, revisão, seção e página, distinguindo evidência de ausência de evidência.",
        "points": [
          "Defina a decisão apoiada e a unidade de análise antes de escolher o modelo.",
          "Registre entradas, saídas, unidades, contexto e responsável pelo uso.",
          "Comece com uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Busca em bibliotecas autorizadas, comparação de revisões e localização de informações em material público de treinamento. Filtros de modelo, série e efetividade devem preceder a geração.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não misture revisões nem envie conteúdo restrito a serviços não autorizados. Conteúdo recuperado é dado, não comando. Se a evidência não estiver no documento, informe que não foi localizada.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Roteiro técnico de implementação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação, implantação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Use documento público autorizado; extraia texto mantendo página e revisão; indexe metadados; faça perguntas respondíveis e não respondíveis; confira manualmente cada citação no original."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições de operação; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que a revisão mais recente pode não se aplicar?",
      "Quais metadados acompanham cada trecho?",
      "O que fazer quando não há evidência suficiente?"
    ],
    "references": [
      {
        "title": "ANAC — Legislação",
        "url": "https://www.gov.br/anac/pt-br/assuntos/legislacao"
      },
      {
        "title": "FAA — Regulations and Guidance",
        "url": "https://www.faa.gov/regulations_policies"
      }
    ]
  }
  },
  ...{
  "trend-motores": {
    "lead": "Trend monitoring acompanha parâmetros de motor ao longo do tempo para identificar desvios em relação a uma referência comparável. A análise precisa respeitar condições de operação, configuração, instrumento e metodologia aplicável.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Parâmetros como EGT, N1, N2, fuel flow, pressão e temperatura variam com potência, altitude, velocidade, temperatura ambiente, bleed e configuração. Baseline representa comportamento de referência; normalização só deve seguir método documentado.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Análise histórica, visualização de tendência e apoio à priorização de avaliação técnica. Médias móveis e regressão ajudam a visualizar evolução, mas não diagnosticam causa raiz.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Misturar condições incomparáveis cria tendências artificiais. Preserve dados brutos e corrigidos; documente exclusões, unidade e método; encaminhe desvios conforme programa autorizado. Não extrapole sem justificativa.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Use dados sintéticos; segmente por condição operacional; compare gráfico bruto e média móvel; teste sensibilidade a pontos extremos; escreva nota com período, método, unidade, limitações e encaminhamento."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que comparar parâmetros sem condição operacional pode induzir a erro?",
      "O que é baseline?",
      "Como diferenciar desvio estatístico de diagnóstico?"
    ],
    "references": [
      {
        "title": "FAA — Aviation Maintenance Handbooks",
        "url": "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation"
      },
      {
        "title": "NASA — Prognostics and Health Management",
        "url": "https://www.nasa.gov/intelligent-systems-division/"
      }
    ]
  },
  "inspecao-aero": {
    "lead": "Imagens podem ajudar a localizar padrões visuais e organizar evidências de inspeção, mas não substituem métodos, limites, iluminação, acesso ou critérios técnicos definidos para a tarefa.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Classificação atribui categoria; detecção localiza regiões; segmentação delimita pixels. Qualidade depende de câmera, lente, escala, ângulo, iluminação, foco e área visível. Dados devem representar materiais, superfícies e condições reais.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Triagem de imagens autorizadas, organização de achados, comparação visual e priorização de revisão humana. Resultados inconclusivos devem ser encaminhados ao processo técnico apropriado.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não declarar aeronavegabilidade nem aceitar/rejeitar peça somente por score. Controle versão, origem e escala; preserve imagem original; não substitua ensaio ou inspeção exigida.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Use imagens públicas ou didáticas autorizadas; classifique exemplos não críticos; registre condições de captura; compare erros; escreva relatório que diferencie sugestão algorítmica de conclusão técnica."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que uma imagem não demonstra profundidade de dano?",
      "Quais variáveis de captura afetam a detecção?",
      "O que fazer com resultado inconclusivo?"
    ],
    "references": [
      {
        "title": "FAA — Aviation Maintenance Handbooks",
        "url": "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation"
      },
      {
        "title": "Ultralytics — Computer Vision Tasks",
        "url": "https://docs.ultralytics.com/tasks/"
      }
    ]
  },
  "negocios": {
    "lead": "Monetizar IA não é vender a palavra IA: é resolver um problema recorrente para alguém que reconhece valor na solução. A oportunidade precisa ser validada com clientes, custos, capacidade de entrega e responsabilidade.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Uma oferta combina público, problema, resultado, escopo, prazo, preço e evidência. Diferencie serviço assistido por IA, produto digital e software recorrente. A tecnologia é meio; o valor percebido e a confiança sustentam a compra.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Automação administrativa, organização documental, edição de mídia, relatórios, busca em acervos, análise de dados e capacitação. Escolha um nicho onde seja possível observar o processo e medir antes/depois.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não prometa precisão, economia ou conformidade sem evidência. Considere privacidade, direitos autorais, revisão humana, suporte, custo de ferramentas e dependência de fornecedores.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Entreviste três potenciais clientes; mapeie tarefa, frequência, tempo e custo; proponha uma entrega pequena; estime horas, ferramentas e suporte; teste disposição real de pagamento antes de desenvolver produto."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Qual a diferença entre vender ferramenta e vender resultado?",
      "Que evidências validam uma oferta?",
      "Quais custos recorrentes devem entrar no preço?"
    ],
    "references": [
      {
        "title": "Strategyzer — Value Proposition Canvas",
        "url": "https://www.strategyzer.com/library/the-value-proposition-canvas"
      },
      {
        "title": "Sebrae — Gestão e empreendedorismo",
        "url": "https://sebrae.com.br/"
      }
    ]
  },
  "problema-oferta": {
    "lead": "Uma boa oportunidade nasce de uma dor frequente, custosa e mal resolvida. Ideias interessantes não são necessariamente negócios. A investigação começa observando como o trabalho é feito hoje e quem sofre as consequências.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Mapeie usuário, tarefa, frequência, exceções, ferramentas, retrabalho e impacto. Diferencie usuário, comprador e aprovador. Uma dor pode ser importante, mas não ter orçamento, prioridade ou dados disponíveis para resolvê-la.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Exemplos incluem retrabalho em documentos, demora em localizar informação, falhas de passagem de turno, atendimento repetitivo e relatórios manuais. A solução pode ser processo melhor, automação simples ou IA.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Evite entrevistas que induzam elogios. Não confunda curiosidade com intenção de compra. Verifique acesso legal aos dados e se uma regra simples resolve o problema com menor risco.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Observe um processo real; desenhe etapas; conte ocorrências e tempo; entreviste usuários com perguntas sobre fatos passados; estime custo do problema; formule hipótese testável e critério de sucesso."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Como diferenciar usuário e comprador?",
      "Por que elogio não valida demanda?",
      "Quando uma regra simples é melhor que IA?"
    ],
    "references": [
      {
        "title": "Sebrae — Pesquisa de mercado",
        "url": "https://sebrae.com.br/"
      },
      {
        "title": "Strategyzer — Value Proposition Canvas",
        "url": "https://www.strategyzer.com/library/the-value-proposition-canvas"
      }
    ]
  },
  "mvp-portfolio": {
    "lead": "MVP é a menor solução capaz de testar uma hipótese importante com usuários reais; não é um produto incompleto sem propósito. Um bom portfólio demonstra problema, processo, decisões, resultados, limites e aprendizado.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Defina hipótese, público, tarefa, métrica e critério de interrupção. Protótipo testa compreensão; piloto testa uso em contexto; produto exige confiabilidade, suporte, segurança e manutenção. Não confunda demonstração técnica com validação comercial.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Projetos demonstráveis incluem assistente RAG com citações, fluxo de automação com aprovação, classificador em dados públicos e painel de anomalias sintéticas. Mostre entradas, saídas e falhas, não apenas telas bonitas.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Use dados sintéticos ou autorizados; não publique segredos ou dados pessoais. Declare limitações e não apresente resultado simulado como ganho real de cliente.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Escolha uma hipótese; construa protótipo de escopo limitado; teste com usuários; registre tarefas concluídas, erros e feedback; publique estudo de caso com arquitetura, métricas, custos e limitações."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Qual a diferença entre protótipo e produto?",
      "O que torna uma métrica de MVP útil?",
      "Por que declarar limites fortalece o portfólio?"
    ],
    "references": [
      {
        "title": "Y Combinator — Startup Library",
        "url": "https://www.ycombinator.com/library"
      },
      {
        "title": "GitHub Docs — About READMEs",
        "url": "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"
      }
    ]
  },
  "precificacao": {
    "lead": "Preço sustentável precisa cobrir trabalho, ferramentas, impostos, suporte, risco e margem. Cobrar apenas pelo tempo de execução da IA ignora descoberta, revisão, integração, manutenção e responsabilidade pelo resultado.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Calcule custo direto, horas de análise, implementação, testes, treinamento, suporte e contingência. Escolha unidade de cobrança coerente: projeto, assinatura, volume ou hora. Defina limites de uso e o que conta como mudança de escopo.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Pacotes podem separar diagnóstico, piloto, implantação e manutenção. Um preço fixo funciona melhor quando entregáveis e critérios de aceite são claros; recorrência exige serviço contínuo identificável.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Evite garantia absoluta sobre saída probabilística. Defina dados fornecidos pelo cliente, retenção, confidencialidade, revisão, disponibilidade, exclusões e processo de correção. Busque orientação contábil/jurídica quando necessário.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Monte orçamento fictício com horas, ferramentas, impostos estimados, suporte e margem; descreva entregáveis, limites, dependências, aceite, manutenção e itens cobrados à parte."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Quais custos são esquecidos ao precificar?",
      "Quando preço fixo é arriscado?",
      "Por que escopo e critérios de aceite precisam estar no contrato?"
    ],
    "references": [
      {
        "title": "Sebrae — Formação de preço",
        "url": "https://sebrae.com.br/"
      },
      {
        "title": "Sebrae — Gestão financeira",
        "url": "https://sebrae.com.br/"
      }
    ]
  },
  "relatorio-inspecao": {
    "lead": "Um relatório inteligente organiza evidências, padroniza campos e ajuda a redigir observações; não deve inventar medições, classificar conformidade sem critério ou substituir a assinatura do responsável técnico.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "O fluxo recebe dados estruturados e evidências, valida campos obrigatórios, associa imagens e gera um rascunho. LLM pode resumir observações, mas números, unidades, identificação, norma e conclusão devem vir de fontes verificáveis.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Aplicável a inspeções de equipamentos, qualidade e manutenção não regulada. O ganho pode estar na redução de retrabalho, consistência de linguagem e facilidade de localizar histórico.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não invente resultados ausentes. Diferencie observação, hipótese e conclusão. Proteja dados do cliente; mantenha original, revisão humana, versão e trilha de alterações.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Crie formulário com ativo, data, inspetor, item, medida, unidade, evidência e observação; valide campos; gere rascunho; confira cada afirmação contra os dados; exporte com status 'rascunho para revisão'."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Quais campos devem ser estruturados?",
      "Como impedir que o modelo invente uma medição?",
      "Por que o documento deve indicar que é rascunho?"
    ],
    "references": [
      {
        "title": "NIST AI RMF",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "title": "OWASP — Top 10 for LLM Applications",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      }
    ]
  },
  "rag-manuais": {
    "lead": "RAG combina recuperação de trechos com geração de linguagem. O modelo responde usando contexto recuperado, mas a confiabilidade depende da versão documental, fragmentação, busca, filtros e verificação das citações.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Ingestão extrai texto e metadados; chunking divide conteúdo; embeddings representam trechos em vetores; recuperação seleciona candidatos; reranking pode reordenar; geração formula resposta com fontes. Busca lexical e semântica podem ser combinadas.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Consulta a manuais públicos, políticas internas autorizadas e procedimentos não críticos. Respostas úteis apontam documento, revisão, seção e página e permitem abrir a fonte.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não indexe material sem permissão. Filtre versão e aplicabilidade; defenda contra prompt injection em documentos; não transforme resumo em instrução técnica; admita ausência de evidência.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Use três documentos públicos; extraia título e página; crie chunks; faça busca lexical/semântica; formule perguntas respondíveis e impossíveis; avalie precisão da recuperação e fidelidade das citações."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "O que embeddings fazem?",
      "Por que metadados de revisão são essenciais?",
      "Como o sistema deve responder sem evidência?"
    ],
    "references": [
      {
        "title": "Hugging Face — RAG",
        "url": "https://huggingface.co/docs/transformers/model_doc/rag"
      },
      {
        "title": "OWASP — LLM Top 10",
        "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      }
    ]
  },
  "anomalia-motor": {
    "lead": "Um monitor de anomalias acompanha sinais de um motor e sinaliza desvios para investigação. O objetivo inicial é triagem e visibilidade, não diagnóstico automático nem comando de parada.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Dados típicos incluem vibração, temperatura, corrente, rotação e carga. Características como RMS, pico, fator de crista e espectro dependem da taxa de amostragem, montagem do sensor e regime. Contexto evita confundir carga variável com defeito.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Painel pode exibir tendência, faixa de referência, qualidade do sensor, alertas e histórico de inspeções. Comece com dados sintéticos ou conjuntos públicos e valide com especialistas antes de uso real.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não use alarme como proteção de máquina. Controle taxa de falsos alarmes, perda de sensor, deriva e mudanças de montagem. Qualquer ação física deve permanecer em sistemas de proteção independentes e aprovados.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Gere sinais sintéticos em regimes distintos; calcule RMS e tendência; detecte valores incomuns; adicione estado de qualidade; construa painel e avalie falsos alarmes por regime."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que RMS depende do regime?",
      "Qual o efeito da taxa de amostragem?",
      "Por que monitor não deve substituir proteção?"
    ],
    "references": [
      {
        "title": "NASA — Prognostics and Health Management",
        "url": "https://www.nasa.gov/intelligent-systems-division/"
      },
      {
        "title": "Scikit-learn — Outlier detection",
        "url": "https://scikit-learn.org/stable/modules/outlier_detection.html"
      }
    ]
  },
  "visao-defeitos": {
    "lead": "Um detector visual identifica padrões em imagens e pode apoiar triagem de qualidade. Para ser útil, precisa controlar aquisição, definir defeito, medir desempenho por classe e encaminhar incerteza para revisão.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "O pipeline inclui captura, pré-processamento, anotação, divisão dos dados, treinamento, inferência e auditoria. Classificação, detecção e segmentação têm saídas diferentes. Métricas devem refletir tamanho, frequência e custo do defeito.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Pode ser aplicado a riscos, amassados, porosidade superficial e falhas de acabamento em conjuntos didáticos. O projeto deve demonstrar limites de iluminação, escala e variação de peça.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Falsos negativos podem liberar defeitos; falsos positivos geram retrabalho. Separe por lote, evite vazamento, monitore mudança de câmera e mantenha inspeção humana conforme risco.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Escolha dataset autorizado; anote regiões; divida por peça/lote; treine modelo simples; calcule precision/recall; mostre falsos positivos e negativos; defina rejeição por baixa confiança."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Qual a diferença entre classificação e detecção?",
      "Por que separar por lote?",
      "Como escolher limiar considerando falsos negativos?"
    ],
    "references": [
      {
        "title": "MVTec AD dataset",
        "url": "https://www.mvtec.com/company/research/datasets/mvtec-ad"
      },
      {
        "title": "Ultralytics documentation",
        "url": "https://docs.ultralytics.com/"
      }
    ]
  },
  "automacao-oficina": {
    "lead": "Automatizar atendimento é organizar entrada, triagem, orçamento e acompanhamento sem prometer diagnóstico remoto. O sistema deve reduzir esquecimentos e melhorar comunicação, preservando aprovação do cliente e responsabilidade do profissional.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Um fluxo pode receber formulário ou mensagem, validar dados, criar ordem preliminar, classificar assunto, consultar agenda e preparar resposta. Integrações exigem identidade do cliente, consentimento, logs e tratamento de falhas.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Agendamento, lembrete, atualização de status, coleta de dados do veículo, envio de orçamento para aprovação e pesquisa de satisfação. Comece por tarefas administrativas repetitivas.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não confirme diagnóstico, preço ou prazo sem validação. Proteja telefone, placa e histórico; evite mensagens duplicadas; ofereça atendimento humano; não execute compra ou serviço sem autorização registrada.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Desenhe fluxo para solicitação de orçamento; colete apenas dados necessários; gere protocolo; encaminhe para avaliação; envie proposta como rascunho; exija aceite explícito antes de agendar serviço."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Quais dados são necessários e quais são excessivos?",
      "Por que orçamento deve ser aprovado?",
      "Como evitar duplicidade de mensagens?"
    ],
    "references": [
      {
        "title": "n8n documentation",
        "url": "https://docs.n8n.io/"
      },
      {
        "title": "ANPD — Guia orientativo de agentes de tratamento",
        "url": "https://www.gov.br/anpd/pt-br/documentos-e-publicacoes"
      }
    ]
  },
  "trend-motor-aero": {
    "lead": "Este projeto didático demonstra visualização e análise de tendência com dados sintéticos. Não é ferramenta de diagnóstico, manutenção ou decisão de aeronavegabilidade. Dados reais exigem autorização, metodologia e documentação aplicáveis.",
    "sections": [
      {
        "title": "1. Fundamentos e arquitetura",
        "explanation": "Um painel precisa preservar parâmetro, unidade, timestamp, condição operacional, configuração e qualidade. Comparação deve usar amostras equivalentes e metodologia de correção documentada; pontos incomparáveis devem ser identificados, não escondidos.",
        "points": [
          "Defina a decisão apoiada, entradas, saídas e unidade de análise.",
          "Registre origem, versão, unidade, contexto e responsável.",
          "Comece por uma linha de base simples e verificável."
        ]
      },
      {
        "title": "2. Aplicações e estudo de caso",
        "explanation": "Gráficos de série, baseline, faixa de referência didática, filtros por condição, histórico de eventos e exportação de relatório podem apoiar ensino de análise de dados.",
        "points": [
          "Escolha um caso com impacto mensurável e dados legalmente utilizáveis.",
          "Compare com o processo atual e estime custo de implantação e manutenção.",
          "Mantenha revisão humana proporcional ao risco."
        ]
      },
      {
        "title": "3. Limitações, segurança e governança",
        "explanation": "Não utilize limiares inventados como limites de motor. Não misture dados reais de aeronaves sem autorização. Não converta desvio em instrução de manutenção; encaminhe interpretação à documentação e ao pessoal autorizado.",
        "points": [
          "Registre origem e versão dos dados, modelo e ferramentas.",
          "Defina limites de uso, fallback, monitoramento e responsável.",
          "Interrompa o sistema quando dados ou condições saírem da faixa validada."
        ]
      },
      {
        "title": "4. Implementação e avaliação",
        "explanation": "Um projeto reproduzível documenta problema, dados, método, avaliação e manutenção. A avaliação precisa refletir o custo real dos erros e a população em que o sistema será usado.",
        "points": [
          "Separe treino, validação e teste respeitando tempo e grupos.",
          "Documente transformações, parâmetros e critérios de avaliação.",
          "Avalie o sistema completo, não apenas a métrica isolada do modelo."
        ]
      }
    ],
    "lab": [
      {
        "step": "Definir escopo",
        "detail": "Gere série sintética de EGT com condições simuladas; separe dados comparáveis; mostre bruto e tendência; sinalize amostra insuficiente; exporte relatório com aviso didático e sem recomendação operacional."
      },
      {
        "step": "Preparar e validar",
        "detail": "Registre origem, unidade, qualidade, permissões e divisão dos dados. Construa uma linha de base e defina métricas adequadas."
      },
      {
        "step": "Executar e avaliar",
        "detail": "Compare resultados com a linha de base; examine erros por subgrupo e condições; não extrapole além da faixa validada."
      },
      {
        "step": "Documentar e revisar",
        "detail": "Produza relatório com hipótese, método, evidências, limitações, decisão apoiada, revisão humana e critérios de interrupção."
      }
    ],
    "assessment": [
      "Por que o painel deve mostrar condições de operação?",
      "Qual o risco de criar limite arbitrário?",
      "Como diferenciar tendência de diagnóstico?"
    ],
    "references": [
      {
        "title": "ANAC — Legislação",
        "url": "https://www.gov.br/anac/pt-br/assuntos/legislacao"
      },
      {
        "title": "FAA — Aviation Maintenance Handbooks",
        "url": "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation"
      }
    ]
  }
  }
};
