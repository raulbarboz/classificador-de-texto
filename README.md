# Classificador de Texto
###### Uma API simples que ajuda a classificar o texto em negativo ou positivo de acordo com o banco de dados.

# POST /negative
###### body
``` 
{
    "positive": "Eu odeio pessoas"
}
```

# POST /positive
###### body
``` 
{
    "positive": "Eu amo pessoas"
}
```

# GET /getPredictions
###### body
``` 
{
    "phrase": "Eu odeio pessoas"
}
```