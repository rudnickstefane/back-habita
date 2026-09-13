-- Migration para inserir dados iniciais

-- Menus Academia
INSERT INTO "Menus" ("type", "name", "description", "path", "icon", "position")
VALUES
  ('GYM', 'Início', 'Página Inicial', 'Home', 'TbSmartHome', 1),
  ('GYM', 'Administrativo', 'Administrativo', 'Admin', 'MdOutlineAdminPanelSettings', 2),
  ('GYM', 'Financeiro', 'Financeiro', 'Finance', 'LuCircleDollarSign', 3),
  ('GYM', 'Integrações', 'Integrações', 'Integration', 'TbServerCog', 4),
  ('GYM', 'Relatórios', 'Relatórios', 'Dashboard', 'RxDashboard', 5),
  ('GYM', 'Programas', 'Programas', 'Programs', 'TbUserHeart', 6);

-- SubMenus Academia
INSERT INTO "SubMenus" ("menuCode", "name", "description", "path", "icon", "position")
VALUES
  ('2', 'Aplicativo', 'Aplicativo', 'Application', 'CiMobile3', 1),
  ('2', 'Alunos', 'Alunos', 'Students', 'PiIdentificationCardThin', 2),
  ('2', 'Turmas', 'Turmas', 'Classes', 'PiUsersThreeLight', 3),
  ('2', 'Frequências', 'Frequências', 'Frequencies', 'IoCalendarOutline', 4),
  ('2', 'Relacionamento', 'Relacionamento', 'Relationship', 'PiHandWavingThin', 5),
  ('2', 'Planos', 'Planos', 'Plans', 'PiCurrencyCircleDollarLight', 6),
  ('2', 'Produtos', 'Produtos', 'Products', 'MdOutlineProductionQuantityLimits', 7),
  ('2', 'Fornecedores', 'Fornecedores', 'Suppliers', 'LiaTruckLoadingSolid', 8),
  ('2', 'Nutricionistas', 'Fornecedores', 'Nutritionist', 'CiMedicalClipboard', 9),
  ('2', 'Personal Trainers', 'Fornecedores', 'Personal', 'PiPersonArmsSpreadThin', 10),
  ('2', 'Configurações', 'Configurações', 'Settings', 'PiGearSixLight', 11);

-- Menus Cross (completado)
INSERT INTO "Menus" ("type", "name", "description", "path", "icon", "position")
VALUES
  ('IFLEXFIT', 'Início', 'Página Inicial', 'Home', 'TbSmartHome', 1),
  ('IFLEXFIT', 'Administrativo', 'Administrativo', 'Admin', 'MdOutlineAdminPanelSettings', 2),
  ('IFLEXFIT', 'Financeiro', 'Financeiro', 'Finance', 'LuCircleDollarSign', 3);

-- SubMenus Cross
INSERT INTO "SubMenus" ("menuCode", "name", "description", "path", "icon", "position")
VALUES
  ('2', 'Relacionamento', 'Relacionamento', 'Relationship', 'PiHandWavingThin', 1),
  ('2', 'Planos', 'Planos', 'Plans', 'PiCurrencyCircleDollarLight', 2),
  ('2', 'Produtos', 'Produtos', 'Products', 'MdOutlineProductionQuantityLimits', 3),
  ('2', 'Fornecedores', 'Fornecedores', 'Suppliers', 'LiaTruckLoadingSolid', 4),
  ('2', 'Nutricionistas', 'Fornecedores', 'Nutritionist', 'CiMedicalClipboard', 5),
  ('2', 'Personal Trainers', 'Fornecedores', 'Personal', 'PiPersonArmsSpreadThin', 6),
  ('2', 'Configurações', 'Configurações', 'Settings', 'PiGearSixLight', 7);

INSERT INTO "Permissions" ("module","name","path","permission","createdAt","updatedAt","deletedAt")
VALUES
  ('FREE_PERIOD', 'Aplicativos', 'Applications', 'NONE'),
  ('FREE_PERIOD', 'Site da Academia', 'GymWeb', 'NONE'),
  ('FREE_PERIOD', 'Gestão de Produtos', 'Products', 'NONE'),
  ('FREE_PERIOD', 'Programas', 'Programs', 'NONE');

