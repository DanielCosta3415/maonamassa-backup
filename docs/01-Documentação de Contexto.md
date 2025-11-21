# Introdução

O **Mão na Massa** é um **aplicativo mobile (Android)** que conecta **clientes** a **profissionais autônomos** de serviços (manutenção, reformas, cuidados pessoais, aulas etc.), com **foco em cidades pequenas e áreas rurais**. O app permite ao cliente **escolher diretamente** o profissional (com base em perfil, portfólio e avaliações) e **criar um pedido** objetivo, acompanhando o status até a conclusão.

Enquanto grandes centros contam com soluções consolidadas (p.ex., GetNinjas para serviços; iFood como referência de marketplace/UX), **muitos municípios menores permanecem desassistidos** por plataformas simples e acessíveis para contratação local. O **Mão na Massa** nasce para reduzir essa lacuna com uma proposta **hiperlocal, leve e de baixa fricção**.

---

## Problema

Fora dos grandes centros:

- Clientes **não encontram com facilidade** profissionais qualificados e disponíveis nas proximidades; dependem de **indicações informais** e correm risco de experiências negativas.
- Profissionais **têm pouca visibilidade**, recorrem a anúncios locais pouco eficazes e carecem de mecanismos formais de reputação, **dificultando a geração de renda previsível**.

Como consequência, a relação entre oferta e demanda permanece **fragmentada e ineficiente**, prejudicando a economia local e a confiança entre as partes.

---

## Objetivo Geral

Entregar um app **simples e confiável** que conecte clientes e profissionais em cidades pequenas/áreas rurais, permitindo ao cliente **escolher o profissional** e **acompanhar o serviço de ponta a ponta**.

---

## Objetivos Específicos do MVP

1. **Autenticação e perfis** (e-mail/telefone + senha), com **papel fixo por conta**: **Cliente** ou **Profissional** (sem perfil híbrido e **sem tela de escolha de papel**).  
2. **Descoberta por proximidade**: listar profissionais próximos, com filtro por categoria.  
3. **Abertura direta do pedido**: o cliente acessa o **perfil do profissional** e abre o pedido **diretamente dessa tela** (sem tela intermediária de seleção).  
4. **Pedido e status**: Criado → Aceito → Em Andamento → Concluído (ou Cancelado); até **3 fotos** e **localização**.  
5. **Atualização sem push externo**: pull/auto-refresh em listas/detalhes.  
6. **Avaliações**: nota (1–5) e comentário ao concluir, compondo reputação.  
7. **Disponibilidade** do profissional (agenda simples).  
8. **Notificações locais** (badges/banners in-app quando ativo) e **Tela “Notificações”** (Centro de Notificações) para consulta.  

> **Limites do MVP (escopo acadêmico):**  
> – **Sem pagamentos integrados**, **sem chat em tempo real**, **sem push externo** (FCM/APNs).  
> – **Sem SDK de mapas embutido**; **abrir rota por deep link** para o app de mapas do dispositivo.  
> – **Back-end acadêmico**: **API Fake** com **JSON Server + json-server-auth** (JWT).  
> – **Uma conta = um papel** (Cliente **ou** Profissional).  
> – Plataforma alvo: **Android** (iOS é futuro).

---

## Justificativa

**Social**: inclusão digital e geração de renda local ao **facilitar a contratação de serviços hiperlocais** com transparência e reputação.

**Acadêmica**: consolidação de engenharia de requisitos, usabilidade e desenvolvimento **mobile** em um **MVP viável** dentro do semestre.

**Diferenciação de proposta**: o cliente **escolhe o profissional** e abre o pedido **diretamente do perfil** (evitando leilão de orçamentos e telas intermediárias), com foco em **simplicidade para quem só usa WhatsApp** e **capilaridade em regiões menos atendidas**.

---

## Público-Alvo

### Clientes
Pessoas que precisam contratar serviços domésticos/comerciais e valorizam **praticidade e confiança** (especialmente quem tem **baixa familiaridade** com tecnologia). **No futuro**, a experiência poderá incluir **chat** e **pagamentos no app**; **no MVP**, mantém-se **contato fora do app se necessário** e **sem pagamentos integrados**.

### Profissionais Autônomos
Diaristas, eletricistas, encanadores, técnicos, professores, personal trainers etc., que desejam **mais visibilidade** e **reputação**. **No MVP**, cadastram perfil, portfólio e disponibilidade; **pagamentos/chat** ficam **para fases futuras**.

### Pequenas Empresas Prestadoras
Equipes de limpeza, manutenção predial ou oficinas locais que buscam **organizar atendimentos** e **atrair clientes na vizinhança**. **Relatórios avançados e centralização de pagamentos** são **itens futuros**; o MVP foca no **básico funcional**.

### Gestores e Empresas Contratantes
Síndicos e administradores que contratam serviços recorrentes. **Múltiplos agendamentos e relatórios ampliados** são **evoluções futuras**; o MVP prioriza **cadastro, busca, pedido e avaliação**.

---

## Posicionamento, Mercado e Concorrência

