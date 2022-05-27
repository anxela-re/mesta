<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mesta</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Monoton&amp;family=Open+Sans&amp;display=swap" rel="stylesheet">

    <!-- Styles -->
    <style>
        body {
            font-family: 'Open Sans';
        }
    </style>
</head>

<body>
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content:center">
        <div style='margin:auto; padding: 20px; margin: 20px; background-color: #0f172a; border-radius: 10px; color: #f4f4f4; align-self: center'>
            <div style='display: flex; justify-content:center'>
                <img src="{{ $message->embed(public_path() . '/images/logo-white.png') }}" alt="Mesta" width="30" height="30" style="align-self: center" />
                <h1 style='display:block; margin:0px 0px 0px 5px; font-family: Monoton, serif; font-weight: normal'>
                    Mesta
                </h1>
            </div>
            <h3> <span style="font-weight: bolder">From: </span> {{$name}} | {{$email}}</h3>
            <p>
                {{$body}}
            </p>

        </div>

    </div>


</body>