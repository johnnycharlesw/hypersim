import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.08, location=(0,0,0.16))
blade = bpy.context.active_object
blade.scale[0] = 0.08
blade.scale[1] = 0.02
blade.scale[2] = 0.7
mat_blade = bpy.data.materials.new('WoodBlade')
mat_blade.diffuse_color = (0.5, 0.3, 0.1, 1)
blade.data.materials.append(mat_blade)
bpy.ops.mesh.primitive_cube_add(size=0.04, location=(0,0,0.04))
crossguard = bpy.context.active_object
crossguard.scale[0] = 0.18
crossguard.scale[1] = 0.04
crossguard.scale[2] = 0.04
mat_guard = bpy.data.materials.new('Guard')
mat_guard.diffuse_color = (0.4, 0.2, 0.1, 1)
crossguard.data.materials.append(mat_guard)
bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.12, location=(0,0,-0.04))
handle = bpy.context.active_object
mat_handle = bpy.data.materials.new('Handle')
mat_handle.diffuse_color = (0.3, 0.2, 0.1, 1)
handle.data.materials.append(mat_handle)
bpy.ops.object.select_all(action='DESELECT')
blade.select_set(True)
crossguard.select_set(True)
handle.select_set(True)
bpy.context.view_layer.objects.active = blade
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 