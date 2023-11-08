import useBlocklyWorkspace from "./useBlocklyWorkspace";
import BlocklyWorkspace from "./BlocklyWorkspace";
import Blockly from "blockly";
declare const WorkspaceSvg: any;
declare const Workspace: any;
export type ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
export { BlocklyWorkspace, useBlocklyWorkspace };
export { WorkspaceSvg, Workspace };
