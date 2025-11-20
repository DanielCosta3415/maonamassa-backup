# Plano de Testes de Software

Para garantir a qualidade e confiabilidade da aplicação, o plano de testes foi elaborado com foco nos principais fluxos e funcionalidades críticos que impactam diretamente a experiência do usuário e a segurança dos dados. A escolha dos testes considerou os requisitos funcionais essenciais para o funcionamento do sistema, priorizando cenários que validam o acesso inicial, cadastro, login e onboarding, pois essas etapas constituem a porta de entrada do usuário no aplicativo e moldam sua primeira impressão.

Os critérios adotados para a seleção dos casos de teste levaram em conta a relevância dos requisitos para o funcionamento pleno do app, a complexidade das funcionalidades, o risco associado a falhas e a frequência de uso esperada. Além disso, buscou-se cobrir tanto cenários positivos — que confirmam o funcionamento correto das funções — quanto aspectos relacionados à validação dos dados inseridos, como preenchimento obrigatório e formatos válidos, garantindo assim robustez e segurança.

Essa abordagem orientada por riscos e prioridades assegura que o esforço de testes seja direcionado para as áreas mais críticas e representa a base para validar a qualidade do MVP desenvolvido. Consequentemente, os testes apoiam a entrega de uma aplicação estável, usável e aderente aos objetivos do projeto.
 
