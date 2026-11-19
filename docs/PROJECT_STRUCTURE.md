# Organização do projeto

## Estrutura de alto nível

```text
AI-Lab/
├── .github/
│   ├── workflows/             # Integração contínua e automações do repositório
│   └── PULL_REQUEST_TEMPLATE.md
├── app/
│   ├── packages/              # Pacotes locais reutilizáveis da aplicação
│   ├── public/                # Recursos estáticos servidos sem processamento
│   ├── src/
│   │   ├── assets/            # Recursos importados e processados pelo bundler
│   │   ├── components/        # Componentes de interface compartilhados
│   │   ├── data/              # Conteúdo educacional estruturado
│   │   ├── hooks/             # Hooks React reutilizáveis
│   │   ├── layouts/           # Estruturas de composição visual
│   │   ├── lib/               # Utilitários e serviços de infraestrutura
│   │   ├── module/            # Módulos funcionais isolados
│   │   └── routes/            # Rotas da aplicação
│   ├── package.json
│   ├── vite.config.ts
│   └── wrangler.jsonc
├── docs/                      # Documentação de arquitetura e processo
├── MIGRATION.md               # Histórico e instruções de migração
└── README.md                  # Visão geral e início rápido
```

## Responsabilidades de `app/src/data/`

| Arquivo | Responsabilidade |
| --- | --- |
| `curriculum.ts` | Estrutura principal das trilhas, aulas, projetos e avaliações. |
| `lesson-depth.ts` | Complementos pedagógicos associados às aulas. |
| `lesson-guides.ts` | Guias aprofundados e laboratórios das aulas. |
| `application-domains.ts` | Catálogo de setores e aplicações multidisciplinares. |
| `learning-resources.ts` | Referências técnicas, científicas e materiais de estudo. |

Os IDs definidos no currículo são a fonte de verdade para relacionar aulas a guias, complementos e progresso. Não criar IDs paralelos sem uma necessidade documentada.

## Responsabilidades de `app/src/lib/`

- Código compartilhado que não pertence diretamente a um componente visual.
- Adaptadores de armazenamento, validação e integração com serviços.
- Código exclusivo do servidor deve permanecer identificado pelo sufixo `.server` ou em módulos explicitamente protegidos para execução no servidor.
- Não importar segredos ou módulos exclusivamente server-side em componentes enviados ao navegador.

## Convenções de nomes

- Componentes React: PascalCase no nome exportado; arquivos seguem o padrão já adotado no diretório em que vivem.
- Hooks: prefixo `use-` ou `use`, mantendo consistência com a área.
- Dados educacionais: nomes descritivos em kebab-case.
- Módulos server-side: sufixo `.server.ts` quando aplicável.
- Testes: `*.test.ts` ou `*.test.tsx`, próximos ao código testado.
- Estilos específicos: junto ao componente ou módulo responsável, evitando folhas globais sem necessidade.

## Regras para manter a árvore saudável

1. Não criar diretórios genéricos como `misc`, `temp` ou `new`.
2. Não duplicar componentes ou fontes de dados para contornar um problema de import.
3. Manter conteúdo educacional separado da apresentação visual.
4. Manter integrações e persistência fora dos componentes de página sempre que possível.
5. Remover código morto somente depois de confirmar que não há imports dinâmicos ou referências externas.
6. Documentar decisões de arquitetura que afetem segurança, persistência, deploy ou estrutura do currículo.
7. Antes de mover arquivos, pesquisar todas as referências e validar o build.

## Observação sobre o estado atual

A árvore descrita representa a organização pretendida e a estrutura observada do repositório. Ela não significa que todos os módulos planejados (autenticação, banco remoto ou painel administrativo) já estejam implementados.
