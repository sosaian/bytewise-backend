use bytewise;

create table if not exists user (
    id integer PRIMARY KEY auto_increment,
    name_user varchar(255) not null,
    email varchar(255) not null,
    password_user varchar(255) not null 
);

-- Examples
-- Presupuesto - Mandados
-- -$5000 - Compro en la verdulería
-- +$1500 - Reintegro de compras
create table if not exists  transaction(
    id integer PRIMARY KEY auto_increment,
    id_user integer,
    type_transaction ENUM('expense', 'income', 'save') not null,
    amount integer,
    date_transaction datetime not null,
    foreign key (id_user) references user(id)
);

-- Examples - Tareas a corto plazo
-- * Chequear facturas de impuestos impagos
-- * Crear presupuestos para regalos o proyectos personales
-- * Armar un fondo de emergencia
-- * Juntar 6 meses de salarios en el fondo de emergencia
create table if not exists task(
    id integer PRIMARY KEY auto_increment,
    id_user integer,
    description_task varchar(255),
    status_task ENUM('not_started','in_progress', 'complete', 'overdue', 'canceled') default ('not_started'),
    due_date date,
    foreign key (id_user) references user(id)
);

-- Examples
-- Esto representa el presupuesto TOTAL con el que cuento
create table if not exists budget(
    id integer PRIMARY KEY auto_increment,
    id_user integer,
    amount_spent decimal(10,2) default 0,
    amount_remaining decimal(10,2) default 0,
    foreign key (id_user) references user(id)
);










insert into user (name_user, email, password_user) values 
('evelin', 'ejemplo@gmail.com','contraseña');