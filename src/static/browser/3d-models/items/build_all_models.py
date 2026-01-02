import bpy
import os

# Directory containing your model scripts and .glb exports
model_dir = "D:/John's files/my-custom-simulation-game/3d-models/items"
output_dir = model_dir

# List all *_model.py scripts
scripts = [f for f in os.listdir(model_dir) if f.endswith('_model.py')]

for script in scripts:
    base = script.replace('_model.py', '.glb')
    out_path = os.path.join(output_dir, base)
    if os.path.exists(out_path):
        print(f"Skipping {base} (already exported)")
        continue
    # Reset Blender scene
    bpy.ops.wm.read_factory_settings(use_empty=True)
    # Run the model script
    script_path = os.path.join(model_dir, script)
    exec(compile(open(script_path).read(), script_path, 'exec'))
    # Export as .glb
    bpy.ops.export_scene.gltf(filepath=out_path, export_format='GLB')
    print(f"Exported {base}")