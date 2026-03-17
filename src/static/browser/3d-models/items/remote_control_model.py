import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.06, location=(0,0,0.01))
remote = bpy.context.active_object
remote.scale[1] = 0.3
remote.scale[2] = 0.1
mat_remote = bpy.data.materials.new('Remote')
mat_remote.diffuse_color = (0.1, 0.1, 0.1, 1)
remote.data.materials.append(mat_remote)
# Buttons
for i, color in enumerate([(1,0,0,1), (0,1,0,1), (0,0,1,1), (1,1,0,1)]):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.006, location=(0.015*i-0.022,0.012,0.022))
    btn = bpy.context.active_object
    mat_btn = bpy.data.materials.new(f'Btn{i}')
    mat_btn.diffuse_color = color
    btn.data.materials.append(mat_btn)
bpy.ops.object.select_all(action='DESELECT')
remote.select_set(True)
for obj in bpy.context.scene.objects:
    if obj.name.startswith('Sphere'):
        obj.select_set(True)
bpy.context.view_layer.objects.active = remote
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 