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
 }
};
