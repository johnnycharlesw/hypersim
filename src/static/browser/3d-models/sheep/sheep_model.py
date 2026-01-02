import bpy
from math import radians

pose = 'standing'  # 'standing', 'sitting', 'lying'

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
clear_scene()

def make_material(name, color, spec=0.5):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.specular_intensity = spec
    return mat
wool_mat = make_material('Wool', (0.9, 0.9, 0.8))
skin_mat = make_material('Skin', (0.7, 0.6, 0.5))
eyemat = make_material('Eye', (0.1, 0.1, 0.1), 1.0)

# Body
body_loc = (0, 0, 0.35)
if pose == 'sitting': body_loc = (0, 0, 0.25)
elif pose == 'lying': body_loc = (0, 0, 0.15)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.18, location=body_loc)
body = bpy.context.active_object
body.scale[1] = 1.3
body.data.materials.append(wool_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
body.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Head
head_loc = (0, 0.23, body_loc[2] + 0.13)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.09, location=head_loc)
head = bpy.context.active_object
head.scale[1] = 1.2
head.data.materials.append(skin_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
head.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Ears
for x in [-0.07, 0.07]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.025, depth=0.08, location=(x, head_loc[1] + 0.03, head_loc[2] + 0.03), rotation=(radians(-30), 0, 0))
    ear = bpy.context.active_object
    ear.data.materials.append(skin_mat)
    bpy.ops.object.shade_smooth()

# Eyes
for x in [-0.03, 0.03]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.014, location=(x, head_loc[1] + 0.06, head_loc[2] + 0.03))
    eye = bpy.context.active_object
    eye.data.materials.append(eyemat)
    bpy.ops.object.shade_smooth()

# Legs
leg_z = 0.09
for x in [-0.07, 0.07]:
    for y in [-0.09, 0.09]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.18, location=(x, y, leg_z))
        leg = bpy.context.active_object
        leg.data.materials.append(skin_mat)
        bpy.ops.object.shade_smooth()

# Tail
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.03, location=(0, -0.16, body_loc[2] + 0.01))
tail = bpy.context.active_object
tail.data.materials.append(wool_mat)
bpy.ops.object.shade_smooth()

# Join all parts
bpy.ops.object.select_all(action='DESELECT')
for obj in bpy.context.scene.objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.modifier_add(type='SUBSURF')
bpy.context.active_object.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth() 