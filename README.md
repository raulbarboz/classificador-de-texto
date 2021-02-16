# Classificador de Texto
###### Uma API simples que ajuda a classificar o texto em negativo ou positivo de acordo com o banco de dados.
#### Esta api foi criada utilizando-se do mecanismo https://www.npmjs.com/package/ml-classify-text

# POST /negative
###### body
``` 
{
    "negative": "Eu odeio pessoas"
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

# Créditos para: https://www.npmjs.com/package/ml-classify-text responsável pelo mecanismo de interpretação e classificação do texto.