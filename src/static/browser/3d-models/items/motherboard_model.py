import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.14, location=(0,0,0.01))
board = bpy.context.active_object
board.scale[2] = 0.05
mat_board = bpy.data.materials.new('Motherboard')
mat_board.diffuse_color = (0.1, 0.5, 0.1, 1)
board.data.materials.append(mat_board)
for x, y in [(-0.03, 0.03), (0.04, -0.02), (0.02, 0.04)]:
    bpy.ops.mesh.primitive_cube_add(size=0.02, location=(x, y, 0.02))
    chip = bpy.context.active_object
    mat_chip = bpy.data.materials.new('Chip')
    mat_chip.diffuse_color = (0.2, 0.2, 0.2, 1)
    chip.data.materials.append(mat_chip)
bpy.ops.object.select_all(action='DESELECT')
board.select_set(True)
for obj in bpy.context.scene.objects:
    if obj != board:
        obj.select_set(True)
bpy.context.view_layer.objects.active = board
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 