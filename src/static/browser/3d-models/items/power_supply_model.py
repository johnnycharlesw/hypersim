import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,0,0.045))
psu = bpy.context.active_object
mat_psu = bpy.data.materials.new('PSU')
mat_psu.diffuse_color = (0.7, 0.7, 0.7, 1)
psu.data.materials.append(mat_psu)
bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.01, location=(0,0.045,0.07))
gril = bpy.context.active_object
mat_gril = bpy.data.materials.new('Grill')
mat_gril.diffuse_color = (0.1, 0.1, 0.1, 1)
gril.data.materials.append(mat_gril)
bpy.ops.object.select_all(action='DESELECT')
psu.select_set(True)
gril.select_set(True)
bpy.context.view_layer.objects.active = psu
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 