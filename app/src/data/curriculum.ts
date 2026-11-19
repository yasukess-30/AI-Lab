export type Lesson = {
  id: string;
  title: string;
  duration: number;
  summary: string;
  objectives: string[];
  sections: { heading: string; body: string; bullets?: string[] }[];
  example: string;
  practice: string;
  checkpoint: string;
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  duration: string;
  description: string;
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    id: "fundamentos",
    title: "Fundamentos da inteligência artificial",
    subtitle: "Entenda o mapa antes de escolher as ferramentas.",
    level: "Base",
    duration: "2h 15min",
    description: "Construa uma visão clara do que é IA, como os modelos aprendem e onde cada abordagem faz sentido.",
    lessons: [
      {
        id: "ia-mapa",
        title: "IA, machine learning e deep learning",
        duration: 35,
        summary: "As três expressões não são sinônimos. Elas representam níveis diferentes de uma mesma família de tecnologias.",
        objectives: ["Diferenciar IA, aprendizado de máquina e deep learning.", "Reconhecer problemas que podem ser tratados com modelos.", "Separar automação tradicional de sistemas que aprendem com dados."],
        sections: [
          { heading: "O mapa em camadas", body: "Inteligência artificial é o campo amplo que busca construir sistemas capazes de executar tarefas associadas à percepção, previsão, linguagem, planejamento ou decisão. Machine learning é uma parte da IA: em vez de programar todas as regras manualmente, ajustamos um modelo a partir de exemplos. Deep learning é uma família de técnicas de machine learning baseada em redes neurais com várias camadas." },
          { heading: "Regra fixa ou aprendizado?", body: "Uma automação tradicional segue regras escritas por alguém. Um modelo de aprendizado identifica padrões em dados e usa esses padrões para estimar uma resposta. Os dois podem trabalhar juntos: um modelo classifica uma imagem e uma regra de negócio decide o que fazer com a classificação." , bullets: ["Automação: se a temperatura passar de um limite, gerar um alerta.", "Machine learning: estimar a chance de falha usando histórico de vibração e temperatura.", "Deep learning: reconhecer trincas em imagens de componentes com uma rede neural." ]}
        ],
        example: "No controle de qualidade de uma peça, uma regra pode reprovar uma dimensão fora da tolerância. Um modelo de visão computacional pode analisar uma fotografia e apontar marcas superficiais que seriam difíceis de descrever com regras simples.",
        practice: "Escolha três tarefas de uma oficina ou linha de produção. Classifique cada uma como regra fixa, aprendizado de máquina ou uma combinação. Justifique em uma frase.",
        checkpoint: "Machine learning aprende relações a partir de exemplos. Deep learning é uma abordagem de machine learning baseada em redes neurais profundas."
      },
      {
        id: "tipos-aprendizado",
        title: "Como as máquinas aprendem",
        duration: 40,
        summary: "Aprendizado supervisionado, não supervisionado e por reforço resolvem problemas diferentes.",
        objectives: ["Identificar os três paradigmas mais comuns.", "Entender dados rotulados e não rotulados.", "Escolher uma abordagem inicial para um problema real."],
        sections: [
          { heading: "Supervisionado", body: "O modelo recebe exemplos com a resposta correta. Aprende a relacionar entradas e saídas. É comum em classificação, como peça aprovada ou reprovada, e regressão, como estimar consumo de combustível." },
          { heading: "Não supervisionado e reforço", body: "No aprendizado não supervisionado, o sistema procura estrutura sem receber a resposta certa em cada exemplo. Agrupamento de perfis de vibração é um exemplo. No aprendizado por reforço, um agente testa ações e recebe recompensas ou penalidades ao interagir com um ambiente." , bullets: ["Classificação: categoria ou classe.", "Regressão: valor numérico contínuo.", "Clusterização: grupos encontrados nos dados.", "Reforço: ação escolhida em função de recompensa acumulada."]}
        ],
        example: "Se você possui registros históricos com a data em que cada rolamento falhou, pode treinar um modelo supervisionado para estimar risco. Se ainda não tem rótulos de falha, pode começar procurando padrões incomuns com métodos não supervisionados.",
        practice: "Escreva um problema de manutenção e diga quais dados você teria, se existe uma resposta conhecida e qual paradigma parece mais adequado.",
        checkpoint: "Quando existem exemplos com respostas conhecidas, o aprendizado supervisionado costuma ser um bom ponto de partida."
      },
      {
        id: "pipeline-ia",
        title: "Do dado à decisão",
        duration: 60,
        summary: "Um modelo não é o produto inteiro. Entenda o fluxo de dados, treinamento, avaliação e uso real.",
        objectives: ["Descrever as etapas de um projeto de IA.", "Reconhecer vazamento de dados e sobreajuste.", "Entender por que avaliação e monitoramento são contínuos."],
        sections: [
          { heading: "O ciclo de um modelo", body: "Um projeto começa pela definição do problema e da métrica de sucesso. Depois vêm coleta, limpeza e preparação dos dados, separação entre treino e teste, treinamento, avaliação e implantação. Depois de implantado, o sistema precisa ser monitorado porque máquinas, materiais, sensores e condições de operação mudam." },
          { heading: "O que pode dar errado", body: "Sobreajuste acontece quando o modelo memoriza particularidades do conjunto de treino e perde capacidade de generalizar. Vazamento de dados ocorre quando informações que não estariam disponíveis no momento real da previsão entram indevidamente no treinamento. Ambos podem produzir métricas bonitas e resultados ruins em campo.", bullets: ["Treino: ajustar parâmetros do modelo.", "Validação: comparar alternativas e ajustar decisões.", "Teste: estimar desempenho em dados não usados antes.", "Monitoramento: acompanhar desempenho após implantação."]}
        ],
        example: "Para prever falha de motor, não se deve misturar aleatoriamente medições futuras da mesma máquina entre treino e teste se isso revelar ao modelo condições que não existiriam na data da previsão. Uma divisão temporal pode ser mais realista.",
        practice: "Desenhe em papel o fluxo de um projeto de IA para detectar desgaste em rolamentos. Marque onde os dados são coletados, como o resultado será avaliado e quem toma a decisão final.",
        checkpoint: "A qualidade do modelo depende do problema, dos dados, da avaliação e da operação. Acurácia isolada não garante utilidade."
      }
    ]
  },
  {
    id: "llms",
    title: "Modelos generativos e LLMs",
    subtitle: "O que acontece por trás de uma conversa com IA.",
    level: "Base a intermediário",
    duration: "2h 30min",
    description: "Compreenda tokens, contexto, embeddings, transformers e os limites dos modelos de linguagem.",
    lessons: [
      {
        id: "tokens-contexto",
        title: "Tokens, contexto e geração de texto",
        duration: 40,
        summary: "Um modelo de linguagem processa sequências de tokens e estima qual token deve vir a seguir.",
        objectives: ["Entender o que é token.", "Explicar a janela de contexto.", "Reconhecer por que textos longos exigem organização."],
        sections: [
          { heading: "Texto vira sequência", body: "Um token pode representar uma palavra, parte de uma palavra, pontuação ou outro fragmento. O texto é convertido em números que o modelo consegue processar. O modelo calcula distribuições de probabilidade para os próximos tokens e os produz em sequência." },
          { heading: "Janela de contexto", body: "A janela de contexto é a quantidade de informação que o modelo consegue considerar em uma chamada. Ela inclui instruções, conversa, documentos e a resposta gerada, conforme a arquitetura e o produto. Mais contexto não significa automaticamente mais precisão: informação irrelevante pode atrapalhar.", bullets: ["Divida documentos extensos por assunto.", "Mantenha requisitos e restrições importantes explícitos.", "Peça para o modelo apontar quando faltar informação."]}
        ],
        example: "Ao pedir análise de um manual de manutenção, forneça o trecho aplicável, identifique o modelo do equipamento e peça para separar o que está escrito no manual do que é interpretação.",
        practice: "Pegue uma pergunta complexa que você faria a um LLM e reescreva em três partes: contexto, tarefa e formato da resposta.",
        checkpoint: "LLMs geram sequências de tokens com base em padrões aprendidos. Eles não consultam automaticamente uma verdade universal."
      },
      {
        id: "transformer-embeddings",
        title: "Embeddings, atenção e transformers",
        duration: 55,
        summary: "A arquitetura transformer permite relacionar partes diferentes de uma sequência com eficiência.",
        objectives: ["Explicar embeddings de forma intuitiva.", "Entender a função da atenção.", "Reconhecer o papel do transformer."],
        sections: [
          { heading: "Embeddings", body: "Um embedding representa um item, como palavra, trecho ou imagem, como uma lista de números. Trechos com significado ou uso parecido tendem a ocupar regiões próximas nesse espaço vetorial. Isso ajuda sistemas a comparar similaridade sem depender apenas de palavras idênticas." },
          { heading: "Atenção", body: "O mecanismo de atenção calcula quanto cada parte da sequência deve considerar outras partes ao produzir uma representação. Em uma frase, o significado de um termo pode depender de algo escrito várias palavras antes. O transformer usa blocos de atenção e redes feed-forward para processar essas relações.", bullets: ["Tokenização transforma texto em unidades processáveis.", "Embedding transforma unidades em vetores.", "Atenção relaciona partes da sequência.", "Camadas sucessivas refinam as representações."]}
        ],
        example: "Em 'o eixo foi substituído porque ele estava empenado', o sistema precisa relacionar 'ele' a 'eixo'. A atenção ajuda o modelo a ponderar essa relação no contexto.",
        practice: "Explique para alguém da oficina a diferença entre uma palavra-chave e um embedding. Use a busca por 'rolamento danificado' e 'ruído de rolamento' como exemplo.",
        checkpoint: "Embeddings representam relações em vetores. Atenção permite ponderar relações entre tokens. Transformers combinam esses mecanismos em camadas."
      },
      {
        id: "limites-llm",
        title: "Alucinações, confiabilidade e avaliação",
        duration: 55,
        summary: "Uma resposta convincente não é necessariamente correta. Aprenda a validar o que importa.",
        objectives: ["Definir alucinação em IA generativa.", "Criar critérios de verificação.", "Distinguir hipótese, evidência e fonte."],
        sections: [
          { heading: "Por que o erro parece convincente", body: "O objetivo de um LLM é gerar uma continuação plausível dentro do contexto, não garantir que cada afirmação seja verdadeira. Quando faltam dados, o modelo pode completar lacunas com uma resposta fluente. Isso é especialmente perigoso em números de peça, torque, tolerância, legislação e procedimentos de segurança." },
          { heading: "Um protocolo de verificação", body: "Defina o nível de risco antes de usar a resposta. Para uma explicação conceitual, uma checagem simples pode bastar. Para manutenção aeronáutica ou automotiva, confirme procedimentos, limites e valores em documentação técnica aprovada e atualizada. Registre a fonte e a versão consultada.", bullets: ["Peça a fonte e a página, quando aplicável.", "Confirme unidades e condições de operação.", "Procure contradições em documentação independente.", "Não use IA como autoridade final em tarefas críticas."]}
        ],
        example: "Se a IA sugerir um torque para um parafuso estrutural, não use o valor apenas porque parece razoável. Confirme no manual aplicável, incluindo condição de rosca, lubrificação, sequência e unidade.",
        practice: "Peça a um modelo uma explicação de um conceito técnico que você conhece. Marque três afirmações e confira cada uma em uma fonte confiável.",
        checkpoint: "Em assuntos críticos, a IA pode apoiar a pesquisa e a organização, mas a documentação aprovada e a responsabilidade técnica continuam prevalecendo."
      }
    ]
  },
  {
    id: "chatgpt",
    title: "Domínio do ChatGPT e engenharia de prompts",
    subtitle: "Transforme perguntas vagas em trabalho bem definido.",
    level: "Aplicação",
    duration: "2h 20min",
    description: "Aprenda a orientar modelos, avaliar respostas e criar fluxos de trabalho reutilizáveis.",
    lessons: [
      {
        id: "anatomia-prompt",
        title: "A anatomia de um bom prompt",
        duration: 40,
        summary: "Um prompt útil define contexto, objetivo, dados, limites e formato de entrega.",
        objectives: ["Estruturar uma solicitação com clareza.", "Fornecer contexto sem excesso.", "Definir critérios de qualidade e formato."],
        sections: [
          { heading: "Cinco partes", body: "Comece pelo contexto, descreva a tarefa, forneça os dados necessários, declare restrições e indique o formato desejado. Para tarefas complexas, inclua um exemplo de saída e critérios para avaliar o resultado." },
          { heading: "Iteração", body: "Um prompt não precisa acertar tudo de primeira. Avalie a resposta, identifique o que faltou e refine uma variável por vez. Salve prompts que funcionam como procedimentos reutilizáveis.", bullets: ["Contexto: quem usa e em qual cenário.", "Tarefa: o que precisa ser feito.", "Dados: informações de entrada.", "Restrições: o que não pode ser presumido.", "Formato: tabela, relatório, checklist ou plano."]}
        ],
        example: "Em vez de 'analise esse motor', peça: 'Atue como tutor de engenharia mecânica. Explique os princípios de funcionamento deste motor a partir das informações fornecidas. Separe fatos, hipóteses e dúvidas. Não invente especificações. Organize em sistema, função, falhas comuns e verificações documentais'.",
        practice: "Crie um prompt para transformar uma descrição de defeito automotivo em uma árvore de diagnóstico, exigindo hipóteses ordenadas e testes que diferenciem cada hipótese.",
        checkpoint: "Um prompt forte reduz ambiguidades e torna explícito como uma boa resposta deve ser reconhecida."
      },
      {
        id: "avaliar-saida",
        title: "Como avaliar e corrigir respostas",
        duration: 45,
        summary: "A qualidade do trabalho melhora quando você define critérios e pede evidências verificáveis.",
        objectives: ["Construir uma rubrica simples.", "Solicitar respostas estruturadas.", "Detectar lacunas e premissas ocultas."],
        sections: [
          { heading: "Rubrica de qualidade", body: "Avalie correção, completude, clareza, rastreabilidade e adequação ao risco. Uma resposta pode ser bem escrita e ainda falhar por omitir uma condição de operação ou misturar unidades." },
          { heading: "Faça o modelo mostrar os limites", body: "Peça uma lista de premissas, dados ausentes e pontos que precisam de validação. Em vez de perguntar apenas 'está certo?', peça para testar a resposta contra critérios específicos.", bullets: ["Quais dados sustentam a conclusão?", "Quais condições podem invalidá-la?", "O que ainda precisa ser medido?", "Qual fonte primária deve ser consultada?"]}
        ],
        example: "Para comparar duas opções de manutenção, peça uma tabela com custo estimado, tempo de parada, risco, evidência disponível e dados faltantes. Não permita que o modelo invente valores ausentes.",
        practice: "Pegue uma resposta de IA e atribua notas de 0 a 2 para correção, completude, clareza e rastreabilidade. Reescreva o prompt para melhorar o critério mais fraco.",
        checkpoint: "Avaliar uma resposta exige critérios definidos antes de confiar no resultado."
      },
      {
        id: "multimodal",
        title: "Imagem, arquivo, voz e análise multimodal",
        duration: 55,
        summary: "Modelos multimodais combinam diferentes tipos de entrada, mas cada modalidade tem limites próprios.",
        objectives: ["Reconhecer usos de análise de imagem e documentos.", "Preparar arquivos para análise.", "Evitar conclusões além do que a imagem permite."],
        sections: [
          { heading: "O que muda com multimodalidade", body: "Um sistema multimodal pode receber texto, imagem, áudio ou vídeo e relacionar essas informações. Isso abre espaço para resumir documentos, interpretar gráficos, comparar fotografias e organizar observações de inspeção." },
          { heading: "Limites de inspeção visual", body: "Uma imagem pode ocultar escala, iluminação, ângulo e detalhes internos. Não conclua dimensões, trincas ou conformidade apenas por uma fotografia sem método de medição e validação adequados.", bullets: ["Informe a origem e o contexto do arquivo.", "Use imagens nítidas e sem compressão excessiva.", "Separe observação visual de diagnóstico.", "Confirme medições com instrumentos apropriados."]}
        ],
        example: "Você pode pedir que a IA organize as anotações de uma inspeção visual em uma tabela de componente, condição observada, evidência fotográfica e verificação pendente. A decisão técnica continua dependente do procedimento aplicável.",
        practice: "Escreva um roteiro de análise de foto de uma peça: o que pode ser descrito visualmente, o que precisa de medição e o que exige consulta ao manual.",
        checkpoint: "A IA multimodal amplia a leitura de dados, mas não transforma uma imagem em medição certificada."
      }
    ]
  },
  {
    id: "agentes",
    title: "RAG, agentes e automações",
    subtitle: "Conecte conhecimento, ferramentas e processos.",
    level: "Intermediário",
    duration: "2h 45min",
    description: "Entenda como modelos consultam documentos, usam ferramentas e participam de fluxos automatizados.",
    lessons: [
      {
        id: "rag",
        title: "RAG: IA conectada a documentos",
        duration: 50,
        summary: "Retrieval-Augmented Generation recupera trechos relevantes antes de gerar uma resposta.",
        objectives: ["Explicar indexação e recuperação.", "Entender embeddings em busca semântica.", "Desenhar uma consulta com fontes rastreáveis."],
        sections: [
          { heading: "O problema do conhecimento fechado", body: "Um LLM pode não conhecer um documento interno, uma revisão recente de manual ou uma especificação particular. Em RAG, os documentos são divididos em trechos, convertidos em representações pesquisáveis e recuperados quando uma pergunta chega. Os trechos encontrados são enviados ao modelo como contexto." },
          { heading: "O fluxo", body: "Preparar documentos, extrair texto, dividir em trechos, gerar embeddings, armazenar em índice, recuperar os trechos mais relevantes e gerar uma resposta com referências. A qualidade depende tanto da recuperação quanto do modelo que redige a resposta.", bullets: ["Chunking: dividir documentos em unidades úteis.", "Embedding: representar o conteúdo em vetores.", "Retrieval: buscar trechos relevantes.", "Grounding: responder com base no contexto recuperado."]}
        ],
        example: "Uma biblioteca de procedimentos pode recuperar o capítulo de inspeção de um componente e pedir ao modelo que resuma as etapas, citando documento, revisão e seção. Se nenhum trecho responder à pergunta, o sistema deve declarar a lacuna.",
        practice: "Desenhe um RAG para um acervo de manuais: quais documentos entram, como serão identificados e quais referências precisam aparecer na resposta?",
        checkpoint: "RAG conecta um modelo a fontes externas recuperadas no momento da consulta. Não garante, por si só, que a fonte esteja correta ou atualizada."
      },
      {
        id: "agentes-tools",
        title: "Agentes, ferramentas e limites de autonomia",
        duration: 55,
        summary: "Um agente combina um modelo com ferramentas e um ciclo de decisão para executar etapas de uma tarefa.",
        objectives: ["Distinguir chat, workflow e agente.", "Entender chamadas de ferramentas.", "Definir permissões e pontos de aprovação."],
        sections: [
          { heading: "Do texto à ação", body: "Um chat responde a uma solicitação. Um workflow executa uma sequência definida. Um agente pode escolher entre ferramentas disponíveis, observar o resultado e decidir o próximo passo dentro de limites. A autonomia precisa ser proporcional ao risco da tarefa." },
          { heading: "Controle e segurança", body: "Ferramentas podem ler arquivos, consultar sistemas ou executar ações. Permissões mínimas, logs, limites de tentativas e confirmação humana evitam que uma interpretação errada se transforme em uma ação real.", bullets: ["Leitura de dados costuma ser menos arriscada que escrita.", "Ações irreversíveis exigem confirmação.", "Toda execução deve registrar entradas e resultados.", "Defina quando o agente deve parar e pedir ajuda."]}
        ],
        example: "Um agente pode ler um relatório de vibração, buscar o histórico da máquina e preparar uma recomendação para revisão. Ele não deve abrir uma ordem de serviço crítica ou alterar parâmetros de controle sem autorização explícita.",
        practice: "Desenhe um agente que prepara um relatório semanal de manutenção. Marque as ferramentas de leitura, as saídas e o ponto obrigatório de aprovação humana.",
        checkpoint: "Um agente não é apenas um prompt longo. É um sistema com ferramentas, estado, decisões e limites de execução."
      },
      {
        id: "automacao-mcp",
        title: "n8n, integrações e MCP",
        duration: 60,
        summary: "Automação conecta sistemas. MCP padroniza uma forma de expor contexto e ferramentas a aplicações de IA.",
        objectives: ["Identificar gatilhos, ações e condições.", "Entender o papel de APIs e conectores.", "Explicar MCP sem confundi-lo com um modelo de IA."],
        sections: [
          { heading: "Workflows visuais", body: "Ferramentas como n8n permitem desenhar fluxos com gatilhos, nós de processamento, condições e integrações. O valor está em remover tarefas repetitivas e criar rastreabilidade. Um fluxo bom tem tratamento de erro e sabe o que fazer quando uma etapa falha." },
          { heading: "MCP em poucas palavras", body: "Model Context Protocol é um protocolo aberto para conectar aplicações de IA a fontes de contexto e ferramentas por uma interface padronizada. Ele não é um LLM, não substitui uma API e não torna qualquer ação automaticamente segura.", bullets: ["Gatilho: evento que inicia o fluxo.", "Ação: operação executada por um nó.", "API: interface de comunicação entre sistemas.", "MCP: protocolo para disponibilizar contexto e ferramentas a clientes de IA."]}
        ],
        example: "Quando um formulário recebe uma solicitação de orçamento, um workflow pode validar campos, registrar a solicitação, gerar um resumo e enviar uma notificação. Um humano revisa valores e condições antes de enviar a proposta.",
        practice: "Planeje uma automação que recebe um CSV de inspeção, verifica campos obrigatórios, separa registros incompletos e envia um resumo para revisão.",
        checkpoint: "n8n orquestra workflows. APIs conectam sistemas. MCP padroniza a exposição de ferramentas e contexto para aplicações de IA."
      }
    ]
  },
  {
    id: "industria",
    title: "Dados e inteligência artificial industrial",
    subtitle: "Transforme sinais de operação em informação útil.",
    level: "Intermediário",
    duration: "2h 40min",
    description: "Aprenda a pensar em dados de sensores, anomalias, manutenção preditiva e qualidade de dados.",
    lessons: [
      {
        id: "dados-industriais",
        title: "Dados industriais e qualidade de medição",
        duration: 50,
        summary: "Modelos bons começam com medições confiáveis, contexto e rastreabilidade.",
        objectives: ["Identificar fontes comuns de dados industriais.", "Reconhecer problemas de qualidade.", "Preparar uma tabela de dados com contexto."],
        sections: [
          { heading: "De onde vêm os dados", body: "Sensores de temperatura, pressão, vibração, corrente e rotação podem produzir séries temporais. Ordens de serviço, registros de inspeção, apontamentos de produção e histórico de peças complementam o contexto. Sem identificar máquina, sensor, unidade e horário, uma medição perde boa parte do seu valor." },
          { heading: "Qualidade antes do modelo", body: "Verifique valores ausentes, duplicados, unidades misturadas, relógios dessincronizados, sensores calibrados incorretamente e mudanças no processo. Uma anomalia no arquivo pode ser defeito do sensor, não da máquina.", bullets: ["Identificador do ativo e do sensor.", "Timestamp com fuso e frequência conhecidos.", "Unidade física e faixa esperada.", "Condição operacional no momento da medição."]}
        ],
        example: "Uma vibração de 8 mm/s não pode ser interpretada sem saber se o valor é RMS, pico ou outra métrica, em qual direção foi medido, em qual rotação e sob qual condição de carga.",
        practice: "Monte uma planilha modelo para coletar vibração e temperatura de um motor. Inclua colunas de identificação, unidade, horário, condição e observação do técnico.",
        checkpoint: "Contexto e qualidade da medição são tão importantes quanto o algoritmo escolhido."
      },
      {
        id: "anomalias",
        title: "Análise de séries temporais e anomalias",
        duration: 55,
        summary: "Sinais industriais mudam ao longo do tempo. A referência correta depende da operação e do regime da máquina.",
        objectives: ["Entender tendência, sazonalidade e ruído.", "Distinguir alarme de anomalia.", "Pensar em falsos positivos e falsos negativos."],
        sections: [
          { heading: "Ler o comportamento no tempo", body: "Uma série temporal é uma sequência de medições ordenadas por tempo. Ela pode conter tendência, ciclos, ruído, mudanças de regime e eventos. Comparar uma medição com um único limite pode ser insuficiente se a máquina opera em diferentes rotações ou cargas." },
          { heading: "Detecção não é diagnóstico", body: "Um detector de anomalias aponta comportamentos incomuns em relação a uma referência. Isso não prova a causa. O técnico precisa investigar sensor, condição de operação, manutenção recente e outros sinais.", bullets: ["Falso positivo: alerta sem falha real.", "Falso negativo: falha não sinalizada.", "Baseline: comportamento de referência.", "Drift: mudança gradual na distribuição dos dados."]}
        ],
        example: "Se a temperatura de um motor aumenta durante uma mudança de carga, o aumento pode ser esperado. Uma anomalia precisa ser avaliada em relação ao regime, não apenas ao valor bruto.",
        practice: "Desenhe um gráfico fictício de temperatura ao longo de um turno. Marque uma tendência gradual, um pico isolado e uma mudança de regime. Explique qual exigiria investigação primeiro.",
        checkpoint: "Uma anomalia indica diferença em relação ao padrão esperado. Ela orienta a investigação, mas não substitui o diagnóstico."
      },
      {
        id: "preditiva",
        title: "Manutenção preditiva e decisão operacional",
        duration: 55,
        summary: "Prever risco só gera valor quando a informação melhora uma decisão de manutenção.",
        objectives: ["Diferenciar manutenção preventiva e preditiva.", "Entender horizonte de previsão.", "Relacionar alertas a custos e consequências."],
        sections: [
          { heading: "O que significa prever", body: "Um sistema preditivo pode estimar risco de falha em um horizonte, classificar condição ou estimar vida útil remanescente. Cada tarefa exige dados e validação diferentes. Uma previsão útil precisa chegar com antecedência suficiente para planejar a intervenção." },
          { heading: "A decisão importa", body: "Avalie custo de parada, custo de inspeção, criticidade do ativo, disponibilidade de peças e capacidade da equipe. O modelo não deve disparar intervenções automaticamente sem considerar essas condições e o procedimento da organização.", bullets: ["Precisão: proporção de alertas positivos que estavam corretos.", "Recall: proporção das falhas relevantes que foram detectadas.", "Lead time: antecedência do alerta em relação ao evento.", "Custo operacional: impacto dos erros e das ações tomadas."]}
        ],
        example: "Um modelo que detecta 90% das falhas, mas alerta apenas minutos antes, pode ser menos útil que outro com taxa menor e dias de antecedência. A métrica deve refletir a decisão real.",
        practice: "Escolha um ativo e defina: falha que deseja antecipar, sinais disponíveis, antecedência necessária, quem recebe o alerta e qual ação será avaliada.",
        checkpoint: "O objetivo da manutenção preditiva não é acertar um gráfico. É apoiar decisões melhores com antecedência e risco controlado."
      }
    ]
  },
  {
    id: "engenharia",
    title: "IA aplicada à engenharia mecânica",
    subtitle: "Do projeto ao chão de fábrica.",
    level: "Aplicação avançada",
    duration: "3h",
    description: "Explore aplicações em CAD, CAE, otimização, inspeção visual, produção e gêmeos digitais.",
    lessons: [
      {
        id: "cad-cae",
        title: "IA no projeto, CAD e simulação",
        duration: 55,
        summary: "IA pode acelerar exploração de alternativas, mas não substitui critérios físicos e validação de engenharia.",
        objectives: ["Identificar usos de IA em projeto mecânico.", "Entender otimização paramétrica.", "Distinguir sugestão algorítmica de validação técnica."],
        sections: [
          { heading: "Onde a IA ajuda", body: "Modelos podem sugerir geometrias, classificar peças, automatizar documentação, buscar componentes e explorar combinações de parâmetros. Em CAE, modelos substitutos podem aproximar resultados de simulações caras, desde que treinados e validados dentro de um domínio conhecido." },
          { heading: "O limite da aproximação", body: "Uma geometria visualmente interessante pode ser impossível de fabricar ou falhar sob carga. Verifique condições de contorno, materiais, malha, convergência, fatores de segurança e requisitos de fabricação. O resultado computacional precisa ser interpretado por alguém qualificado.", bullets: ["Otimização: buscar uma solução segundo objetivos e restrições.", "Modelo substituto: aproximação de uma simulação mais custosa.", "Validação: comparar a aproximação com análise independente ou ensaio."]}
        ],
        example: "Um modelo substituto pode estimar deformação para diferentes espessuras de uma chapa. As regiões de projeto e condições de carga precisam estar dentro do domínio validado antes de usar a estimativa.",
        practice: "Defina um problema de suporte mecânico: objetivo, variável de projeto, restrições, material, carga e método de validação. Não escolha valores sem fonte ou hipótese explícita.",
        checkpoint: "IA pode acelerar a busca por soluções. A física, as normas, a fabricação e a validação continuam definindo o que é aceitável."
      },
      {
        id: "visao-qualidade",
        title: "Visão computacional e inspeção de qualidade",
        duration: 60,
        summary: "Imagens podem ser usadas para classificar, localizar ou segmentar defeitos sob condições controladas.",
        objectives: ["Diferenciar classificação, detecção e segmentação.", "Identificar requisitos de iluminação e captura.", "Planejar validação com peças reais."],
        sections: [
          { heading: "Três tarefas visuais", body: "Classificação atribui uma classe à imagem. Detecção localiza objetos ou regiões com caixas delimitadoras. Segmentação classifica pixels ou regiões com maior detalhe. A escolha depende da pergunta: existe defeito, onde está e qual área ocupa?" },
          { heading: "Uma estação de inspeção", body: "A câmera, a lente, a iluminação, a posição da peça e o fundo fazem parte do sistema. Variações de reflexo, sujeira, foco e orientação podem degradar o desempenho. A validação precisa incluir diferentes lotes, turnos, operadores e condições reais.", bullets: ["Defina a taxonomia de defeitos.", "Colete exemplos representativos e casos raros.", "Separe imagens por lote ou período para evitar vazamento.", "Defina o processo humano para revisar casos incertos."]}
        ],
        example: "Uma câmera pode identificar a presença de uma etiqueta e apontar riscos superficiais em uma peça. A iluminação rasante pode revelar riscos que uma luz frontal esconde, mas precisa ser repetível.",
        practice: "Esboce uma estação para detectar riscos em peças metálicas. Descreva câmera, iluminação, posicionamento, classes de defeito e como você avaliaria falsos alarmes.",
        checkpoint: "O desempenho visual depende do conjunto câmera, iluminação, dados, modelo e processo de revisão."
      },
      {
        id: "digital-twin",
        title: "Gêmeos digitais e produção inteligente",
        duration: 65,
        summary: "Um gêmeo digital conecta um ativo físico a uma representação digital alimentada por dados e modelos.",
        objectives: ["Distinguir modelo CAD de gêmeo digital.", "Identificar dados e modelos necessários.", "Relacionar simulação a decisões de produção."],
        sections: [
          { heading: "Representação conectada", body: "Um CAD descreve geometria e propriedades do projeto. Um gêmeo digital vai além: representa o comportamento ou estado de um ativo e recebe dados do sistema físico. Pode combinar sensores, histórico, simulação e modelos preditivos para apoiar análise e planejamento." },
          { heading: "Aplicação na produção", body: "Em uma linha, um modelo digital pode ajudar a testar sequências, estimar gargalos, comparar cenários e antecipar manutenção. A fidelidade depende da qualidade dos dados, das hipóteses e da atualização da representação.", bullets: ["Modelo físico: descreve a realidade que se deseja representar.", "Conexão de dados: atualiza o estado digital.", "Simulação: explora cenários possíveis.", "Decisão: transforma a análise em ação monitorada."]}
        ],
        example: "Um gêmeo digital de uma célula de usinagem pode combinar estado da máquina, fila de ordens, ferramenta instalada e tempo de ciclo para testar o efeito de uma mudança no sequenciamento.",
        practice: "Escolha uma máquina e desenhe um gêmeo digital mínimo: quais variáveis mediria, qual modelo usaria, com que frequência atualizaria e qual decisão pretende melhorar?",
        checkpoint: "Um gêmeo digital é uma representação conectada ao ativo ou processo. Um modelo 3D isolado não é suficiente."
      }
    ]
  },
  {
    id: "aeronautica",
    title: "IA aplicada à manutenção aeronáutica",
    subtitle: "Documentação, motores e inspeção com rastreabilidade.",
    level: "Aplicação especializada",
    duration: "2h 50min",
    description: "Explore aplicações de IA em documentação técnica, acompanhamento de motores e apoio à inspeção, sempre respeitando dados aprovados e procedimentos aplicáveis.",
    lessons: [
      {
        id: "docs-aeronauticos",
        title: "Documentação aeronáutica e rastreabilidade",
        duration: 55,
        summary: "Uma resposta técnica só é útil quando aponta o documento, a revisão, a aplicabilidade e a seção corretos.",
        objectives: ["Reconhecer famílias de documentação técnica aeronáutica.", "Entender revisão e effectivity.", "Definir limites seguros para um assistente documental."],
        sections: [
          { heading: "Documentos têm função e aplicabilidade", body: "Manuais como AMM, IPC, SRM, TSM e CMM atendem a finalidades diferentes. Service Bulletins e Airworthiness Directives também têm natureza e requisitos distintos. Uma instrução pode depender do modelo, número de série, configuração, modificação incorporada e revisão vigente. A busca por palavras parecidas não prova que o documento se aplica à aeronave ou ao motor em questão." },
          { heading: "IA como camada de consulta", body: "Um sistema RAG pode localizar trechos, resumir diferenças e organizar referências. A resposta precisa preservar título, número do documento, revisão, tarefa, seção e página. A pessoa responsável confirma a aplicabilidade e consulta a fonte controlada antes de executar qualquer trabalho.", bullets: ["Confirme modelo, série e configuração.", "Verifique revisão e effectivity.", "Mantenha a referência até a página ou tarefa.", "Não complete lacunas com valores ou passos inventados."]}
        ],
        example: "Um assistente pode localizar a seção de inspeção de um componente e resumir o assunto. Antes de usar a informação, o profissional precisa confirmar se a tarefa corresponde à configuração e à revisão aplicáveis, seguindo o sistema documental aprovado da organização.",
        practice: "Desenhe um fluxo de consulta documental que obrigue o usuário a informar modelo, número de série, documento e revisão. Defina o que o assistente deve fazer quando a aplicabilidade não puder ser confirmada.",
        checkpoint: "Na manutenção aeronáutica, rastreabilidade e aplicabilidade fazem parte da resposta. Um resumo sem fonte controlada não é instrução de manutenção."
      },
      {
        id: "trend-motores",
        title: "Trend monitoring de motores",
        duration: 60,
        summary: "Acompanhar tendências operacionais pode revelar mudanças graduais que uma leitura isolada não mostra.",
        objectives: ["Identificar parâmetros usados em acompanhamento de condição.", "Entender por que condições de operação precisam ser consideradas.", "Separar tendência, alerta e diagnóstico."],
        sections: [
          { heading: "Acompanhar comportamento ao longo do tempo", body: "Dependendo do motor e do programa de monitoramento, parâmetros como EGT, N1, N2, fuel flow, pressão e temperatura de óleo e vibração podem ajudar a acompanhar a condição. O significado de cada sinal depende do regime, das condições ambientais, da configuração, do sensor e do método aprovado de aquisição." },
          { heading: "Comparação exige contexto", body: "Uma mudança pode refletir ambiente, procedimento de coleta, instrumento ou condição real do motor. A análise precisa normalizar condições quando o método exige, verificar consistência e comparar com limites e tendências definidos pela documentação e pelo programa aplicável. IA pode apontar desvios e priorizar revisão, mas não determina sozinha a ação de manutenção.", bullets: ["Use dados identificados por motor, série e data.", "Registre regime e condições da medição.", "Observe tendência, dispersão e qualidade do sensor.", "Confirme qualquer ação em documentação aprovada."]}
        ],
        example: "Uma elevação gradual de EGT em condições comparáveis pode justificar revisão do histórico e dos demais parâmetros. Uma leitura isolada, sem regime e contexto, não basta para concluir a causa ou definir uma intervenção.",
        practice: "Especifique uma planilha de trend monitoring com parâmetros, unidades, regime, condições ambientais, identificação do motor e origem da medição. Defina quais campos tornam um registro inválido para comparação.",
        checkpoint: "Trend monitoring observa mudanças ao longo do tempo. O contexto operacional e o método aprovado determinam se a comparação é válida."
      },
      {
        id: "inspecao-aero",
        title: "Visão computacional e apoio à inspeção",
        duration: 55,
        summary: "IA pode organizar evidências visuais e sinalizar regiões para revisão, sem substituir métodos de inspeção qualificados.",
        objectives: ["Identificar usos e limites da visão computacional.", "Distinguir triagem visual de inspeção aprovada.", "Planejar evidência e revisão humana."],
        sections: [
          { heading: "A imagem é uma evidência parcial", body: "Fotografias podem ajudar a organizar observações, comparar registros e apontar regiões que merecem atenção. Ângulo, iluminação, escala, resolução, acesso e condição da superfície influenciam o que pode ser observado. Uma imagem não revela defeitos internos nem substitui ensaios não destrutivos quando eles são requeridos." },
          { heading: "Apoio não é liberação", body: "Um modelo pode classificar imagens para triagem ou sugerir regiões para uma segunda avaliação. O procedimento aplicável, a qualificação exigida, os critérios de aceitação e a autoridade responsável continuam determinando a inspeção e a decisão. Falsos negativos precisam ser tratados como risco explícito.", bullets: ["Preserve a imagem original e seus metadados.", "Registre componente, localização e condição de captura.", "Não declare conformidade a partir de uma classificação isolada.", "Encaminhe casos incertos ao método e profissional apropriados."]}
        ],
        example: "Um sistema pode destacar uma região com aparência diferente em fotografias sucessivas de um componente. O resultado orienta a revisão, mas qualquer avaliação de trinca, corrosão ou dano segue o método e os critérios técnicos aplicáveis.",
        practice: "Crie um protocolo para comparar fotos de inspeção: posição, iluminação, escala, identificação do componente, evidência original e critério para encaminhar a uma inspeção complementar.",
        checkpoint: "Visão computacional pode apoiar triagem e documentação. Não substitui inspeção qualificada, ensaio requerido ou decisão de aeronavegabilidade."
      }
    ]
  },
  {
    id: "negocios",
    title: "Produtos, serviços e renda com IA",
    subtitle: "Transforme competência em uma oferta responsável.",
    level: "Estratégia",
    duration: "2h 10min",
    description: "Aprenda a encontrar problemas, validar demanda e montar um portfólio de soluções úteis.",
    lessons: [
      {
        id: "problema-oferta",
        title: "Encontrar problemas que valem dinheiro",
        duration: 40,
        summary: "Uma oportunidade começa com uma dor recorrente, mensurável e com alguém disposto a pagar para resolvê-la.",
        objectives: ["Mapear tarefas repetitivas e custosas.", "Identificar comprador e usuário.", "Definir uma hipótese de valor mensurável."],
        sections: [
          { heading: "Comece pela rotina", body: "Observe onde pessoas perdem tempo, repetem digitação, procuram documentos, consolidam planilhas ou deixam informações escaparem. Não comece pela ferramenta da moda. Comece por uma tarefa real, sua frequência, custo e consequência." },
          { heading: "Transforme em oferta", body: "Defina quem usa, quem aprova e quem paga. Descreva a entrega, o que fica fora do escopo, quais dados serão necessários e como o resultado será medido. Um serviço pequeno e bem delimitado costuma ser mais fácil de validar que uma plataforma ampla.", bullets: ["Problema: tarefa ou risco que causa custo.", "Cliente: pessoa ou organização que decide.", "Entrega: resultado concreto.", "Prova: comparação antes e depois com método claro."]}
        ],
        example: "Uma oficina pode gastar horas organizando fotos, descrições e orçamentos. Um serviço de padronização de relatórios com revisão humana pode ser uma oferta inicial, desde que o ganho de tempo seja medido e os dados sejam protegidos.",
        practice: "Liste cinco tarefas repetitivas de um negócio mecânico. Escolha uma e escreva problema, usuário, comprador, entrega e métrica de sucesso.",
        checkpoint: "O cliente compra a melhoria no processo, não a palavra inteligência artificial."
      },
      {
        id: "mvp-portfolio",
        title: "MVP, validação e portfólio",
        duration: 45,
        summary: "Um projeto demonstrável deve provar uma capacidade, explicar seus limites e permitir reprodução.",
        objectives: ["Definir um MVP pequeno.", "Planejar um teste com usuários.", "Documentar resultados sem exagero."],
        sections: [
          { heading: "MVP é a menor prova útil", body: "Escolha um único fluxo e construa apenas o necessário para testá-lo. Pode ser um relatório automatizado, uma busca em documentos ou uma análise de dados. Evite criar login, painel e integrações antes de comprovar que o problema merece solução." },
          { heading: "Documente com honestidade", body: "Registre problema, dados usados, método, resultado, limitações e próximos passos. Diferencie resultado medido de expectativa. Remova dados pessoais ou confidenciais antes de publicar um estudo de caso.", bullets: ["Contexto e objetivo.", "Demonstração do fluxo.", "Critérios de avaliação.", "Limitações e riscos.", "Evidência reproduzível."]}
        ],
        example: "Um protótipo pode receber um CSV de inspeções e gerar um resumo de campos ausentes e ocorrências fora de faixa. O MVP não precisa prever falhas; primeiro prove que organiza dados de forma confiável.",
        practice: "Escreva uma ficha de projeto para um protótipo de IA industrial. Limite a entrega a uma semana de trabalho e defina como saberá se funcionou.",
        checkpoint: "Um bom portfólio mostra o processo, a evidência e os limites. Não depende de promessas grandiosas."
      },
      {
        id: "precificacao",
        title: "Precificação, escopo e responsabilidade",
        duration: 45,
        summary: "Preço precisa refletir valor, esforço, risco, suporte e custos recorrentes.",
        objectives: ["Separar custo e valor percebido.", "Definir limites de escopo.", "Planejar manutenção e responsabilidade."],
        sections: [
          { heading: "O que entra no preço", body: "Considere diagnóstico, preparação dos dados, configuração, treinamento da equipe, suporte, revisões, hospedagem e manutenção. Ferramentas gratuitas podem mudar limites ou políticas; não prometa custo zero permanente se depender de um serviço externo." },
          { heading: "Responsabilidade", body: "Defina o que a solução pode recomendar e o que exige aprovação humana. Em ambientes industriais e de manutenção, não prometa substituir inspeção, manual, profissional habilitado ou procedimento de segurança. Formalize acesso, retenção e descarte dos dados.", bullets: ["Escopo e exclusões.", "Critérios de aceite.", "Suporte e prazo de resposta.", "Custos de terceiros.", "Propriedade e proteção dos dados."]}
        ],
        example: "Um serviço de organização de relatórios pode ser vendido por implantação mais manutenção mensal. O contrato deve explicar volume de documentos, formatos aceitos, revisões incluídas e quem valida o conteúdo técnico.",
        practice: "Monte uma proposta de uma página para um serviço pequeno de IA. Inclua entrega, prazo, preço hipotético, custos externos, limites e critério de aceite.",
        checkpoint: "Uma oferta sustentável descreve valor e também seus limites, custos e responsabilidades."
      }
    ]
  }
];

