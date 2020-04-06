create table words
(
	id serial,
	word text,
	lang varchar(6)
);

create unique index words_id_uindex
	on words (id);

create unique index words_word_uindex
	on words (word);

