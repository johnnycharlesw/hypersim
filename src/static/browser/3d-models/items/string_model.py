import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_torus_add(major_radius=0.11, minor_radius=0.01, location=(0,0,0.01))
obj = bpy.context.active_object
mat = bpy.data.materials.new('String')
mat.diffuse_color = (0.7, 0.6, 0.4, 1)
obj.data.materials.append(mat)
bpy.ops.object.shade_smooth() 