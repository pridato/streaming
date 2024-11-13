FROM python:3.10-slim

WORKDIR /chat-bot

COPY . /chat-bot

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5050

# Define el comando para ejecutar la aplicación Flask

CMD ["flask", "run", "-p", "5050"]

