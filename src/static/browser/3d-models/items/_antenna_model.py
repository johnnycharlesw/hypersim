import bpy

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Create antenna
bpy.ops.mesh.primitive_cylinder_add(radius=0.003, depth=0.08, location=(0,0,0.04))
antenna = bpy.context.active_object
mat_antenna = bpy.data.materials.new('Antenna')
mat_antenna.diffuse_color = (0.7, 0.7, 0.7, 1)
antenna.data.materials.append(mat_antenna)

# Create tip
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.006, location=(0,0,0.08))
sphere = bpy.context.active_object
mat_sphere = bpy.data.materials.new('AntennaTip')
mat_sphere.diffuse_color = (0.9, 0.9, 0.9, 1)
sphere.data.materials.append(mat_sphere)

# Join if both exist
if antenna and sphere:
    bpy.ops.object.select_all(action='DESELECT')
    antenna.select_set(True)
    sphere.select_set(True)
    bpy.context.view_layer.objects.active = antenna
    bpy.ops.object.join()
    bpy.ops.object.shade_smooth()
else:
    print("Error: Could not create antenna or sphere object.")