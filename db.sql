create table users (id serial primary key, firstName varchar(50), lastName varchar(50), email varchar(50) UNIQUE,
				  password varchar(255), gender varchar(20), jobRole varchar(50), department varchar(50), address varchar(255));
				  
create table articles(id serial primary key, createdOn timestamp, title varchar(50), article text, category varchar(50),
					userId int, constraint users_id_fk foreign key(userId) references users(id));
					
create table articleComments(id serial primary key, createdOn timestamp, comment text,
					articleId int, constraint articles_id_fk foreign key(articleId) references articles(id));

create table gifs(id serial primary key, createdOn timestamp, title varchar(50), imageUrl varchar(255), 
				userId int, constraint users_id_fk foreign key(userId) references users(id));
				
create table gifComments(id serial primary key, createdOn timestamp, comment text,
					gifId int, constraint gifs_id_fk foreign key(gifId) references gifs(id));
