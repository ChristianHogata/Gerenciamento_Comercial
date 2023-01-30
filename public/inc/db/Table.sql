-- Table: public.Clientes

-- DROP TABLE IF EXISTS public."Clientes";

CREATE TABLE IF NOT EXISTS public."Clientes"
(
    id bigint NOT NULL DEFAULT nextval('id_cliente_seq'::regclass),
    passaporte character varying COLLATE pg_catalog."default",
    nome character varying COLLATE pg_catalog."default",
    sobrenome character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    telefone1 character varying COLLATE pg_catalog."default",
    telefone2 character varying COLLATE pg_catalog."default",
    CONSTRAINT "Clientes_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Clientes"
    OWNER to postgres;



-- Table: public.Complementos

-- DROP TABLE IF EXISTS public."Complementos";

CREATE TABLE IF NOT EXISTS public."Complementos"
(
    id bigint,
    descricao character varying COLLATE pg_catalog."default",
    valor_unitario integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Complementos"
    OWNER to postgres;




-- Table: public.Endereco

-- DROP TABLE IF EXISTS public."Endereco";

CREATE TABLE IF NOT EXISTS public."Endereco"
(
    id_usuario bigint,
    endereco character varying COLLATE pg_catalog."default",
    numero character varying COLLATE pg_catalog."default",
    referencia character varying COLLATE pg_catalog."default",
    cep character varying COLLATE pg_catalog."default",
    cidade character varying COLLATE pg_catalog."default",
    provincia character varying COLLATE pg_catalog."default",
    id_endereco bigint DEFAULT nextval('id_endereco_seq'::regclass)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Endereco"
    OWNER to postgres;



-- Table: public.Endereco_Fornecedor

-- DROP TABLE IF EXISTS public."Endereco_Fornecedor";

CREATE TABLE IF NOT EXISTS public."Endereco_Fornecedor"
(
    id_usuario bigint,
    endereco character varying COLLATE pg_catalog."default",
    numero character varying COLLATE pg_catalog."default",
    provincia character varying COLLATE pg_catalog."default",
    cep character varying COLLATE pg_catalog."default",
    cidade character varying COLLATE pg_catalog."default",
    id_endereco_fornecedor bigint DEFAULT nextval('id_endereco_fornecedor_seq'::regclass),
    complemento character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Endereco_Fornecedor"
    OWNER to postgres;




-- Table: public.Fornecedores

-- DROP TABLE IF EXISTS public."Fornecedores";

CREATE TABLE IF NOT EXISTS public."Fornecedores"
(
    id bigint NOT NULL DEFAULT nextval('id_fornecedor_seq'::regclass),
    situacao "char",
    reg_tributario bigint,
    cpf_cnpj character varying COLLATE pg_catalog."default",
    in_estadual character varying COLLATE pg_catalog."default",
    razao_social character varying COLLATE pg_catalog."default",
    nome_fantasia character varying COLLATE pg_catalog."default",
    responsavel character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    observacao character varying COLLATE pg_catalog."default",
    telefone1 character varying COLLATE pg_catalog."default",
    telefone2 character varying COLLATE pg_catalog."default",
    CONSTRAINT "Fornecedores_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Fornecedores"
    OWNER to postgres;



-- Table: public.Pedido_itens

-- DROP TABLE IF EXISTS public."Pedido_itens";

CREATE TABLE IF NOT EXISTS public."Pedido_itens"
(
    id bigint NOT NULL DEFAULT nextval('id_pedido_itens_seq'::regclass),
    id_pedido bigint,
    id_produto bigint,
    descricao_produto character varying COLLATE pg_catalog."default",
    quantidade_produto integer,
    valor_unitario_produto integer,
    descricao_sabor character varying COLLATE pg_catalog."default",
    valor_total_sabor integer,
    descricao_complemento character varying COLLATE pg_catalog."default",
    valor_total_complemento integer,
    status_item integer,
    CONSTRAINT "Pedido_itens_pkey" PRIMARY KEY (id),
    CONSTRAINT id_pedido FOREIGN KEY (id_pedido)
        REFERENCES public."Pedidos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_produto FOREIGN KEY (id_produto)
        REFERENCES public."Produtos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pedido_itens"
    OWNER to postgres;



-- Table: public.Pedidos

-- DROP TABLE IF EXISTS public."Pedidos";

CREATE TABLE IF NOT EXISTS public."Pedidos"
(
    id bigint NOT NULL DEFAULT nextval('id_pedido_seq'::regclass),
    valor_total integer,
    valor_pago integer,
    valor_troco integer,
    id_cliente bigint,
    id_forma_pagamento bigint,
    delivery "char",
    balcao "char",
    id_funcionario bigint,
    id_entregador bigint,
    nome_cliente character varying COLLATE pg_catalog."default",
    data_pedido character varying COLLATE pg_catalog."default",
    hora_pedido character varying COLLATE pg_catalog."default",
    inicio_entrega character varying COLLATE pg_catalog."default",
    fim_entrega character varying COLLATE pg_catalog."default",
    status_pedido integer,
    CONSTRAINT "Pedidos_pkey" PRIMARY KEY (id),
    CONSTRAINT id_cliente FOREIGN KEY (id_cliente)
        REFERENCES public."Clientes" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pedidos"
    OWNER to postgres;




-- Table: public.Produtos

-- DROP TABLE IF EXISTS public."Produtos";

CREATE TABLE IF NOT EXISTS public."Produtos"
(
    id bigint NOT NULL DEFAULT nextval('id_produtos_seq'::regclass),
    grupo "char",
    sub_grupo "char",
    descricao character varying COLLATE pg_catalog."default",
    peso_liquido numeric,
    preco_custo integer,
    preco_venda integer,
    estoque integer,
    unidade_entrada character varying COLLATE pg_catalog."default",
    ean character varying COLLATE pg_catalog."default",
    situacao character varying COLLATE pg_catalog."default",
    peso_bruto numeric,
    complemento character varying COLLATE pg_catalog."default",
    fracionado character varying COLLATE pg_catalog."default",
    quantidade_sabores character varying COLLATE pg_catalog."default",
    quantidade_minima integer,
    CONSTRAINT "Produtos_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Produtos"
    OWNER to postgres;



-- Table: public.Sabores

-- DROP TABLE IF EXISTS public."Sabores";

CREATE TABLE IF NOT EXISTS public."Sabores"
(
    id bigint,
    descricao character varying COLLATE pg_catalog."default",
    valor_unitario integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Sabores"
    OWNER to postgres;



-- Table: public.Semaforo

-- DROP TABLE IF EXISTS public."Semaforo";

CREATE TABLE IF NOT EXISTS public."Semaforo"
(
    operacao character varying COLLATE pg_catalog."default",
    user_id bigint,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Semaforo"
    OWNER to postgres;




-- Table: public.caixa

-- DROP TABLE IF EXISTS public.caixa;

CREATE TABLE IF NOT EXISTS public.caixa
(
    id bigint DEFAULT nextval('id_caixa_seq'::regclass),
    valor_abertura integer,
    hora_abertura character varying COLLATE pg_catalog."default",
    hora_fechamento character varying COLLATE pg_catalog."default",
    funcionario_abertura character varying COLLATE pg_catalog."default",
    funcionario_fechamento character varying COLLATE pg_catalog."default",
    data_abertura date,
    data_fechamento date,
    valor_fechamento integer,
    dinheiro_inserido integer,
    debito_inserido integer,
    credito_inserido integer,
    total_inserido integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.caixa
    OWNER to postgres;





-- Table: public.movCaixa

-- DROP TABLE IF EXISTS public."movCaixa";

CREATE TABLE IF NOT EXISTS public."movCaixa"
(
    id bigint DEFAULT nextval('id_movcaixa_seq'::regclass),
    id_caixa bigint,
    id_pedido bigint,
    id_sangria bigint,
    id_suprimento bigint,
    valor_movimento integer,
    tipo_operacao "char"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."movCaixa"
    OWNER to postgres;




-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id bigint NOT NULL,
    usuario character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    CONSTRAINT usuarios_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;
