-- Ej 4.1

SELECT
    p.titulo,
    d.nombre
    || ' '
    || d.apellidos AS dire_nombre,
    a.nombre
    || ' '
    || a.apellidos AS actor,
    r.personaje
FROM
         pelicula p
    JOIN director d ON d.id_director = p.id_director
    JOIN reparto  r ON r.id_pelicula = p.id_pelicula
    JOIN actor    a ON a.id_actor = r.id_actor
ORDER BY
    p.titulo;
    
    
-- Ej 4.2
SELECT
    d.nombre
    || ' '
    || d.apellidos AS dire_nombre,
    COUNT(*)       AS num_pelis
FROM
         director d
    JOIN pelicula p ON d.id_director = p.id_director
GROUP BY
    d.id_director,
    d.nombre,
    d.apellidos
HAVING
    COUNT(*) > 1;
    
-- Ej 4.3
-- Por ahora sin not exists
SELECT
    a.nombre
    || ' '
       || a.apellidos AS actor,
    p.genero
FROM
         actor a
    JOIN reparto  r ON r.id_actor = a.id_actor
    JOIN pelicula p ON p.id_pelicula = r.id_pelicula
WHERE
    p.genero <> 'Drama'