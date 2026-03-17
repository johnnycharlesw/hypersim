import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.22, location=(0,0,0.11))
obj = bpy.context.active_object
mat = bpy.data.materials.new('Cable')
mat.diffuse_color = (0.1, 0.1, 0.1, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 