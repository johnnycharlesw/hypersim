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
fur_mat = make_material('Fur', (0.5, 0.3, 0.15))
eyemat = make_material('Eye', (0.1, 0.1, 0.1), 1.0)
mane_mat = make_material('Mane', (0.1, 0.1, 0.1), 0.7)

# Body
body_loc = (0, 0, 0.55)
if pose == 'sitting': body_loc = (0, 0, 0.40)
elif pose == 'lying': body_loc = (0, 0, 0.25)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.22, location=body_loc)
body = bpy.context.active_object
body.scale[1] = 1.7
body.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
body.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Chest
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.13, location=(0, 0.28, body_loc[2] + 0.05))
chest = bpy.context.active_object
chest.scale[1] = 1.2
chest.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
chest.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Hips
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.13, location=(0, -0.32, body_loc[2] - 0.05))
hips = bpy.context.active_object
hips.scale[1] = 1.1
hips.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
hips.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Neck
neck_loc = (0, 0.32, body_loc[2] + 0.23)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.10, location=neck_loc)
neck = bpy.context.active_object
neck.scale[1] = 1.7
neck.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
neck.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Head
head_loc = (0, 0.55, body_loc[2] + 0.32)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.09, location=head_loc)
head = bpy.context.active_object
head.scale[1] = 1.2
head.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
head.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Muzzle
bpy.ops.mesh.primitive_cylinder_add(radius=0.045, depth=0.18, location=(0, head_loc[1] + 0.09, head_loc[2]), rotation=(radians(90), 0, 0))
muzzle = bpy.context.active_object
muzzle.data.materials.append(fur_mat)
bpy.ops.object.shade_smooth()

# Nostrils
for x in [-0.015, 0.015]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.012, location=(x, head_loc[1] + 0.18, head_loc[2]))
    nostril = bpy.context.active_object
    nostril.data.materials.append(eyemat)
    bpy.ops.object.shade_smooth()

# Eyes
for x in [-0.03, 0.03]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.018, location=(x, head_loc[1] + 0.04, head_loc[2] + 0.03))
    eye = bpy.context.active_object
    eye.data.materials.append(eyemat)
    bpy.ops.object.shade_smooth()

# Ears
for x in [-0.045, 0.045]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.025, depth=0.11, location=(x, head_loc[1] + 0.01, head_loc[2] + 0.08), rotation=(radians(-20), 0, 0))
    ear = bpy.context.active_object
    ear.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()

# Mane
bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.38, location=(0, 0.38, body_loc[2] + 0.36), rotation=(radians(90), 0, 0.2))
mane = bpy.context.active_object
mane.data.materials.append(mane_mat)
bpy.ops.object.shade_smooth()

# Legs
leg_z = 0.13
for x in [-0.09, 0.09]:
    for y in [-0.13, 0.13]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=0.38, location=(x, y, leg_z))
        leg = bpy.context.active_object
        leg.data.materials.append(fur_mat)
        bpy.ops.object.shade_smooth()

# Hooves
for x in [-0.09, 0.09]:
    for y in [-0.13, 0.13]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.022, depth=0.07, location=(x, y, leg_z - 0.22))
        hoof = bpy.context.active_object
        hoof.data.materials.append(mane_mat)
        bpy.ops.object.shade_smooth()

# Tail
bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.22, location=(0, -0.38, body_loc[2] + 0.08), rotation=(0.7, 0, 0.2))
tail = bpy.context.active_object
tail.data.materials.append(mane_mat)
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