import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.04, location=(0,0,0.04))
obj = bpy.context.active_object
obj.scale[1] = 1.3
obj.scale[2] = 0.7
mat = bpy.data.materials.new('Mouse')
mat.diffuse_color = (0.1, 0.1, 0.1, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 