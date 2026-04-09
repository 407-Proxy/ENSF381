Dependencies:
- react-router-dom: npm install react-router-dom

Frontend:
  cd sweet-scoop-app
  npm install
  npm start

Backend:
  cd backend
  python3 -m venv venv
  source venv/bin/activate        (Mac/Linux)
  venv\Scripts\activate           (Windows)
  pip install Flask flask-cors bcrypt
  python app.py
