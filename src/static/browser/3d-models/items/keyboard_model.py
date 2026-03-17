import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.12, location=(0,0,0.01))
board = bpy.context.active_object
board.scale[1] = 0.3
board.scale[2] = 0.1
mat_board = bpy.data.materials.new('Keyboard')
mat_board.diffuse_color = (0.1, 0.1, 0.1, 1)
board.data.materials.append(mat_board)
for i in range(-2, 3):
    bpy.ops.mesh.primitive_cube_add(size=0.02, location=(i*0.025, 0.03, 0.02))
    key = bpy.context.active_object
    mat_key = bpy.data.materials.new('Key')
    mat_key.diffuse_color = (1, 1, 1, 1)
    key.data.materials.append(mat_key)
bpy.ops.object.select_all(action='DESELECT')
board.select_set(True)
for obj in bpy.context.scene.objects:
    if obj != board:
        obj.select_set(True)
bpy.context.view_layer.objects.active = board
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 