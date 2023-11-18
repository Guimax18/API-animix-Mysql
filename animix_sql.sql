create database animix;
use animix;

CREATE TABLE tb_roupas (
	id_roupa   int primary key auto_increment,
    nm_roupa   varchar(200),
    categoria  varchar(200),
    tamanho	   varchar(50),
	valor	   decimal(1000),
	cor		   varchar(50),
    anime	   varchar(200),
    img_roupa  varchar(800)
);

SELECT * FROM tb_roupas