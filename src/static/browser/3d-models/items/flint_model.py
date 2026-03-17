import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.07, location=(0,0,0.07))
obj = bpy.context.active_object
obj.scale[0] = 0.8
obj.scale[1] = 1.1
obj.scale[2] = 0.6
mat = bpy.data.materials.new('Flint')
mat.diffuse_color = (0.15, 0.15, 0.18, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 