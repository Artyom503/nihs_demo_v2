# Server API

## Setup

Copy `.env.sample` into `.env`. The following variables must be present:

| ENV Variable Name | Description            |
| ----------------- | ---------------------- |
| WS_PORT           | Web Socket listen port |
| API_PORT          | API Listen port        |

## Starting the API

From the server folder

```bash
yarn install
yarn start
```

## End Points

### Identity Verification

/

```json
{
  "connectionID": "16bcs3-vxc123",
  "claims": [
    {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential", "EmailCredential"],
      "issuanceDate": "2010-01-01T19:73:24Z",
      "credentialSubject": {
        "name": "Email",
        "value": "test@dltx.io"
      },
      "proof": {}
    },
    {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential", "NameCredential"],
      "issuanceDate": "2010-01-01T19:73:24Z",
      "credentialSubject": {
        "name": "Name",
        "value": "John Doe"
      },
      "proof": {}
    },
    {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential", "DateOfBirthCredential"],
      "issuanceDate": "2010-01-01T19:73:24Z",
      "credentialSubject": {
        "name": "DoB",
        "value": "1998-01-01T00:00:00Z"
      },
      "proof": {}
    }
  ]
}
```
