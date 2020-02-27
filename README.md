# Application-for-secure-message-delivery
App for secure message delivery with RSA encryption and digital signature
Descripcion del dise~no de la aplicacion:
El patron de arquitectura en el que esta basada CypherApp es el de MVC, el front y el back se encuentran
divididos. Para el Frontend se uso la tecnologa de React, mientras que para el Backend se uso el framework
de Rails.
Para cumplir con los requerimientos exigidos la idea que se llevo a cabo fue la de una aplicacion cuya
funcionalidad es la de servir como un medio seguro para la comunicacion de mensajes privados.
Dentro nuestra aplicacion un usuario tiene la posibilidad de crear un canal de comunicacion a traves del
cual puede `enviar' mensajes a otra persona. Los mensajes son cifrados y luego almacenados en la base de
datos para que puedan luego ser consultados por el destinatario usando las llaves requeridas, por lo que
solo la persona que conoce las claves puede acceder a la informacion del canal.
Otra de las razones por la que alguien usara nuestro servicio, seria para enviar mensajes a otra persona,
pero sin que esta pueda conocer su identidad o sus datos de contacto (lo que no pasara si se comunicara
por correo electronico).
El acceso a todos los canales es publico, por lo que cualquier persona puede entrar a cualquier canal y enviar
un mensaje si conoce las claves.
Debido a que el unico medio de autenticacion con el que se cuenta es la clave de cifrado y descifrado, se
hace necesario otro medio de autenticacion mejorar la seguridad y evitar el problema de suplantacion de
identidad que podra presentarse si una persona logra apoderarse de la clave y se hace pasar por la persona
que enva los mensajes que espera el destinatario. Por lo que se identico este como el escenario apropiado
y se decidio usar rmas digitales para solucionar el problema.
La aplicacion esta compuesta por dos modulos: el modulo de cifrado/descifrado y el modulo de los canales
de comunicacion. Dentro del modo de cifrado/descifrado se encuentra la funcionalidad original sin el uso
de rmas digitales, la cual es una version mas simplicada de la version completa que se encuentra dentro
del modulo de canales de comunicacion, la cual ofrece la funcionalidad de buscar canales y la que permite
la autenticacion del origen de los mensajes recibidos.
