# Cobertura dos guias do currículo — Etapa 02

Este documento registra a cobertura editorial dos guias técnicos associados às aulas do AI LAB.

## Critérios mínimos de um guia

Cada guia deve oferecer:
- contexto e fundamentos em linguagem acessível;
- explicação de funcionamento e arquitetura;
- aplicações e um caso de uso concreto;
- limitações, segurança, governança e critérios de revisão;
- laboratório orientado, com etapas reproduzíveis;
- questões para verificar compreensão;
- referências técnicas ou documentação primária.

## Cobertura

Os 37 IDs de aula possuem guias associados em `app/src/data/lesson-guides.ts`. Os IDs devem permanecer alinhados aos dados curriculares; alterações de identificadores exigem atualização coordenada e validação.

### Fundamentos e uso de IA
`ia-mapa`, `tipos-aprendizado`, `pipeline-ia`, `llms`, `tokens-contexto`, `transformer-embeddings`, `limites-llm`, `chatgpt`, `anatomia-prompt`, `avaliar-saida`, `multimodal`, `agentes`, `rag`, `agentes-tools`, `automacao-mcp`.

### Indústria e engenharia
`industria`, `dados-industriais`, `anomalias`, `preditiva`, `engenharia`, `cad-cae`, `visao-qualidade`, `digital-twin`.

### Manutenção aeronáutica
`aeronautica`, `docs-aeronauticos`, `trend-motores`, `inspecao-aero`.

### Negócios e projetos práticos
`negocios`, `problema-oferta`, `mvp-portfolio`, `precificacao`, `relatorio-inspecao`, `rag-manuais`, `anomalia-motor`, `visao-defeitos`, `automacao-oficina`, `trend-motor-aero`.

## Limites importantes

- Projetos aeronáuticos são didáticos e não substituem documentação técnica aprovada, procedimentos, inspeções exigidas ou profissionais habilitados.
- Exemplos industriais não autorizam comandos a equipamentos nem substituem proteções independentes.
- Resultados gerados por IA devem ser conferidos na fonte e no contexto operacional.
- Referências externas devem ser revistas periodicamente quanto a disponibilidade, versão e aplicabilidade.

## Validação editorial

Antes de integrar novas aulas, conferir: ID existente, guia único, estrutura completa, laboratório executável, questões coerentes, referências pertinentes e linguagem compreensível para iniciantes.
