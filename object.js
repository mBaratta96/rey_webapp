function drawLine(){

    var canvas = document.getElementById('canvas');
    var ctx=canvas.getContext('2d');
    var mouse={x:0,y:0}, down=false, lines=[]

    canvas.addEventListener("mousedown",function(e) {
        down=true
        mouse={x:e.pageX,y:e.pageY}

    },false);

    canvas.addEventListener("mousemove",function(e) {
        this.width=this.width
        lines.map(function(item){
            ctx.beginPath()
            ctx.moveTo(item[0].x, item[0].y);
            ctx.lineTo(item[1].x, item[1].y);
            ctx.stroke();
        })
        if(down){
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop);
            ctx.stroke()
        }

    },false);

    canvas.addEventListener("mouseup",function(e) {
        down=false
        this.width=this.width
        lines.push([{x:mouse.x,y:mouse.y},{x:e.pageX-this.offsetLeft,y:e.pageY-this.offsetTop}])
        lines.map(function(item){
            ctx.beginPath()
            ctx.moveTo(item[0].x, item[0].y);
            ctx.lineTo(item[1].x, item[1].y);
            ctx.stroke();
        })
    },false);
}