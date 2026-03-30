import { IEmbedTypeScriptProps } from "embed-typescript";
import { CompilerOptions, JsxEmit, ModuleKind, ScriptTarget } from "typescript";
import * as fs from 'fs';
import { xor } from "three/tsl";
export class MultiplayerEmbedTypecriptConfig implements IEmbedTypeScriptProps {
    compilerOptions: CompilerOptions;
    external: Record<string, string>;
    constructor(){
        this.compilerOptions=new (class compilerOptions implements CompilerOptions {
            
            constructor(){
                this.module=ModuleKind.NodeNext;
                this.target=ScriptTarget.ESNext;
                this.strict=true;
                this.jsx=JsxEmit.ReactJSX;
                this.verbatimModuleSyntax=false;
                this.isolatedModules=true;
                this.noUncheckedSideEffectImports=true;

            }
        })();
        fs.readdirSync('out').forEach(file => {
            this.external.concat({
                file
            })
        });
    }
}