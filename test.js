registerPaint('polygon-border', class {

    static get inputProperties() {
        return [
            '--path',
            '--border'
        ]
    }

    paint(ctx, size, properties) {
        const points = properties.get('--path').toString().split(',');
        const b = parseFloat(properties.get('--border').value);
        const w = size.width;
        const h = size.height;

        const cc = function (x, y) {
            var fx = 0, fy = 0;
            if (x.indexOf('%') > -1) {
                fx = (parseFloat(x) / 100) * w;
            } else if (x.indexOf('px') > -1) {
                fx = parseFloat(x);
            }
            if (y.indexOf('%') > -1) {
                fy = (parseFloat(y) / 100) * h;
            } else if (y.indexOf('px') > -1) {
                fy = parseFloat(y);
            }
            return [fx, fy];
        }

        var p = points[0].trim().split(" ");
        p = cc(p[0], p[1]);
        ctx.beginPath();
        //ctx.setLineDash(d);
        ctx.moveTo(p[0], p[1]);

        var count=0
        ctx.lineWidth = 2 * b;
        for (var i = 1; i < points.length; i++) {
            p = points[i].trim().split(" ");
            p = cc(p[0], p[1]);
            if(count<3){
                ctx.strokeStyle = "red";
                console.log("hi"+count)
                count++
            }
            else{
                ctx.strokeStyle = '#000';
            }
            ctx.lineTo(p[0], p[1]);
        }
        
        
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    }

})