INSERT into "ReviewQuestions" ("question", "category", "status")
VALUES
  ('Quais são seus objetivos com relação a atividade física?', 'ANAMNESE', 'ACTIVE'),
  ('Pratica atividade física atualmente? Quais e há quanto tempo?', 'ANAMNESE', 'ACTIVE'),
  ('Realiza acompanhamento com Nutricionista ou Nutricionista Esportivo?', 'ANAMNESE', 'ACTIVE'),
  ('Qual seria sua média de horas de sono diário?', 'ANAMNESE', 'ACTIVE'),
  ('Utiliza algum tipo de medicamento de uso continuo? Qual?', 'ANAMNESE', 'ACTIVE'),
  ('Já passou por algum tipo de cirurgia nos últimos 6 meses? Qual?', 'ANAMNESE', 'ACTIVE'),
  ('Possui alguma recomendação ou restrição médica para prática de exercícios?', 'ANAMNESE', 'ACTIVE'),
  ('Possui Diabetes ou alguma outra doença?', 'ANAMNESE', 'ACTIVE'),
  ('Possui alguma alteração cardíaca? Qual?', 'ANAMNESE', 'ACTIVE'),
  ('Existem problemas cardíacos na família? Quem?', 'ANAMNESE', 'ACTIVE'),
  ('Sua pressão arterial é alta, baixa ou normal (12x8)?', 'ANAMNESE', 'ACTIVE'),
  ('Já sentiu ou sente dores no peito?', 'ANAMNESE', 'ACTIVE'),
  ('Sente dores no peito ao realizar alguma atividade física?', 'ANAMNESE', 'ACTIVE'),
  ('Sentiu ou sente dores na coluna constantes? Em qual região?', 'ANAMNESE', 'ACTIVE'),
  ('Já desmaiou alguma vez?', 'ANAMNESE', 'ACTIVE'),
  ('É fumante? Há quantos anos?', 'ANAMNESE', 'ACTIVE'),
  ('Toma algum tipo de esteroide anabólico?', 'ANAMNESE', 'ACTIVE'),
  ('Possui algum trauma ou lesão?', 'ANAMNESE', 'ACTIVE'),
  ('Observações', 'ANAMNESE', 'ACTIVE'),
  ('Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais?', 'PAR_Q', 'ACTIVE'),
  ('Você sente dores no peito quando pratica atividade física?', 'PAR_Q', 'ACTIVE'),
  ('No último mês, você sentiu dores no peito quando pratica atividade física?', 'PAR_Q', 'ACTIVE'),
  ('Você apresenta desequilíbrio devido a tontura e/ou perda de consciência?', 'PAR_Q', 'ACTIVE'),
  ('Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?', 'PAR_Q', 'ACTIVE'),
  ('Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?', 'PAR_Q', 'ACTIVE'),
  ('Sabe de alguma outra razão pela qual você não deve praticar atividade física?', 'PAR_Q', 'ACTIVE'),
  ('Pescoço', 'MEASURES', 'ACTIVE'),
  ('Ombro', 'MEASURES', 'ACTIVE'),
  ('Braço Relaxado Direito', 'MEASURES', 'ACTIVE'),
  ('Braço Relaxado Esquerdo', 'MEASURES', 'ACTIVE'),
  ('Braço Contraído Direito', 'MEASURES', 'ACTIVE'),
  ('Braço Contraído Esquerdo', 'MEASURES', 'ACTIVE'),
  ('Antebraço Direito', 'MEASURES', 'ACTIVE'),
  ('Antebraço Esquerdo', 'MEASURES', 'ACTIVE'),
  ('Tórax Relaxado', 'MEASURES', 'ACTIVE'),
  ('Tórax Inspirado', 'MEASURES', 'ACTIVE'),
  ('Coxa Direita', 'MEASURES', 'ACTIVE'),
  ('Coxa Esquerda', 'MEASURES', 'ACTIVE'),
  ('Panturrilha Direita', 'MEASURES', 'ACTIVE'),
  ('Panturrilha Esquerda', 'MEASURES', 'ACTIVE'),
  ('Distância Percorrida', 'CARDIORESPIRATORY', 'ACTIVE'),
  ('Tempo Gasto', 'CARDIORESPIRATORY', 'ACTIVE'),
  ('Frequência Cardíaca', 'CARDIORESPIRATORY', 'ACTIVE'),
  ('Flexão de Braços Repetições', 'NEUROMOTORS', 'ACTIVE'),
  ('Abdominal Repetições', 'NEUROMOTORS', 'ACTIVE'),
  ('Sentar e Alcançar', 'NEUROMOTORS', 'ACTIVE');