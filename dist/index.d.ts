import useBlocklyWorkspace from "./useBlocklyWorkspace";
import BlocklyWorkspace from "./BlocklyWorkspace";
import Blockly from "blockly";
declare const WorkspaceSvg: any;
declare const Workspace: any;
import ToolboxDefinition1 = Blockly.utils.toolbox.ToolboxDefinition;
export type ToolboxDefinition = ToolboxDefinition1;
export { BlocklyWorkspace, useBlocklyWorkspace };
export { WorkspaceSvg, Workspace };
