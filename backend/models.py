from sqlalchemy import Column, Integer, String, Float, JSON
from database import Base

class NasaTLX(Base):
    __tablename__ = "nasa_tlx"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    email = Column(String(100))

    mental = Column(Float)
    fisica = Column(Float)
    temporal = Column(Float)
    desempenho = Column(Float)
    esforco = Column(Float)
    frustracao = Column(Float)

    tlx_raw = Column(Float)
    classificacao = Column(String(50))


class Copsoq(Base):
    __tablename__ = "copsoq"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    email = Column(String(100))

    dados_demograficos = Column(JSON)
    respostas = Column(JSON)