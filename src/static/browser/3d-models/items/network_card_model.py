import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,0,0.01))
card = bpy.context.active_object
card.scale[1] = 0.3
card.scale[2] = 0.1
mat_card = bpy.data.materials.new('NetCard')
mat_card.diffuse_color = (0.1, 0.5, 0.1, 1)
card.data.materials.append(mat_card)
bpy.ops.mesh.primitive_cube_add(size=0.02, location=(0.02,0,0.02))
chip = bpy.context.active_object
mat_chip = bpy.data.materials.new('Chip')
mat_chip.diffuse_color = (0.1, 0.1, 0.1, 1)
chip.data.materials.append(mat_chip)
bpy.ops.mesh.primitive_cube_add(size=0.09, location=(0,-0.04,0.01))
gold = bpy.context.active_object
gold.scale[1] = 0.05
gold.scale[2] = 0.1
mat_gold = bpy.data.materials.new('GoldEdge')
mat_gold.diffuse_color = (0.8, 0.7, 0.2, 1)
gold.data.materials.append(mat_gold)
bpy.ops.object.select_all(action='DESELECT')
card.select_set(True)
chip.select_set(True)
gold.select_set(True)
bpy.context.view_layer.objects.active = card
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 