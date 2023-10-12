# Study App
Study App is a powerful, user-friendly application designed to enhance your study sessions. It allows users to manage study decks, cards, and sessions efficiently. Built with React and Flask, the application follows best practices. 

## Features 

- User Authentication
  Secure user signup and login functionality.
  Session management for a personalized user experience.

- Study Decks
  Users can create, manage, and delete study decks.
  Each deck can contain multiple study cards for a structured learning experience.
  
- Study Cards
  Study cards within each deck to contain questions and answers for self-assessment.
  Ability to add, edit, and delete cards within decks.

- Public Decks
  Explore study decks shared publicly by other users.


---


## Technologies Used

### Frontend:
React (Hooks, Router)
Redux for state management
Styled-components for styling
### Backend:
Flask
Flask-RESTful for creating REST APIs
SQLAlchemy for ORM
### Database:
SQLite
### Other Libraries and Tools:
Flask-Bcrypt for password hashing
Flask-CORS for handling CORS
Flask-Migrate for handling database migrations


---


## Setup and Installation

### Clone the Repository
git clone https://github.com/your-username/study-app.git

cd study-app

### Setup Virtual Environment 
pipenv install
pipenv shell
python server/app.py

### Install Backend Dependencies
pip install -r requirements.txt

### Install Frontend Dependencies
npm install --prefix client
npm start --prefix client

## Contributing
We welcome contributions from the community. Feel free to open an issue or create a pull request.

## Resources
- [flask](https://flask-sqlalchemy.palletsprojects.com/)
- [stack overflow](https://stackoverflow.com/)
- [W3schools reference codes](https://wwww.w3schools.com/) 
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Flatiron, course materials](https://flatironschool.com/)
- [Redux Fundamentals](https://redux.js.org/tutorials/fundamentals)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)

## License
This project is licensed under the MIT License.