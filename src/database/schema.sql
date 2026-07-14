
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(80)
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    ano_publicacao INT NOT NULL CHECK(ano_publicacao >= 1800 AND ano_publicacao <= EXTRACT(YEAR FROM CURRENT_DATE)),
    quantidade_total INT NOT NULL CHECK(quantidade_total >= 0),
    quantidade_disponivel INT NOT NULL CHECK(quantidade_disponivel >= 0),
    autor_id INT NOT NULL,

    CONSTRAINT fk_autores
        FOREIGN KEY(autor_id)
        REFERENCES autores(id)
        ON DELETE RESTRICT
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    devolvido BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_livros
        FOREIGN KEY(livro_id)
        REFERENCES livros(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_clientes
        FOREIGN KEY(cliente_id)
        REFERENCES clientes(id)
        ON DELETE RESTRICT
);