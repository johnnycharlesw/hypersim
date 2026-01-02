import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# Body
bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.025, location=(0,0,0.012))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('Mic_Body')
mat_body.diffuse_color = (0.1, 0.1, 0.1, 1)
body.data.materials.append(mat_body)
# Mesh top
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.009, location=(0,0,0.025))
top = bpy.context.active_object
top.scale[2] = 0.5
mat_top = bpy.data.materials.new('Mic_Top')
mat_top.diffuse_color = (0.8, 0.8, 0.8, 1)
top.data.materials.append(mat_top)
# Join
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
top.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 