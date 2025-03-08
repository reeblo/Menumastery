<?php
$servername = "localhost";  // Usualmente localhost
$username = "root";        // Nombre de usuario en XAMPP
$password = "";            // Contraseña en XAMPP suele ser vacía
$dbname = "menumastery";   // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos!";
}

?>



