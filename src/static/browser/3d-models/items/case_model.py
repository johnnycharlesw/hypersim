import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.18, location=(0,0,0.09))
case = bpy.context.active_object
case.scale[1] = 0.5
mat_case = bpy.data.materials.new('Case')
mat_case.diffuse_color = (0.6, 0.6, 0.6, 1)
case.data.materials.append(mat_case)
bpy.ops.mesh.primitive_cube_add(size=0.18, location=(0,0.09,0.09))
front = bpy.context.active_object
front.scale[0] = 0.5
front.scale[1] = 0.05
front.scale[2] = 0.5
mat_front = bpy.data.materials.new('FrontPanel')
mat_front.diffuse_color = (0.1, 0.1, 0.1, 1)
front.data.materials.append(mat_front)
bpy.ops.object.select_all(action='DESELECT')
case.select_set(True)
front.select_set(True)
bpy.context.view_layer.objects.active = case
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 