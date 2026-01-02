import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# Main body
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,0,0.01))
hd = bpy.context.active_object
hd.scale[2] = 0.2
mat_hd = bpy.data.materials.new('HDD_Body')
mat_hd.diffuse_color = (0.1, 0.1, 0.1, 1)
hd.data.materials.append(mat_hd)
# Silver top
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,0,0.02))
top = bpy.context.active_object
top.scale[2] = 0.05
mat_top = bpy.data.materials.new('HDD_Top')
mat_top.diffuse_color = (0.7, 0.7, 0.7, 1)
top.data.materials.append(mat_top)
# Platter
bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.005, location=(0.02,0,0.025))
platter = bpy.context.active_object
mat_platter = bpy.data.materials.new('HDD_Platter')
mat_platter.diffuse_color = (0.8, 0.8, 0.7, 1)
platter.data.materials.append(mat_platter)
# Join
bpy.ops.object.select_all(action='DESELECT')
hd.select_set(True)
top.select_set(True)
platter.select_set(True)
bpy.context.view_layer.objects.active = hd
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 