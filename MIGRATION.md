# AI LAB — Estado da migração e evolução

O código-fonte da aplicação foi transferido para este repositório e está conectado ao pipeline de implantação da Cloudflare Workers Builds.

## Repositório e implantação
- Repositório: https://github.com/yasukess-30/AI-Lab
- Aplicação: diretório app/
- Build: bun run build
- Deploy: npx wrangler deploy
- Worker de configuração: app/wrangler.jsonc

## Estado do produto
- Aplicação React 19, TypeScript, TanStack Start e Cloudflare Workers.
- Trilhas, aulas, projetos, avaliações, flashcards e glossário.
- Progresso de aprendizagem salvo localmente no navegador.
- Catálogo multidisciplinar de aplicações de IA.
- Biblioteca de referências técnicas e científicas.
- Cadernos aprofundados para aulas fundamentais, com equações, laboratórios, questões e referências.

## Pendências técnicas conhecidas
- Confirmar e registrar a URL pública definitiva do Worker.
- Executar validação de build e smoke tests no ambiente publicado.
- Implementar autenticação, contas de alunos, papéis e painel administrativo.
- Migrar o progresso local para persistência por usuário, preservando exportação e funcionamento offline.
- Configurar serviço de e-mail antes de habilitar verificação e recuperação de senha.
- Rever dependências residuais do ambiente original e remover integrações que não sejam necessárias.

## Critério de conclusão
Uma alteração só deve ser considerada concluída após commit no GitHub, build bem-sucedido e verificação funcional no endereço público. O repositório não deve conter segredos ou credenciais.