| **Caso de Teste** 	| **CT01 – Página de cadastro** 	|
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-001 - A aplicação deve permitir o cadastro de novos usuários mediante o preenchimento obrigatório de nome, e-mail, perfil (profissional ou cliente) e senha. |
| **Objetivo do Teste** 	| Verificar se o usuário consegue realizar o cadastro corretamente na aplicação. |
| **Passos** 	| - Acessar o app através do link [MaoNaMassaFinal - Snack](https://snack.expo.dev/@lorenammp/maonamassafinal) <br> - Clicar em "Cadastro" <br> - Preencher os campos "Nome", "E-mail", "Perfil" (selecionando Profissional ou Cliente) e "Senha" <br> - Clicar em "Cadastrar" |
| **Critério de Êxito** | O cadastro é concluído com sucesso após o preenchimento de todos os campos obrigatórios, incluindo um e-mail válido. |

---

| **Caso de Teste** 	| **CT02 – Página de login** 	|
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-002 - A aplicação deve permitir que um usuário previamente cadastrado realize login selecionando seu papel na aplicação (profissional ou cliente). |
| **Objetivo do Teste** 	| Verificar se o usuário consegue acessar a aplicação ao preencher corretamente os dados de login. |
| **Passos** 	| - Acessar o app através do link [MaoNaMassaFinal - Snack](https://snack.expo.dev/@lorenammp/maonamassafinal) <br> - Clicar em "Login" <br> - Preencher os campos "E-mail" e "Senha" <br> - Selecionar o papel "Profissional" ou "Cliente" <br> - Clicar em "Entrar" |
| **Critério de Êxito** | O login é bem-sucedido quando o usuário digita um e-mail válido e possui cadastro ativo na aplicação. |

---

| **Caso de Teste** 	| **CT03 – Manter sessão e logout** 	|
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|	**Requisito Associado** 	| RF-003 - A aplicação deve manter a sessão do usuário e permitir o logout.                                                                                       |
| **Objetivo do Teste** 	| Verificar se a sessão do usuário é mantida após o login e se o logout encerra corretamente a sessão.                                                            |
| **Passos** 	| - Realizar login com usuário válido <br> - Navegar pela aplicação verificando continuidade da sessão <br> - Clicar em "Logout" <br> - Tentar acessar áreas restritas sem login |
| **Critério de Êxito** | Sessão deve permanecer ativa durante navegação e logout encerra a sessão, bloqueando o acesso às áreas restritas.                                                     |

---

| Caso de Teste       | CT04 – Editar perfil do usuário                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-004 - A aplicação deve permitir aos usuários (cliente/profissional) editar perfil, incluindo nome, foto, telefone e e-mail.                                            |
| Objetivo do Teste   | Verificar se o usuário consegue editar e salvar as informações do seu perfil.                                                         |
| Passos              | - Fazer login <br> - Navegar até a página de edição de perfil <br> - Modificar campos "Nome", "Foto", "Telefone" e "E-mail" <br> - Salvar alterações |
| Critério de Êxito   | As alterações são salvas e exibidas corretamente no perfil do usuário.                                                                |

---

| Caso de Teste       | CT05 – Selecionar papel do usuário                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-005 - A aplicação deve permitir que o usuário selecione seu papel ao realizar seu cadastro (Cliente, Profissional ou Ambos).                                                     |
| Objetivo do Teste   | Verificar se o usuário consegue selecionar e alternar entre os papéis na aplicação.                                                                        |
| Passos              | - Fazer login <br>- Acessar configuração de perfil ou seleção de papel <br>- Selecionar ou alterar o papel para Cliente, Profissional ou Ambos <br>- Confirmar seleção |
| Critério de Êxito   | O papel é salvo e as funcionalidades e telas correspondentes são apresentadas conforme o papel selecionado.                                                |

---

| Caso de Teste       | CT06 – Perfil do profissional                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-006 - A aplicação deve exibir o perfil do profissional com categorias, biografia, preço de referência e demais informações relevantes.                      |
| Objetivo do Teste   | Verificar se o perfil do profissional é exibido corretamente com todas as informações obrigatórias.                       |
| Passos              | - Fazer login como cliente <br>- Navegar até a listagem de profissionais <br>- Selecionar um profissional e visualizar seu perfil |
| Critério de Êxito   | O perfil do profissional é exibido com categorias, biografia e preço de referência corretamente apresentados.             |

---

| Caso de Teste       | CT07 – Capturar localização do cliente                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Requisito Associado | RF-007 - A aplicação deve capturar a localização do cliente com consentimento para ordenar profissionais por proximidade.                                                |
| Objetivo do Teste   | Verificar se a aplicação solicita permissão para localização e ordena os profissionais por proximidade corretamente.                                                     |
| Passos              | - Abrir o app como cliente pela primeira vez <br>- Permitir ou negar permissão de localização <br>- Verificar ordem da listagem de profissionais                                 |
| Critério de Êxito   | Se a permissão for concedida, os profissionais são listados por proximidade; se negada, a aplicação informa a ausência do recurso e lista sem ordenação por proximidade. |

---

| Caso de Teste       | CT08 – Listar profissionais próximos por categoria                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-008 - A aplicação deve listar profissionais próximos com filtro por categoria.                                                                                           |
| Objetivo do Teste   | Verificar se o filtro por categoria funciona e lista profissionais próximos corretamente.                                                                                   |
| Passos              | - Fazer login como cliente <br>- Na tela de listagem de profissionais, aplicar filtro por categoria <br>- Verificar se a lista mostra profissionais apenas da categoria selecionada |
| Critério de Êxito   | A listagem exibe apenas profissionais da categoria escolhida, ordenados por proximidade se a permissão de localização foi concedida.                                        |

---

| Caso de Teste       | CT09 – Selecionar profissional antes de criar pedido                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-009 - A aplicação deve obrigar o cliente a selecionar um profissional antes de criar um pedido para evitar pedidos genéricos. |
| Objetivo do Teste   | Verificar se o sistema impede criação de pedido sem seleção de profissional.                                                     |
| Passos              | - Fazer login como cliente <br>- Tentar criar um pedido sem selecionar um profissional <br>- Selecionar um profissional e criar o pedido |
| Critério de Êxito   | O sistema bloqueia a criação de pedido sem profissional selecionado e permite criar pedido somente após a seleção válida.        |

---

| Caso de Teste       | CT10 – Abrir rotas no app de mapas                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-010 - A aplicação deve permitir aos usuários abrir rotas no aplicativo de mapas do dispositivo do usuário via deep link.                            |
| Objetivo do Teste   | Verificar se o cliente consegue abrir a rota até o local do serviço no app de mapas do dispositivo.                     |
| Passos              | - Fazer login como cliente <br>- Selecionar um pedido em andamento <br>- Clicar em opção para abrir rota no app de mapas nativo |
| Critério de Êxito   | O app de mapas é aberto com a rota correta até o endereço do serviço.                                                   |

---

| Caso de Teste       | CT11 – Criar pedido com descrição, fotos e localização                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-011 - A aplicação deve permitir aos usuários clientes, criar pedido contendo descrição, imagens e endereço referente à localização.                                                                               |
| Objetivo do Teste   | Verificar se o cliente consegue criar um pedido incluindo todos os dados obrigatórios e opcionais.                                                                               |
| Passos              | - Estar autenticado como cliente <br>- Selecionar profissional <br>- Preencher descrição do serviço <br>- Adicionar até 3 fotos da câmera ou galeria <br>- Confirmar localização <br>- Enviar pedido |
| Critério de Êxito   | Pedido é criado com sucesso, contendo descrição, fotos e localização.                                                                                                            |

---

| Caso de Teste       | CT12 – Fluxo de status do pedido                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-012 - A aplicação deve gerenciar fluxo de status do pedido: Criado, Aceito, Em Andamento, Concluído e Cancelado.                                  |
| Objetivo do Teste   | Verificar se o status do pedido segue corretamente o ciclo de vida esperado.                                                                         |
| Passos              | - Criar pedido <br>- Aceitar pedido como profissional <br>- Atualizar status para Em Andamento <br>- Concluir pedido <br>- Testar cancelamento em estados permitidos |
| Critério de Êxito   | Status do pedido é atualizado corretamente e fluxos de cancelamento respeitados.                                                                     |

---

| Caso de Teste       | CT13 – Atualização pull-to-refresh de status                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-013 - A aplicação deve atualizar status do pedido via pull-to-refresh sem usar push externo.               |
| Objetivo do Teste   | Verificar se o usuário consegue atualizar manualmente a visualização do status do pedido.                     |
| Passos              | - Navegar até tela de acompanhamento do pedido <br>- Puxar para atualizar a tela (pull-to-refresh) diversas vezes |
| Critério de Êxito   | O status exibido é atualizado com os dados mais recentes do servidor.                                         |

---

| Caso de Teste       | CT14 – Avaliar profissional no final do serviço                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-014 - A aplicação deve permitir ao cliente, avaliação do profissional com nota de 1 a 5 e comentário após a conclusão do pedido             |
| Objetivo do Teste   | Verificar se o cliente consegue avaliar o profissional após o término do serviço.                                         |
| Passos              | - Aguardar pedido finalizado <br>- Abrir tela de avaliação <br>- Selecionar nota de 1 a 5 <br>- Inserir comentário <br>- Enviar avaliação |
| Critério de Êxito   | Avaliação é salva e exibida no perfil do profissional.                                                                    |

---

| Caso de Teste       | CT15 – Listar pedidos por papel e status                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-015 - A aplicação deve permitir listar os pedidos filtrados por papel (cliente ou profissional) e status (aceito, em andamento e concluído).                                    |
| Objetivo do Teste   | Verificar se a listagem de pedidos exibe corretamente os pedidos filtrados pelo papel e status.                                     |
| Passos              | - Fazer login como cliente <br>- Consultar lista de pedidos por status <br>- Repetir como profissional <br>- Filtrar por cada status disponível |
| Critério de Êxito   | Pedidos são listados e filtrados corretamente conforme o papel e status selecionados.                                               |

---

| Caso de Teste       | CT16 – Cancelar pedido antes de iniciar execução                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-016 - A aplicação deve permitir cancelamento do pedido apenas antes de seu status ser alterado pelo profissional para "Em Andamento".                                                              |
| Objetivo do Teste   | Verificar se o cliente consegue cancelar pedido nos status Criado e Aceito, e que cancelamento não é permitido após iniciar serviço.                        |
| Passos              | - Criar pedido e cancelar no status Criado <br>- Criar pedido, aceitar profissional e cancelar no status Aceito <br>- Tentar cancelar pedido no status Em Andamento |
| Critério de Êxito   | Cancelamento ocorre apenas nos status permitidos e sistema impede cancelamento após começar execução.                                                       |

---

| Caso de Teste       | CT17 – Gerenciar agenda e disponibilidade do profissional                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Requisito Associado | RF-017 - A aplicação deve permitir ao profissional cadastrar, em uma agenda, dias e horários de disponibilidade para atendimento.                                   |
| Objetivo do Teste   | Verificar se o profissional consegue adicionar, editar e visualizar seus dias e horários disponíveis para atendimento.         |
| Passos              | - Login como profissional <br>- Acessar agenda <br>- Cadastrar dias e horários <br>- Editar disponibilidade <br>- Visualizar agenda atualizada |
| Critério de Êxito   | Agenda é salva e refletida corretamente na disponibilidade para clientes filtrarem.                                            |

---

| Caso de Teste       | CT18 – Favoritar profissionais                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-018 - A aplicação deve permitir que clientes adicionem profissionais à uma lista de favoritos para facilitar recontratação.                                |
| Objetivo do Teste   | Verificar se o cliente consegue favoritar e acessar a lista de profissionais favoritos.                                                            |
| Passos              | - Fazer login como cliente <br>- Navegar até perfil do profissional <br>- Clicar em "Favoritar" <br>- Acessar lista de favoritos para ver profissionais salvos |
| Critério de Êxito   | Profissionais são adicionados e listados corretamente na área de favoritos do cliente.                                                             |

---

| Caso de Teste       | CT19 – Categorias de serviços na Home                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-019 - A aplicação deve exibir uma lista categorias de serviços na página inicial do usuário cliente para facilitar navegação.            |
| Objetivo do Teste   | Verificar se as categorias aparecem corretamente na Home e permitem filtrar profissionais.                     |
| Passos              | - Abrir app autenticado <br>- Visualizar categorias na Home <br>- Selecionar uma categoria e observar a lista filtrada |
| Critério de Êxito   | Categorias são exibidas com clareza e o filtro funciona conforme a seleção na Home.                            |

---

| Caso de Teste       | CT20 – Histórico resumido no perfil                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-020 - A aplicação deve exibir histórico resumido no perfil do profissional, contendo quantidade de serviços concluídos, média de avaliações e valores cobrados por hora. |
| Objetivo do Teste   | Verificar se o perfil do profissional exibe corretamente o histórico resumo com os dados esperados.                                          |
| Passos              | - Acessar perfil do profissional <br>- Visualizar histórico resumido com quantidade de serviços e média de avaliações                            |
| Critério de Êxito   | Histórico aparece corretamente e corresponde aos dados reais de serviços e avaliações.                                                       |

---

| Caso de Teste       | CT21 – Portfólio de fotos fixo no perfil                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-021 - A aplicação deve permitir que profissionais adicionem e exibam fotos fixas de portfólio no perfil, referentes a projetos realizados anteriormente.                       |
| Objetivo do Teste   | Verificar se o profissional pode cadastrar fotos no portfólio e se elas são exibidas no perfil.                                   |
| Passos              | - Login como profissional <br>- Acessar área de portfólio <br>- Adicionar fotos fixas <br>- Salvar e visualizar perfil para conferir exibição |
| Critério de Êxito   | Fotos são salvas e exibidas no perfil do profissional corretamente.                                                               |

---

| Caso de Teste       | CT22 – Filtro por disponibilidade (dias/horários)                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-022 - A aplicação deve permitir que clientes filtrem profissionais por dias e horários disponíveis para realização dos serviços.                                             |
| Objetivo do Teste   | Verificar se o filtro por disponibilidade funciona e lista profissionais conforme a agenda cadastrada.                                             |
| Passos              | - Login como cliente <br>- Acessar filtro de disponibilidade <br>- Selecionar dias e horários desejados <br>- Verificar lista de profissionais correspondentes |
| Critério de Êxito   | Lista é filtrada corretamente com base nos dias/horários selecionados pelo cliente.                                                                |

---

| Caso de Teste       | CT23 – Notificações locais no app                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito Associado | RF-023 - A aplicação deve enviar notificações locais (badges, banners) para acompanhar mudanças de status enquanto o app está aberto.          |
| Objetivo do Teste   | Verificar se o usuário recebe notificações corretas de status de pedidos com app ativo.                                                        |
| Passos              | - Abrir app e fazer login <br>- Criar pedido ou aceitar pedido em outra instância <br>- Alterar status do pedido <br>- Observar notificações locais no app |
| Critério de Êxito   | Notificações são exibidas corretamente no app, indicando mudanças de status aos usuários ativamente utilizando o app.                          |


<!-- 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
-->
