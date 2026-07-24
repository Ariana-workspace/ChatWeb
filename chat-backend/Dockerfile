#Utilizamos una imagen base de Eclipse Temurin con JDK 21 para ejecutar la aplicación Java.
FROM eclipse-temurin:21-jdk 

#Creamos un directorio de trabajo dentro del contenedor llamado /app. A partir de aquí, todas las instrucciones posteriores se ejecutarán en este directorio. Es como hacer cd /app en la terminal.
WORKDIR /app

#Ahora necesitamos meter nuestro proyecto dentro del contenedor. Para ello, copiamos todos los archivos y carpetas del directorio actual (donde se encuentra el Dockerfile) al directorio de trabajo dentro del contenedor (/app).
# Mi PC
# │
# ├── build.gradle
# ├── src
# ├── gradlew
# └── ...

# ↓

# Contenedor
# /app
# ├── build.gradle
# ├── src
# ├── gradlew
# └── ...

COPY . .

#El primer . significa desde la carpeta actual (donde se encuentra el Dockerfile) y el segundo . significa al directorio de trabajo dentro del contenedor (/app).


#Ahora necesitamos compilar nuestro proyecto Java. Para ello, ejecutamos el comando ./gradlew build dentro del contenedor. Este comando utiliza Gradle Wrapper (gradlew) para compilar el proyecto y generar los archivos necesarios para ejecutar la aplicación.
RUN chmod +x gradlew
RUN ./gradlew build -x test

#Exponemos el puerto 8080 del contenedor para que pueda ser accesible desde fuera del contenedor. Esto es útil si queremos acceder a la aplicación desde nuestro navegador o desde otra aplicación. Spring Boot, por defecto, utiliza el puerto 8080 para servir la aplicación web.
EXPOSE 8080

#Finalmente, definimos el comando que se ejecutará cuando se inicie el contenedor. En este caso, estamos utilizando el comando java -jar para ejecutar el archivo JAR generado por Gradle (build/libs/chat-backend-0.0.1-SNAPSHOT.jar). Este archivo JAR contiene nuestra aplicación Java y todas sus dependencias.
CMD ["java", "-jar", "build/libs/ariana-0.0.1-SNAPSHOT.jar"]
