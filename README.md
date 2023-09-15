# Http Client

Axios based HTTP client with error handlers.

## Installation

### CDN

this package published as `httpClient` module in umd.

```html
<script src="https://unpkg.com/@termehui/http"></script>
```

### NPM

```bash
npm i @termehui/http
```

```ts
import { createAxiosInstance, client } from "@termehui/http";
createAxiosInstance("default error message", myAxiosConfig);
client().get(...)
```

## Error Handling

Http client use parser functions for handling http errors. you can register your own error parser to client.

Each error handled by http client parsed as error record. this record then passed to parser functions for parsing error.

When some error occurred on request, Error parsed and passed throw all registered parser functions. if parser function return `true` error identifier set as current parser and client continue passing error to the next registered parser. if parser function return `false` error identifier set as current parser and client stop error parsing. if parser function return `undefined` parser function skipped!

### Error Signature

Error record contains following fields:

- **raw**: any
- **type**: `"response"`, `"request"` or `undefined`
- **identifier**: error parser identifier handled this error last time.
- **body**: any
- **status**: numeric http status code or `undefined`
- **message**: error message set by parser function or used default client message.

#### Cast Error As Error Interface

You can use `ParseAsError` function to parse error as error interface. this function returns `null` if passed parameter not a error object.

```ts
import { client, ParseAsError } from "@termehui/http";
client()
  .get("test-url")
  .catch((err: any) => {
    let error = ParseAsError(err);
    if (error == null) {
      // Error not a error interface type
    } else {
      console.log(err.status);
    }
  });
```

#### Create Empty Error With Default Message

You can use `createError` function to create a empty error with default message.

```ts
import { createError } from "@termehui/http";
const e = createError();
```

### Register Custom Error Parser

**Note:** You can register multiple parser with same identifier.

```ts
import { registerParser, Error } from "@termehui/http";
registerParser("auth", (err: Error) => true | false | undefined {
  if (err.type === "response" && err.status === 401) {
    err.message = "Authentication required!"
    return false; // set error identifier to "auth" and don't run next parsers
    // return true; // set error identifier to "auth" and run next parsers
  }
  return undefined; // skip this parser
})
```

### Pre Registered Error Parsers

Http client contains pre-defined error parser for common http errors. all parser returns `true` (continue to other parsers). For register pre-defined error parsers you must pass error message to parser function.

```ts
import {
  registerParser,
  AuthorizedParser,
  CSRFParser,
  ForbiddenParser,
  RateLimiterParser,
  MaintenanceParser,
  NotFoundParser,
  ServerParser,
  ValidationParser
} from "@termehui/http";
registerParser("auth", AuthorizedParser("You are not authorized"))
registerParser("auth", (err: Error) => true | false | undefined {
  if (err.type === "response" && err.status === 401) {
    // message set from previous parser
    Redirect("/login")
    return false;
  }
  return undefined;
})
```
