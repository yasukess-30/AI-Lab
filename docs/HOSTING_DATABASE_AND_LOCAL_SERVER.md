# Hospedagem, banco de dados e estratégia de infraestrutura — AI LAB

**Pesquisa realizada em:** 19 de novembro de 2026  
**Objetivo:** manter o AI LAB publicável, com cadastro, login, progresso sincronizado e painel administrativo, buscando custo inicial zero sem sacrificar a segurança.

## 1. Situação atual confirmada no repositório

- Aplicação React 19 + TanStack Start/Router + Vite + TypeScript.
- Deploy configurado para Cloudflare Workers, com bundle SSR e assets estáticos.
- O arquivo `app/wrangler.jsonc` ainda não declara binding D1, KV ou R2.
- O progresso do estudante ainda é salvo no IndexedDB do navegador.
- Não há autenticação, banco remoto, sincronização entre dispositivos ou painel administrativo implementados.
- O endereço `workers.dev` é adequado para beta; domínio próprio não é requisito para começar, mas seu registro normalmente tem custo.

**Consequência:** não devemos migrar de hospedagem agora. O caminho mais econômico é completar a infraestrutura dentro do Cloudflare, que já hospeda a aplicação.

## 2. Comparação de opções gratuitas

| Opção | O que oferece no gratuito | Vantagens | Limitações relevantes |
| --- | --- | --- | --- |
| Cloudflare Workers + D1 | Worker: 100 mil requisições/dia; D1: 5 milhões de linhas lidas/dia, 100 mil escritas/dia, 5 GB totais por conta; cada banco até 500 MB | Já é a hospedagem atual; integração direta; sem servidor para manter; D1 não pausa por inatividade | Worker Free limita CPU a 10 ms por invocação; D1 Free tem 7 dias de Time Travel e 50 consultas por invocação |
| Supabase Free | PostgreSQL de 500 MB, 50 mil usuários ativos/mês, 5 GB de egress e 1 GB de arquivos | Banco relacional e Auth prontos; painel e políticas RLS | Projetos pausam após uma semana de inatividade; SMTP padrão envia apenas para membros da equipe e tem limite de 2 e-mails/hora; sem backups automáticos no Free |
| Neon Free | PostgreSQL de 1 GB por projeto; 100 CU-horas/projeto/mês; compute escala a zero | PostgreSQL gerenciado, bom para protótipos e ambientes de desenvolvimento | Não inclui autenticação de usuário final; exige outro serviço de aplicação/Auth e tem quotas próprias |
| Oracle Cloud Always Free | Até 2 OCPUs e 12 GB de RAM em Ampere A1, dentro das quotas e disponibilidade da região home | VM de verdade, controle de sistema operacional, banco e API | Capacidade pode não estar disponível; manutenção, atualizações, firewall, backups e segurança ficam conosco; CPU ARM exige conferir compatibilidade |
| Servidor doméstico | Sem mensalidade de hospedagem se já houver computador e internet | Controle total, ótimo laboratório e ambiente de desenvolvimento | Energia, quedas, internet, CGNAT, IP dinâmico, segurança física e disponibilidade; o PC precisa ficar ligado |

### Fontes oficiais consultadas