export const projects = [
  { id: "relatorio-inspecao", title: "Relatório inteligente de inspeção", level: "Iniciante", time: "1 a 2 sessões", description: "Transforme anotações e dados de uma inspeção em um relatório estruturado para revisão humana.", skills: ["Prompt design", "Dados estruturados", "Verificação"], steps: ["Escolha um conjunto fictício ou anonimizado de observações.", "Defina os campos: ativo, componente, condição, evidência e ação sugerida.", "Crie um prompt que organize os dados sem inventar valores.", "Peça uma lista separada de dúvidas e informações ausentes.", "Revise cada afirmação e documente o que foi corrigido."], deliverable: "Um modelo de relatório, um prompt reutilizável e uma lista de critérios de revisão." },
  { id: "rag-manuais", title: "Assistente de consulta a manuais", level: "Intermediário", time: "3 a 5 sessões", description: "Desenhe um sistema RAG que responda usando trechos de documentação com referência de origem.", skills: ["RAG", "Embeddings", "Rastreabilidade"], steps: ["Selecione documentos públicos ou materiais autorizados.", "Defina como identificar título, revisão, seção e página.", "Desenhe o processo de divisão e indexação dos trechos.", "Especifique como a busca selecionará o contexto.", "Crie regras para responder 'não encontrei evidência' quando necessário."], deliverable: "Um diagrama do fluxo RAG, regras de citação e cinco perguntas de teste." },
  { id: "anomalia-motor", title: "Monitor de anomalias de motor", level: "Intermediário", time: "3 a 4 sessões", description: "Planeje uma análise de sinais de temperatura, corrente e vibração para priorizar investigação.", skills: ["Séries temporais", "Qualidade de dados", "Manutenção"], steps: ["Defina o ativo e o modo de falha de interesse.", "Liste sensores, unidades, frequência e condição de operação.", "Defina um baseline por regime de operação.", "Escolha métricas de falsos positivos, falsos negativos e antecedência.", "Desenhe como o alerta será revisado e encerrado."], deliverable: "Um plano de monitoramento com dados necessários, métricas e fluxo de decisão." },
  { id: "visao-defeitos", title: "Inspeção visual de defeitos", level: "Intermediário", time: "4 a 6 sessões", description: "Especifique uma estação de captura e um conjunto de classes para inspeção visual de peças.", skills: ["Visão computacional", "Dataset", "Qualidade"], steps: ["Escolha um defeito visual bem definido.", "Especifique câmera, lente, iluminação e posição da peça.", "Crie uma taxonomia e exemplos positivos e negativos.", "Separe dados por lote ou período para testar generalização.", "Defina o que acontece com imagens incertas."], deliverable: "Um plano de dataset, estação de captura e protocolo de validação." },
  { id: "automacao-oficina", title: "Fluxo de atendimento de oficina", level: "Aplicação comercial", time: "2 a 4 sessões", description: "Modele uma automação que organiza solicitações, fotos, orçamentos e retorno ao cliente.", skills: ["Automação", "Processos", "Produto"], steps: ["Desenhe o atendimento atual do primeiro contato ao fechamento.", "Marque dados obrigatórios e pontos de retrabalho.", "Escolha um gatilho e as etapas automatizáveis.", "Defina aprovação humana antes de enviar preço ou diagnóstico.", "Meça tempo por atendimento e taxa de informação incompleta."], deliverable: "Um mapa de processo, regras de automação e proposta de piloto." }
  ,{ id: "trend-motor-aero", title: "Painel de tendência de motor aeronáutico", level: "Aplicação especializada", time: "3 a 5 sessões", description: "Planeje uma análise de tendência com parâmetros de motor, contexto operacional e referências de origem.", skills: ["Séries temporais", "Motores", "Rastreabilidade"], steps: ["Defina o tipo de motor e o programa de acompanhamento que servirá de referência.", "Liste parâmetros, unidades, identificação do motor e origem dos registros.", "Registre regime e condições de operação necessários para comparar medições.", "Desenhe alertas de qualidade de dados e desvios de tendência.", "Defina a revisão humana e a documentação que orienta qualquer ação."], deliverable: "Uma especificação de dados, fluxo de análise e protocolo de revisão. Não use valores operacionais sem fonte aprovada." }

];

