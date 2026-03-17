import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.02, location=(0,0,0.01))
sensor = bpy.context.active_object
mat_sensor = bpy.data.materials.new('Sensor')
mat_sensor.diffuse_color = (0.7, 0.7, 0.7, 1)
sensor.data.materials.append(mat_sensor)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.004, location=(0.008,0,0.012))
dot = bpy.context.active_object
mat_dot = bpy.data.materials.new('SensorDot')
mat_dot.diffuse_color = (1, 0, 0, 1)
dot.data.materials.append(mat_dot)
bpy.ops.object.select_all(action='DESELECT')
sensor.select_set(True)
dot.select_set(True)
bpy.context.view_layer.objects.active = sensor
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 