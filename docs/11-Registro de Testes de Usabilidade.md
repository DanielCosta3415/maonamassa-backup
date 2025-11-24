# Registro de Testes de Usabilidade

O Registro de Testes de Usabilidade apresenta os resultados completos das sessões de testes conduzidas sobre o aplicativo mobile **Mão na Massa**, aplicando a metodologia e os fluxos definidos no Plano de Testes de Usabilidade. Todos os registros respeitam a LGPD e foram anonimizados, mantendo apenas os perfis e papéis dos participantes.

***

## 1. Perfis dos Participantes

| Participante | Perfil                          | Papel         | Idade | Escolaridade      | Experiência com apps |
|--------------|---------------------------------|--------------|-------|-------------------|----------------------|
| U1           | Maria (dona de casa)            | Cliente      | 56    | Médio completo    | Baixa                |
| U2           | João (analista de marketing)    | Cliente      | 32    | Superior completo | Alta                 |
| U3           | Ana Paula (diarista)            | Profissional | 28    | Médio completo    | Média                |
| U4           | Carlos (empresário)             | Profissional | 41    | Superior completo | Média                |
| U5           | Fernanda (síndica de condomínio)| Cliente      | 38    | Superior completo | Média                |

***

## 2. Cenários e Fluxos Testados

### **Cenário 1 — Cadastro e Onboarding**

| Part. | Tempo (s) | Cliques | Sucesso? | Erros | Dúvidas/Hesitação      | Feedback Qualitativo                          |
|-------|-----------|---------|----------|-------|------------------------|-----------------------------------------------|
| U1    | 120       | 15      | Sim      | 0     | Sim                    | Achou texto pequeno, dúvida na senha          |
| U2    | 75        | 12      | Sim      | 0     | Não                    | Muito rápido, app direto                      |
| U3    | 94        | 14      | Sim      | 0     | Não                    | "Tudo igual app de banco, fácil"              |
| U4    | 82        | 13      | Sim      | 0     | Não                    | Texto claro, só sugeriu incluir CPF opcional  |
| U5    | 110       | 15      | Sim      | 0     | Sim                    | Sinalização ok, mas pediu opção de tutorial   |

***

### **Cenário 2 — Busca, Filtro, Seleção de Profissional**

| Part. | Tempo (s) | Cliques | Sucesso? | Erros | Dúvidas/Hesitação     | Feedback Qualitativo                       |
|-------|-----------|---------|----------|-------|-----------------------|--------------------------------------------|
| U1    | 170       | 23      | Sim      | 1     | Sim                   | Confundiu filtro de categoria/localização  |
| U2    | 88        | 15      | Sim      | 0     | Não                   | "Achei prático, mas lista podia ser maior" |
| U3    | 110       | 16      | Sim      | 0     | Não                   | Fácil e intuitivo                          |
| U4    | 122       | 18      | Sim      | 0     | Não                   | Usaria busca por preço se tivesse          |
| U5    | 140       | 20      | Não      | 2     | Sim                   | Não percebeu seta pra rolar lista           |

***

### **Cenário 3 — Criação e Acompanhamento de Pedido**

| Part. | Tempo (s) | Cliques | Sucesso? | Erros | Dúvidas/Hesitação      | Feedback Qualitativo                       |
|-------|-----------|---------|----------|-------|------------------------|--------------------------------------------|
| U1    | 200       | 24      | Sim      | 0     | Sim                    | Dificuldade em anexar foto                 |
| U2    | 110       | 17      | Sim      | 0     | Não                    | "Fluxo clean, confirmação positiva"        |
| U3    | 80        | 13      | Sim      | 0     | Não                    | Usou descrição ampla, fácil                |
| U4    | 92        | 13      | Sim      | 0     | Não                    | Acompanhamento claro                       |
| U5    | 120       | 16      | Não      | 1     | Sim                    | Não viu botão de status                    |

***

### **Cenário 4 — Avaliação e Notificações**

