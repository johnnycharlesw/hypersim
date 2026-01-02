import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.018, location=(0,0,0.01))
chip = bpy.context.active_object
mat_chip = bpy.data.materials.new('Microchip')
mat_chip.diffuse_color = (0.1, 0.1, 0.1, 1)
chip.data.materials.append(mat_chip)
for x in [-0.007, 0.007]:
    for y in [-0.004, 0.004]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.001, depth=0.006, location=(x,y,0.004))
        leg = bpy.context.active_object
        leg.rotation_euler[0] = 1.57
        mat_leg = bpy.data.materials.new('ChipLeg')
        mat_leg.diffuse_color = (0.7, 0.7, 0.7, 1)
        leg.data.materials.append(mat_leg)
bpy.ops.object.select_all(action='DESELECT')
chip.select_set(True)
for obj in bpy.context.scene.objects:
    if obj.name.startswith('Cylinder'):
        obj.select_set(True)
bpy.context.view_layer.objects.active = chip
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 