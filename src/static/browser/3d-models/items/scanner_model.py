import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.05, location=(0,0,0.012))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('ScannerBody')
mat_body.diffuse_color = (0.7, 0.7, 0.7, 1)
body.data.materials.append(mat_body)
bpy.ops.mesh.primitive_cube_add(size=0.05, location=(0,0,0.022))
lid = bpy.context.active_object
lid.scale[2] = 0.2
mat_lid = bpy.data.materials.new('ScannerLid')
mat_lid.diffuse_color = (0.1, 0.1, 0.1, 1)
lid.data.materials.append(mat_lid)
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
lid.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 