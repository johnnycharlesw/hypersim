import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.18, location=(0,0,0.09))
handle = bpy.context.active_object
mat_handle = bpy.data.materials.new('TorchHandle')
mat_handle.diffuse_color = (0.5, 0.3, 0.1, 1)
handle.data.materials.append(mat_handle)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.03, location=(0,0,0.19))
flame = bpy.context.active_object
mat_flame = bpy.data.materials.new('Flame')
mat_flame.diffuse_color = (1, 0.9, 0.2, 1)
flame.data.materials.append(mat_flame)
bpy.ops.object.select_all(action='DESELECT')
handle.select_set(True)
flame.select_set(True)
bpy.context.view_layer.objects.active = handle
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 