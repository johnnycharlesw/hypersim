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
fur_mat = make_material('Fur', (0.8, 0.7, 0.5))
eyemat = make_material('Eye', (0.1, 0.9, 0.1), 1.0)
nosemat = make_material('Nose', (0.2, 0.1, 0.1), 1.0)

# Body
body_loc = (0, 0, 0.32)
if pose == 'sitting': body_loc = (0, 0, 0.22)
elif pose == 'lying': body_loc = (0, 0, 0.12)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.13, location=body_loc)
body = bpy.context.active_object
body.scale[1] = 1.5
body.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
body.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Head
head_loc = (0, 0.22, body_loc[2] + 0.13)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.08, location=head_loc)
head = bpy.context.active_object
head.scale[1] = 1.1
head.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
head.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Muzzle
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.035, location=(0, head_loc[1] + 0.06, head_loc[2] - 0.01))
muzzle = bpy.context.active_object
muzzle.data.materials.append(fur_mat)
bpy.ops.object.shade_smooth()

# Nose
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.012, location=(0, head_loc[1] + 0.09, head_loc[2]))
nose = bpy.context.active_object
nose.data.materials.append(nosemat)
bpy.ops.object.shade_smooth()

# Eyes
for x in [-0.025, 0.025]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.012, location=(x, head_loc[1] + 0.05, head_loc[2] + 0.03))
    eye = bpy.context.active_object
    eye.data.materials.append(eyemat)
    bpy.ops.object.shade_smooth()

# Ears
for x in [-0.045, 0.045]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.025, depth=0.09, location=(x, head_loc[1] + 0.01, head_loc[2] + 0.08), rotation=(radians(-20), 0, 0))
    ear = bpy.context.active_object
    ear.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()

# Legs
leg_z = 0.07
for x in [-0.06, 0.06]:
    for y in [-0.08, 0.08]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.16, location=(x, y, leg_z))
        leg = bpy.context.active_object
        leg.data.materials.append(fur_mat)
        bpy.ops.object.shade_smooth()

# Tail
bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.28, location=(0, -0.16, body_loc[2] + 0.08), rotation=(0.7, 0, 0.2))
tail = bpy.context.active_object
tail.data.materials.append(fur_mat)
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