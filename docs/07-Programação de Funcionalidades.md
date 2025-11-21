# Programação de Funcionalidades

Este documento descreve o plano completo de implementação do aplicativo mobile **Mão na Massa** (MVP Android), incluindo:

- Detalhamento das funcionalidades e requisitos abordados;
- Relacionamento detalhado entre requisitos, telas, endpoints e entidades do domínio;
- Critérios de aceite, rastreabilidade, incrementos de entrega e cenários de validação;
- Tabela completa de mapeamento Requisito ↔ Artefato de código.

***

## 1. Visão Geral do Produto (recorte do MVP)

Fluxo central do app:
Cadastro/Login → Escolha de Papel → Busca por Proximidade/Categoria → Seleção de Profissional → Criação do Pedido → Acompanhamento do Pedido (Status: Criado, Aceito, Em Andamento, Concluído ou Cancelado) → Avaliação.

No MVP, o pedido é sempre vinculado a um profissional previamente selecionado.

***

## 2. Mapa de Implementação (RF → Telas → Endpoints → Entidades)

| Requisito Funcional            |    Funcionalidade                       | Telas e Fluxos (Mobile)           |         Endpoints/API                 | Entidades (DER/Modelo Físico)     |
|-------------------------------|-----------------------------------------|-----------------------------------|---------------------------------------|-----------------------------------|
| RF-001                        | Cadastro de usuário                     | Tela de Cadastro                  | POST /users                           | Usuario                           |
| RF-002                        | Login                                   | Tela de Login                     | POST /login                           | Usuario                           |
| RF-003                        | Sessão/Logout                           | Splash, Minha Conta               | GET /users/me, POST /logout           | Usuario                           |
| RF-004                        | Editar perfil                           | Perfil / Editar Perfil            | PUT /users/{id}                       | Usuario                           |
| RF-005                        | Seleção de papel                        | Primeira Execução / Configuração  | PUT /users/{id}/role                  | Usuario                           |
| RF-006                        | Perfil do profissional                  | Editar Perfil Profissional        | GET/PUT /professional/{id}            | Profissional, Categoria           |
| RF-007                        | Captura de localização                  | Splash, Home                      | Mobile/local                          | —                                 |
| RF-008                        | Listar profissionais por proximidade    | Home (Lista, Filtro)              | GET /professional?lat&lon&cat         | Profissional, Categoria           |
| RF-009                        | Selecionar profissional                 | Detalhe Profissional              | — (seleção UI)                        | —                                 |
| RF-010                        | Abrir rotas externas                    | Ação de Rotas                     | Intent nativo                         | —                                 |
| RF-011                        | Criar pedido vinculado                  | Formulário Pedido                 | POST /contratacao                     | Contratacao, Fotos                |
| RF-012                        | Acompanhar Status Pedido                | Detalhe Pedido                    | GET /contratacao, PATCH /contratacao  | Contratacao                       |
| RF-013                        | Listar pedidos                          | Histórico / Solicitações          | GET /contratacao?cliente_id=          | Contratacao                       |
| RF-014                        | Avaliar profissional                    | Tela de Avaliação                 | POST /avaliacao                       | Avaliacao                         |
| RF-015                        | Cancelar pedido                         | Detalhe Pedido                    | PATCH /contratacao/{id}               | Contratacao                       |
| RF-016                        | Gerenciar dias/horários de atendimento  | Agenda Profissional               | PUT /professional/{id}/agenda         | Profissional/agendas              |
| RF-017                        | Favoritar profissional                  | Favoritos, Perfil Profissional    | POST /favorito, GET /favorito         | Favorito                          |
| RF-018                        | Listar/filtros de categorias            | Home, Chips/Tags                  | GET /servico, GET /categories         | Categoria, Servico                |
| RF-019                        | Histórico de atendimentos/contratos     | Histórico/Perfil Profissional     | GET /contratacao?profissional_id=     | Contratacao                       |
| RF-020                        | Portfólio                               | Portfólio Profissional            | GET/POST /portfolio                   | Portfolio                         |
| RF-021                        | Notificações                            | Notificações                      | POST /notificacao, GET /notificacao   | Notificacao                       |
| RF-022                        | Filtros por disponibilidade             | Busca Avançada                    | GET /professional?availableAt=        | Profissional, agendas             |

