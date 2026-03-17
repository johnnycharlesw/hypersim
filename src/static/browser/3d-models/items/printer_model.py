import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.05, location=(0,0,0.025))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('PrinterBody')
mat_body.diffuse_color = (0.7, 0.7, 0.7, 1)
body.data.materials.append(mat_body)
bpy.ops.mesh.primitive_cube_add(size=0.05, location=(0,0.02,0.01))
tray = bpy.context.active_object
tray.scale[2] = 0.2
mat_tray = bpy.data.materials.new('PrinterTray')
mat_tray.diffuse_color = (0.1, 0.1, 0.1, 1)
tray.data.materials.append(mat_tray)
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
tray.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 