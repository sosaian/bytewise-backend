use bytewise;

create table if not exists user (
    id integer PRIMARY KEY auto_increment,
    name_user varchar(255),
    email varchar(255),
    password_user varchar(255) 
);

-- Examples
-- Presupuesto - Mandados
-- +$9000.00 - Primer ingreso
-- -$5000.00 - Compro en la verdulería
-- +$1500.00 - Reintegro de compras
create table if not exists  transactions(
    id integer PRIMARY KEY auto_increment,
    id_user integer,
    type_transaction ENUM('expense', 'income', 'save'),
    amount decimal(19, 4),
    description_transaction varchar(255),
    date_transaction datetime DEFAULT CURRENT_TIMESTAMP, 
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


