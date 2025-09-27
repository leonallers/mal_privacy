from app import app

# Definiert, was passieren soll, wenn jemand die Haupt-URL ("/") aufruft
@app.route('/')
@app.route('/index')
def index():
    return "Hello, World! Der AML Privacy Agent MVP läuft."