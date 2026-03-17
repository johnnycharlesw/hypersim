import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.08, location=(0,0,0.04))
blade = bpy.context.active_object
blade.scale[0] = 0.15
blade.scale[1] = 0.02
blade.scale[2] = 0.02
mat_blade = bpy.data.materials.new('Blade')
mat_blade.diffuse_color = (0.7, 0.7, 0.7, 1)
blade.data.materials.append(mat_blade)
bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.06, location=(0,0.04,0.02))
handle = bpy.context.active_object
mat_handle = bpy.data.materials.new('Handle')
mat_handle.diffuse_color = (0.4, 0.2, 0.1, 1)
handle.data.materials.append(mat_handle)
bpy.ops.object.select_all(action='DESELECT')
blade.select_set(True)
handle.select_set(True)
bpy.context.view_layer.objects.active = blade
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 