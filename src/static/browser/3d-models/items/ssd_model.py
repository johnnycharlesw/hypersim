import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# Main body
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,0,0.01))
ssd = bpy.context.active_object
ssd.scale[2] = 0.12
mat_ssd = bpy.data.materials.new('SSD_Body')
mat_ssd.diffuse_color = (0.2, 0.2, 0.2, 1)
ssd.data.materials.append(mat_ssd)
# Label area
bpy.ops.mesh.primitive_cube_add(size=0.07, location=(0,0,0.021))
label = bpy.context.active_object
label.scale[2] = 0.01
mat_label = bpy.data.materials.new('SSD_Label')
mat_label.diffuse_color = (0.7, 0.7, 0.7, 1)
label.data.materials.append(mat_label)
# Chips
for x in [-0.025, 0.025]:
    bpy.ops.mesh.primitive_cube_add(size=0.018, location=(x,0,0.017))
    chip = bpy.context.active_object
    chip.scale[2] = 0.5
    mat_chip = bpy.data.materials.new('SSD_Chip')
    mat_chip.diffuse_color = (0.1, 0.1, 0.1, 1)
    chip.data.materials.append(mat_chip)
# Join
bpy.ops.object.select_all(action='DESELECT')
ssd.select_set(True)
label.select_set(True)
for obj in bpy.context.scene.objects:
    if obj.name.startswith('Cube') and obj != ssd and obj != label:
        obj.select_set(True)
bpy.context.view_layer.objects.active = ssd
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 