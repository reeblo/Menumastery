<?php
session_start(); // Iniciar sesión para recordar al usuario
include('conexion.php'); // Conectar a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = isset($_POST['email']) ? trim($_POST['email']) : '';
    $contrasena = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($correo) || empty($contrasena)) {
        die("Todos los campos son obligatorios.");
    }

    // Buscar el usuario en la base de datos
    $sql = $conn->prepare("SELECT id, nombre, contraseña FROM usuarios WHERE correo = ?");
    $sql->bind_param("s", $correo);
    $sql->execute();
    $sql->store_result();

    // Si el usuario existe
    if ($sql->num_rows > 0) {
        $sql->bind_result($id, $nombre, $hashed_password);
        $sql->fetch();

        // Verificar la contraseña
        if (password_verify($contrasena, $hashed_password)) {
            $_SESSION['usuario_id'] = $id;
            $_SESSION['usuario_nombre'] = $nombre;
            $_SESSION['usuario_correo'] = $correo;
            echo "Inicio de sesión exitoso!";
            header("Location: index.html"); // Redirigir al usuario al inicio
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "No existe una cuenta con este correo.";
    }

    $sql->close();
    $conn->close();
}
?>
