from flask import Flask, jsonify, request
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "inventario.db")

app = Flask(__name__)

# =========================
# DB
# =========================
def db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# =========================
# SQL (centralizado)
# =========================
SQL_PESQUISA_APROX = """
SELECT p.id, p.nome, p.data_fabricacao, p.data_aquisicao,
       s.nome AS subsistema_nome
FROM pecas p
JOIN subsistemas s ON p.subsistema_id = s.id
WHERE p.nome LIKE ?
"""

SQL_PESQUISA_TODAS = """
SELECT p.id, p.nome, p.data_fabricacao, p.data_aquisicao,
       s.nome AS subsistema_nome
FROM pecas p
JOIN subsistemas s ON p.subsistema_id = s.id
"""

SQL_PESQUISA_EXATA = """
SELECT p.id, p.nome, s.nome AS subsistema_nome
FROM pecas p
JOIN subsistemas s ON p.subsistema_id = s.id
WHERE p.nome = ?
"""

SQL_ADICIONAR_PECA = """
INSERT INTO pecas (nome, subsistema_id, data_fabricacao, data_aquisicao)
VALUES (?, ?, ?, ?)
"""

SQL_REMOVER_PECA = """
DELETE FROM pecas
WHERE nome = ? AND subsistema_id = ? AND id = ?
"""


# =========================
# ROTAS
# =========================
@app.route("/pesquisar", methods=["GET"])
def pesquisar_peca():
    conn = db_connection()
    try:
        termo = request.args.get("nome_peca", "").strip()

        if termo:
            params = (f"%{termo}%",)
            cursor = conn.execute(SQL_PESQUISA_APROX, params)
        else:
            cursor = conn.execute(SQL_PESQUISA_TODAS)

        resultados = [dict(row) for row in cursor.fetchall()]
        return jsonify(resultados), 200

    finally:
        conn.close()


@app.route("/editar_inventario/adicionar_item", methods=["PUT"])
def adicionar_peca():
    conn = db_connection()
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"message": "JSON inválido"}), 400

        nome_peca = data.get("nome_peca")
        subsistema_peca = data.get("subsistema_peca")
        data_fabricacao = data.get("data_fabricacao")
        data_aquisicao = data.get("data_aquisicao")

        if not nome_peca or not subsistema_peca:
            return jsonify({"message": "Campos obrigatórios ausentes"}), 400

        params = (
            nome_peca,
            subsistema_peca,
            data_fabricacao,
            data_aquisicao,
        )

        conn.execute(SQL_ADICIONAR_PECA, params)
        conn.commit()

        cursor = conn.execute(SQL_PESQUISA_EXATA, (nome_peca,))
        resultados = [dict(row) for row in cursor.fetchall()]

        subsistema_nome = (
            resultados[0].get("subsistema_nome")
            if resultados else "desconhecido"
        )

        return jsonify(
            {
                "message": f"Item '{nome_peca}' adicionado ao subsistema '{subsistema_nome}' com sucesso",
                "data": resultados,
            }
        ), 200

    finally:
        conn.close()


@app.route("/editar_inventario/remover_item", methods=["DELETE"])
def remover_peca():
    conn = db_connection()
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"message": "JSON inválido"}), 400

        nome_peca = data.get("nome_peca")
        subsistema_peca = data.get("subsistema_peca")
        id_peca = data.get("id")

        if not nome_peca or not subsistema_peca or not id_peca:
            return jsonify({"message": "Campos obrigatórios ausentes"}), 400

        params = (nome_peca, subsistema_peca, id_peca)
        conn.execute(SQL_REMOVER_PECA, params)
        conn.commit()

        cursor = conn.execute(SQL_PESQUISA_TODAS)
        resultados = [dict(row) for row in cursor.fetchall()]

        subsistema_nome = (
            resultados[0].get("subsistema_nome")
            if resultados else "desconhecido"
        )

        return jsonify(
            {
                "message": f"Item '{nome_peca}' removido do subsistema '{subsistema_nome}' com sucesso",
                "data": resultados,
            }
        ), 200

    finally:
        conn.close()


# =========================
# MAIN
# =========================
if __name__ == "__main__":
    app.run(debug=True)
