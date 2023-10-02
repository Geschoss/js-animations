### Velocity
_speed in a perticular direction_

*vector*
has _magnitude_ and _direction_


*convert angular velocity to x, y velocity*
```
vx = speed * Math.cos(angle)
vy = speed * Math.sin(angle)
```

*convert angular acceleration to x, y acceleration*
```
ax = force * Math.cos(angle)
ay = force * Math.sin(angle)
```

*Add acceleration to velocity*
```
vx += ax
vy += ay
```

*add velocity to position*
```
object.x += vx
object.y += vy
```