export const glossary = [
  ["Agente", "Sistema que usa um modelo, ferramentas e um ciclo de decisão para executar etapas de uma tarefa."],
  ["API", "Interface que permite que sistemas troquem dados e solicitem operações."],
  ["Acurácia", "Proporção de previsões corretas no conjunto avaliado. Pode esconder problemas em classes desbalanceadas."],
  ["Embedding", "Representação numérica vetorial de um conteúdo, útil para comparar similaridade semântica."],
  ["Fine-tuning", "Ajuste adicional de um modelo usando exemplos específicos para adaptar seu comportamento."],
  ["Hallucination", "Resposta gerada que parece plausível, mas contém informação falsa, não sustentada ou inventada."],
  ["Inferência", "Etapa em que um modelo já treinado recebe uma entrada e produz uma saída."],
  ["LLM", "Large Language Model. Modelo de linguagem treinado em grandes volumes de dados para processar e gerar texto."],
  ["MCP", "Model Context Protocol. Protocolo aberto para conectar aplicações de IA a fontes de contexto e ferramentas."],
  ["Overfitting", "Sobreajuste. Quando o modelo se adapta demais aos dados de treino e generaliza mal."],
  ["RAG", "Retrieval-Augmented Generation. Recupera informações externas relevantes e as fornece ao modelo antes da resposta."],
  ["Recall", "Proporção dos casos positivos reais que o sistema conseguiu identificar."],
  ["Token", "Unidade de texto ou conteúdo processada pelo modelo. Pode ser uma palavra, parte dela ou pontuação."],
  ["Transformer", "Arquitetura de rede neural baseada em mecanismos de atenção, muito usada em modelos de linguagem."],
  ["Vetor", "Lista ordenada de números que representa uma informação em um espaço matemático."],
  ["Drift", "Mudança no comportamento ou na distribuição dos dados ao longo do tempo, que pode degradar um modelo."],
  ["Gêmeo digital", "Representação digital conectada a um ativo ou processo físico por dados, modelos e atualização de estado."],
  ["Série temporal", "Conjunto de medições organizadas em sequência temporal, normalmente com intervalos conhecidos."],
  ["Modelo substituto", "Modelo mais simples ou rápido que aproxima resultados de uma simulação ou cálculo mais custoso."],
  ["Visão computacional", "Área que permite a sistemas extrair informação de imagens e vídeos."],
  ["AMM", "Aircraft Maintenance Manual. Manual que contém procedimentos de manutenção da aeronave, conforme sua aplicabilidade e revisão."],
  ["Effectivity", "Critério que identifica a quais modelos, números de série ou configurações uma instrução técnica se aplica."],
  ["AD", "Airworthiness Directive. Diretiva de aeronavegabilidade emitida por autoridade competente, com requisitos aplicáveis definidos no próprio documento."],
  ["SB", "Service Bulletin. Comunicação técnica do fabricante. Sua obrigatoriedade depende da autoridade, da regra aplicável e dos requisitos do operador."],
  ["NDT", "Non-Destructive Testing. Ensaios não destrutivos usados para avaliar materiais ou componentes sem comprometer sua utilização futura."],
  ["EGT margin", "Margem entre a temperatura de gases de escape observada e o limite definido para condições específicas de operação."],
  ["Trend monitoring", "Acompanhamento de parâmetros ao longo do tempo para identificar mudanças de comportamento e apoiar a análise de condição."]
].map(([term, definition]) => ({ term, definition }));

