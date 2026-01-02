import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.01, depth=0.28, location=(0,0,0.14))
rod = bpy.context.active_object
mat_rod = bpy.data.materials.new('Rod')
mat_rod.diffuse_color = (0.5, 0.3, 0.1, 1)
rod.data.materials.append(mat_rod)
bpy.ops.mesh.primitive_cylinder_add(radius=0.003, depth=0.18, location=(0,0.13,0.27), rotation=(0.7,0,0))
line = bpy.context.active_object
mat_line = bpy.data.materials.new('Line')
mat_line.diffuse_color = (0.7, 0.7, 0.7, 1)
line.data.materials.append(mat_line)
bpy.ops.object.select_all(action='DESELECT')
rod.select_set(True)
line.select_set(True)
bpy.context.view_layer.objects.active = rod
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 