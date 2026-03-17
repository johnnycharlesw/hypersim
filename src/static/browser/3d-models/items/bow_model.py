import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.01, depth=0.32, location=(0,0,0.16), rotation=(0,0,0.7))
obj = bpy.context.active_object
mat = bpy.data.materials.new('Bow')
mat.diffuse_color = (0.5, 0.3, 0.1, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 