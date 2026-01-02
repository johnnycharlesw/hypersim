import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.12, location=(0,0,0.02))
obj = bpy.context.active_object
obj.scale[2] = 0.1
mat = bpy.data.materials.new('Leather')
mat.diffuse_color = (0.5, 0.3, 0.15, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 