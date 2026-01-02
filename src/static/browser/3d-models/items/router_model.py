import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.03, location=(0,0,0.01))
body = bpy.context.active_object
mat_body = bpy.data.materials.new('RouterBody')
mat_body.diffuse_color = (0.1, 0.1, 0.1, 1)
body.data.materials.append(mat_body)
for x in [-0.01, 0.01]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.0015, depth=0.018, location=(x,0,0.025))
    ant = bpy.context.active_object
    mat_ant = bpy.data.materials.new('RouterAnt')
    mat_ant.diffuse_color = (0.7, 0.7, 0.7, 1)
    ant.data.materials.append(mat_ant)
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True)
for obj in bpy.context.scene.objects:
    if obj.name.startswith('Cylinder'):
        obj.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 