**Referências e não-referências**  
- **GetNinjas**: concorrente indireto; forte capilaridade em capitais; modelo de captação via leads/assinaturas para profissionais.  
- **iFood**: **não** é concorrente direto (categoria distinta). É usado **como referência de UX, confiança e operação de marketplace**.

**Hipóteses para baixa abrangência local de concorrentes em cidades menores**  
1) **Efeito-rede fraco**: pouca densidade de profissionais/serviços por bairro.  
2) **Custo de aquisição** elevado em localidades com ticket baixo.  
3) **Fricção de onboarding** para profissionais com baixa familiaridade digital.

**Como o Mão na Massa ataca isso**  
- **Go-to-market hiperlocal** (parcerias com lojas de bairro, materiais de construção, sindicatos locais).  
- **Onboarding sem atrito** (MVP sem pagamentos, sem KYC; cadastro rápido).  
- **Abertura direta do pedido** no **perfil do profissional** + **perfil/portfólio/avaliações** desde o início.

**Diferenciais (MVP)**  
- Foco **hiperlocal** e **UX ultra simples**.  
- **Pedido direto no perfil** (anti-leilão; menos telas).  
- **API fake** que acelera validação e aprendizado, sem dependências complexas.

> **Faturamento de concorrentes**  
> Esta documentação **não inclui valores financeiros** de concorrentes (muitas empresas não divulgam). Para efeitos acadêmicos, registraremos **modelos de receita observados publicamente** (assinaturas, venda de leads, destaque pago, comissões por transação) e **proxies** (cobertura por cidade, categorias, custos de plano quando públicos). Quando houver dados oficiais, serão citados neste artefato em versão futura.

---

## Modelo de Monetização (Futuro)

Para fases pós-MVP (fora do escopo acadêmico):  
1) **Assinatura leve** para profissionais (plano mensal com benefícios de visibilidade).  
2) **Taxa fixa por match** (cobrança quando há contato efetivo entre cliente e profissional).  
3) **Destaque pago** no catálogo (posição premium).

> **Estado atual:** **não há cobrança**; **sem integração de pagamentos**.

---

## Alinhamento às ODSs (Agenda 2030)

- **ODS 8 – Trabalho decente e crescimento econômico**  
  *Contribuição*: ampliar oportunidades de renda local a profissionais autônomos.  
  *Indicador proposto*: ≥ **40** serviços concluídos/mês em bairros periféricos até o fim do semestre.

- **ODS 10 – Redução das desigualdades**  
  *Contribuição*: foco em regiões menos atendidas e UX para públicos de baixa familiaridade digital.  
  *Indicador*: ≥ **60%** dos profissionais cadastrados **fora de capitais**.

- **ODS 11 – Cidades e comunidades sustentáveis**  
  *Contribuição*: contratação **perto de casa**, reduzindo deslocamentos longos.  
  *Indicador*: **raio médio** de atendimento ≤ **8 km**.

---

## Métricas e Hipóteses de Validação (MVP)

- **Ativação**: % de usuários que concluem cadastro + 1º pedido em até 7 dias.  
- **Tempo até valor**: mediana de tempo entre pedido “Criado” e “Aceito”.  
- **Qualidade**: média da **nota de avaliação** dos serviços concluídos (meta ≥ 4,2/5).  
- **Liquidez local**: nº de profissionais por categoria **por bairro** (meta mínima: 3).  
- **Engajamento em Notificações**: % de notificações lidas no **Centro de Notificações**.

**Hipóteses**  
H1: Em cidades pequenas, **UX simples** + **pedido direto no perfil** elevam a taxa de conclusão.  
H2: **Perfil/portfólio** visível antes do pedido aumenta a **taxa de aceitação** pelo profissional.  
H3: **Parcerias hiperlocais** aumentam o cadastro de profissionais com baixo custo.

---

## Premissas e Riscos (MVP)

**Premissas**: Android como plataforma alvo; API fake (JSON Server + json-server-auth); deep link para mapas; **uma conta = um papel**; sem pagamentos/chat/push externo.  
**Riscos**: baixa densidade inicial de profissionais; curva de aprendizado dos testes E2E; dependência de participação local.  
**Mitigações**: roteiro de onboarding simplificado; parcerias locais; dados seed na API fake para demonstração.

---

## Estado Tecnológico (visão de alto nível)

- **App**: React Native + Expo (Android), TypeScript.  
- **Back-end acadêmico**: **JSON Server + json-server-auth** (JWT), `db.json` / `routes.json`.  
- **Sem integrações de pagamento/push/KYC** nesta fase.  
- **Mapas**: **deep link** para Google Maps/Waze/Apple Maps do dispositivo.  
- **Navegação**: pedido **criado a partir do perfil** do profissional; **Tela “Notificações”** dedicada.

---

> **Resumo**: O Mão na Massa é um **MVP mobile, hiperlocal e de baixa fricção**, que prioriza **pedido direto no perfil do profissional**, **transparência por avaliações** e **experiência simples** — **sem pagamentos nem chat** por ora — para **validar rapidamente** a proposta em **cidades pequenas e áreas rurais**.