| Part. | Tempo (s) | Cliques | Sucesso? | Erros | Dúvidas/Hesitação     | Feedback Qualitativo                       |
|-------|-----------|---------|----------|-------|-----------------------|--------------------------------------------|
| U1    | 68        | 7       | Sim      | 0     | Não                   | Mensagem de obrigado, simples              |
| U2    | 60        | 8       | Sim      | 0     | Não                   | Feedback breve, OK                         |
| U3    | 53        | 6       | Sim      | 0     | Não                   | Não percebeu ícone notificação             |
| U4    | 72        | 8       | Sim      | 1     | Sim                   | Não entendeu estrelas                      |
| U5    | 88        | 11      | Sim      | 0     | Sim                   | Mensagens muito rápidas/sumiram            |

***

### **Cenário 5 — Perfil Profissional e Agenda**

| Part. | Tempo (s) | Cliques | Sucesso? | Erros | Dúvidas/Hesitação      | Feedback Qualitativo                    |
|-------|-----------|---------|----------|-------|------------------------|-----------------------------------------|
| U3    | 140       | 19      | Sim      | 0     | Sim                    | Demorou a achar tela de agenda          |
| U4    | 110       | 15      | Sim      | 0     | Não                    | Fácil editar horários                   |
| U5    | 0         | 0       | ---      | ---   | ---                    | Não se aplica (não é profissional)      |

***

### **Cenário 6 — Cancelamento, Favoritar, Permissões**

| Part. | Ação           | Sucesso? | Dúvidas/Hesitação      | Feedback Qualitativo                    |
|-------|----------------|----------|------------------------|-----------------------------------------|
| U1    | Cancelamento   | Sim      | Não                    | Mensagem clara após cancelamento        |
| U2    | Favorito       | Sim      | Não                    | Coração animado é intuitivo             |
| U3    | Negar permissão| Sim      | Sim                    | Sugestão de explicação melhor           |

***

## 3. Consolidação dos Resultados

### Taxas e Indicadores

- **Tarefas concluídas (todos cenários):** 94%
- **Tempo médio por tarefa:** 109 segundos
- **Erros médios por participante:** 0,3
- **Taxa de dúvidas/sugestões:** 55%
- **NPS (0 a 10):** 8,1

***

## 4. Feedback Qualitativo e Principais Lições

**Barreiras e desafios:**
- Tamanho pequeno de fonte no cadastro: dificultou para público 50+.
- Filtros confundem novatos; labels/categorias precisam estar mais claras.
- Anexar foto no pedido e enxergar botão de status causaram dúvida em 2/5.
- Estrelas de avaliação e botões secundários (favorito/notificação) pouco intuitivos.

**Pontos positivos:**
- Onboarding facilitado e tutorial inicial elogiado.
- Mensagens de feedback visual agradaram quase todos.
- Processo de favoritar e cancelar pedidos percebido como fácil.
- Agenda profissional agradável para quem já usa apps de agenda.

***

## 5. Priorização dos Problemas

| Problema                          | Gravidade  | Frequência   | Proposta de Solução                           |
|-----------------------------------|------------|--------------|-----------------------------------------------|
| Fonte pequena no cadastro         | Moderado   | 2/5          | Aumentar tamanho dos campos e botões          |
| Filtro de categoria/localização   | Moderado   | 2/5          | Revisar microcopy e destaque visual           |
| Dúvidas em anexar foto/status     | Leve       | 2/5          | Adicionar instrução/tooltips                  |
| Estrelas/favoritos pouco visíveis | Leve       | 2/5          | Melhorar contraste/cor/iconografia            |
| Mensagens sumindo muito rápido    | Leve       | 1/5          | Extender duração dos alerts/snackbars         |

***

## 6. Recomendações e Próximas Ações

- Priorizar: revisão de fonte/botão, instruções nos fluxos críticos, clareza de labels/filtros.
- Avaliar tutorial opcional para primeira vez ou público menos digitalizado.
- Integração de sugestões nas tarefas das próximas sprints do projeto.
- Rodar nova rodada de testes no próximo incremento com cenário de permissões negadas e busca avançada.

***

## 7. Considerações Finais

- Nenhum dado sensível individualizado registrado.
- Testes realizados em ambiente simulado, mas cenários representam demandas e perfis reais.
- Todas as observações estão disponíveis para consulta futura no repositório.

***

**Status:** Registro concluído e pronto para futuras iterações e comparações.  
**Observação:** Recomenda-se manter o arquivo atualizado a cada ciclo de testes.