export const flashcards = [
  ["O que diferencia IA de automação tradicional?", "Automação segue regras definidas. IA pode reconhecer padrões, estimar resultados ou gerar conteúdo a partir de modelos aprendidos."],
  ["O que é um token?", "Uma unidade de texto ou conteúdo que o modelo processa. Pode ser uma palavra inteira, parte dela ou pontuação."],
  ["Para que servem embeddings?", "Representar conteúdo como vetores para comparar similaridade e recuperar itens relacionados."],
  ["O que o mecanismo de atenção faz?", "Pondera relações entre partes de uma sequência para construir representações contextuais."],
  ["O que é RAG?", "Um fluxo que recupera trechos de fontes externas e os fornece ao modelo para fundamentar a resposta."],
  ["Qual a diferença entre workflow e agente?", "Workflow segue uma sequência definida. Agente pode escolher ferramentas e próximos passos dentro de limites."],
  ["O que é drift?", "Mudança na distribuição dos dados ou no comportamento do processo que pode reduzir a qualidade do modelo."],
  ["O que significa recall?", "A proporção de casos positivos reais que foram identificados pelo sistema."],
  ["O que é um gêmeo digital?", "Representação digital conectada a um ativo ou processo físico por dados e modelos atualizados."],
  ["Por que a IA não substitui um manual de manutenção?", "Porque pode errar ou omitir condições. Procedimentos e limites críticos devem ser confirmados na documentação aprovada e aplicável."],
  ["O que é um modelo substituto?", "Uma aproximação rápida de um cálculo ou simulação mais custosa, válida apenas dentro do domínio testado."],
  ["O que é uma alucinação?", "Uma resposta plausível que não é sustentada por evidências ou contém informação inventada."],
  ["Por que verificar effectivity antes de usar um procedimento?", "Porque uma instrução pode valer apenas para determinados modelos, números de série ou configurações. A semelhança do texto não comprova aplicabilidade."],
  ["O que o trend monitoring de motores procura?", "Mudanças de comportamento em parâmetros ao longo do tempo, comparadas em condições operacionais compatíveis e segundo um método aplicável."],
  ["Uma análise de imagem substitui um ensaio não destrutivo requerido?", "Não. A imagem pode apoiar documentação ou triagem, mas o método, os critérios e a qualificação exigidos continuam prevalecendo."]
].map(([front, back], index) => ({ id: `card-${index + 1}`, front, back }));

