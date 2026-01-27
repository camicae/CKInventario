import sqlite3

# ======== con é um objeto Connection
# é representa a conexão c/ a db 
con = sqlite3.connect("inventario.db")

#
# ========  cursor é um cursor.
# um objeto cursorsor é uma instância da classe cursor que 
# executa comandos SQL
cursor = con.cursor()
#==================================

# cursor.execute("DROP TABLE peças")

# .execute() é o método cursor autoexplicativo
# nesse caso, temos ("SQL nome_tabela(coluna1, coluna2, coluna3)")

#==================================
# cursor.execute("""
#     INSERT INTO movie VALUES
#         ('Monty Python and the Holy Grail', 1975, 8.2),
#         ('And Now for Something Completely Different', 1971, 7.5)
# """)
# ======== The INSERT statement implicitly opens a transaction,
# which needs to be committed before changes are saved in the database 

subsis = ['Eletrônica','Suspensão e Direção',
            'Estrutura e Design','Freio']

#execute many executa a mesma opreção SQL usando um iterador
#nesse caso, a variavel subsis, uma list
# cursor.executemany(
#       "INSERT INTO subsistemas (nome) VALUES (?)",
#       [(s,) for s in subsis])

# cursor.execute("""
#  CREATE TABLE peças (
#      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
#      nome TEXT NOT NULL,
#      subsistema_id  INTEGER NOT NULL,
#      FOREIGN KEY (subsistema_id)
#          REFERENCES subsistemas(id)
#  )
#  """)

# cursor.execute("INSERT INTO peças (nome,subsistema_id) VALUES('CVT',2)")

con.commit()
cursor.execute("SELECT * FROM peças")
res = cursor.fetchall()
print(res)