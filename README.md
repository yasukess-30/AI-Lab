# AI LAB

**Uma academia de estudos e experimentação em Inteligência Artificial.**

O AI LAB é uma academia independente e multidisciplinar de Inteligência Artificial. Seu propósito é ensinar desde os fundamentos matemáticos e computacionais até a pesquisa, implementação, avaliação e operação responsável de sistemas de IA. A formação conecta conceitos a problemas reais em saúde, ciência, agricultura, meio ambiente, engenharia, indústria, finanças, direito, educação, arte, robótica, transporte e outras áreas. O foco é profundidade técnica com clareza didática: fundamentos antes das ferramentas, evidência antes de afirmações e projetos avaliados por critérios explícitos.

Este repositório contém o código-fonte da aplicação e os arquivos necessários para seu desenvolvimento e implantação.

---

## Objetivos do projeto

- Estruturar uma jornada de aprendizagem em Inteligência Artificial.
- Apresentar conceitos técnicos de maneira gradual e compreensível.
- Conectar fundamentos teóricos a exemplos, laboratórios e projetos avaliados.
- Explorar aplicações multidisciplinares em setores científicos, sociais e produtivos.
- Priorizar documentação oficial, pesquisa acadêmica e fontes primárias.
- Ensinar limitações, avaliação, segurança, ética e governança junto às técnicas.
- Manter um ambiente de estudos organizado e evolutivo.
- Experimentar ferramentas e tecnologias utilizadas no desenvolvimento de aplicações modernas.

## Tecnologias

A aplicação utiliza as seguintes tecnologias principais:

- **React 19** — construção da interface.
- **TypeScript** — tipagem estática e maior previsibilidade do código.
- **TanStack Start** — estrutura da aplicação e renderização no servidor.
- **Vite** — ferramentas de desenvolvimento e compilação.
- **Tailwind CSS 4** — estilos e composição visual.
- **Cloudflare Workers** — ambiente de execução e hospedagem da aplicação.
- **Bun** — gerenciamento de dependências e execução dos scripts do projeto.

O projeto também utiliza componentes de interface baseados em Radix UI e bibliotecas auxiliares para formulários, gráficos, navegação e apresentação de conteúdo.

## Estrutura do repositório

O código da aplicação está concentrado no diretório `app/`.

```text
AI-Lab/
├── app/
│   ├── packages/          # Pacotes locais utilizados pela aplicação
│   ├── src/               # Código-fonte da aplicação
│   │   ├── routes/        # Rotas e páginas
│   │   └── ...            # Componentes, módulos e recursos
│   ├── public/            # Arquivos públicos, quando aplicável
│   ├── package.json       # Dependências e scripts
│   ├── bun.lock           # Registro de dependências
│   ├── vite.config.ts     # Configuração do Vite e TanStack Start
│   └── wrangler.jsonc     # Configuração do Cloudflare Workers
├── .github/
├── MIGRATION.md
└── README.md
```

## Documentação de desenvolvimento

- [Fluxo de branches, commits e Pull Requests](docs/DEVELOPMENT_WORKFLOW.md)
- [Organização dos diretórios e responsabilidades](docs/PROJECT_STRUCTURE.md)
- [Modelo de Pull Request](.github/PULL_REQUEST_TEMPLATE.md)

As novas etapas devem ser desenvolvidas em branches descritivas, validadas por CI e integradas por Pull Request. A branch `main` deve permanecer como referência estável do projeto.

## Requisitos para desenvolvimento

Para trabalhar localmente, tenha instalado:

- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) — necessário para ferramentas do ecossistema que utilizam Node.js.

Recomenda-se utilizar versões recentes e estáveis dessas ferramentas.

## Como executar localmente

No terminal, clone o repositório e entre no diretório da aplicação:

```bash
git clone https://github.com/yasukess-30/AI-Lab.git
cd AI-Lab/app
```

Instale as dependências:

```bash
bun install
```

Inicie o ambiente de desenvolvimento:

