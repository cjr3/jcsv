/**
 * JavaScript library for easily creating CSV files
 * directly in the browser.
 * 
 * Usage:
 * $jcsv.create('filename.csv', [ [value1, value2], [value1, value2], ...... ])
 */
 $jcsv = (function(){
    const jcsv = {
        columns:[],
        lines:[],
        lasturl:null,
        linefeed:"\n",
        add(line) {
            var index = this.lines.length;
            this.lines.push(line);
            return index;
        },

        update(index, line) {
            this.lines[index] = line;
        },

        url() {
            var text = "";
            for(var i=0, len=this.lines.length; i < len;) {
                text += this.combine(this.lines[i]);
                i++;
                if(this.lines[i])
                    text += this.linefeed;
            }
            
            var data = new Blob([text], {type:'text/csv'});
            this.clear();
            this.lasturl = window.URL.createObjectURL(data);
            return this.lasturl;
        },

        combine(line) {
            var str = "";
            for(var i=0, len=line.length; i < len;) {
                var v = line[i];
                if(typeof(v) === "number")
                    str += v;
                else
                    str += "\"" + line[i] + "\"";

                i++;
                if(line[i])
                    str += ",";
            }
            return str;
        },

        clear() {
            try {
                window.URL.revokeObjectURL( this.lasturl );
            } catch(er) {

            }
        },

        async download(filename) {
            var a = document.createElement('a');
            a.href = this.lasturl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        create(filename, lines) {
            this.lines = lines;
            this.url();
            this.download(filename);
        }
    };

    return jcsv;
 }());
