<!DOCTYPE HTML>
<html>
  <head>
    <title>De nacht van het vierkant</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
  </head>
  <body>

    <div class="wrapper">

        <h1>De nacht van het vierkant</h1>

        <ul>{{getLinks()}}</ul>

        <p>Speel alles af in een <a href="player.html">loop</a></p>

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