- Cloudflare Workers — [limites](https://developers.cloudflare.com/workers/platform/limits/) e [preços](https://developers.cloudflare.com/workers/platform/pricing/).
- Cloudflare D1 — [limites](https://developers.cloudflare.com/d1/platform/limits/), [preços](https://developers.cloudflare.com/d1/platform/pricing/) e [recuperação Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/).
- Supabase — [planos e quotas](https://supabase.com/pricing), [SMTP personalizado](https://supabase.com/docs/guides/auth/auth-smtp) e [limites de autenticação](https://supabase.com/docs/guides/auth/rate-limits).
- Neon — [quotas do plano gratuito](https://github.com/neondatabase/website/blob/main/content/faqs/free-plan-limits-and-quotas.md).
- Oracle — [recursos Always Free](https://docs.oracle.com/pt-br/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).
- Cloudflare — [Tunnel](https://developers.cloudflare.com/tunnel/).

Quotas e termos podem mudar. Antes de ativar recursos, conferir o painel da conta e os limites oficiais novamente.

## 3. Arquitetura recomendada para o AI LAB

### Primeira escolha: manter Cloudflare e acrescentar D1

```text
Estudante / Administrador
        |
        v
Cloudflare Worker (TanStack Start / SSR)
        |
        +---- Better Auth (sessões, login e permissões)
        |
        +---- D1 (SQLite gerenciado)
        |
        +---- Resend (e-mails transacionais, se necessário)
        |
        +---- R2 (futuramente, arquivos e materiais)
```

Por que esta é a melhor primeira candidata:

1. Reaproveita o deploy atual e o domínio `workers.dev`.
2. Evita administrar servidor, sistema operacional e banco.
3. D1 possui plano gratuito e recuperação Time Travel integrada.
4. Better Auth documenta integração nativa com D1 e também uma integração com TanStack Start.
5. A aplicação pode manter os conteúdos curriculares como dados estáticos e persistir no banco apenas usuários, papéis, progresso e eventos necessários.

### Autenticação

A candidata técnica é **Better Auth**:
- biblioteca aberta e integrada ao ecossistema TypeScript;
- integração documentada com TanStack Start;
- suporte nativo ao binding D1;
- sessões e autenticação tratadas no servidor, não em flags do navegador.

Documentação:
- [Better Auth — TanStack Start](https://better-auth.com/docs/integrations/tanstack)
- [Better Auth — suporte D1](https://github.com/better-auth/better-auth/blob/main/docs/content/blogs/1-5.mdx)
- [Better Auth — instalação e segredo](https://better-auth.com/docs/installation)

A integração precisa ser validada no runtime real do Worker. A documentação do Better Auth informa que o D1 não oferece transações interativas e usa `batch()` para atomicidade. Também devemos medir o custo de CPU do hashing de senha: o Worker gratuito tem limite de 10 ms por invocação. Se o fluxo de autenticação exceder o limite, a opção honesta pode ser usar o plano Workers Paid (US$ 5/mês) ou separar a autenticação em um serviço gerenciado, em vez de enfraquecer o hashing.

### E-mail de verificação e recuperação

O serviço Resend oferece plano Free com 3.000 e-mails/mês e limite de 100/dia, mas exige configuração de domínio remetente para entrega confiável. Um domínio próprio pode gerar custo de registro. Sem domínio, podemos testar o fluxo em ambiente controlado ou priorizar login social; não devemos fingir que confirmação por e-mail está pronta sem testar entrega real.

- [Resend — preços](https://resend.com/pricing)

### Modelo de dados inicial

Tabelas previstas para D1, após revisão do esquema:
- `user`, `session`, `account`, `verification`: tabelas administradas pelo Better Auth.
- `user_roles`: papel `student` ou `admin`, com atribuição administrativa feita no servidor.
- `learning_progress`: progresso por usuário, com versão de esquema e data de atualização.
- `project_submissions`: entregas e estado de projetos, se a funcionalidade for aprovada.
- `audit_events`: eventos administrativos importantes, sem armazenar senhas ou tokens.

O papel administrativo do endereço de administração já definido no projeto deve ser concedido por migração/seed controlado no servidor. Nunca confiar em `isAdmin` enviado pelo navegador ou em e-mail isolado para autorizar uma operação.

## 4. Como preservar o progresso atual

A migração deve ser aditiva:
1. Detectar o registro IndexedDB existente.
2. Após login, enviar uma cópia validada ao servidor.
3. Mesclar IDs concluídos sem duplicar; manter o maior valor válido de pontuação e conciliar datas.
4. Só marcar a migração como concluída após confirmação do servidor.
5. Manter exportação JSON e importação de backup.
6. Não apagar IndexedDB na primeira versão; mantê-lo como cache/offline e contingência.

Antes da migração, criar testes para registros antigos, campos ausentes, JSON inválido, conflitos entre dispositivos e falha de rede.

## 5. E se usarmos um servidor local?

O computador atual tem Ryzen 5 3600X, 32 GB de RAM e Windows 11. É suficiente para estudar Docker, executar PostgreSQL, hospedar um ambiente de staging e rodar serviços auxiliares. Isso não significa que seja a melhor origem pública para a plataforma.

### Uso recomendado do PC doméstico

- Desenvolvimento e testes.
- Banco PostgreSQL local com dados fictícios.
- Ambiente de homologação acessível somente pela rede privada.
- Processamento de datasets e tarefas pesadas fora do Worker.

### Publicar um serviço doméstico

Cloudflare Tunnel pode publicar uma aplicação local sem abrir portas de entrada e sem expor o IP público diretamente. O túnel é iniciado pelo servidor em conexão de saída e está disponível em todos os planos. Para um hostname público permanente, a configuração normal usa domínio gerenciado na Cloudflare; Quick Tunnels geram URL temporária `trycloudflare.com` e são indicados apenas para testes.

Mesmo com túnel, continuam existindo riscos:
- computador desligado, reinício ou atualização interrompem o serviço;
- queda de energia ou internet derruba o acesso;
- CGNAT pode impedir encaminhamento tradicional de portas (Tunnel evita a necessidade de abrir portas);
- dados e backups ficam sob responsabilidade local;
- um erro de firewall, serviço ou atualização pode comprometer o host.

**Decisão:** não colocar o banco principal de estudantes no PC doméstico. Usá-lo como laboratório, staging e eventualmente nó privado de processamento. A produção deve continuar em serviço gerenciado.

## 6. Alternativa de contingência: Supabase

Se a integração Better Auth + D1 no Worker não passar nos testes, Supabase Free é o plano B para um MVP:
- PostgreSQL gerenciado;
- Auth integrado;
- RLS para isolar o progresso de cada estudante;
- Cloudflare continua servindo a aplicação.

Mas há duas restrições importantes para lançamento:
1. Projetos Free pausam depois de uma semana sem atividade.
2. O SMTP padrão só envia para endereços da equipe e limita a 2 mensagens/hora; é necessário SMTP próprio para cadastro aberto e recuperação de senha.

Por isso, Supabase é excelente para prototipar e validar, mas não é automaticamente a opção gratuita mais confiável para uma plataforma pública.

## 7. Segurança mínima antes de abrir cadastro

- Sessões em cookies `HttpOnly`, `Secure` e `SameSite` adequados.
- Verificação de sessão no servidor em toda rota/API protegida.
- Papel administrativo validado no servidor; nunca pelo cliente.
- Rate limiting para login, cadastro, recuperação e operações sensíveis.
- Tokens de verificação e reset de uso único, expiração curta e armazenamento seguro.
- Proteção CSRF/origin nas mutações.
- Validação de entrada com esquema e limites de tamanho.
- RLS/isolamento por usuário quando houver acesso direto ao banco.
- Segredos somente em variáveis secretas do ambiente, nunca no Git ou bundle do navegador.
- Migrações versionadas, backup exportável e teste real de restauração.
- Auditoria para bloqueio, exclusão, alteração de papel e ações administrativas.
- Política de privacidade, retenção e exclusão de dados antes de cadastrar estudantes reais.

## 8. Plano de implementação proposto

| Etapa | Entrega | Critério de conclusão |
| --- | --- | --- |
| 1 | Prova de conceito D1 no ambiente de preview | Criar, ler, atualizar e excluir registro sem tocar em produção |
| 2 | Teste Better Auth no Worker | Cadastro, login, logout, sessão, reset e verificação testados; CPU medida |
| 3 | Esquema e migrações | Tabelas e índices revisados, migrações repetíveis e backup exportado |
| 4 | Progresso sincronizado | Migração IndexedDB sem perda, conflito entre dispositivos e modo offline |
| 5 | Papéis e painel administrativo | Admin validado no servidor, estudante sem acesso a funções administrativas |
| 6 | Segurança e observabilidade | Rate limits, logs sem segredos, testes de abuso e restauração |
| 7 | Beta privado | Convites controlados, termos e suporte definidos |
| 8 | Lançamento público | Domínio, e-mail verificado, backups e monitoramento confirmados |

## 9. Decisão de arquitetura

**Recomendação atual:** Cloudflare Workers + D1 + Better Auth, com Resend para e-mail quando um domínio remetente estiver disponível. Manter o computador doméstico para desenvolvimento e staging privado.

**Não criar ainda o banco de produção nem alterar o Wrangler para apontar a produção.** Primeiro faremos a prova de conceito em banco de preview, mediremos o custo de CPU da autenticação e validaremos migrações. Isso evita criar infraestrutura real sem testes ou comprometer os dados locais existentes.
