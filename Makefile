eslint:
	npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import 
	npx eslint --init

jest:
	npm install --save-dev jest
	
ef:
	npx eslint . --fix

e:
	npx eslint .

rec:
	asciinema rec

test:
	npm test
