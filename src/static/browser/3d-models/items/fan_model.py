import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=0.02, location=(0,0,0.01))
frame = bpy.context.active_object
mat_frame = bpy.data.materials.new('FanFrame')
mat_frame.diffuse_color = (0.7, 0.7, 0.7, 1)
frame.data.materials.append(mat_frame)
for angle in [0, 0.785, 1.57, 2.355]:
    bpy.ops.mesh.primitive_cube_add(size=0.04, location=(0,0,0.01))
    blade = bpy.context.active_object
    blade.scale[0] = 2.5
    blade.scale[1] = 0.2
    blade.scale[2] = 0.1
    blade.rotation_euler[2] = angle
    mat_blade = bpy.data.materials.new('FanBlade')
    mat_blade.diffuse_color = (0.1, 0.1, 0.1, 1)
    blade.data.materials.append(mat_blade)
bpy.ops.object.select_all(action='DESELECT')
frame.select_set(True)
for obj in bpy.context.scene.objects:
    if obj != frame:
        obj.select_set(True)
bpy.context.view_layer.objects.active = frame
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 