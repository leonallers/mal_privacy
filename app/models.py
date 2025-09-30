# In einer echten Anwendung würden diese Daten aus einer Datenbank kommen.
# Das Dictionary simuliert unsere Benutzer-Datenbank.
from flask_login import UserMixin

USERS = {
    "1": {"id": "1", "email": "admin@admin.com", "password": "admin"}
}


class User(UserMixin):
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password

    # Prüft, ob das übergebene Passwort korrekt ist.
    # WICHTIG: In einer echten App MUSS das Passwort gehasht werden!
    def check_password(self, password_to_check):
        return self.password == password_to_check

def get_user_by_email(email):
    """Sucht einen Benutzer anhand seiner E-Mail-Adresse."""
    for user_data in USERS.values():
        if user_data['email'] == email:
            # Erstellt ein User-Objekt aus den gefundenen Daten
            return User(id=user_data['id'], email=user_data['email'], password=user_data['password'])
    return None