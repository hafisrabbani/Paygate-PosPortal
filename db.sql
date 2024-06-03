create table api_keys
(
    id         int auto_increment
        primary key,
    api_key    varchar(255)                          not null,
    created_at timestamp default current_timestamp() not null,
    updated_at timestamp default current_timestamp() not null on update current_timestamp (),
    constraint api_key
        unique (api_key)
);

create table list_payment
(
    id                int auto_increment
        primary key,
    order_id          bigint                                not null,
    payment_reference varchar(255) null,
    amount            bigint                                not null,
    method            varchar(255)                          not null,
    product_detail    text null,
    status            tinyint(1) default 0 null,
    expired_time      varchar(255) null,
    created_at        timestamp default current_timestamp() not null,
    updated_at        timestamp default current_timestamp() not null on update current_timestamp (),
    constraint order_id
        unique (order_id)
);

