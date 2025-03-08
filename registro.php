<?php
// Verifica si los datos han sido enviados a través del método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    include('conexion.php');

    // Obtener los valores del formulario
    $new_name = isset($_POST['new-username']) ? trim($_POST['new-username']) : '';
    $correo = isset($_POST['new-email']) ? trim($_POST['new-email']) : '';
    $contrasena = isset($_POST['new-password']) ? $_POST['new-password'] : '';

    // Validar que los datos no estén vacíos
    if (empty($new_name) || empty($correo) || empty($contrasena)) {
        die("Todos los campos son obligatorios.");
    }

    //verificar que el correo no este duplicado
    $check_sql = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $check_sql ->bind_param("s", $correo);
    $check_sql ->execute();
    $check_sql ->store_result();

    if ($check_sql->num_rows > 0){
        die("Error: Este correo ya esta registrado.");
    }

    // Cifrar la contraseña (solo una vez)
    $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);

    // Insertar los datos en la base de datos
    $sql = $conn->prepare("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $new_name, $correo, $hashed_password);

    if ($sql->execute()) {
        echo "Registro exitoso!";
    } else {
        echo "Error: " . $sql->error;
    }

    // Cerrar la conexión
    $sql->close();
    $conn->close();
}
?>


