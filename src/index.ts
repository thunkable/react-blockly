import useBlocklyWorkspace from "./useBlocklyWorkspace";
import BlocklyWorkspace from "./BlocklyWorkspace";
const Blockly = window.Blockly;
const WorkspaceSvg = Blockly.WorkspaceSvg;
const Workspace = Blockly.Workspace;
import ToolboxDefinition1 = Blockly.utils.toolbox.ToolboxDefinition;
export type ToolboxDefinition = ToolboxDefinition1;
export { BlocklyWorkspace, useBlocklyWorkspace };
export {WorkspaceSvg, Workspace};
