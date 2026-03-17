import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.12, location=(0,0,0.06))
screen = bpy.context.active_object
screen.scale[1] = 0.05
screen.scale[2] = 0.7
mat_screen = bpy.data.materials.new('Screen')
mat_screen.diffuse_color = (0.1, 0.1, 0.1, 1)
screen.data.materials.append(mat_screen)
bpy.ops.mesh.primitive_cube_add(size=0.13, location=(0,0,0.06))
border = bpy.context.active_object
border.scale[1] = 0.052
border.scale[2] = 0.72
mat_border = bpy.data.materials.new('Border')
mat_border.diffuse_color = (0.5, 0.5, 0.5, 1)
border.data.materials.append(mat_border)
bpy.ops.object.select_all(action='DESELECT')
screen.select_set(True)
border.select_set(True)
bpy.context.view_layer.objects.active = screen
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 