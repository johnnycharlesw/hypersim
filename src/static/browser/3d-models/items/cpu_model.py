import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.04, location=(0,0,0.02))
cpu = bpy.context.active_object
mat_cpu = bpy.data.materials.new('CPU')
mat_cpu.diffuse_color = (0.7, 0.7, 0.7, 1)
cpu.data.materials.append(mat_cpu)
bpy.ops.mesh.primitive_cube_add(size=0.045, location=(0,0,0.01))
contacts = bpy.context.active_object
contacts.scale[2] = 0.1
mat_contacts = bpy.data.materials.new('Contacts')
mat_contacts.diffuse_color = (0.8, 0.7, 0.2, 1)
contacts.data.materials.append(mat_contacts)
bpy.ops.object.select_all(action='DESELECT')
cpu.select_set(True)
contacts.select_set(True)
bpy.context.view_layer.objects.active = cpu
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 