import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# Speaker body
bpy.ops.mesh.primitive_cylinder_add(radius=0.02, depth=0.02, location=(0,0,0.01))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('Speaker_Body')
mat_body.diffuse_color = (0.1, 0.1, 0.1, 1)
body.data.materials.append(mat_body)
# Cone
bpy.ops.mesh.primitive_cone_add(radius1=0.018, depth=0.01, location=(0,0,0.015))
cone = bpy.context.active_object
mat_cone = bpy.data.materials.new('Speaker_Cone')
mat_cone.diffuse_color = (0.7, 0.7, 0.7, 1)
cone.data.materials.append(mat_cone)
# Join
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
cone.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 