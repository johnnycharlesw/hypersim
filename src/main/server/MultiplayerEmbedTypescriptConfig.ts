import { IEmbedTypeScriptProps } from "embed-typescript";
import { CompilerOptions, JsxEmit, ModuleKind, ScriptTarget } from "typescript";
import * as fs from 'fs';
class compilerOptions implements CompilerOptions {
    module?: ModuleKind;
    target?: ScriptTarget;
    strict?: boolean;
    jsx?: JsxEmit;
    verbatimModuleSyntax?: boolean;
    isolatedModules?: boolean;
    noUncheckedSideEffectImports?: boolean;
    constructor(){
        this.module=ModuleKind.NodeNext;
        this.target=ScriptTarget.ESNext;
        this.strict=true;
        this.jsx=JsxEmit.ReactJSX;
        this.verbatimModuleSyntax=false;
        this.isolatedModules=true;
        this.noUncheckedSideEffectImports=true;

    }
}
export class MultiplayerEmbedTypecriptConfig implements IEmbedTypeScriptProps {
    compilerOptions: CompilerOptions;
    external: Record<string, string>;
    constructor(){
        this.compilerOptions=new compilerOptions();
        this.external = {};
        fs.readdirSync('out').forEach(file => {
            this.external!.concat({
                file
            })
        });
    }
}