***

## 3. Estruturas de Dados Detalhadas

- **Usuario**: id, nome, telefone, email, senha (hash), role, foto, createdAt
- **Profissional**: usuario_id, biografia, categorias[], faixa_preco, avaliacao_media, agenda
- **Cliente**: usuario_id
- **Pedido/Contratacao**: id, servico_id, cliente_id, profissional_id, preco, status, descricao, fotos[], localizacao, data_criacao
- **Servico**: id, nome, categoria, descricao, cliente_id, avaliador_id, nota, comentario
- **Portfolio**: id, profissional_id, arquivo_blob/url, descricao, data_criacao
- **Avaliacao**: id, pedido_id, nota, comentario
- **Favorito**: cliente_id, profissional_favorito_id, data_criacao
- **Notificacao**: id, cliente_id, mensagem, data_criacao, foi_lida

***

## 4. Critérios de Aceite

- Fluxo completo funciona ponta-a-ponta (UI → backend).
- Validações obrigatórias implementadas em todos os campos.
- Mudanças persistem e são refletidas nas rotas de API e banco.
- Perfis e permissões respeitados.
- Logs e feedback exibidos de forma clara.
- Funcionamento validado com testes manuais, exploratórios e automatizados onde aplicável.

***

## 5. Rastreabilidade: Tabela Completa de Requisitos ↔ Artefatos de Código

