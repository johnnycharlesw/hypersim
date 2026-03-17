import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.025, location=(0,0,0.01))
obj = bpy.context.active_object
obj.scale[2] = 0.4
mat = bpy.data.materials.new('ThermalPaste')
mat.diffuse_color = (0.7, 0.7, 0.8, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 