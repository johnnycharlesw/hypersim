import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.03, location=(0,0,0.01))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('CameraBody')
mat_body.diffuse_color = (0.1, 0.1, 0.1, 1)
body.data.materials.append(mat_body)
bpy.ops.mesh.primitive_cylinder_add(radius=0.007, depth=0.01, location=(0.012,0,0.012))
lens = bpy.context.active_object
mat_lens = bpy.data.materials.new('CameraLens')
mat_lens.diffuse_color = (0.7, 0.7, 0.7, 1)
lens.data.materials.append(mat_lens)
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
lens.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 