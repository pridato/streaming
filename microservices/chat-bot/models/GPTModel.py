from langchain_ollama import ChatOllama

def load_model(prompt) -> str | list[str | dict]:
    """
    Funcion para cargar el modelo gpt2
    :return: el modelo con sus tokenizadores
    """
    model = ChatOllama(model="llama3.2:1b", base_url="http://localhost:8080/")
    response = model.invoke(prompt)
    return response.content