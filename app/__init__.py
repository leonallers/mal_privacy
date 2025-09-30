from flask import Flask
from flask_login import  LoginManager

# Erstellt eine Instanz der Flask-Anwendung
app = Flask(__name__)

# Ein Secret Key ist für Flash-Nachrichten und Sessions notwendig
app.config['SECRET_KEY'] = 'eine-sehr-geheime-zeichenkette'

# Login Manager initialisieren
login_manager = LoginManager()
login_manager.init_app(app)
# Sage dem Manager, wo die Login-Seite ist.
# Dorthin wird man umgeleitet, wenn @login_required fehlschlägt.
login_manager.login_view = 'login'

from app.models import User, USERS
# Diese Funktion braucht Flask-Login, um einen Nutzer anhand seiner ID
# (die in der Session gespeichert ist) zu laden.
@login_manager.user_loader
def load_user(user_id):
    if user_id in USERS:
        user_data = USERS[user_id]
        return User(id=user_data['id'], email=user_data['email'], password=user_data['password'])
    return None





# Importiert die Routen, nachdem die App-Instanz erstellt wurde,
# um zirkuläre Importe zu vermeiden.
from app import routes