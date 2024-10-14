# ByteWise - Backend

CILSA | Bootcamp Fullstack | Proyecto final

## Información del proyecto

Este fue el proyecto final del curso, donde pudimos poner en práctica los conocimientos que aprendimos así como también los que ya teníamos previamente, en un grupo donde pudimos compartir ideas para encontrar una propuesta con la que cumplimos los requerimientos del proyecto.

## Miembros del grupo

* Paola Fraticola ([@dgpaofraticola](https://github.com/dgpaofraticola))
* Ian Sosa ([@sosaian](https://github.com/sosaian))
* Evelin Suarez ([@evelinnn19](https://github.com/evelinnn19))

## Instalación del repositorio de manera local

<details>
  <summary>Instalación usando git clone 🔧</summary>

### Cómo clonar el proyecto

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias:

1. **Clonar el repositorio**    
    Ejecuta el siguiente comando en tu terminal, reemplazando `URL_DEL_PROYECTO` por el enlace del proyecto:

```sh
git clone URL_DEL_PROYECTO
```

2. **OPCIONAL - Cambiar de rama**   
    Ejecuta el siguiente comando en tu terminal, reemplazando `RAMA` por la rama a utilizar:

```sh
git checkout RAMA
```

### Cómo instalar las dependencias del proyecto

1. Ejecuta el siguiente comando en tu terminal:

```sh
npm install
```

_Nota: Puedes utilizar otro package manager si así lo deseas; procura revisar las `Tecnologías principales` y también las `Librerías` para comprobar que son compatibles primero_

### Cómo instalar la base de datos MySQL

1. **Instalar** los [programas necesarios](https://dev.mysql.com/downloads/installer/) para MySQL   
    _Nota: Procura anotar las credenciales de acceso si se configura alguna!_

2. **Abrir cliente CLI de MySQL**   
    _Nota: Esto puede hacerse también desde una interfaz gráfica como SQL Workbench o DBeaver, donde es probable que los pasos siguientes difieran de lo que deberías hacer. Sin embargo, recomendamos leer todos los pasos antes de continuar para poder entender la idea detrás de cada instrucción._

2. **Conectarse al servidor MySQL** 
    El mismo CLI (MySQL Command Line Client)

3. **Crear base de datos MySQL**    
    Ejecuta el siguiente comando en la terminal reemplazando `database_name` por el nombre de la base de datos:

```sql
CREATE DATABASE database_name;
```

4. **Ingresar a la base de datos**  
    Ejecuta el siguiente comando en la terminal reemplazando `database_name` por el nombre de la base de datos:

```sql
USE database_name;
```

5. **Crear tablas de la base de datos** 
    Ve al archivo `src/db/schemas.sql` para copiar cada sentencia que crea tablas de la base de datos. Procura ejecutar las sentencias en el orden en el que aparecen en el archivo.    
    
    _Nota: `schemas.sql` es un archivo pensado para crear la base de datos junto con todas las tablas si se ejecuta correctamente desde el mismo CLI o alguna GUI alternativa como las mencionadas antes. En esta explicación hacemos el proceso manual que puede ser el más consistente sin importar el entorno utilizado._

### Crear archivo `.env`

1. En la raíz del proyecto, crea un archivo llamado **.env**. Este archivo almacenará las variables de entorno utilizadas en el proyecto.
   
2. A continuación, define las variables de entorno que se mencionan en el archivo `config.js`. Cada variable debe seguir el formato clave-valor sin espacios alrededor del signo `=`.   
    
    _Nota: Para identificar cuales son las variables de entorno necesarias, dentro del archivo `config.js` aparecen muchas variables que surjen de la desestructuración del objeto `process.env`, de la misma forma que puede haber alguna variable individualmente exportada haciendo uso de `process.env` para casos donde se necesita convertir el valor a un tipo en particular para facilitar el uso en el código. Generalmente los nombres de estas variables de entorno se definen usando UPPER_SNAKE_CASE, denotando su inmutabilidad al ser prácticamente constantes._

#### Ejemplo de archivo `.env`

```sh
# Sintaxis de un archivo .env

# Las variables se definen como clave=valor
# Las cadenas de texto pueden tener comillas, pero no es obligatorio

VARIABLE_1=Valor de la variable 1   # Texto sin comillas
VARIABLE_2 = "2"                    # Texto con comillas (opcional)
VARIABLE_3=3                        # Valor numérico
```

### Iniciar servidor (en modo `dev`)

```sh
npm run dev
```
</details>

<details>
  <summary>Instalación descargando comprimido ZIP 🔧</summary>

## Instalación descargando comprimido ZIP 🔧

### Cómo descargar el proyecto

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias:

1. **Descargar el proyecto en formato ZIP** 
    Ir a “code” > download ZIP

2. **Descomprimir el archivo**

3. **OPCIONAL - Cambiar de rama**   
    Ejecuta el siguiente comando en tu terminal, reemplazando `RAMA` por la rama a utilizar:

```sh
git checkout RAMA
```

### Cómo instalar las dependencias del proyecto

1. En la carpeta donde se encuentra “package.json” ejecutar en terminal:

```sh
npm install
```

_Nota: Puedes utilizar otro package manager si así lo deseas; procura revisar las `Tecnologías principales` y también las `Librerías` para comprobar que son compatibles primero_

### Cómo instalar la base de datos MySQL

1. **Instalar** los [programas necesarios](https://dev.mysql.com/downloads/installer/) para MySQL   
    _Nota: Procura anotar las credenciales de acceso si se configura alguna!_

2. **Abrir cliente CLI de MySQL**   
    _Nota: Esto puede hacerse también desde una interfaz gráfica como SQL Workbench o DBeaver, donde es probable que los pasos siguientes difieran de lo que deberías hacer. Sin embargo, recomendamos leer todos los pasos antes de continuar para poder entender la idea detrás de cada instrucción._

2. **Conectarse al servidor MySQL** 
    El mismo CLI (MySQL Command Line Client)

3. **Crear base de datos MySQL**    
    Ejecuta el siguiente comando en la terminal reemplazando `database_name` por el nombre de la base de datos:

```sql
CREATE DATABASE database_name;
```

4. **Ingresar a la base de datos**  
    Ejecuta el siguiente comando en la terminal reemplazando `database_name` por el nombre de la base de datos:

```sql
USE database_name;
```

5. **Crear tablas de la base de datos** 
    Ve al archivo `src/db/schemas.sql` para copiar cada sentencia que crea tablas de la base de datos. Procura ejecutar las sentencias en el orden en el que aparecen en el archivo.    
    
    _Nota: `schemas.sql` es un archivo pensado para crear la base de datos junto con todas las tablas si se ejecuta correctamente desde el mismo CLI o alguna GUI alternativa como las mencionadas antes. En esta explicación hacemos el proceso manual que puede ser el más consistente sin importar el entorno utilizado._

### Crear archivo `.env`

1. En la raíz del proyecto, crea un archivo llamado **.env**. Este archivo almacenará las variables de entorno utilizadas en el proyecto.
   
2. A continuación, define las variables de entorno que se mencionan en el archivo `config.js`. Cada variable debe seguir el formato clave-valor sin espacios alrededor del signo `=`.   
    
    _Nota: Para identificar cuales son las variables de entorno necesarias, dentro del archivo `config.js` aparecen muchas variables que surjen de la desestructuración del objeto `process.env`, de la misma forma que puede haber alguna variable individualmente exportada haciendo uso de `process.env` para casos donde se necesita convertir el valor a un tipo en particular para facilitar el uso en el código. Generalmente los nombres de estas variables de entorno se definen usando UPPER_SNAKE_CASE, denotando su inmutabilidad al ser prácticamente constantes._

#### Ejemplo de archivo `.env`

```sh
# Sintaxis de un archivo .env

# Las variables se definen como clave=valor
# Las cadenas de texto pueden tener comillas, pero no es obligatorio

VARIABLE_1=Valor de la variable 1   # Texto sin comillas
VARIABLE_2 = "2"                    # Texto con comillas (opcional)
VARIABLE_3=3                        # Valor numérico
```

### Iniciar servidor (en modo `dev`)

```sh
npm run dev
```
</details>


## Tecnologías principales:

⚙ Node Js (v20.13.0 al momento de este commit)

⚙ MySQL (MySQL Community Server v8.0.33 al momento de este commit)


## Librerias:

Para que el proyecto se logre realizar de una manera esperada utilicé las siguientes herramientas:

📚 Express JS (`npm install express`)

📚 CORS (`npm install cors`)

📚 Dotenv (`npm install dotenv`)

📚 JSON Web Token (JWT) (`npm install jsonwebtoken`)

📚 Cookie-parser (`npm install cookie-parser`)

📚 Bcrypt (`npm install bcrypt`)

📚 MySQL (`npm install mysql2`)
