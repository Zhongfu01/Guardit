
# 1
FROM python:3.7
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
# 2
RUN pip install Flask gunicorn

# 3
COPY src/ /app
WORKDIR /app

# 4
ENV PORT 8080

# added for database management
RUN pip install flask firebase_admin


# 5
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
