# Registro de Testes de Software

Durante o desenvolvimento da aplicação, realizamos testes contínuos das funcionalidades conforme elas eram implementadas, garantindo a validação incremental de cada etapa do sistema. Para documentar esses testes e facilitar sua análise posterior, utilizamos o OBS﻿ (Open Broadcaster Software), uma ferramenta gratuita e de código aberto que permite a gravação em vídeo das interações e fluxos realizados na aplicação.

A utilização do OBS - ferramenta para captura de telas -﻿ possibilitou registrar com precisão as evidências dos testes, capturando tanto o comportamento esperado quanto eventuais falhas encontradas, o que contribui para uma avaliação detalhada e transparente do progresso do projeto. Essa prática fortalece a comunicação entre os membros da equipe e facilita o diagnóstico e correção de problemas.

Esse procedimento faz parte do nosso compromisso com a qualidade e a usabilidade do sistema, tornando o processo de testes organizado e eficiente, enquanto apoiamos a evolução contínua da solução ao longo das próximas fases de desenvolvimento.

| **Caso de Teste** 	| **CT01 – Página de cadastro** 	|
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-001 - A aplicação deve permitir o cadastro de novos usuários mediante o preenchimento obrigatório de nome, e-mail, perfil (profissional ou cliente) e senha. |
|**Registro de evidência** | [CT-01](https://drive.google.com/file/d/1lwUTF_jyls1XeYlu1Ie0D7NdI1n_yaO8/view?usp=sharing) |
| **Objetivo do Teste** | Verificar se o usuário consegue realizar o cadastro corretamente na aplicação. |
| **Procedimentos** | - Acessar o app através do link [MaoNaMassaFinal - Snack](https://snack.expo.dev/@lorenammp/maonamassafinal) <br> - Clicar em "Cadastro" <br> - Preencher os campos "Nome", "E-mail", "Perfil" (selecionando Profissional ou Cliente) e "Senha" <br> - Clicar em "Cadastrar" |
| **Resultado Esperado** | O cadastro é concluído com sucesso após o preenchimento de todos os campos obrigatórios, incluindo um e-mail válido. |
| **Avaliação** | O sistema apresenta validações verificando se o campo e-mail é válido; o sistema não redireciona o usuário para a tela Login; o sistema não registra o usuário cadastrado no banco; o campo "perfil" não apresenta um "select menu" para seleção de papel. |

---

| **Caso de Teste** 	| **CT02 – Página de login** 	|
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-002 - A aplicação deve permitir que um usuário previamente cadastrado realize login selecionando seu papel na aplicação (profissional ou cliente). |
|**Registro de evidência** | [CT-02](https://drive.google.com/file/d/1jWdJJ01RMWjoBWvRPZCuSqn8woaMeZ9O/view?usp=sharing) |
| **Objetivo do Teste** | Verificar se o usuário consegue acessar a aplicação ao preencher corretamente os dados de login. |
| **Procedimentos** | - Acessar o app através do link [MaoNaMassaFinal - Snack](https://snack.expo.dev/@lorenammp/maonamassafinal) <br> - Clicar em "Login" <br> - Preencher os campos "E-mail" e "Senha" <br> - Selecionar o papel "Profissional" ou "Cliente" <br> - Clicar em "Entrar" |
| **Resultado Esperado** | O login é bem-sucedido quando o usuário digita um e-mail válido e possui cadastro ativo na aplicação. |
| **Avaliação** | O sistema apresenta menu para seleção de papeis; valida se o e-mail foi encontrado no banco; apresenta mensagens de erro quando o usuário não é encontrado; o sistema não redireciona para a home de acordo com o papel selecionado; o sistema não busca no banco usuários já cadastrados na aplicação. |

---

| Caso de Teste         | CT03 – Manter sessão e logout                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-003 - A aplicação deve manter a sessão do usuário e permitir o logout.                                                                                       |
| Registro de evidência |                                                                                                                                                                 |
| Objetivo do Teste     | Verificar se a sessão do usuário é mantida após o login e se o logout encerra corretamente a sessão.                                                            |
| Procedimentos         | - Realizar login com usuário válido <br>- Navegar pela aplicação verificando continuidade da sessão <br>- Clicar em "Logout" <br>- Tentar acessar áreas restritas sem login |
| Resultado Esperado    | Sessão permanece ativa durante navegação e logout encerra a sessão, bloqueando o acesso às áreas restritas.                                                     |
| Avaliação             |                                                                                                                                                                 |

---

| Caso de Teste         | CT04 – Editar perfil do usuário                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-004 - A aplicação deve permitir editar perfil, incluindo nome, foto, telefone e e-mail.                                            |
| Registro de evidência |                                                                                                                                       |
| Objetivo do Teste     | Verificar se o usuário consegue editar e salvar as informações do seu perfil.                                                         |
| Procedimentos         | - Fazer login <br>- Navegar até a página de edição de perfil <br>- Modificar campos "Nome", "Foto", "Telefone" e "E-mail" <br>- Salvar alterações |
| Resultado Esperado    | As alterações são salvas e exibidas corretamente no perfil do usuário.                                                                |
| Avaliação             |                                                                                                                                       |

---

| Caso de Teste         | CT05 – Selecionar papel do usuário                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-005 - A aplicação deve permitir que o usuário selecione seu papel (Cliente, Profissional ou Ambos).                                                     |
| Registro de evidência |                                                                                                                                                            |
| Objetivo do Teste     | Verificar se o usuário consegue selecionar e alternar entre os papéis na aplicação.                                                                        |
| Procedimentos         | - Fazer login <br>- Acessar configuração de perfil ou seleção de papel <br>- Selecionar ou alterar o papel para Cliente, Profissional ou Ambos <br>- Confirmar seleção |
| Resultado Esperado    | O papel é salvo e as funcionalidades e telas correspondentes são apresentadas conforme o papel selecionado.                                                |
| Avaliação             |                                                                                                                                                            |

---

| Caso de Teste         | CT06 – Perfil do profissional                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-006 - A aplicação deve exibir o perfil do profissional com categorias, biografia, preço de referência e demais informações relevantes. |
| Registro de evidência |                                                                                                                                           |
| Objetivo do Teste     | Verificar se o perfil do profissional é exibido corretamente com todas as informações obrigatórias.                                       |
| Procedimentos         | - Fazer login como cliente <br>- Navegar até a listagem de profissionais <br>- Selecionar um profissional e visualizar seu perfil                 |
| Resultado Esperado    | O perfil do profissional é exibido com categorias, biografia e preço de referência corretamente apresentados.                             |
| Avaliação             |                                                                                                                                           |

---

| Caso de Teste         | CT07 – Capturar localização do cliente                                                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-007 - A aplicação deve capturar a localização do cliente com consentimento para ordenar profissionais por proximidade.                                              |
| Registro de evidência |                                                                                                                                                                        |
| Objetivo do Teste     | Verificar se a aplicação solicita permissão de localização e ordena profissionais por proximidade corretamente.                                                        |
| Procedimentos         | - Abrir o app como cliente pela primeira vez <br>- Permitir ou negar permissão de localização <br>- Verificar ordem da listagem de profissionais                               |
| Resultado Esperado    | Se a permissão for concedida, os profissionais são listados por proximidade; se negada, a aplicação informa ausência do recurso e lista sem ordenação por proximidade. |
| Avaliação             |                                                                                                                                                                        |

---

| Caso de Teste         | CT08 – Listar profissionais próximos por categoria                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-008 - A aplicação deve listar profissionais próximos com filtro por categoria.                                                                           |
| Registro de evidência |                                                                                                                                                             |
| Objetivo do Teste     | Verificar se o filtro por categoria funciona e lista profissionais só da categoria selecionada.                                                             |
| Procedimentos         | - Fazer login como cliente <br>- Na tela de listagem, aplicar filtro por categoria <br>- Verificar se listagem mostra profissionais únicos da categoria selecionada |
| Resultado Esperado    | A listagem exibe profissionais apenas da categoria escolhida, ordenados por proximidade se a permissão de localização foi concedida.                        |
| Avaliação             |                                                                                                                                                             |

---

| Caso de Teste         | CT09 – Selecionar profissional antes de criar pedido                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Requisito Associado   | RF-009 - A aplicação deve obrigar cliente a selecionar profissional antes de criar pedido para evitar pedidos genéricos. |
| Registro de evidência |                                                                                                                          |
| Objetivo do Teste     | Verificar se o sistema bloqueia criação de pedido sem profissional selecionado.                                          |
| Procedimentos         | - Fazer login como cliente <br>- Tentar criar pedido sem seleção de profissional <br>- Selecionar profissional e criar pedido    |
| Resultado Esperado    | O sistema bloqueia criação de pedido sem profissional selecionado e permite criar pedido só após seleção válida.         |
| Avaliação             |                                                                                                                          |

---

| Caso de Teste         | CT10 – Abrir rotas no app de mapas                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-010 - A aplicação deve permitir abrir rotas no app de mapas do dispositivo via deep link.                         |
| Registro de evidência |                                                                                                                      |
| Objetivo do Teste     | Verificar se cliente consegue abrir rota até local do serviço no app de mapas do dispositivo.                        |
| Procedimentos         | - Fazer login como cliente <br>- Selecionar pedido em andamento <br>- Clicar em opção para abrir rota no app de mapas nativo |
| Resultado Esperado    | O app de mapas é aberto com rota correta até endereço do serviço.                                                    |
| Avaliação             |                                                                                                                      |

---

| Caso de Teste         | CT11 – Criar pedido com descrição, fotos e localização                                                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-011 - A aplicação deve permitir criar pedido com descrição, até 3 fotos e capturar localização.                                                                               |
| Registro de evidência |                                                                                                                                                                                  |
| Objetivo do Teste     | Verificar se cliente consegue criar pedido incluindo todos os dados obrigatórios e opcionais.                                                                                    |
| Procedimentos         | - Estar autenticado como cliente <br>- Selecionar profissional <br>- Preencher descrição do serviço <br>- Adicionar até 3 fotos da câmera ou galeria <br>- Confirmar localização <br>- Enviar pedido |
| Resultado Esperado    | Pedido criado com sucesso, contendo descrição, fotos e localização.                                                                                                              |
| Avaliação             |                                                                                                                                                                                  |

---

| Caso de Teste         | CT12 – Fluxo de status do pedido                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-012 - A aplicação deve gerenciar fluxo de status do pedido: Criado, Aceito, Em Andamento, Concluído e Cancelado.                                  |
| Registro de evidência |                                                                                                                                                      |
| Objetivo do Teste     | Verificar se status do pedido segue corretamente ciclo de vida esperado.                                                                             |
| Procedimentos         | - Criar pedido <br>- Aceitar pedido como profissional <br>- Atualizar status para Em Andamento <br>- Concluir pedido <br>- Testar cancelamento em estados permitidos |
| Resultado Esperado    | Status do pedido é atualizado corretamente e fluxos de cancelamento respeitados.                                                                     |
| Avaliação             |                                                                                                                                                      |

---

| Caso de Teste         | CT13 – Atualização pull-to-refresh de status                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-013 - A aplicação deve atualizar status do pedido via pull-to-refresh sem usar push externo.             |
| Registro de evidência |                                                                                                             |
| Objetivo do Teste     | Verificar se usuário consegue atualizar manualmente visualização do status do pedido.                       |
| Procedimentos         | - Navegar até tela de acompanhamento do pedido <br>- Puxar para atualizar tela (pull-to-refresh) diversas vezes |
| Resultado Esperado    | O status exibido é atualizado com dados mais recentes do servidor.                                          |
| Avaliação             |                                                                                                             |

---

| Caso de Teste         | CT14 – Avaliar profissional no final do serviço                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-014 - A aplicação deve permitir avaliação do profissional com nota de 1 a 5 e comentário após conclusão do pedido.     |
| Registro de evidência |                                                                                                                           |
| Objetivo do Teste     | Verificar se cliente consegue avaliar profissional após término do serviço.                                               |
| Procedimentos         | - Aguardar pedido finalizado <br>- Abrir tela de avaliação <br>- Selecionar nota de 1 a 5 <br>- Inserir comentário <br>- Enviar avaliação |
| Resultado Esperado    | Avaliação é salva e exibida no perfil do profissional.                                                                    |
| Avaliação             |                                                                                                                           |

---

| Caso de Teste         | CT15 – Listar pedidos por papel e status                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-015 - A aplicação deve listar pedidos filtrados por papel (cliente ou profissional) e status.                                    |
| Registro de evidência |                                                                                                                                     |
| Objetivo do Teste     | Verificar se listagem de pedidos exibe corretamente pedidos filtrados pelo papel e status.                                          |
| Procedimentos         | - Fazer login como cliente <br>- Consultar lista de pedidos por status <br>- Repetir como profissional <br>- Filtrar por cada status disponível |
| Resultado Esperado    | Pedidos são listados e filtrados corretamente conforme papel e status selecionados.                                                 |
| Avaliação             |                                                                                                                                     |

---

| Caso de Teste         | CT16 – Cancelar pedido antes de iniciar execução                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-016 - A aplicação deve permitir cancelamento do pedido apenas antes do status Em Andamento.                                                              |
| Registro de evidência |                                                                                                                                                             |
| Objetivo do Teste     | Verificar se cliente consegue cancelar pedido nos status Criado e Aceito, e que cancelamento não é permitido após iniciar serviço.                          |
| Procedimentos         | - Criar pedido e cancelar no status Criado <br>- Criar pedido, aceitar profissional e cancelar no status Aceito <br>- Tentar cancelar pedido no status Em Andamento |
| Resultado Esperado    | Cancelamento ocorre apenas nos status permitidos e sistema impede cancelamento após começar execução.                                                       |
| Avaliação             |                                                                                                                                                             |

---

| Caso de Teste         | CT17 – Gerenciar agenda e disponibilidade do profissional                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Requisito Associado   | RF-017 - A aplicação deve permitir que profissional cadastre dias e horários de atendimento na agenda.                         |
| Registro de evidência |                                                                                                                                |
| Objetivo do Teste     | Verificar se profissional consegue adicionar, editar e visualizar seus dias e horários disponíveis.                            |
| Procedimentos         | - Login como profissional <br>- Acessar agenda <br>- Cadastrar dias e horários <br>- Editar disponibilidade <br>- Visualizar agenda atualizada |
| Resultado Esperado    | Agenda é salva e refletida corretamente na disponibilidade para clientes filtrarem.                                            |
| Avaliação             |                                                                                                                                |

---

| Caso de Teste         | CT18 – Favoritar profissionais                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-018 - A aplicação deve permitir que clientes adicionem profissionais aos favoritos para facilitar recontratação.                                |
| Registro de evidência |                                                                                                                                                    |
| Objetivo do Teste     | Verificar se cliente consegue favoritar e acessar lista de profissionais favoritos.                                                                |
| Procedimentos         | - Fazer login como cliente <br>- Navegar até perfil do profissional <br>- Clicar em "Favoritar" <br>- Acessar lista de favoritos para ver profissionais salvos |
| Resultado Esperado    | Profissionais são adicionados e listados corretamente na área de favoritos do cliente.                                                             |
| Avaliação             |                                                                                                                                                    |

---

| Caso de Teste         | CT19 – Categorias de serviços na Home                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| Requisito Associado   | RF-019 - A aplicação deve exibir categorias de serviços na página inicial para facilitar navegação.          |
| Registro de evidência |                                                                                                              |
| Objetivo do Teste     | Verificar se categorias aparecem corretamente na Home e permitem filtrar profissionais.                      |
| Procedimentos         | - Abrir app autenticado <br>- Visualizar categorias na Home <br>- Selecionar uma categoria e observar lista filtrada |
| Resultado Esperado    | Categorias são exibidas com clareza e o filtro funciona conforme seleção na Home.                            |
| Avaliação             |                                                                                                              |

---

| Caso de Teste         | CT20 – Histórico resumido no perfil                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-020 - A aplicação deve mostrar histórico resumido no perfil do profissional, com quantidade de serviços concluídos e média de avaliações. |
| Registro de evidência |                                                                                                                                              |
| Objetivo do Teste     | Verificar se perfil do profissional exibe corretamente histórico resumo com dados esperados.                                                 |
| Procedimentos         | - Acessar perfil do profissional <br>- Visualizar histórico resumido com quantidade de serviços e média de avaliações                            |
| Resultado Esperado    | Histórico aparece corretamente e corresponde aos dados reais.                                                                                |
| Avaliação             |                                                                                                                                              |

---

| Caso de Teste         | CT21 – Portfólio de fotos fixo no perfil                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-021 - A aplicação deve permitir que profissionais adicionem e exibam fotos fixas de portfólio no perfil.                       |
| Registro de evidência |                                                                                                                                   |
| Objetivo do Teste     | Verificar se profissional pode cadastrar fotos no portfólio e se são exibidas no perfil.                                          |
| Procedimentos         | - Login como profissional <br>- Acessar área de portfólio <br>- Adicionar fotos fixas <br>- Salvar e visualizar perfil para conferir exibição |
| Resultado Esperado    | Fotos são salvas e exibidas no perfil do profissional corretamente.                                                               |
| Avaliação             |                                                                                                                                   |

---

| Caso de Teste         | CT22 – Filtro por disponibilidade (dias/horários)                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-022 - A aplicação deve permitir que clientes filtrem profissionais por dias e horários disponíveis.                                             |
| Registro de evidência |                                                                                                                                                    |
| Objetivo do Teste     | Verificar se filtro por disponibilidade funciona e lista profissionais conforme agenda cadastrada.                                                 |
| Procedimentos         | - Login como cliente <br>- Acessar filtro de disponibilidade <br>- Selecionar dias e horários desejados <br>- Verificar lista de profissionais correspondentes |
| Resultado Esperado    | Lista é filtrada corretamente com base nos dias/horários selecionados pelo cliente.                                                                |
| Avaliação             |                                                                                                                                                    |

---

| Caso de Teste         | CT23 – Notificações locais no app                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado   | RF-023 - A aplicação deve enviar notificações locais (badges, banners) para acompanhar mudanças de status enquanto o app está aberto.          |
| Registro de evidência |                                                                                                                                                |
| Objetivo do Teste     | Verificar se usuário recebe notificações corretas de status de pedidos com app ativo.                                                          |
| Procedimentos         | - Abrir app e fazer login <br>- Criar pedido ou aceitar pedido em outra instância <br>- Alterar status do pedido <br>- Observar notificações locais no app |
| Resultado Esperado    | Notificações são exibidas corretamente no app indicando mudanças de status aos usuários ativos.                                                |
| Avaliação             |                                                                                                                                                |

## Relatório de testes de software

### Resultados Obtidos
Os testes realizados até o momento focaram principalmente nas funcionalidades essenciais de cadastro e login, pilares da experiência inicial do usuário. Foi possível confirmar que as telas estão acessíveis conforme o fluxo planejado, e a navegação básica entre essas interfaces está funcional. Essa consistência contribui para uma usabilidade intuitiva, facilitando o primeiro contato do usuário com a aplicação.

### Pontos Fortes
A interface de onboarding cumpre seu papel informativo, apresentando de forma clara as funcionalidades do aplicativo.

Os formulários de cadastro e login possuem campos obrigatórios bem definidos, com indicação de preenchimento, o que apoia a correta inserção dos dados pelo usuário.

A seleção do papel do usuário (profissional ou cliente) está integrada no fluxo de cadastro e login, permitindo posteriormente segmentar a experiência conforme o perfil.

### Fragilidades Identificadas
O sistema ainda não está integrado ao banco de dados, resultando em falhas na persistência dos dados durante o cadastro. Isso impede que os usuários sejam salvos de forma efetiva na aplicação.

O redirecionamento automático após o cadastro não está implementado; o usuário permanece na tela de cadastro, sem transição para a página principal adequada ao seu perfil.

O login não realiza validação real contra um banco de usuários cadastrados e também não direciona o usuário para a home conforme o papel selecionado, o que compromete a continuidade do uso efetivo do sistema.

### Impacto das Falhas
Essas deficiências impactam diretamente a experiência do usuário, gerando frustração ao tentar criar uma conta ou acessar a aplicação. A ausência de persistência e validação de dados impede a evolução para funcionalidades mais avançadas e pode prejudicar a credibilidade da aplicação. Além disso, a falta de redirecionamento prejudica a fluidez da navegação e a segmentação do conteúdo conforme o papel do usuário, limitando a usabilidade.

### Estratégias para Correção e Aperfeiçoamento
O grupo pretende atuar nas próximas iterações para:

- Implementar a conexão robusta com o banco de dados, garantindo o salvamento e recuperação corretos das informações dos usuários.

- Desenvolver a lógica de redirecionamento para diferenciar a home exibida ao profissional e ao cliente, melhorando a personalização da experiência.

- Estabelecer validações efetivas no login para autenticação segura e confiável de usuários previamente cadastrados.

- Realizar testes adicionais focados em fluxos de navegação, validação de dados, e integração com backend para assegurar estabilidade.

- Revisar e aprimorar a interface e mensagens para facilitar a correção de erros pelo usuário, aumentando a usabilidade e acessibilidade.

### Propostas de Melhoria
Além das correções citadas, sugere-se:

- Testes contínuos e automatizados para validar regressão após cada nova implementação.

- Avaliação da performance do aplicativo em diferentes dispositivos para garantir responsividade.

- Inclusão de testes de usabilidade para avaliar a intuitividade das telas e melhorar a comunicação visual.

- Planejamento de testes de segurança para proteger dados sensíveis como senhas e informações pessoais.

<!--
> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
-->
