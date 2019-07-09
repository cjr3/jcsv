# jcsv

JavaScript CSV Generator

A very simple implementation of generating a CSV file in JavaScript.

### Sample Usage
```
<!doctype html>
<html>
    <head>
        <title>JavaScript CSV</title>
        <script src="jcsv.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function() {

                var lines = [];
                for(var i=0; i < 10000; i++) {
                    let line = [];
                    for(var c=0; c < 100; c++) {
                        line.push(Math.random());
                    }
                    lines.push(line);
                }

                $jcsv.create("Users.csv", lines);
            });
        </script>
    </body>
</html>
```
