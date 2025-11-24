# Plano de Testes de Usabilidade

Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa.

Um plano de teste de usabilidade deverá conter: 

## Definição do(s) objetivo(s)

Antes de iniciar os testes, é essencial definir o que se deseja avaliar na usabilidade do sistema.  
Objetivos para o app **Mão na Massa**:
- Verificar se os usuários conseguem concluir tarefas essenciais (cadastro, busca, contratação, avaliação) sem dificuldades.
- Identificar barreiras na navegação, fluxos e interação específicos para clientes e profissionais.
- Avaliar a eficiência, compreensão e satisfação dos perfis/públicos prioritários do contexto (personas do projeto).
- Testar a acessibilidade para diferentes níveis de escolaridade e letramento digital, e identificar se o app é inclusivo e intuitivo.

## Seleção dos participantes

Para garantir que o teste reflita o uso real do sistema, escolha participantes representativos do público-alvo.

**Critérios para selecionar participantes:**
- Perfis variados pautados nas personas: cliente (ex: Maria, Fernanda), profissional (ex: Ana Paula, Carlos), usuários recorrentes (ex: João).
- Idade, gênero, vínculo profissional, território e domínio de tecnologia.
- Inclusão, se possível, de pessoa com baixa experiência com apps e/ou deficiência relevante (baixa visão, baixa alfabetização etc.).

**Quantidade recomendada:**  
Mínimo: 5 participantes (clientes e profissionais).  
Ideal: Entre 8 e 12 para maior diversidade.

## Definição de cenários de teste

Os cenários representam tarefas reais que os usuários executam no sistema.  
Para o app **Mão na Massa**, ao menos 5 fluxos devem ser detalhados com: objetivo, contexto, tarefa e critério de sucesso.

***

**Cenário 1: Cadastro e Onboarding**

- **Objetivo:** Verificar clareza, passos necessários e compreensão no primeiro acesso ao app (cliente e profissional).
- **Contexto:** Persona Maria quer contratar um serviço e nunca usou apps desse tipo.
- **Tarefa(s):**  
    - Abrir o app  
    - Selecionar opção de cadastro  
    - Preencher dados obrigatórios  
    - Avançar onboarding
- **Critério(s) de Sucesso:**  
    - Usuário faz cadastro sem dúvidas/críticas; entende qual será o próximo passo após cadastro.
    - Não solicita ajuda externa nem se perde no fluxo.

***

**Cenário 2: Busca, filtro e seleção de profissional**

- **Objetivo:** Avaliar se o cliente consegue partir do login, pesquisar/restringir profissionais, entender perfis e escolher um.
- **Contexto:** João busca profissional de hidráulica próximo para reparo urgente.
- **Tarefa(s):**  
    - Login (já cadastrado)  
    - Buscar/filtros por categoria e localidade  
    - Analisar dados do perfil do profissional  
    - Selecionar e visualizar detalhes
- **Critério(s) de Sucesso:**  
    - Cliente encontra profissional adequado, compreende prazos, valores, avaliações e avança para contratação.

***

**Cenário 3: Criação e acompanhamento de pedido**

- **Objetivo:** Testar usabilidade do fluxo de solicitação de serviço e acompanhamento do status do pedido.
- **Contexto:** Fernanda (síndica) quer agendar limpeza para amanhã cedo.
- **Tarefa(s):**  
    - Do perfil do profissional desejado, solicitar serviço  
    - Preencher descrição, anexar foto, definir localização  
    - Confirmar e acompanhar evolução do pedido
- **Critério(s) de Sucesso:**  
    - Pedido criado sem hesitação; área de acompanhamento facilmente localizada e compreendida.

***

**Cenário 4: Avaliação e notificações**

- **Objetivo:** Verificar clareza das opções de avaliação e entendimento de notificações pelo cliente/profissional.
- **Contexto:** Serviço finalizado, cliente decide avaliar e profissional verifica o retorno.
- **Tarefa(s):**  
    - Achar opção "avaliar serviço"  
    - Registrar nota e comentário  
    - Checar feedback/notificação de avaliação (profissional)
- **Critério(s) de Sucesso:**  
    - Cliente avalia sem dificuldade; profissional observa feedback imediatamente na área de notificações.

***

**Cenário 5: Configuração do perfil e agenda do profissional**

- **Objetivo:** Avaliar se o profissional edita perfil, configura agenda e responde a novos pedidos intuitivamente.
- **Contexto:** Ana Paula (diarista) recebe novo pedido e quer ajustar agenda na semana.
- **Tarefa(s):**  
    - Login como profissional  
    - Acessar e editar perfil  
    - Definir horários disponíveis  
    - Aceitar e concluir pedido
- **Critério(s) de Sucesso:**  
    - Profissional localiza e atualiza agenda; resposta a solicitações ocorre sem dúvidas.

***

**Cenário Opcional 6: Cancelamento, favoritar, permissões de localização/câmera**

- **Objetivo:** Detectar ruídos em operações secundárias, mas essenciais na experiência geral.
- **Contexto:** Cliente decide cancelar pedido antes do início, favoritar profissional ou app solicita permissão que é negada.
- **Tarefa(s):**  
    - Executar ação secundária (ex: cancelar, favoritar, negar permissão)
- **Critério(s) de Sucesso:**  
    - Sistema fornece retorno comprensível e apresenta caminhos alternativos.

***

## Métodos de coleta de dados

Coletar:
- Métricas quantitativas: conclusão das tarefas, tempo, tentativas, cliques, erros.
- Métricas qualitativas: dúvidas/sugestões espontâneas, hesitações, verbalizações do participante durante o teste.
- Questionário pós-teste (0-10): facilidade, clareza, satisfação, chance de recomendar, pontos de frustração e sugestões.

Registro:
- Observação direta, gravação de tela/áudio (sem rosto), checklist por tarefa para ajuda/dúvida/h
esitação.
- Atendendo à LGPD: anonimato total, nenhum dado sensível/identificável coletado, apenas descrição do perfil fictício.

## Critérios éticos

- Consentimento livre e esclarecido: explicar objetivo, anonimato, direito de recusa e interrupção a qualquer momento.
- Nenhuma gravação de rosto/nome real.
- Relatórios apresentados apenas por perfil e de forma agregada.

## Relato e recomendações

- Sintetizar barreiras, dúvidas e sugestões em relação aos fluxos principais.
- Relatório analítico com métricas e pontos práticos para reordenação do backlog, priorizando melhorias de navegação, microcopy e acessibilidade.

***

**Status:** Iterativo; atualizado após cada rodada de teste e conforme avanços do app e feedbacks reais da equipe e usuários.