```bash
bun run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

## Verificação e compilação

Para verificar os tipos e gerar a versão de produção:

```bash
bun run build
```

O processo executa a verificação TypeScript e a compilação da aplicação. Os artefatos de produção são gerados no diretório `app/dist/`, incluindo os arquivos do cliente e o bundle do servidor.

Outros scripts disponíveis:

| Comando | Finalidade |
| --- | --- |
| `bun run typecheck` | Verifica os tipos TypeScript. |
| `bun run build:dev` | Gera uma compilação em modo de desenvolvimento. |
| `bun run preview` | Executa uma prévia local da compilação Vite. |
| `bun run lint` | Executa o ESLint. |
| `bun run format` | Formata os arquivos com Prettier. |

## Implantação no Cloudflare

A aplicação possui configuração para execução no **Cloudflare Workers**, com os arquivos estáticos publicados a partir de `app/dist/client` e o servidor da aplicação a partir de `app/dist/server/server.js`.

Na integração de Workers Builds, a configuração do projeto deve considerar:

| Configuração | Valor |
| --- | --- |
| Repositório | `yasukess-30/AI-Lab` |
| Diretório raiz | `app` |
| Comando de build | `bun run build` |
| Comando de deploy | `npx wrangler deploy` |

O arquivo `app/wrangler.jsonc` é a referência para o nome do Worker, o ponto de entrada, a data de compatibilidade, os recursos estáticos e as variáveis não secretas.

**Importante:** o nome do projeto de Workers Builds e o nome do Worker definido no Wrangler são configurações distintas. Ao alterar um deles, confira se a configuração de implantação continua coerente.

Não armazene tokens, senhas, chaves privadas ou outros segredos neste repositório. Credenciais necessárias à implantação devem ser configuradas de forma segura no painel do provedor.

## Dados e persistência

Na configuração atual, o manifesto da aplicação declara como desativados os serviços adicionais de banco de dados, armazenamento R2, KV e Durable Objects.

Isso descreve a configuração de infraestrutura registrada neste repositório; não deve ser interpretado como garantia de que todos os dados de uso da aplicação sejam sincronizados entre dispositivos. Antes de implementar persistência remota, será necessário definir e documentar o serviço apropriado.

## Estado do projeto

O projeto está em fase de migração e preparação para hospedagem independente do ambiente original de criação.

A compilação de produção foi concluída com sucesso em uma execução de Workers Builds. A etapa de publicação apresentou um conflito de versões relacionado a `@types/react`, cuja configuração foi ajustada no arquivo de dependências. A implantação deve ser considerada concluída somente após uma nova execução bem-sucedida e a validação da aplicação no endereço publicado.

## Princípios de desenvolvimento

O desenvolvimento do AI LAB segue algumas diretrizes:

1. **Clareza:** documentação e código devem ser compreensíveis e objetivos.
2. **Progressão:** novos recursos devem preservar uma experiência de aprendizagem gradual.
3. **Acessibilidade:** sempre que possível, a interface deve ser simples de utilizar.
4. **Confiabilidade:** alterações devem ser verificadas antes de serem consideradas concluídas.
5. **Custo consciente:** priorizar soluções gratuitas ou com camada gratuita suficiente, sem comprometer a segurança ou a manutenção.

## Contribuições

Neste momento, o repositório é mantido como projeto de desenvolvimento e estudo. Sugestões, correções e melhorias podem ser registradas por meio das ferramentas de colaboração do GitHub.

## Licença

Nenhuma licença de distribuição foi declarada neste repositório até o momento. Na ausência de uma licença explícita, os direitos autorais permanecem reservados ao titular do código. Consulte o responsável pelo projeto antes de reutilizar, modificar ou redistribuir seu conteúdo.

---

**AI LAB**  
*Aprender. Experimentar. Construir.*


## Princípios pedagógicos

1. **Progressão desde o zero:** termos técnicos são definidos antes de serem usados e cada assunto constrói sobre conhecimentos anteriores.
2. **Profundidade técnica:** explicar mecanismos, matemática, arquitetura, hipóteses e limites, não apenas apresentar ferramentas.
3. **Aprendizagem aplicada:** cada tema deve conectar teoria, exemplos, laboratório, análise de erros e projeto.
4. **Evidência e rastreabilidade:** priorizar universidades, artigos, documentação oficial, normas e conjuntos de dados com procedência conhecida.
5. **Avaliação real:** medir resultados com métricas adequadas, conjuntos de teste independentes e análise de falhas.
6. **Responsabilidade:** discutir privacidade, segurança, viés, direitos autorais e supervisão humana de acordo com o risco.

## Conteúdo educacional atual

- app/src/data/curriculum.ts: trilhas, aulas, projetos, avaliações, flashcards e glossário.
- app/src/data/lesson-depth.ts: explicações adicionais, estudos de caso, erros comuns e vocabulário.
- app/src/data/lesson-guides.ts: cadernos aprofundados com fundamentos, equações, laboratórios, exercícios e referências para aulas centrais.
- app/src/data/application-domains.ts: catálogo multidisciplinar de áreas de aplicação e projetos.
- app/src/data/learning-resources.ts: biblioteca de referências técnicas e científicas.

## Limitações conhecidas

- O progresso de estudo permanece salvo localmente no navegador; contas e sincronização entre dispositivos ainda exigem implementação de autenticação e banco de dados.
- Materiais de aplicação são educacionais e não substituem profissionais, normas, protocolos ou validações regulatórias em domínios críticos.
- A publicação em Cloudflare depende da configuração de Workers Builds vinculada ao repositório.
