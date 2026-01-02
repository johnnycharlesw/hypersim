import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=0.12, location=(0,0,0.01))
ram = bpy.context.active_object
ram.scale[1] = 0.2
ram.scale[2] = 0.1
mat_ram = bpy.data.materials.new('RAM')
mat_ram.diffuse_color = (0.1, 0.5, 0.1, 1)
ram.data.materials.append(mat_ram)
bpy.ops.mesh.primitive_cube_add(size=0.12, location=(0,0,-0.01))
contacts = bpy.context.active_object
contacts.scale[1] = 0.2
contacts.scale[2] = 0.02
mat_contacts = bpy.data.materials.new('Contacts')
mat_contacts.diffuse_color = (0.8, 0.7, 0.2, 1)
contacts.data.materials.append(mat_contacts)
bpy.ops.object.select_all(action='DESELECT')
ram.select_set(True)
contacts.select_set(True)
bpy.context.view_layer.objects.active = ram
bpy.ops.object.join()
bpy.ops.object.shade_smooth() 