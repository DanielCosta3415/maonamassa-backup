# Registro de Testes de Software

Durante o desenvolvimento da aplicação, realizamos testes contínuos das funcionalidades conforme elas eram implementadas, garantindo a validação incremental de cada etapa do sistema. Para documentar esses testes e facilitar sua análise posterior, utilizamos o OBS﻿ (Open Broadcaster Software), uma ferramenta gratuita e de código aberto que permite a gravação em vídeo das interações e fluxos realizados na aplicação.

A utilização do OBS - ferramenta para captura de telas -﻿ possibilitou registrar com precisão as evidências dos testes, capturando tanto o comportamento esperado quanto eventuais falhas encontradas, o que contribui para uma avaliação detalhada e transparente do progresso do projeto. Essa prática fortalece a comunicação entre os membros da equipe e facilita o diagnóstico e correção de problemas.

Esse procedimento faz parte do nosso compromisso com a qualidade e a usabilidade do sistema, tornando o processo de testes organizado e eficiente, enquanto apoiamos a evolução contínua da solução ao longo das próximas fases de desenvolvimento.

| **Caso de Teste** 	| **CT01 – Página de cadastro** 	|
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-001 - A aplicação deve permitir o cadastro de novos usuários mediante o preenchimento obrigatório de nome, e-mail, perfil (profissional ou cliente) e senha. |
|**Registro de evidência** | [CT-01](https://drive.google.com/file/d/1TFYfFYe8XX_yOevjgaStlAZKbo3TquKr/view?usp=sharing) |
| **Objetivo do Teste** | Verificar se o usuário consegue realizar o cadastro corretamente na aplicação. |
| **Procedimentos** | - Realizar o download da apk; instalar o app em dispositivo Android <br> - Clicar em "Próximo" <br> - Preencher os campos "Nome", "E-mail" e "Senha" <br> - Selecionar o papel desejado (cliente ou profissional) <br> - Clicar em "Cadastrar" |
| **Resultado Esperado** | O cadastro é concluído com sucesso após o preenchimento de todos os campos obrigatórios, incluindo um e-mail válido; o usuário é redirecionado para a tela "Login". |
| **Avaliação** | O sistema apresenta validações verificando se o campo e-mail é válido; o sistema redireciona o usuário para a tela login; o sistema envia e armazena os dados do usuário na API desenvolvida para a aplicação. |

---

| **Caso de Teste** 	| **CT02 – Página de login** 	|
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-002 - A aplicação deve permitir que um usuário previamente cadastrado realize login selecionando seu papel na aplicação (profissional ou cliente). |
|**Registro de evidência** | [CT-02](https://drive.google.com/file/d/1P1hPhhmj6mRm7jYio0CgNV907ntAVGsM/view?usp=sharing) |
| **Objetivo do Teste** | Verificar se o usuário consegue acessar a aplicação ao preencher corretamente os dados de login. |
| **Procedimentos** | - Clicar em "Entrar" <br> - Selecionar o papel "Profissional" ou "Cliente" <br> - Preencher os campos "E-mail" e "Senha" utilizando dados válidos e já cadastrados na aplicação <br> - Clicar em "Entrar" |
| **Resultado Esperado** | O login é bem-sucedido quando o usuário digita e-mail e senha válidos e possui cadastro ativo na aplicação; o usuário é redirecionado pala a tela "Home" referente ao papel selecionado. |
| **Avaliação** | O sistema apresenta menu para seleção de papeis; valida se o e-mail foi encontrado no banco; apresenta mensagens de erro quando o usuário não é encontrado; o sistema redireciona para a "Home" de acordo com o papel selecionado; o sistema busca e valida, através da API, usuários já cadastrados na aplicação. |

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
| Registro de evidência | [CT-09](https://drive.google.com/file/d/1UtqOwfURUqnmXf2ykLoGJ0LyVaDShTlB/view?usp=sharing) |
| Objetivo do Teste     | Verificar se o sistema bloqueia criação de pedido sem profissional selecionado.                                          |
| Procedimentos         | - Fazer login como cliente <br> - Selecionar profissional <br> - Clicar em "Realizar pedido" na tela "Perfil do profissional" <br> - Verificar que, no formulário de pedido, o profissional já é previamente selecionaod pelo sistema  |
| Resultado Esperado    | O sistema permite apenas criação de pedido a partir da seleção do profissional desejado.         |
| Avaliação             | O sistema apresenta o fluxo correto: Perfil profissional >> Realizar pedido, de forma que não é possível realizar um pedido sem que antes seja selecionado o profissional desejado para a execução do serviço. |

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
| Registro de evidência | [CT-11](https://drive.google.com/file/d/1rmLb9YdrwqFxzdejm4TcpTpE0n-Z6bfB/view?usp=sharing) |
| Objetivo do Teste     | Verificar se o cliente é capaz de criar pedido incluindo todos os dados obrigatórios e opcionais.                                                                                    |
| Procedimentos         | - Estar autenticado como cliente <br> - Selecionar profissional <br> - Clicar em "Realizar pedido" no perfil do profissional <br> - Selecionar data e horário de acordo com a disponibilidade do profissional <br> - Preencher os demais dados obrigatórios do formulário <br> - Enviar pedido |
| Resultado Esperado    | Pedido criado com sucesso, contendo data e horário, descrição e localização; o usuário é redirecionado para a tela "Meus pedidos". |
| Avaliação             | A aplicação apresenta formulário a ser preenchido contendo todos os dados necessários para o cadastro de um novo pedido. O sistema não permite cadastrar fotos ao criar pedido. O usuário é capaz de criar um pedido sem impedimentos do sistema, ao finalizar recebe um aviso e é redirecionado corretamente; o profissional selecionado é notificado sobre a criação de um novo pedido. |

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
| Registro de evidência | [CT-16](https://drive.google.com/file/d/1wEt-_GI-7QowEC_AambdZq30H2yIEkf7/view?usp=sharing) |
| Objetivo do Teste     | Verificar se cliente consegue cancelar pedido nos status Criado e Aceito, e que cancelamento não é permitido após iniciar serviço.                          |
| Procedimentos         | - Estar autenticado como cliente <br> - Navegar até a lista de pedidos <br> - Clicar em um pedido e acessar a tela "Detalhes do pedido" <br> - Clicar em "cancelar" para cancelar pedido com status "criado" ou "aceito" |
| Resultado Esperado    | Cancelamento ocorre apenas nos status permitidos e sistema impede cancelamento após começar execução.                                                       |
| Avaliação             | O sistema permite cancelamento do pedido por parte do cliente; o sistema não verifica o status antes de efetuar cancelamento. |

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
| Registro de evidência | [CT-18](https://drive.google.com/file/d/1d2mmrGyXlijjqvjk9aIq4sNnBICR0MOB/view?usp=sharing) |
| Objetivo do Teste     | Verificar se cliente consegue favoritar e acessar lista de profissionais favoritos.                                                                |
| Procedimentos         | - Fazer login como cliente <br> - Navegar até o perfil do profissional <br> - Clicar no ícone "♡" para adicionar o profissional à sua lista de favoritos <br> - Acessar lista de favoritos clicando no ícone "♡" na barra de navegação |
| Resultado Esperado    | Profissionais são adicionados e listados corretamente na área de favoritos do cliente.                                                             |
| Avaliação             | O cliente é capaz de favoritar um profissional através da tela "Perfil do profissional"; o profissional adicionado à lista de favoritos é exibido corretamente na tela "Favoritos". |

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
Os testes realizados cobrem de forma ampla os fluxos principais da aplicação, incluindo criação e gerenciamento de pedidos, controle de agenda, filtros, favoritos, avaliação e recursos de geolocalização e notificações, complementando os testes iniciais de cadastro e login. Esses testes reforçam a validação do fluxo ponta a ponta, tanto para o cliente quanto para o profissional, e evidenciam pontos fortes e fragilidades que orientam as próximas iterações de desenvolvimento.

### Resultados Obtidos
Os casos de teste CT09 a CT23 permitiram validar fluxos completos de uso, desde a seleção do profissional até a criação, acompanhamento, cancelamento e conclusão de pedidos, incluindo funcionalidades de suporte como favoritos, filtros, agenda e avaliação. Foi possível comprovar que o fluxo de criação de pedidos, a navegação entre telas relacionadas (perfil do profissional, pedidos, favoritos) e a diferenciação de funcionalidades por papel (cliente/profissional) estão alinhados com os requisitos funcionais planejados.​

Verificou-se também que parte dos requisitos mais avançados, como filtros por disponibilidade, portfólio de fotos, notificações locais, histórico resumido no perfil e abertura de rotas no app de mapas, ainda se encontra em estágio parcial ou não implementado, o que limita a experiência completa desejada, embora o fluxo básico de contratação e acompanhamento já esteja funcional.

### Pontos Fortes
- O fluxo de criação de pedidos, a partir da seleção prévia do profissional (CT09, CT11), está coerente com o objetivo de evitar pedidos genéricos, reforçando a clareza do processo para o cliente e reduzindo ambiguidades na alocação do serviço.​

- A funcionalidade de favoritos (CT18) funciona conforme o esperado, permitindo que clientes mantenham uma lista de profissionais preferidos e facilitando a recontratação, o que agrega valor recorrente ao uso da aplicação.​

- A integração entre papéis e listagem de pedidos (CT15) contribui para uma visão organizada dos serviços para clientes e profissionais, apoiando o acompanhamento do ciclo de vida do pedido de forma segmentada por status.

### Fragilidades Identificadas
- A criação de pedido (CT11) não permite anexar fotos, apesar do requisito prever até três imagens, o que reduz a capacidade de detalhar o serviço solicitado e pode aumentar dúvidas na execução por parte do profissional.​

- O cancelamento de pedidos (CT16) está disponível para o cliente, porém sem validação adequada do status, permitindo cancelamentos mesmo após o início da execução, o que conflita diretamente com o requisito e pode gerar conflitos operacionais e financeiros.​

- Funcionalidades como manutenção de sessão e logout, filtros avançados (disponibilidade, categorias na Home, localização), agenda do profissional, portfólio, histórico resumido e notificações locais (CT03, CT04, CT05, CT06, CT07, CT08, CT10, CT12, CT13, CT14, CT17, CT19, CT20, CT21, CT22, CT23) ainda não tiveram avaliação registrada ou apresentam implementação parcial, dificultando a confirmação da experiência final planejada.

### Impacto das Falhas
As limitações na anexação de fotos ao pedido reduzem a precisão das informações compartilhadas entre cliente e profissional, podendo resultar em retrabalho, orçamentos imprecisos ou insatisfação com o serviço entregue. A ausência de bloqueio correto no fluxo de cancelamento após início da execução compromete a previsibilidade do processo de prestação de serviços e pode afetar a confiança dos profissionais na plataforma.

A falta de implementação ou de evidências de teste em recursos ligados à geolocalização, agenda, filtros por disponibilidade, histórico e notificações locais impacta a proposta de valor do sistema, que depende fortemente de conveniência, proximidade e acompanhamento em tempo real. Sem esses mecanismos, a experiência fica mais manual e menos alinhada às boas práticas de usabilidade e qualidade de serviço em aplicativos de intermediação de serviços.

### Estratégias para Correção e Aperfeiçoamento
O grupo pretende atuar nas próximas iterações para:

- Ajustar o fluxo de criação de pedidos para atender integralmente o requisito RF-011, incluindo o envio e tratamento de até três fotos, com validações de tamanho e formato para preservar desempenho e segurança.​

- Implementar a regra de negócio de cancelamento condicionada ao status do pedido, garantindo que apenas pedidos nos estados permitidos (Criado, Aceito) possam ser cancelados pelo cliente, e registrando corretamente os motivos de cancelamento para análise posterior.​

- Evoluir as funcionalidades dependentes de localização (CT07, CT08, CT10, CT22), agenda (CT17), histórico e portfólio (CT20, CT21) e notificações locais (CT23), priorizando a implementação incremental com novos ciclos de teste para consolidar a experiência planejada.​

- Formalizar mais registros de evidência (vídeo ou captura de tela) para os casos de teste ainda sem documentação, alinhando a prática com recomendações de documentação clara e rastreável em processos de teste.

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
