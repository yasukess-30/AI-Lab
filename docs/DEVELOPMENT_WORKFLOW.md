# Fluxo de desenvolvimento do AI LAB

Este documento define como organizar alterações para manter o histórico do GitHub legível, revisável e seguro.

## 1. Branch principal

- `main` contém somente alterações integradas e revisadas.
- Não desenvolver diretamente em `main`, salvo correção emergencial pequena e justificada.
- Cada conjunto coerente de trabalho deve partir de `main` e usar uma branch própria.
- Abrir Pull Request (PR) para integrar a etapa concluída.

## 2. Padrão de nomes de branches

Usar nomes curtos, em português sem acentos, com etapa, assunto e versão:

```text
etapa-01-organizacao-e-estabilidade-1.0
etapa-02-conteudo-fundamentos-1.0
etapa-03-experiencia-de-aprendizagem-1.0
etapa-04-contas-e-autenticacao-1.0
etapa-05-painel-administrativo-1.0
```

Regras:
- Prefixar com `etapa-NN-` quando fizer parte do plano principal.
- Descrever o resultado, não a pessoa que executou.
- Usar hífens, letras minúsculas e números.
- Incrementar a versão quando houver uma revisão material da mesma entrega.
- Não reutilizar uma branch antiga para uma etapa sem relação.

## 3. Padrão de commits

Usar mensagens no formato:

```text
Etapa 01.0: adiciona adaptador de ícones para testes
Etapa 01.1: corrige validação do pacote Quanta
Etapa 02.0: aprofunda aulas de fundamentos de IA
```

Cada commit deve:
- Descrever uma alteração concreta.
- Evitar mensagens vagas como `update`, `fix` ou `mudanças`.
- Agrupar arquivos somente quando fizerem parte da mesma alteração lógica.
- Não incluir credenciais, tokens, dados pessoais ou arquivos gerados desnecessários.

## 4. Pull Requests

Cada PR deve conter:
1. Objetivo e contexto.
2. Principais arquivos e mudanças.
3. Testes executados e seus resultados reais.
4. Riscos, limitações e itens que ficaram pendentes.
5. Evidência visual quando alterar a interface.

Não integrar um PR com falhas críticas de typecheck, build ou testes sem uma justificativa explícita e uma decisão consciente.

## 5. Antes de abrir ou integrar um PR

- Conferir se a branch está atualizada com `main`.
- Revisar o diff completo.
- Executar typecheck, build e testes relevantes.
- Conferir links, imports, IDs de conteúdo e referências.
- Verificar se nomes e caminhos continuam consistentes.
- Nunca desabilitar testes apenas para obter uma execução verde.
- Confirmar que nenhum segredo foi adicionado ao histórico.

## 6. Versionamento das etapas

A versão no nome da branch identifica a rodada de trabalho, não a versão pública do produto. Releases do produto devem receber versionamento próprio quando houver uma política de publicação definida.

## 7. Renomeação de arquivos

Renomear somente quando o nome atual for ambíguo, incorreto ou incompatível com a responsabilidade real do arquivo. Antes de renomear:
- Buscar todos os imports, referências, scripts, configurações e documentação.
- Atualizar todas as referências no mesmo PR.
- Verificar caminhos sensíveis a maiúsculas/minúsculas.
- Confirmar que a build e os testes continuam passando.

Não renomear arquivos apenas para fazê-los parecer mais organizados. Nomes claros e estáveis são preferíveis a movimentações cosméticas que aumentam o risco de regressão.
