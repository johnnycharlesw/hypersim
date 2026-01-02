import bpy
from math import radians

pose = 'swimming'  # 'swimming', 'resting'

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
clear_scene()

def make_material(name, color, spec=0.7):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.specular_intensity = spec
    return mat
body_mat = make_material('FishBody', (0.5, 0.7, 0.9))
eyemat = make_material('Eye', (0.1, 0.1, 0.1), 1.0)

# Body
body_loc = (0, 0, 0.1)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.11, location=body_loc)
body = bpy.context.active_object
body.scale[0] = 2.0
body.data.materials.append(body_mat)
bpy.ops.object.modifier_add(type='SUBSURF')
body.modifiers['Subdivision'].levels = 2
bpy.ops.object.shade_smooth()

# Tail
bpy.ops.mesh.primitive_cone_add(radius1=0.04, depth=0.18, location=(0, -0.19, 0.1), rotation=(0, 0, radians(90)))
tail = bpy.context.active_object
tail.data.materials.append(body_mat)
bpy.ops.object.shade_smooth()

# Fins
for x in [-0.07, 0.07]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.02, depth=0.09, location=(x, -0.03, 0.13), rotation=(0, 0, radians(90)))
    fin = bpy.context.active_object
    fin.data.materials.append(body_mat)
    bpy.ops.object.shade_smooth()
# Dorsal fin
bpy.ops.mesh.primitive_cone_add(radius1=0.025, depth=0.11, location=(0, 0, 0.21), rotation=(radians(90), 0, 0))
dorsal = bpy.context.active_object
dorsal.data.materials.append(body_mat)
bpy.ops.object.shade_smooth()

# Eyes
for x in [-0.04, 0.04]:
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.012, location=(x, 0.09, 0.13))
    eye = bpy.context.active_object
    eye.data.materials.append(eyemat)
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