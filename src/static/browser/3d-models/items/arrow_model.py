import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.01, depth=0.22, location=(0,0,0.11))
shaft = bpy.context.active_object
mat_shaft = bpy.data.materials.new('ArrowShaft')
mat_shaft.diffuse_color = (0.5, 0.3, 0.1, 1)
shaft.data.materials.append(mat_shaft)
bpy.ops.mesh.primitive_cone_add(radius1=0.02, depth=0.04, location=(0,0,0.23))
tip = bpy.context.active_object
mat_tip = bpy.data.materials.new('ArrowTip')
mat_tip.diffuse_color = (0.7, 0.7, 0.7, 1)
tip.data.materials.append(mat_tip)
bpy.ops.object.select_all(action='DESELECT')
shaft.select_set(True)
tip.select_set(True)
bpy.context.view_layer.objects.active = shaft
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 