| Requisito Funcional                | Página/Tela Mobile                           | Componente/Serviço JS/TS           | API Endpoint/REST            | Entidade/Model (backend/db)         | Observações                                               |
|------------------------------------|----------------------------------------------|-------------------------------------|------------------------------|-------------------------------------|----------------------------------------------------------|
| RF-001 Cadastro                    | pages/auth/SignUp.js                         | services/auth.js                    | POST /users                  | Usuario                             | Includes validação de senha e mensagem de sucesso         |
| RF-002 Login                       | pages/auth/Login.js                          | services/auth.js                    | POST /login                  | Usuario                             | Autenticação JWT, erro retorna feedback                  |
| RF-003 Sessão/Logout               | pages/Splash.js, pages/Account.js            | services/auth.js                    | GET /users/me, POST /logout  | Usuario                             | Checa sessionStorage e role on load                       |
| RF-004 Editar Perfil               | pages/profile/EditProfile.js                 | services/auth.js                    | PUT /users/{id}              | Usuario                             | Compressão de imagem, update parcial                      |
| RF-005 Seleção de papel            | pages/welcome/SelectRole.js                  | store/user.js, hooks/useRole.js     | PUT /users/{id}/role         | Usuario                             | Role salvaguarda fluxo do app                              |
| RF-006 Perfil Profissional         | pages/professional/Edit.js                   | store/professional.js               | PUT /professional/{id}       | Profissional, Categoria             | Bio, categoria, faixa_preco replicadas                     |
| RF-007 Captura Localização         | components/LocationPicker.js                 | expo-location, hooks/useLocation.js | — (native API)               | —                                   | Indisponível sem permissão                                 |
| RF-008 Listar Profissionais        | pages/Home.js, components/ProfessionalCard.js| services/professional.js            | GET /professional            | Profissional, Categoria             | Filtros de categoria e proximidade                         |
| RF-009 Selecionar Profissional     | DetalhePro.js, components/SelectProf.js      | store/request.js                    | — (UI local)                 | —                                   | Bloqueio de prosseguir sem seleção                        |
| RF-010 Abrir rotas externas        | components/MapOpener.js                      | Linking API/Intent                  | — (mobile intent)            | —                                   | Chama app nativo do mapa                                   |
| RF-011 Criar Pedido                | pages/request/New.js                         | services/request.js                 | POST /contratacao            | Contratacao, Fotos                  | Upload multipart, limite de fotos                          |
| RF-012 Fluxo Status Pedido         | pages/request/Detail.js                      | store/request.js                    | PATCH /contratacao/{id}      | Contratacao                         | Validação de transições                                   |
| RF-013 Listar Pedidos              | pages/request/List.js                        | services/request.js                 | GET /contratacao             | Contratacao                         | Histórico separado por papel                               |
| RF-014 Avaliar Profissional        | pages/review/Index.js                        | services/review.js                  | POST /avaliacao              | Avaliacao                           | Só quando status = concluído                               |
| RF-015 Cancelar Pedido             | pages/request/Detail.js                      | store/request.js                    | PATCH /contratacao/{id}      | Contratacao                         | Apenas pelo solicitante até “Em andamento”                 |
| RF-016 Agenda Profissional         | prof/EditAgenda.js, prof/Config.js           | store/professional.js               | PUT /professional/{id}/agenda| Profissional/agendas                | Dias/horários padrão + customizados                        |
| RF-017 Favoritar Profissional      | components/FavoriteButton.js                 | services/favorite.js                | POST /favorito, GET /favorito| Favorito                            | Permite toggle e consulta rápida                           |
| RF-018 Listar Categorias           | pages/Home.js, components/Categories.js      | services/category.js                 | GET /servico, GET /categories| Categoria, Servico                  | Chips/tags e busca textual                                 |
| RF-019 Histórico Atendimentos      | prof/History.js, client/History.js           | services/request.js                 | GET /contratacao             | Contratacao                         | Inclusivo por papel                                        |
| RF-020 Portfólio                   | prof/Portfolio.js, prof/PortfolioEdit.js     | services/portfolio.js               | POST /portfolio, GET /portfolio| Portfolio                         | Upload multipart, preview                                  |
| RF-021 Notificações                | components/NotificationBanner.js             | services/notification.js            | POST /notificacao, GET /notificacao | Notificacao                      | Push/local notification                                     |
| RF-022 Dispo por Agenda/Status     | Home.js, FilterProf.js, Calendar.js          | hooks/useAvailability.js            | GET /professional?availableAt=| Profissional/agendas                | Busca por disponibilidade                                  |

***

## 6. Incrementos e Entregas do MVP

1. **Fundacional**: Cadastro, login, perfil, escolha de papel.
2. **Descoberta**: Localização, busca de profissionais, categorias, perfil detalhado.
3. **Pedido**: Seleção, formulário, upload, acompanhamento completo.
4. **Execução & Valor Adicionado**: Status do pedido, avaliação, favoritos, agenda, portfólio, notificações, filtros avançados.

***

## 7. Cenários de Verificação

- Cenário completo: cliente realiza busca, seleciona profissional, faz pedido, recebe status, avalia.
- Cenário negativo: tentativas de operação fora do papel, uploads errados, login falho, permissões negadas.

***

## 8. Requisitos Não Funcionais e Qualidade

- App responsivo, leve e performático, TTI ≤ 3s.
- Uploads até 2MB, compressão WebP.
- Tokens/jwt, senha hash.
- TLS obrigatório.
- Consentimento LGPD e política de privacidade clara.
- Logs ativos no backend.
- Feedbacks para todas ações críticas.

***

## 9. Ambiente e Contas de Teste

**API:** https://maonamassa-api.onrender.com  
**Docs:** https://api-docs-lemon-nu.vercel.app  
**Demo health:** GET /health  

**Contas:**  
Cliente: cliente.teste@maonamassa.com / Senha@123  
Profissional: prof.teste@maonamassa.com / Senha@123

***
