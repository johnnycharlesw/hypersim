import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# LED body
bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.025, location=(0,0,0.012))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('LED_Body')
mat_body.diffuse_color = (0.1, 0.7, 0.1, 1)
body.data.materials.append(mat_body)
# Dome
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.009, location=(0,0,0.025))
dome = bpy.context.active_object
dome.scale[2] = 0.5
mat_dome = bpy.data.materials.new('LED_Dome')
mat_dome.diffuse_color = (0.8, 0.9, 0.8, 0.5)
dome.data.materials.append(mat_dome)
# Legs
for x in [-0.003, 0.003]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.001, depth=0.015, location=(x,0,0.005))
    leg = bpy.context.active_object
    mat_leg = bpy.data.materials.new('LED_Leg')
    mat_leg.diffuse_color = (0.7, 0.7, 0.7, 1)
    leg.data.materials.append(mat_leg)
# Join
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
dome.select_set(True)
for obj in bpy.context.scene.objects:
    if obj.name.startswith('Cylinder') and obj != body:
        obj.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 