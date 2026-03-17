import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.01, depth=0.04, location=(0,0,0.02))
screw = bpy.context.active_object
mat_screw = bpy.data.materials.new('Screw')
mat_screw.diffuse_color = (0.7, 0.7, 0.7, 1)
screw.data.materials.append(mat_screw)
bpy.ops.mesh.primitive_cube_add(size=0.018, location=(0,0,0.04))
cross1 = bpy.context.active_object
cross1.scale[0] = 1.5
cross1.scale[1] = 0.2
mat_cross = bpy.data.materials.new('Cross')
mat_cross.diffuse_color = (0.5, 0.5, 0.5, 1)
cross1.data.materials.append(mat_cross)
bpy.ops.mesh.primitive_cube_add(size=0.018, location=(0,0,0.04))
cross2 = bpy.context.active_object
cross2.scale[0] = 0.2
cross2.scale[1] = 1.5
cross2.data.materials.append(mat_cross)
bpy.ops.object.select_all(action='DESELECT')
screw.select_set(True)
cross1.select_set(True)
cross2.select_set(True)
bpy.context.view_layer.objects.active = screw
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 