export const quizQuestions = [
  { question: "Qual afirmação descreve melhor machine learning?", options: ["Um conjunto de regras fixas escritas manualmente", "Uma abordagem que aprende padrões a partir de dados", "Um tipo de banco de dados", "Um sensor conectado à internet"], answer: 1, explanation: "Machine learning ajusta modelos a partir de exemplos, em vez de depender somente de regras escritas manualmente." },
  { question: "Em aprendizado supervisionado, os exemplos de treino normalmente possuem:", options: ["Rótulos ou respostas conhecidas", "Apenas imagens sem contexto", "Somente dados futuros", "Nenhuma variável de saída"], answer: 0, explanation: "O modelo recebe exemplos de entrada associados a respostas conhecidas e aprende a relação entre eles." },
  { question: "O que é uma janela de contexto em um LLM?", options: ["A tela do navegador", "O limite de informação que o modelo pode considerar numa chamada", "O tempo para treinar o modelo", "O tamanho do arquivo PDF"], answer: 1, explanation: "A janela de contexto limita a quantidade de tokens considerados na interação, incluindo instruções, conteúdo e resposta." },
  { question: "Qual é a função dos embeddings?", options: ["Resfriar a GPU", "Representar conteúdo em vetores", "Garantir que toda resposta seja verdadeira", "Substituir os dados de treino"], answer: 1, explanation: "Embeddings transformam itens em representações vetoriais que permitem comparar relações e similaridade." },
  { question: "O que melhor descreve RAG?", options: ["Treinar um modelo do zero", "Recuperar trechos externos e usá-los como contexto para gerar uma resposta", "Compactar vídeos", "Criar uma rede local"], answer: 1, explanation: "RAG combina recuperação de informação com geração de texto para fundamentar respostas em fontes selecionadas." },
  { question: "Por que uma alucinação é perigosa em manutenção?", options: ["Porque sempre é fácil de identificar", "Porque pode apresentar um valor inventado com aparência de certeza", "Porque só ocorre em imagens", "Porque impede abrir arquivos"], answer: 1, explanation: "Uma resposta fluente pode conter torque, limite ou procedimento incorreto. Valores críticos exigem confirmação documental." },
  { question: "Qual é um exemplo de aprendizado não supervisionado?", options: ["Classificar peças com rótulos conhecidos", "Agrupar perfis de vibração sem rótulos prévios", "Seguir uma lista fixa de passos", "Calcular uma média simples"], answer: 1, explanation: "O agrupamento pode revelar estruturas nos dados sem que cada exemplo tenha uma classe previamente indicada." },
  { question: "Em um agente de IA, o que é uma ferramenta?", options: ["Um recurso que o modelo pode chamar para consultar ou executar uma operação", "Um novo nome para token", "Uma resposta já escrita", "Um tipo de embedding"], answer: 0, explanation: "Ferramentas conectam o agente a operações como busca, leitura de dados ou execução de uma tarefa permitida." },
  { question: "Qual informação é essencial para interpretar uma medição de vibração?", options: ["A cor do equipamento", "Unidade, métrica, direção e condição de operação", "A marca do computador", "A quantidade de páginas do relatório"], answer: 1, explanation: "Sem unidade, métrica e condição de operação, a medição pode ser interpretada incorretamente." },
  { question: "O que caracteriza um falso negativo?", options: ["Um alerta sem falha real", "Uma falha real que o sistema não identificou", "Uma medição duplicada", "Um modelo que não foi implantado"], answer: 1, explanation: "Falso negativo é um caso positivo real classificado como negativo. Em manutenção, pode deixar um risco sem alerta." },
  { question: "Um gêmeo digital exige:", options: ["Somente uma imagem 3D", "Uma representação conectada ao ativo ou processo por dados e modelos", "Apenas um chatbot", "Um arquivo de texto estático"], answer: 1, explanation: "A conexão com o estado do sistema físico e a atualização da representação diferenciam o gêmeo digital de um modelo 3D isolado." },
  { question: "Qual é uma boa primeira oferta comercial com IA?", options: ["Prometer substituir toda a equipe", "Resolver um problema pequeno, frequente e mensurável", "Criar uma plataforma enorme sem validar demanda", "Vender previsões sem explicar limitações"], answer: 1, explanation: "Uma entrega delimitada e mensurável facilita validar demanda, custo, risco e valor para o cliente." },
  { question: "O que precisa ser confirmado antes de usar uma instrução de manutenção aeronáutica?", options: ["Somente o título do documento", "Modelo, número de série, configuração, revisão e effectivity", "Apenas se a frase aparece na busca", "A opinião de um modelo de linguagem"], answer: 1, explanation: "A aplicabilidade depende da configuração e da revisão. A fonte controlada precisa ser consultada antes de qualquer execução." },
  { question: "O que caracteriza trend monitoring de motor?", options: ["Analisar uma medição isolada sem contexto", "Acompanhar parâmetros ao longo do tempo em condições comparáveis", "Substituir os registros de manutenção", "Gerar um limite universal para todos os motores"], answer: 1, explanation: "O acompanhamento de tendência procura mudanças no comportamento ao longo do tempo e depende de identificação, regime e contexto da medição." },
  { question: "Um Service Bulletin é sempre obrigatório por definição?", options: ["Sim, em qualquer aeronave", "Não. A obrigatoriedade depende da autoridade, regra e requisitos aplicáveis", "Somente quando um chatbot recomendar", "Nunca pode ser obrigatório"], answer: 1, explanation: "O status de um SB depende do contexto regulatório e operacional. Não se deve presumir que todo boletim seja automaticamente obrigatório ou opcional." }
];
