<!DOCTYPE HTML>
<html>
  <head>
    <title>Squarefeed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
  </head>
  <body>

    <div class="wrapper">

        <h1>Squarefeed</h1>

        <p>An extension of <a href="https://quinten.github.io/doodles/">doodles</a></p>

        <ul>{{getLinks()}}</ul>

        <p>Show all doodles in a <a href="player.html" target="_blank">loop</a> (hit enter on that page without clicking anywhere to go fullscreen)</p>

        <p>Check source code on <a href="https://github.com/Quinten/squarefeed">github</a></p>

    </div>

    <script>

        var invert = !(Math.random() > .5);
        var bgColor = (invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";
        var strokeColor = (!invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";

        var css = 'body { background: ' + bgColor + '; color: ' + strokeColor + '; } a, a:hover, a:active, a:link, a:visited { color: ' + strokeColor + ';}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);

    </script>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-86363810-1', 'auto');
        ga('send', 'pageview');
    </script>

  </body>
</html>
