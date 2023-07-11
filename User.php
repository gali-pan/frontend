<?php

class User {
  private $name;
  private $surname;
  private $email;
  private $id;

  function __construct($id, $name, $surname, $email)
  {
    $this->id = $id;
    $this->name = $name;
    $this->surname = $surname;
    $this->email = $email;
  }

  function getId() {return $this->id;}
  function getName() {return $this->name;}
  function getSurname() {return $this->surname;}
  function getEmail() {return $this->email;}

  //Статический метод добавления (регистрации) пользователя
  static function addUser($name, $surname, $email, $password) {
    global $mysqli;

    $email = mb_strtolower(trim($email));
    $password = trim($password);
    $password = password_hash($password, PASSWORD_DEFAULT);

    $result = $mysqli->query("SELECT * FROM `user` WHERE `email`='$email'");

    if ($result->num_rows != 0) {
      return json_encode(["result"=>"exist"]);
    } else {
      $mysqli->query("INSERT INTO `user`(`name`, `surname`, `email`, `password`) VALUES ('$name', '$surname', '$email', '$password')");
      return json_encode(["result"=>"success"]);
    }

  }
  //Статический метод авторизации пользователя
  static function authUser($email, $password) {
    global $mysqli;

    // $email = trim(mb_strtolower($_POST["email"]));
    // $password = trim($_POST ["password"]);
    
    $result = $mysqli->query("SELECT * FROM `user` WHERE `email`='$email'");
    $result = $result->fetch_assoc();


    // echo '<pre>'; print_r($result); echo '</pre>';

    if ($result) {
      $password_hash = $result["password"];
    if (password_verify($password, $password_hash)) {
      // echo("ok"); 
      $_SESSION["id"] = $result["id"];
      $_SESSION["name"] = $result["name"];
      $_SESSION["surname"] = $result["surname"];
      $_SESSION["email"] = $result["email"];
      return json_encode(["result"=>"success"]);
      } else {
        // echo "no";
        return json_encode(["result"=>"exit"]);
      }

    
  }
  else {
    // echo "no";
    return json_encode(["result"=>"exit"]);
  }

  
}
}
