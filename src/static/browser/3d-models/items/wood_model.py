import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.32, location=(0,0,0.16))
obj = bpy.context.active_object
mat = bpy.data.materials.new('Wood')
mat.diffuse_color = (0.4, 0.25, 0.1, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 