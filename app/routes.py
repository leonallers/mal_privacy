# 1. default imports (alphabetic)

# 2. third party imports (alphabetic)
from flask import flash, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

# 3. own imports (alphabetic)
from app import app
from app.models import get_user_by_email


# main routes
@app.route('/')
@app.route('/index')
def index():
    return render_template('default.html')


# dashboard route
@app.route('/dashboard')
@login_required  # Dieser Decorator reicht als Schutz vollkommen aus!
def dashboard():
    # Du kannst direkt auf den eingeloggten Nutzer zugreifen
    return render_template('dashboard.html', user_email=current_user.email)


# routes for login and the loging process
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login_process', methods=['POST'])
def login_process():
    email = request.form.get('email')
    password = request.form.get('password')

    user = get_user_by_email(email)

    if user and user.check_password(password):
        # create a user session
        login_user(user)
        flash('Login erfolgreich!')
        return redirect(url_for('dashboard'))
    else:
        flash('Login fehlgeschlagen! E-Mail oder Passwort ist falsch.')
        return redirect(url_for('login'))


# route for logout
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # delete login-session
    flash("Du wurdest erfolgreich ausgeloggt.")
    return redirect(url_for('index'))


@app.route('/process-data', methods=['POST'])
@login_required
def process_data():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'Keine Datei erhalten.'}), 400

    # Hier würdest du die Datei verarbeiten und die Ergebnisse berechnen
    # Beispiel-Daten:
    result = {
        'old_model': {'total_alerts': 42},
        'new_model': {'total_alerts': 12, 'reduction_percent': 71}
    }
    return jsonify(result)