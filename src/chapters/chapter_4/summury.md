### mathods

strokeStyle
fillStyle
lineWidth
save()
restore()
beginPath()
closePath()
stroke()
lineTo(x,y)
moveTo(x,y)
quadraticCurveTo(cpx,cpy,x,y)
bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
arcTo(x1,y1,x2,y2,radius)
arc(x,y,radius,startAngle,endAngle[,anticlockwise])
createLinearGradient(x0,y0,x1,y1)
createRadialGradient(x0,y0,r0,x1,y1,r1)
clearRect(x,y,width,height)
fillRect(x,y,width,height)

cpec https://html.spec.whatwg.org/dev/canvas.html

### Important formulas in this chapter

_convert decimal to hex_

```
decimalValue.toString(16)
```

_combine component colors_

```
color = red << 16 | green << 8 | blue
```

_extract component colors_

```
red = color24 >> 16 & 0xFF
green = color24 >> 8 & 0xFF
blue = color24 & 0xFF
```

_draw a curve through a point_

```
x1 = yt * 2 - (x0 + x2) / 2;
y1 = yt * 2 - (y0 + y2) / 2;
ctx.moveTo(x0, y0);
ctx.quadraticCurveTo(x1, y1, x2, y2);
```
