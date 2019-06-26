<?php

// инициализация ядра, чтобы работала функция wp_mail()
require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php' );

// устанавливаем часовой пояс по умолчанию
date_default_timezone_set('Europe/Moscow');

$service = htmlspecialchars($_POST["service"]);
$full_name = htmlspecialchars($_POST["name"]);
$date_of_birth = htmlspecialchars($_POST["date-of-birth"]);
$place_of_birth = htmlspecialchars($_POST["place-of-birth"]);
$time_of_birth = htmlspecialchars($_POST["time-of-birth"]);
$country = htmlspecialchars($_POST["country"]);
$email = htmlspecialchars($_POST["email"]);
$form_of_payment = htmlspecialchars($_POST["form-of-payment"]);
$message = htmlspecialchars($_POST["message"]);
$date=date("d.m.Y");
$time=date("H:i");
$to = "sergeykonovalenko5550199@gmail.com";
$subject = "Новый заказ";

$message = "Оксана, Вам поступил новый заказ
    <br><br>
    <b>Хочет заказать:</b> $service<br>
    <b>ФИО:</b> $full_name<br>
    <b>Дата рождения:</b> $date_of_birth<br>
    <b>Место рождения:</b> $place_of_birth<br>
    <b>Время рождения:</b> $time_of_birth<br>
    <b>Страна, откуда выполняется оплата:</b> $country<br>
    <b>E-mail:</b> $email<br>
    <b>Форма оплаты:</b> $form_of_payment<br>
    <b>Сообщение:</b> $message<br>
    <b>Дата заказа:</b> $date<br>
    <b>Время заказа (по Москве):</b> $time<br>
    ";

$headers = 'content-type: text/html';

wp_mail( $to, $subject, $message, $headers);
