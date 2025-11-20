# Metodologia

O desenvolvimento do projeto está sendo conduzido com base no **modelo ágil Scrum**, que possibilita entregas incrementais e comunicação constante entre os integrantes da equipe.  

Esse processo inclui:  
- **Reuniões semanais de acompanhamento**, que funcionam como dailys adaptadas, permitindo que cada membro relate o que já foi feito, o que está em andamento e possíveis impedimentos.  
- **Encontros periódicos com o professor orientador**, nos quais dúvidas técnicas e metodológicas são sanadas, decisões são validadas e o planejamento é ajustado conforme necessário.  
- **Gestão do fluxo de trabalho** por meio de um quadro **Kanban no GitHub Projects**, onde as tarefas são organizadas em “A Fazer”, “Em Progresso” e “Concluído”, permitindo transparência e clareza na definição de responsabilidades.  

A gestão do código-fonte é realizada através do **GitHub**, que assegura versionamento, histórico de alterações e colaboração em tempo real entre os membros.  

O ambiente de desenvolvimento é composto por ferramentas integradas que apoiam desde a escrita do código até o teste e validação de funcionalidades, proporcionando agilidade, controle e colaboração.  

---

## Relação de Ambientes de Trabalho

Os ambientes utilizados pela equipe estão organizados conforme suas finalidades, garantindo suporte às etapas de desenvolvimento, comunicação, modelagem, prototipagem e testes.  

|          **Ambiente**          |               **Plataforma/Ferramenta**              |                           **Propósito**                           |                             **Link de Acesso**                            |
|:------------------------------:|:----------------------------------------------------:|:-----------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| Repositório de Código e Kanban |               GitHub + GitHub Projects               |         Versionamento, PRs, issues e quadro Kanban do time        |                             https://github.com                            |
|       Runtime/CLI Mobile       |                  Expo CLI + Expo Go                  |  Executar o app RN no emulador/dispositivo (QR code), hot reload  |                              https://expo.dev                             |
|       Build/Distribuição       |                   EAS Build (Expo)                   | Gerar APK/AAB para testes internos e compartilhamento com a banca |                            https://expo.dev/eas                           |
|        Emulador Android        |               Android Studio (SDK/AVD)               |         Emulador Android, ferramentas de plataforma e ADB         |                    https://developer.android.com/studio                   |
|        Editor de Código        |                  Visual Studio Code                  |            Codificação, depuração e integração com Git            |                       https://code.visualstudio.com                       |
|            Debug RN            |            React Native Debugger / Flipper           |        Inspeção de rede, logs, layout e performance do app        | https://github.com/jhen0409/react-native-debugger / https://fbflipper.com |
|       Comunicação rápida       |                       WhatsApp                       |                     Mensagens rápidas e avisos                    |                          https://web.whatsapp.com                         |
|     Comunicação e reuniões     |                        Discord                       |              Reuniões de voz/vídeo e canais temáticos             |                            https://discord.com                            |
|       Prototipagem visual      |                     Figma / Canva                    |           Wireframes, fluxos e protótipos colaborativos           |                 https://figma.com / https://www.canva.com                 |
|     Modelagem de diagramas     |                        Draw.io                       |                  Diagramas de arquitetura e BPMN                  |                          https://app.diagrams.net                         |
|   Modelagem de banco de dados  | MySQL Workbench (ou ferramenta do serviço escolhido) |                  Modelagem e administração do BD                  |                      https://dev.mysql.com/workbench                      |
|          Testes de API         |                  Postman / Insomnia                  |           Criação e execução de testes de endpoints REST          |              https://www.postman.com / https://insomnia.rest              |
|        CI/CD (opcional)        |                    GitHub Actions                    |     Lint/build/checks automáticos e distribuição de artefatos     |                             https://github.com                            |

---

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

---

## Gerenciamento de Projeto

A equipe do projeto Mão na Massa adota a metodologia ágil Scrum por sua capacidade de promover entregas incrementais, adaptação contínua e colaboração. O produto a ser desenvolvido é um aplicativo mobile Android, construído com React Native + Expo (não há versão web no MVP). O processo privilegia ciclos curtos (sprints semanais), validação com o professor orientador e inspeção constante dos requisitos.

### Divisão de Papéis

|    **Papéis**    |                                                                                              **Membros**                                                                                              |                                                                                        **Responsabilidades**                                                                                        |
|:----------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|   Product Owner  |                                                                                      Hugo Cesar Ribeiro Caldeira                                                                                      | Maximizar valor do produto, priorizar backlog e garantir alinhamento do app às necessidades de Clientes e Profissionais (seleção de profissional antes do pedido, fluxo de status, avaliação etc.). |
|   Scrum Master   |                                                                                         Daniel Lopes da Costa                                                                                         |                               Facilitar cerimônias, remover impedimentos, zelar pelas práticas ágeis e pela cadência de sprints, apoiar o time a cumprir o DoD mobile.                              |
|  UX/UI Designer  |                                                                                    Lorena Marta Martiniana de Paula                                                                                   |                                               Prototipação mobile-first (Android), fluxos, acessibilidade básica, diretrizes de UI, handoff no Figma.                                               |
| Development Team | Alex Junio Aguilar Ferreira, Daniel Lopes da Costa, Hugo Cesar Ribeiro Caldeira, Lorena Marta Martiniana de Paula, Lukas Maciel Duarte, Pedro Henrique Ramos Coutinho, Tobias Quintao Bastos Domingos |                     Implementação do app mobile (React Native + Expo), serviços de API necessários ao MVP, testes em emulador/dispositivo, documentação e evidências (Expo/EAS).                    |

