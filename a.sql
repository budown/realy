create database demo character set utf8 collate utf8_general_ci;

CREATE TABLE `travel` (
    `id` int NOT NULL COMMENT "编号",
    `project` varchar(255) NOT NULL COMMENT "项目",
    `category` varchar(255) NOT NULL COMMENT "类别",
    `variety` varchar(255) NOT NULL COMMENT "品种",
    `introduction` varchar(255) NOT NULL COMMENT "简介",
    `price` double NOT NULL COMMENT "价格",
    `picture` varchar(255) NOT NULL COMMENT "图片"
);

insert into travel(id,project,category,variety,introduction,price,picture) values(29007572,"外滩","旅游景点","都市游","黄浦江景，评价：五星",0.00,"外滩.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(30302973,"迪斯尼","旅游景点","主题游","世界主题公园，评价：五星",600.00,"迪斯尼.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(59157452,"东方明珠","旅游景点","都市游","上海地标，评价：五星",300.00,"东方明珠.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(60200003,"华尔道夫酒店","住宿","宾馆","黄埔江江景房，五星级",1200.00,"华尔道夫酒店.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(60274921,"城隍庙","旅游景点","都市游","老上海城厢, 评价：四星",60.00,"城隍庙.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(60280007,"和平饭店","住宿","宾馆","老上海宾馆，坐落南京路，五星级",900.00,"和平饭店.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(69094949,"环球中心","旅游景点","都市游","上海第二高楼, 评价：四星",200.00,"环球中心.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(70322399,"苏州河畔旅舍","住宿","民宿","苏州河畔石库门民宿, 评价：五星",800.00,"苏州河畔旅舍.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(99009563,"新天地","旅游景点","都市游","时尚地标, 评价：五星",0.00,"新天地.jpg");
insert into travel(id,project,category,variety,introduction,price,picture) values(99046513,"上海野生动物园","旅游景点","亲子游","亚洲最大野生动物园, 评价：五星",280.00,"上海野生动物园.jpg");