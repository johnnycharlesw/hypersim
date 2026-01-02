import bpy
from math import radians

# Choose pose: 'standing', 'sitting', or 'lying'
pose = 'standing'  # Change to 'sitting' or 'lying' as desired

# --- Utility: Clear scene ---
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
clear_scene()

# --- Materials ---
def make_material(name, color, spec=0.5):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.specular_intensity = spec
    return mat
fur_mat = make_material('Fur', (0.6, 0.5, 0.3))
eyemat = make_material('Eye', (0.1, 0.1, 0.1), 1.0)
nosemat = make_material('Nose', (0.05, 0.05, 0.05), 1.0)

# --- Body ---
body_radius = 0.14
body_length = 0.95
body_loc = (0, 0, 0.38)
body_rot = (0, 0, 0)
if pose == 'sitting':
    body_loc = (0, 0, 0.28)
    body_rot = (0.18, 0, 0)
elif pose == 'lying':
    body_loc = (0, 0, 0.18)
    body_rot = (1.57, 0, 0)

bpy.ops.mesh.primitive_uv_sphere_add(radius=body_radius, location=body_loc)
body = bpy.context.active_object
body.name = 'Body'
body.scale[1] = body_length / (2 * body_radius)  # elongate
body.data.materials.append(fur_mat)

# Subdivide for smoothness
bpy.ops.object.modifier_add(type='SUBSURF')
body.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Chest (slight bulge) ---
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.11, location=(0, 0.18, body_loc[2] + 0.03))
chest = bpy.context.active_object
chest.scale[1] = 1.3
chest.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
chest.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Hips (slight bulge) ---
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.10, location=(0, -0.22, body_loc[2] - 0.01))
hips = bpy.context.active_object
hips.scale[1] = 1.2
hips.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
hips.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Neck ---
neck_radius = 0.07
neck_length = 0.18
neck_loc = (0, 0.19, body_loc[2] + 0.19)
bpy.ops.mesh.primitive_uv_sphere_add(radius=neck_radius, location=neck_loc)
neck = bpy.context.active_object
neck.scale[1] = 1.5
neck.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
neck.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Head ---
head_radius = 0.12
head_loc = (0, 0.36, body_loc[2] + 0.28)
bpy.ops.mesh.primitive_uv_sphere_add(radius=head_radius, location=head_loc)
head = bpy.context.active_object
head.scale[1] = 1.1
head.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
head.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Muzzle (elongated, slightly down) ---
muzzle_radius = 0.055
muzzle_length = 0.16
muzzle_loc = (0, head_loc[1] + 0.09, head_loc[2] - 0.03)
bpy.ops.mesh.primitive_uv_sphere_add(radius=muzzle_radius, location=muzzle_loc)
muzzle = bpy.context.active_object
muzzle.scale[1] = 1.7
muzzle.scale[2] = 0.8
muzzle.data.materials.append(fur_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
muzzle.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- Nose ---
nose_loc = (0, muzzle_loc[1] + 0.08, muzzle_loc[2] + 0.01)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.022, location=nose_loc)
nose = bpy.context.active_object
nose.data.materials.append(nosemat)
bpy.ops.object.shade_smooth()

# --- Eyes ---
eye_y = head_loc[1] + 0.04
eye_z = head_loc[2] + 0.04
for x in [-0.035, 0.035]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.017, location=(x, eye_y, eye_z))
    eye = bpy.context.active_object
    eye.data.materials.append(eyemat)
    bpy.ops.object.shade_smooth()

# --- Ears (tall, slightly back and out) ---
ear_angle = radians(30)
ear1_loc = (-0.06, head_loc[1] + 0.03, head_loc[2] + 0.13)
ear2_loc = (0.06, head_loc[1] + 0.03, head_loc[2] + 0.13)
bpy.ops.mesh.primitive_cone_add(radius1=0.035, depth=0.15, location=ear1_loc, rotation=(radians(-20), ear_angle, 0.2))
ear1 = bpy.context.active_object
bpy.ops.mesh.primitive_cone_add(radius1=0.035, depth=0.15, location=ear2_loc, rotation=(radians(-20), -ear_angle, -0.2))
ear2 = bpy.context.active_object
for ear in [ear1, ear2]:
    ear.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()

# --- Legs (front and rear, with slight muscle bulge) ---
leg_radius = 0.035
leg_length = 0.38
paw_radius = 0.045
leg_z = 0.09
leg_y_front = 0.13
leg_y_rear = -0.13
leg_xs = [-0.07, 0.07]
legs = []
paws = []
for i, (x, y) in enumerate([(leg_xs[0], leg_y_front), (leg_xs[1], leg_y_front), (leg_xs[0], leg_y_rear), (leg_xs[1], leg_y_rear)]):
    # Upper leg (slightly bulged)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=leg_radius, location=(x, y, leg_z + 0.13))
    upper_leg = bpy.context.active_object
    upper_leg.scale[2] = 1.5
    upper_leg.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()
    # Lower leg
    bpy.ops.mesh.primitive_cylinder_add(radius=leg_radius * 0.9, depth=leg_length, location=(x, y, leg_z))
    lower_leg = bpy.context.active_object
    lower_leg.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()
    # Paw
    bpy.ops.mesh.primitive_uv_sphere_add(radius=paw_radius, location=(x, y, leg_z - leg_length/2 - 0.03))
    paw = bpy.context.active_object
    paw.data.materials.append(fur_mat)
    bpy.ops.object.shade_smooth()
    legs.extend([upper_leg, lower_leg])
    paws.append(paw)

# --- Tail (curved, two segments) ---
tail_base_loc = (0, -0.28, body_loc[2] + 0.13)
tail_tip_loc = (0.07, -0.38, body_loc[2] + 0.13)
bpy.ops.mesh.primitive_cylinder_add(radius=0.018, depth=0.13, location=tail_base_loc, rotation=(0.7, 0, 0))
tail_base = bpy.context.active_object
tail_base.data.materials.append(fur_mat)
bpy.ops.object.shade_smooth()
bpy.ops.mesh.primitive_cylinder_add(radius=0.014, depth=0.13, location=tail_tip_loc, rotation=(1.2, 0, 0.3))
tail_tip = bpy.context.active_object
tail_tip.data.materials.append(fur_mat)
bpy.ops.object.shade_smooth()

# --- Join all parts ---
bpy.ops.object.select_all(action='DESELECT')
for obj in [body, chest, hips, neck, head, muzzle, nose, ear1, ear2, tail_base, tail_tip] + legs + paws:
    obj.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()

# --- Add Subdivision Surface to final mesh ---
obj = bpy.context.active_object
bpy.ops.object.modifier_add(type='SUBSURF')
obj.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# --- (Optional) Add simple fur particle system ---
# Uncomment the following lines for fur (may slow Blender for large meshes)
# ps = obj.modifiers.new('Fur', type='PARTICLE_SYSTEM')
# psettings = obj.particle_systems[0].settings
# psettings.type = 'HAIR'
# psettings.hair_length = 0.08
# psettings.count = 2000
# psettings.use_advanced_hair = True
# psettings.clump_factor = 0.2
# psettings.roughness_1 = 0.01

# --- Pose adjustment (for sitting/lying) can be further refined by hand --- 