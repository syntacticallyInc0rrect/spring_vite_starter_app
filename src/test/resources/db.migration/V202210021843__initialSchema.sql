create table user
(
    id bigint auto_increment primary key,
    password varchar(255) null,
    username varchar(255) null
);

create table game
(
    id bigint auto_increment primary key,
    finish_time datetime(6) null,
    start_time datetime(6) null,
    user_id bigint not null,
    constraint FK_user_id_id
        foreign key (user_id) references user (id)
);
