from flask import Flask, jsonify, request
import sqlite3

# instancia flask
app = Flask(__name__)


# reseta e estabelece a conexao c/ DB
def db_connection():
    conn = None
    try:
        conn = sqlite3.connect("inventario.db")
    except sqlite3.error as e:
        print(e)
    return conn


subsistemas = [
    {"nome": "Eletrônica", id: 1},
    {"nome": "Suspensão e Direção", id: 2},
    {"nome": "Estrutura e Design", id: 3},
    {"nome": "Freio", id: 4},
]


@app.route("/pesquisar", methods=["GET"])
def pesquisar_peça_geral():
    # conectando com a db
    conn = db_connection()
    # faz o cursor retornar dicts ao invés de tuples
    conn.row_factory = sqlite3.Row
    # lendo a requisição através do objeto request
    params = request.form.get("nome_peça")
    # trata o dado caso nome seja vazio
    termo = params.strip() if params else ""

    # usando uma instancia cursor pra executar SQL
    # retorna todas as peças com o nome pesquisado,
    # sendo o retorno:[ id, nome, nome do subsistema]
    # ==== IMP: caso não haja nome especificado, retornará todas as peças
    cursor = conn.execute(
    """
    SELECT p.id, p.nome, s.nome AS subsistema_nome
    FROM peças p
    JOIN subsistemas s ON p.subsistema_id = s.id
    WHERE p.nome LIKE ?
    """,
    (f"%{termo}%",),
)

    # armazena os dicts em um array
    resultados = []
    for row in cursor.fetchall():
        resultados.append(dict(row))
    if resultados != None:
        return jsonify(resultados), 200
    else:
        return jsonify({"message": "Nenhum registro encontrado"}), 404




@app.route("/editar_inventario/adicionar_item", methods=['PUT'])
def adicionar_peça():
    # conectando com a db
    conn = db_connection()
    # faz o cursor retornar dicts ao invés de tuples
    conn.row_factory = sqlite3.Row
    # lendo a requisição através do objeto request
    nome_peça = (request.form["nome_peça"])
    subsistema_peça = (request.form["subsistema_peça"])
    cursor = conn.execute("""
        INSERT INTO peças(nome,subsistema_id) VALUES(?,?)
    """,(nome_peça,subsistema_peça))
    
    # armazena os dicts em um array
    cursor = conn.execute(
    # retorna todas as peças com o nome pesquisado,
    # sendo o retorno:[ id, nome, nome do subsistema]
        """SELECT p.id, p.nome, s.nome AS subsistema_nome
        FROM peças p
        JOIN subsistemas s ON
        p.subsistema_id = s.id
        WHERE p.nome = ?""",
        (nome_peça,),
    )
    resultados = []
    for row in cursor.fetchall():
        resultados.append(dict(row))
    if resultados != None:
        #fecha a transação, salvando a mudança feita
        conn.commit()
        return jsonify({
            "message": f"Operação realizada com sucesso!\nItem '{nome_peça}' adicionado",
             "data": resultados
        }), 200
    else:
        #adicionar mensagem de erro para differentes exceptions
        return jsonify({"message": "Erro ao adicionar item"}), 500


@app.route("/editar_inventario/remover_item", methods=['DELETE'])
def remover_item():
    # conectando com a db
    conn = db_connection()
    # faz o cursor retornar dicts ao invés de tuples
    conn.row_factory = sqlite3.Row
    # lendo a requisição através do objeto request
    nome_peça = (request.form["nome_peça"])
    subsistema_peça = (request.form["subsistema_peça"])
    cursor = conn.execute("""
        DELETE FROM peças AS p WHERE p.nome = ? AND p.subsistema_id = ? 
    """,(nome_peça,subsistema_peça))

    # armazena os dicts em um array
    cursor = conn.execute(
    # retorna todas as peças com o nome pesquisado,
    # sendo o retorno:[ id, nome, nome do subsistema]
        """SELECT p.id, p.nome, s.nome AS subsistema_nome
        FROM peças p
        JOIN subsistemas s ON
        p.subsistema_id = s.id"""
    )
    resultados = []
    for row in cursor.fetchall():
        resultados.append(dict(row))
    #fecha a transação, salvando a mudança feita
    conn.commit()
    return jsonify({
        "message": f"Operação realizada com sucesso!\nItem '{nome_peça}' removido",
        "data": resultados
        }), 200
    # else:
        # #adicionar mensagem de erro para differentes exceptions
        # return jsonify({"message": "Erro ao remover item"}), 500



if __name__ == "__main__":
    app.run(debug=True)
