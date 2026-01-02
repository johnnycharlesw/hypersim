import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.004, depth=0.18, location=(0,0,0.09))
cable = bpy.context.active_object
mat_cable = bpy.data.materials.new('Cable')
mat_cable.diffuse_color = (0.1, 0.1, 0.1, 1)
cable.data.materials.append(mat_cable)
bpy.ops.mesh.primitive_cube_add(size=0.012, location=(0,0,0.18))
conn = bpy.context.active_object
conn.scale[1] = 0.5
mat_conn = bpy.data.materials.new('Connector')
mat_conn.diffuse_color = (0.7, 0.7, 0.7, 1)
conn.data.materials.append(mat_conn)
bpy.ops.object.select_all(action='DESELECT')
cable.select_set(True)
conn.select_set(True)
bpy.context.view_layer.objects.active = cable
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 