-- Creating Primary Key constraints.
ALTER TABLE `Cliente` ADD CONSTRAINT PK_Cliente PRIMARY KEY (`usuario_id`);
ALTER TABLE `Contratacao` ADD CONSTRAINT PK_Contratacao PRIMARY KEY (`servico_id`, `cliente_id`, `profissional_id`);
ALTER TABLE `Favorito` ADD CONSTRAINT PK_Favorito PRIMARY KEY (`cliente_id`, `profissional_favorito_id`);
ALTER TABLE `Notificacao` ADD CONSTRAINT PK_Notificacao PRIMARY KEY (`id`);
ALTER TABLE `Portfolio` ADD CONSTRAINT PK_Portfolio PRIMARY KEY (`id`, `profissional_id`, `arquivo_id`);
ALTER TABLE `Profissional` ADD CONSTRAINT PK_Profissional PRIMARY KEY (`usuario_id`);
ALTER TABLE `Servico` ADD CONSTRAINT PK_Servico PRIMARY KEY (`id`);
ALTER TABLE `Usuario` ADD CONSTRAINT PK_Usuario PRIMARY KEY (`id`);

-- Setting Auto Increment fields.
ALTER TABLE `Notificacao` MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `Portfolio` MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `Servico` MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `Usuario` MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;

-- Creating Foreign Key constraints.
ALTER TABLE `Cliente` ADD CONSTRAINT FK_Cliente_Usuario FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`);

ALTER TABLE `Contratacao` ADD CONSTRAINT FK_Contratacao_Servico FOREIGN KEY (`servico_id`) REFERENCES `Servico` (`id`);
ALTER TABLE `Contratacao` ADD CONSTRAINT FK_Contratacao_Cliente FOREIGN KEY (`cliente_id`) REFERENCES `Cliente` (`usuario_id`);
ALTER TABLE `Contratacao` ADD CONSTRAINT FK_Contratacao_Profissional FOREIGN KEY (`profissional_id`) REFERENCES `Profissional` (`usuario_id`);

ALTER TABLE `Favorito` ADD CONSTRAINT FK_Favorito_Cliente FOREIGN KEY (`cliente_id`) REFERENCES `Cliente` (`usuario_id`);
ALTER TABLE `Favorito` ADD CONSTRAINT FK_Favorito_Profissional FOREIGN KEY (`profissional_favorito_id`) REFERENCES `Profissional` (`usuario_id`);

ALTER TABLE `Notificacao` ADD CONSTRAINT FK_Notificacao_Cliente FOREIGN KEY (`cliente_id`) REFERENCES `Cliente` (`usuario_id`);

ALTER TABLE `Portfolio` ADD CONSTRAINT FK_Portfolio_Profissional FOREIGN KEY (`profissional_id`) REFERENCES `Profissional` (`usuario_id`);

ALTER TABLE `Profissional` ADD CONSTRAINT FK_Profissional_Usuario FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`);

ALTER TABLE `Servico` ADD CONSTRAINT FK_Servico_Cliente FOREIGN KEY (`cliente_id`) REFERENCES `Cliente` (`usuario_id`);
ALTER TABLE `Servico` ADD CONSTRAINT FK_Servico_Avaliador FOREIGN KEY (`avaliador_id`) REFERENCES `Cliente` (`usuario_id`);
