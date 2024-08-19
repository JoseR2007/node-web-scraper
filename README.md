# Welcome to Node Web Scraper with Playwright
## Este programa busca ofrecer una forma sencilla de scrapear webs sin conocimiento en el Scraping

> [!IMPORTANT]
> El web scraping es una técnica que en algunos sitios webs puede ser ilegal, por lo que se recomienda hacer esto con webs propias o con permiso del propietario de la misma.

**Instalacion**

Usted necesitara de un manejador de paquetes de Nodejs (npm, pnpm, bun).
El programa maneja 3 dependencias:

- [Inquirer](https://www.npmjs.com/package/inquirer) @10.1.8
- [PlayWright](https://www.npmjs.com/package/playwright) @1.46.0
- [Picocolors](https://www.npmjs.com/package/picocolors) @1.0.1

*Si siente curiosidad por estas dependencias puede consultar la documentación de cada una como conocer más en la página de NPM*

Cada una cumple una función dentro del ciclo de ejecución explicado más adelante, *Inquirer* se usa para interactuar con usted a través de la terminal mediante preguntas; *Playwright* es bastante esencial, ya que es la dependencia atreves de la cual hacemos scraping; *Picocolors* se usa para embellecer las salidas en la terminal.

| npm | pnpm | bun|
|-------------|--------------|-------------|
| npm install | pnpm install | bun install |


**Funcionamiento**

Una vez usted ejecute el comando de inicio ```npm run index.mjs``` o ```npm run start``` (esto asumiendo que usa NPM en caso de que use otro la forma de ejecución no cambia mucho, puede verificar en la documentación de su manejador de paquetes), se le pedirá que inserte cierta información.

- Insert URL (inserte la url de la web)
- What do you want to do? (¿Que quieres hacer?)

Debería ver algo más o menos así:


![example](./src/example_for_readme.png)


La segunda pregunta le cuestiona que quiere hacer en la web, las opciones van desde tomar un screenshot hasta extraer todo el contenido HTML **(sin estilos)**.

**extract-html**

Si usted decide hacer una extracción del contenido HTML de la página señalada, deberá tener en cuenta que el tiempo de ejecución puede prologarse dependiendo la complejidad de la página.

Una vez el proceso inicié se accederá a la URL especificada y mediante la función ```page.content()``` de playWright se extraerá el contenido HTML, luego se guardará en un archivo ```.html``` en una carpeta llamada 'saved' en la carpeta raíz del proyecto. Dicha carpeta (saved) no está incluida en el repositorio, pero una vez usted ejecute el programa, recibirá una alerta y posteriormente se creará la carpeta antes mencionada (por lo que usted no tiene que preocuparse por la existencia de esta carpeta).

**processName function**

Dentro del archivo ```src\functions.mjs``` existe una función llamada processName, la misma se encarga de procesar el dominio de la página transformando todo a minúsculas y reemplazando los espacios por '_', para posteriormente ser usada en el archivo de guardado correspondiente (sea ```.png``` a la hora de tomar screeshot, como ```.html``` a la hora de extraer este contenido).