import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.11, location=(0,0,0.01))
card = bpy.context.active_object
card.scale[1] = 0.3
card.scale[2] = 0.1
mat_card = bpy.data.materials.new('GPU')
mat_card.diffuse_color = (0.1, 0.5, 0.1, 1)
card.data.materials.append(mat_card)
bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.02, location=(0.03,0,0.02))
fan = bpy.context.active_object
mat_fan = bpy.data.materials.new('Fan')
mat_fan.diffuse_color = (0.1, 0.1, 0.1, 1)
fan.data.materials.append(mat_fan)
bpy.ops.mesh.primitive_cube_add(size=0.11, location=(0,-0.03,0.01))
gold = bpy.context.active_object
gold.scale[1] = 0.05
gold.scale[2] = 0.1
mat_gold = bpy.data.materials.new('GoldEdge')
mat_gold.diffuse_color = (0.8, 0.7, 0.2, 1)
gold.data.materials.append(mat_gold)
bpy.ops.object.select_all(action='DESELECT')
card.select_set(True)
fan.select_set(True)
gold.select_set(True)
bpy.context.view_layer.objects.active = card
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 