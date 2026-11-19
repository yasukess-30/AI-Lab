# Percurso de projetos práticos — AI LAB

## Como os laboratórios funcionam

A aplicação oferece um editor JavaScript no navegador, um botão de execução isolado e um CSV sintético para download. O código roda em um `iframe` com sandbox e política de conteúdo que bloqueia conexões de rede. Nenhum código é enviado ao servidor.

Os 12 laboratórios iniciais foram escolhidos para ensinar uma sequência de competências transferíveis. Eles usam dados sintéticos pequenos, não dados de clientes, máquinas ou aeronaves reais.

## Progressão por níveis

| Nível | Competência | Laboratórios | Entrega demonstrável |
| --- | --- | --- | --- |
| 1 — Fundamentos | Lógica, dados, classificação, unidades | `ia-mapa`, `tipos-aprendizado`, `engenharia` | Caderno de hipóteses e cálculos conferidos |
| 2 — Qualidade de dados | Auditoria, vazamento, métricas e séries | `pipeline-ia`, `anomalias`, `visao-qualidade` | Relatório de qualidade e matriz de confusão |
| 3 — Sistemas aplicados | Busca, automação e avaliação | `rag`, `automacao-mcp`, `negocios` | Mini buscador com fontes, fluxo idempotente e proposta de serviço |
| 4 — Especialização | Manutenção e trend monitoring | `preditiva`, `trend-motores`, `visao-defeitos` | Painel didático, análise de tendência e política de inspeção |

## Projetos integradores sugeridos

### Projeto A — Monitor de condição de um equipamento didático
1. Definir ativo, modo de falha hipotético e decisão que se pretende apoiar.
2. Usar o CSV sintético do laboratório de anomalias para construir uma linha de base.
3. Acrescentar contexto operacional e qualidade do sensor.
4. Comparar limite fixo, z-score e média móvel.
5. Avaliar falsos alarmes, antecedência e dados ausentes.
6. Entregar relatório com escopo, método, resultados e limites.

**Critério de aceite:** outra pessoa consegue reproduzir o resultado e identificar claramente o que o monitor não pode concluir.

### Projeto B — Assistente de consulta documental
1. Selecionar documentos públicos ou licenciados para esse uso.
2. Extrair texto preservando documento, revisão, seção e página.
3. Criar busca lexical e comparar com busca semântica.
4. Responder somente quando houver trechos relevantes.
5. Mostrar citações verificáveis e abster-se quando não houver evidência.
6. Testar documentos contraditórios, versões antigas e instruções maliciosas inseridas no texto.

**Critério de aceite:** toda afirmação factual relevante aponta para uma fonte que pode ser aberta e conferida.

### Projeto C — Inspeção visual assistida
1. Selecionar um conjunto de imagens com licença compatível.
2. Definir classes, unidade de análise e critérios de anotação.
3. Separar treino e teste por peça ou lote, evitando vazamento.
4. Avaliar precision, recall e falsos negativos por classe.
5. Criar uma zona de revisão humana e rejeição de imagens de baixa qualidade.
6. Documentar condições de captura e limites de validade.

**Critério de aceite:** o sistema não se apresenta como autoridade de aceitação/rejeição e evidencia os casos em que falha.

## Conjuntos de dados externos recomendados

### Manutenção e indústria
- [UCI AI4I 2020 Predictive Maintenance](https://archive.ics.uci.edu/dataset/601/ai4i): 10 mil registros sintéticos; licença CC BY 4.0. Bom para classificação, regressão e análise de manutenção. Cite a fonte e o artigo associado.
- [NASA Prognostics Data Repository](https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/): coleções de séries temporais para prognóstico. O C-MAPSS simula degradação de motores turbofan; respeite a citação e as condições de uso de cada conjunto.

### Inspeção e visão computacional
- [MVTec AD](https://www.mvtec.com/research-teaching/datasets/mvtec-ad): imagens industriais com defeitos e anotações. A licença é CC BY-NC-SA 4.0; não usar em projeto comercial sem autorização compatível.
- [MVTec AD 2](https://www.mvtec.com/research-teaching/datasets/mvtec-ad-2): benchmark mais recente para cenários complexos; também possui restrição não comercial.

## Regras para dados e portfólio

- Não publicar dados pessoais, dados de clientes, fotografias privadas ou documentos técnicos restritos.
- Conferir licença antes de redistribuir dataset, imagens, rótulos ou modelos derivados.
- Não apresentar dados sintéticos como dados de campo.
- Registrar origem, versão, unidade, período, transformação e limitações.
- Não converter resultados didáticos em limites de segurança, diagnóstico ou instruções de manutenção.
- Para uso aeronáutico, consultar sempre documentação técnica aplicável e profissionais habilitados; este material não é dado aprovado de manutenção.

## Rubrica de avaliação (0–4 por critério)

1. Problema e decisão estão definidos.
2. Dados e licenças são adequados e rastreáveis.
3. Método e linha de base são reproduzíveis.
4. Métricas e erros foram interpretados no contexto.
5. Limitações, segurança e revisão humana estão explícitas.
6. Entrega pode ser reproduzida por outra pessoa.

**Interpretação:** 0 = ausente; 1 = incipiente; 2 = parcial; 3 = consistente; 4 = reproduzível e bem justificado. Um projeto só deve ser apresentado como concluído quando nenhum critério crítico de segurança ou rastreabilidade estiver zerado.
