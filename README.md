# ErrorSnake

Uma biblioteca TypeScript para padronização, enriquecimento e serialização de erros em aplicações Node.js/TypeScript. Permite criar erros customizados, registrar logs detalhados e converter objetos para snake_case de forma segura, facilitando integração com sistemas de log, APIs e bancos de dados.

---

## Instalação

```bash
npm install error-snake
```

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Classes de Erro](#classes-de-erro)
	- [BaseError](#baseerror)
	- [Erros HTTP e de Domínio](#erros-http-e-de-domínio)
- [Função `parsed`](#função-parsed)
- [Exemplos de Uso](#exemplos-de-uso)
- [Utilitários](#utilitários)
- [Atributos dos Erros](#atributos-dos-erros)
- [Testes](#testes)
- [Licença](#licença)

---

## Funcionalidades

- Criação de erros customizados com metadados ricos.
- Serialização de erros para logs.
- Conversão automática de objetos para snake_case.
- Classes de erro para cenários comuns (HTTP, validação, banco de dados, etc).
- Função utilitária para identificar erros customizados.

---

## Classes de Erro

### BaseError

Classe base para todos os erros customizados. Herda de `Error` e adiciona diversos atributos úteis para rastreamento e diagnóstico.

**Principais atributos:**

- `name`, `message`, `stack`, `cause`
- `statusCode`, `errorId`, `requestId`
- `context`, `errorLocationCode`, `key`, `type`
- `databaseErrorCode`, `originalError`, `timestamp`
- `userId`, `ipAddress`, `userAgent`, `endpoint`, `method`
- `queryParameters`, `requestBody`, `responseTime`
- `serviceName`, `severity`

**Métodos:**

- `toLogObject()`: retorna um objeto pronto para log, com os principais campos do erro.

---

### Erros HTTP e de Domínio

Todas as classes abaixo herdam de `BaseError` e já vêm com valores padrão para cada cenário:

- `InternalServerError`
- `NotFoundError`
- `ServiceError`
- `ValidationError`
- `UnauthorizedError`
- `ForbiddenError`
- `TooManyRequestsError`
- `UnprocessableEntityError`
- `MethodNotAllowedError`
- `BadRequestError`
- `ConflictError`
- `GatewayTimeoutError`
- `BadGatewayError`
- `DatabaseError`
- `NetworkError`
- `TimeoutError`
- `ConfigurationError`
- `ResourceExhaustedError`
- `NotImplementedError`
- `DependencyError`

Cada classe aceita os mesmos parâmetros opcionais do `BaseError`, permitindo customização total.

---

## Função `parsed`

A função assíncrona `parsed(obj)` converte recursivamente qualquer objeto para snake_case, preservando tipos especiais (Date, Buffer, etc) e evitando loops circulares. Ideal para serializar objetos de erro para logs, bancos de dados ou APIs REST.

---

## Exemplos de Uso

### Criando e logando um erro customizado

```typescript
import { ValidationError } from 'error-snake';

const error = new ValidationError({
	message: 'O campo email é obrigatório.',
	key: 'email',
	type: 'required',
	userId: 'user-123',
	context: { input: { email: '' } }
});

console.log(error.toLogObject());
```

### Convertendo para snake_case com `parsed`

```typescript
import { parsed } from 'error-snake';

const logObject = error.toLogObject();
const snakeCaseLog = await parsed(logObject);

console.log(snakeCaseLog);
// {
//   error_id: "...",
//   name: "ValidationError",
//   message: "...",
//   status_code: 400,
//   ...
// }
```

### Exemplo de uso integrado (como no `index.ts`)

```typescript
import { InternalServerError, parsed } from 'error-snake';

const error = new InternalServerError({
	message: 'Erro inesperado',
	userId: 'user-1',
	endpoint: '/api/teste'
});

const logObj = error.toLogObject();
const snakeLog = await parsed(logObj);

console.log(snakeLog);
```

### Demonstração de todas as classes

Veja o arquivo `src/index.ts` para um exemplo que instancia todas as classes de erro, gera objetos de log e converte para snake_case.

---

## Utilitários

- `createErrorLogObject(error: BaseError)`: retorna o objeto de log de um erro.
- `isCustomError(error: unknown)`: verifica se um erro é instância de `BaseError`.

---

## Atributos dos Erros

Todos os erros possuem os seguintes atributos (opcionais):

| Atributo            | Tipo                        | Descrição                                      |
|---------------------|----------------------------|------------------------------------------------|
| name                | string                     | Nome da classe de erro                         |
| message             | string                     | Mensagem de erro                               |
| stack               | string                     | Stack trace                                    |
| cause               | unknown                    | Erro original                                  |
| action              | string                     | Ação sugerida ao usuário                       |
| statusCode          | number                     | Código HTTP                                    |
| errorId             | string                     | ID único do erro                               |
| requestId           | string                     | ID da requisição                               |
| context             | unknown                    | Contexto adicional                             |
| errorLocationCode   | string                     | Código de localização do erro                  |
| key                 | string                     | Chave do campo relacionado                     |
| type                | string                     | Tipo do erro                                   |
| databaseErrorCode   | string                     | Código do erro de banco de dados               |
| originalError       | unknown                    | Erro original (stack trace, etc)               |
| timestamp           | Date                       | Data/hora do erro                              |
| userId              | string                     | ID do usuário                                  |
| ipAddress           | string                     | IP do usuário                                  |
| userAgent           | string                     | User agent                                     |
| endpoint            | string                     | Endpoint da API                                |
| method              | string                     | Método HTTP                                    |
| queryParameters     | Record<string, unknown>    | Parâmetros de query                            |
| requestBody         | unknown                    | Corpo da requisição                            |
| responseTime        | number                     | Tempo de resposta (ms)                         |
| serviceName         | string                     | Nome do serviço                                |
| severity            | 'low' | 'medium' | ...   | Severidade do erro                             |

---

## Testes

Os testes estão localizados em `src/errors/erros.test.ts` e `src/parsed/parsed.test.ts`.

Execute:

```bash
npm test:dev
npm test
```

---

## Licença

MIT

---

**Dúvidas ou sugestões? Abra uma issue ou PR!**

---

Se precisar de exemplos mais avançados ou de integração, consulte o arquivo `src/index.ts` para um showcase completo de uso da biblioteca.
