# CyberBlog
Creating a Blog for practice with a focus on cyber security.

# Frameworks
Backend:
The backend of this project was developed using Django utilising Django-Rest Framework. 

Frontend:
The frontend of this project was developed with React and native Bootstrap.

# How to Setup and Run

1. Install the backend requirements located under /backend/requirements.txt (pip install -r ./backend/requirements.txt)
2. Install the frontend requirements located under /frontend/package-lock.json (npm install ./frontend)
3. Setup the backend database (All from backend directory)
    - python manage.py migrate
    - python manage.py createsuperuser (This is to allow for access to creation / deletion of items on the frontend, or django backend)
    - python manage.py runserver
4. Run the frontend (From the frontend directory)
    - npm start
5. Play around with the features on the website.

# Current Features
 - Create/Edit/Read/Delete Articles
    - Add and Remove comments from existing articles
 - Navigate between pages
    - About
        - Basic template of an about page
    - Contact
        - Basic template of a contact page
            - Allows the user to provide a message alongside a name and email for contact referencing
    - Login
        - Allows the admin of the website to login
            - This currently utilises tokens which are stored in the localstorage of a browser.
    - Articles
        - Represents an article in a user-readable format
            - Allows the addition of comments (Anonymous)
                - Can be removed by the admin
 - Add tags
    - Admins can create tags at the article creation screen
 - Search articles by associated tags