### Processo

- Cadência: sprints semanais; dailys adaptadas (check-in semanal); encontros com o professor para alinhamento/feedback.
- Kanban (GitHub Projects): A Fazer → Em Progresso → Em Review → Testando (Android) → Concluído.
- Definition of Ready (DoR): HU com critérios de aceite, RF/RNF vinculados, tela/serviço identificados e impacto em permissões (localização/câmera) mapeado.
- #### Definition of Done (DoD):
  - Build Android executa no emulador do Android Studio e em dispositivo físico (Expo Go ou APK de EAS Build);
  - TTI ≤ 3 s na Home (dispositivo de referência) e APK ≤ 80 MB;
  - Fluxos críticos do MVP funcionais: cadastro/login, seleção de profissional obrigatória, criação de pedido (até 3 fotos), status (Criado → Aceito → Em Andamento → Concluído/Cancelado), avaliação;
  - Permissões (localização/câmera/galeria) com mensagens claras e caminhos alternativos quando negadas;
  - Acessibilidade básica (texto escalável, contraste, rótulos);
  - Atualização por pull/auto-refresh (sem push externo);
  - Código revisado (PR aprovado), documentação atualizada e evidências anexadas (QR do Expo Go / link EAS).
- #### Cerimônias:
  - Planning: metas do sprint, critérios de aceite e riscos;
  - Review: demonstração com QR (Expo Go) ou APK (EAS Build);
  - Retrospective: melhoria contínua de fluxo, qualidade e previsibilidade.

#### Sprint 3
A distribuição de Tarefas para o Sprint 3 foi realizada considerando as habilidades e experiências individuais dos membros da equipe, visando otimizar a eficiência e a qualidade do trabalho. A seguir, temos a relação de membros e suas respectivas tarefas relacionadas ao desenvolvimento de telas do aplicativo móvel:

- **Alex Junio Aguilar Ferreira**: "Onboarding / Login", "Cadastro".
- **Daniel Lopes da Costa**: "Agenda do Profissional", "Editar Perfil (Usuário/Profissional)" e "Criar Pedido".
- **Hugo Cesar Ribeiro Caldeira**: "Lista de Pedidos (Profissional)", "Atualizar Pedido (Profissional)".
- **Lorena Marta Martiniana de Paula**: "Home (Cliente)", "Perfil do Profissional", "Criar Pedido".
- **Lukas Maciel Duarte**: "Lista de Pedidos (Cliente)", "Selecionar Profissional".
- **Pedro Henrique Ramos Coutinho**: "Detalhes do Pedido (Cliente)", "Favoritos", "Home (Profissional)".
- **Tobias Quintão Bastos Domingos**: "Login", "Avaliar o Profissional".

Ao final desta sprint, todas as telas foram desenvolvidas conforme o planejado, contribuindo significativamente para o progresso do projeto. A colaboração entre todos os membros foi importante para o sucesso das entregas, alguns dos membros relataram sua dificuldade abaixo:

- **Daniel Lopes da Costa**: Dificuldade em conciliar as tarefas da vida pessoal com acadêmica.
- **Tobias Quintão Bastos Domingos**: Dificuldade no desenvolvimento das telas, mas consegui avançar graças à ajuda dos outros membros da equipe.

### Ferramentas

- Runtime/CLI – Expo (Expo CLI + Expo Go): execução do app via QR, hot reload e testes rápidos em dispositivo/emulador.
- Build/Distribuição – EAS Build: geração de APK/AAB para testes internos e compartilhamento com a banca.
- Editor de Código – Visual Studio Code: desenvolvimento, lint e integração Git.
- Emulador – Android Studio (SDK/AVD): execução do app em diferentes perfis de dispositivo Android.
- Debug RN – React Native Debugger / Flipper: inspeção de rede, logs, layout e performance.
- Controle de Versão – GitHub: issues, PRs, code review e Kanban (Projects).
- Comunicação – WhatsApp/Discord: avisos rápidos e reuniões de voz/vídeo com canais temáticos.
- Prototipagem – Figma/Canva: wireframes, protótipos e handoff.
- Diagramas – Draw.io: BPMN/arquitetura.
- Banco de Dados – MySQL Workbench (ou ferramenta do serviço escolhido): modelagem/consulta.
- Testes de API – Postman/Insomnia: definição e validação de endpoints do MVP.
