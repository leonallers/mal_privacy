from flask import Flask

# Erstellt eine Instanz der Flask-Anwendung
app = Flask(__name__)

# Importiert die Routen, nachdem die App-Instanz erstellt wurde,
# um zirkuläre Importe zu vermeiden.
from app import routes