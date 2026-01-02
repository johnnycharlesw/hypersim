import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.14, location=(0,0,0.07))
screen = bpy.context.active_object
screen.scale[1] = 0.05
screen.scale[2] = 0.7
mat_screen = bpy.data.materials.new('Screen')
mat_screen.diffuse_color = (0.1, 0.1, 0.1, 1)
screen.data.materials.append(mat_screen)
bpy.ops.mesh.primitive_cylinder_add(radius=0.015, depth=0.04, location=(0,0,-0.01))
stand = bpy.context.active_object
mat_stand = bpy.data.materials.new('Stand')
mat_stand.diffuse_color = (0.7, 0.7, 0.7, 1)
stand.data.materials.append(mat_stand)
bpy.ops.object.select_all(action='DESELECT')
screen.select_set(True)
stand.select_set(True)
bpy.context.view_layer.objects.active = screen
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 