from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from models import NasaTLX
import pandas as pd

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nasa.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

def Classificar(valor):
    out = ""
    if valor < 30:
        out = "Baixa carga"
    elif valor < 60:
        out = "Carga moderada"
    else:
        out = "Alta carga"
    return out

@app.route("/nasa", methods=["POST"])
def receber_nasa():
    data = request.json

    media = (
        data["mental"] +
        data["fisica"] +
        data["temporal"] +
        data["desempenho"] +
        data["esforco"] +
        data["frustracao"]
    ) / 6

    classificacao = Classificar(media)

    novo = NasaTLX(
        nome=data["nome"],
        email=data["email"],
        mental=data["mental"],
        fisica=data["fisica"],
        temporal=data["temporal"],
        desempenho=data["desempenho"],
        esforco=data["esforco"],
        frustracao=data["frustracao"],
        tlx_raw=media,
        classificacao=classificacao
    )

    db.session.add(novo)
    db.session.commit()

    dados_execel()

    return jsonify({"tlx_raw": media, "classificacao": classificacao})

def dados_execel():
    with app.app_context():
        registros = NasaTLX.query.all()

        dados = []

        for r in registros:
            dados.append({
                "ID": r.id,
                "Nome": r.nome,
                "Email": r.email,
                "Mental": r.mental,
                "Fisica": r.fisica,
                "Temporal": r.temporal,
                "Desempenho": r.desempenho,
                "Esforco": r.esforco,
                "Frustracao": r.frustracao,
                "TLX_RAW": r.tlx_raw,
                "Classificacao": r.classificacao
            })

        df = pd.DataFrame(dados)

        df.to_excel("nasa_dados.xlsx", index=False)

if __name__ == "__main__":
    app.run(debug=True)

