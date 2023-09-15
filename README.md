TESTOWY UZYTKOWNIK:
email: dev@wp.pl
hasło: tester123

frontend:

cd frontend
npm install
npm run dev

backend:

pipenv install
pipenv shell
cd backend
python manage.py runserver

!!! WAŻNE! - wchodzic na frontend z 127.0.0.1 !!!
