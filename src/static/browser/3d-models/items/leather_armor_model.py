import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.13, location=(0,0,0.08))
obj = bpy.context.active_object
obj.scale[0] = 0.7
obj.scale[1] = 1.0
obj.scale[2] = 1.2
mat = bpy.data.materials.new('LeatherArmor')
mat.diffuse_color = (0.5, 0.3, 0.15, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 