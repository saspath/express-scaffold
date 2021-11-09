## Express API Scaffold
___

### Description

This is a sample repository to scaffold Express App with a few bells and whistles. Clone and enjoy! 

### Loggers 

Repo uses standard `winston / morgan` logger setup

### Routes 

Repo shows a sample route configured and hooked into express server 

### Start Server 

This repo uses `nodemon` to monitor express server. Don't forget to install dependencies :) 

```
# after git clone :)
npm install

# run serer 
nodemon server.js
```


Output of the command above looks as below.

```
[nodemon] starting `node server.js`
2021-11-09 03:42:44 info: 	Express listening on port 3000 
```

### Sample Route 

By default server runs on port `3000` or `EXPRESS_PORT` passed in as an environment variable

```
curl http://localhost:3000/checker/hello 
```

If success, response should look as below.

```
{
    "message": "Hello Express! I am ready for work!"
}
```

### Suggestions? 

All ears! Holler if questions or suggestions!

Cheers