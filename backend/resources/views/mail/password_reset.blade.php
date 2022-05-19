<div style='display: flex'>
    <img src="{{ $message->embed(public_path() . '/images/logo.png') }}" alt="Mesta" width="30" height="30" />
    <h1 style='display:block; color: #0f172a; margin:0px 0px 0px 5px;'>
        Mesta
    </h1>
</div>
<p>Please <a href="http://localhost:4200/reset-password?token={{$token}}">click</a> here for restore
    your password</p>
También puede utilizar este link <a href="http://localhost:4200/reset-password?token={{$token}}">http://localhost:4200/reset-password?token={{$token}}</a>