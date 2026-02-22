from database import db

class NasaTLX(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    email = db.Column(db.String(100))

    mental = db.Column(db.Float)
    fisica = db.Column(db.Float)
    temporal = db.Column(db.Float)
    desempenho = db.Column(db.Float)
    esforco = db.Column(db.Float)
    frustracao = db.Column(db.Float)

    tlx_raw = db.Column(db.Float)
    classificacao = db.Column(db.String(50))
