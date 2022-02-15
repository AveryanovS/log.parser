## Log parser app
### install
1. ```npm install```
2. ```npm run build```
### usage
```node ./dist/src/parser.js --input ./input.log --output ./output.json```
### details
* Created with DDD principle; core in `./src/domain`
* Covered by unit tests, ```npm test```
* Flexible; Easily can be changed filter or parse scenario, input source, our output destination and way to write;
* Will perform on large log files or another source, because of line-by-line parsing
