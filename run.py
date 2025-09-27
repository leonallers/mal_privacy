from app import app

if __name__ == '__main__':
    # Startet den Entwicklungs-Server
    # debug=True sorgt dafür, dass der Server bei Code-Änderungen automatisch neu startet
    app.run(debug=True)