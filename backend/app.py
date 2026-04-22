from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import NasaTLX, Copsoq
import pandas as pd

app = FastAPI()

# CORS (necessário pro React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# =========================
# DB SESSION
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# LÓGICA
# =========================
def Classificar(valor):
    if valor < 30:
        return "Baixa carga"
    elif valor < 60:
        return "Carga moderada"
    return "Alta carga"


# =========================
# NASA TLX
# =========================
@app.post("/nasa")
def receber_nasa(data: dict, db: Session = Depends(get_db)):

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

    db.add(novo)
    db.commit()

    dados_excel_nasa(db)

    return {"tlx_raw": media, "classificacao": classificacao}


# =========================
# COPSOQ
# =========================
@app.post("/copsoq")
def receber_copsoq(data: dict, db: Session = Depends(get_db)):

    novo = Copsoq(
        nome=data["nome"],
        email=data["email"],
        dados_demograficos=data.get("dados_demograficos", {}),
        respostas=data.get("respostas", {})
    )

    db.add(novo)
    db.commit()

    dados_excel_copsoq(db)

    return {"status": "ok"}


# =========================
# EXPORTAÇÃO NASA
# =========================
def dados_excel_nasa(db: Session):
    registros = db.query(NasaTLX).all()

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


# =========================
# EXPORTAÇÃO COPSOQ
# =========================
def dados_excel_copsoq(db: Session):
    registros = db.query(Copsoq).all()

    dados = []

    for r in registros:
        linha = {
            "ID": r.id,
            "Nome": r.nome,
            "Email": r.email
        }

        if r.dados_demograficos:
            linha.update(r.dados_demograficos)

        if r.respostas:
            for k, v in r.respostas.items():
                linha[f"Q{k}"] = v

        dados.append(linha)

    df = pd.DataFrame(dados)
    df.to_excel("copsoq_dados.xlsx", index=False)