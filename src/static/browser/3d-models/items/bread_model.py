import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.09, location=(0,0,0.09))
obj = bpy.context.active_object
obj.scale[2] = 0.5
mat = bpy.data.materials.new('Bread')
mat.diffuse_color = (0.8, 0.6, 0.3, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 