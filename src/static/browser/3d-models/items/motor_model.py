import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.03, location=(0,0,0.015))
motor = bpy.context.active_object
mat_motor = bpy.data.materials.new('Motor')
mat_motor.diffuse_color = (0.7, 0.7, 0.7, 1)
motor.data.materials.append(mat_motor)
bpy.ops.mesh.primitive_cylinder_add(radius=0.004, depth=0.018, location=(0,0,0.039))
shaft = bpy.context.active_object
mat_shaft = bpy.data.materials.new('Shaft')
mat_shaft.diffuse_color = (0.1, 0.1, 0.1, 1)
shaft.data.materials.append(mat_shaft)
bpy.ops.object.select_all(action='DESELECT')
motor.select_set(True)
shaft.select_set(True)
bpy.context.view_layer.objects.active = motor
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 