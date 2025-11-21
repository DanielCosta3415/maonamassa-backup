-- Creating Unique Indexes.
CREATE UNIQUE INDEX `UNIQUE_Usuario_email` ON `Usuario` (`email` ASC);
CREATE UNIQUE INDEX `UNIQUE_Usuario_telefone` ON `Usuario` (`telefone` ASC);

-- Creating Other Indexes.
CREATE INDEX `IDX_FK_Contratacao_Servico` ON `Contratacao` (`servico_id` ASC);
CREATE INDEX `IDX_FK_Contratacao_Cliente` ON `Contratacao` (`cliente_id` ASC);
CREATE INDEX `IDX_FK_Contratacao_Profissional` ON `Contratacao` (`profissional_id` ASC);

CREATE INDEX `IDX_FK_Favorito_Cliente` ON `Favorito` (`cliente_id` ASC);
CREATE INDEX `IDX_FK_Favorito_Profissional` ON `Favorito` (`profissional_favorito_id` ASC);

CREATE INDEX `IDX_FK_Notificacao_Cliente` ON `Notificacao` (`cliente_id` ASC);

CREATE INDEX `IDX_FK_Portfolio_Profissional` ON `Portfolio` (`profissional_id` ASC);

CREATE INDEX `IDX_FK_Servico_Cliente` ON `Servico` (`cliente_id` ASC);
CREATE INDEX `IDX_FK_Servico_Avaliador` ON `Servico` (`avaliador_id` ASC);
