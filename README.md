# @sdk_cy/body-parser

 @sdk_cy/body-parser is a body parser middleware which it can be used with [express](https://www.npmjs.com/package/express) or
  [@sdk_cy/tiny-server](https://www.npmjs.com/package/@sdk_cy/tiny-server)
 It can parse json or x-www-form-urlencoded data from your request.
## Installation

Use the package manager [npm](https://www.npmjs.com/) to install body-parser.

```bash
npm install @sdk_cy/body-parser
```

## Usage

```javascript
const tiny = require("@sdk_cy/tiny-server"); //You can use express
const bodyParser = require("@sdk_cy/body-parser");
const port = 8000;
const app = tiny();

app.use(bodyParser);

app.post("/", (req, res) => {
    //This endpoint now accept json or x-www-form-urlencoded
    res.setHeader("Content-Type","application/json");
    return res.status(200).send(JSON.stringify(req.body));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }
    console.log("Server is listening on ", port)
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
