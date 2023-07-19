### Important formulas in this chapter

*basic trigonometric functions*
_sine of angle = opposite / hypotenuse_
_cosine of angle = adjacent / hypotenuse_
_tangent of angle = opposite / adjacent_

*convet radians to degrees and degrees to radians*
_radians = degrees * Math.PI / 180_
_degrees = radians * 180 / Math.PI_


*rotate to the mouse (or any point)
_dx = mouse.x - obj.x_
_dy = mouse.y - obj.y_
_rotation = Math.aran2(dy, dx) * 180 / Math.PI_


*create waves*
_value = center + Math.sin(angle) * range_
_angle += speed_


*create circles*
_x_pos = centreX + Math.cos(angle) * radius_
_y_pox = centreY + Math.sin(angle) * radius_


*create ovals*
_x_pox = centreX + Math.cos(angle) * radiusX_
_y_pox = centreY + Math.sin(angle) * radiusY_


*get the distance between two points*
_dx = x2 - x1_
_dy = y2 - y1_
_dist = Math.sqrt(dx*dx + dy*dy)_