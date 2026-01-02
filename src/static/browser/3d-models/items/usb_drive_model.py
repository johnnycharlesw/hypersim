import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.03, location=(0,0,0.01))
drive = bpy.context.active_object
drive.scale[1] = 0.4
mat_drive = bpy.data.materials.new('USBDrive')
mat_drive.diffuse_color = (0.1, 0.1, 0.1, 1)
drive.data.materials.append(mat_drive)
bpy.ops.mesh.primitive_cube_add(size=0.012, location=(0,0,0.022))
conn = bpy.context.active_object
conn.scale[1] = 0.5
mat_conn = bpy.data.materials.new('USBConn')
mat_conn.diffuse_color = (0.7, 0.7, 0.7, 1)
conn.data.materials.append(mat_conn)
bpy.ops.object.select_all(action='DESELECT')
drive.select_set(True)
conn.select_set(True)
bpy.context.view_layer.objects.active = drive
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 