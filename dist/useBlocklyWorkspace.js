var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import debounce from "./debounce";
var Blockly = window.Blockly;
function importFromXml(xml, workspace, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
onImportError) {
    try {
        if (workspace.getAllBlocks(false).length > 0)
            return; // we won't load blocks again if they are already loaded
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
        return true;
    }
    catch (e) {
        if (onImportError) {
            onImportError(e);
        }
        return false;
    }
}
function importFromJson(json, workspace, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
onImportError) {
    try {
        Blockly.serialization.workspaces.load(json, workspace);
        return true;
    }
    catch (e) {
        if (onImportError) {
            onImportError(e);
        }
        return false;
    }
}
var useBlocklyWorkspace = function (_a) {
    var ref = _a.ref, initialXml = _a.initialXml, initialJson = _a.initialJson, toolboxConfiguration = _a.toolboxConfiguration, workspaceConfiguration = _a.workspaceConfiguration, onWorkspaceChange = _a.onWorkspaceChange, onImportXmlError = _a.onImportXmlError, onImportError = _a.onImportError, onInject = _a.onInject, onDispose = _a.onDispose;
    // onImportError replaces onImportXmlError 
    // This is done for not breaking the signature until depreaction
    onImportError = onImportError !== null && onImportError !== void 0 ? onImportError : onImportXmlError;
    var _b = React.useState(null), workspace = _b[0], setWorkspace = _b[1];
    var _c = React.useState(initialXml || null), xml = _c[0], setXml = _c[1];
    var _d = React.useState(initialJson || null), json = _d[0], setJson = _d[1];
    var _e = React.useState(false), didInitialImport = _e[0], setDidInitialImport = _e[1];
    var _g = React.useState(false), didHandleNewWorkspace = _g[0], setDidHandleNewWorkspace = _g[1];
    // we explicitly don't want to recreate the workspace when the configuration changes
    // so, we'll keep it in a ref and update as necessary in an effect hook
    var workspaceConfigurationRef = React.useRef(workspaceConfiguration);
    React.useEffect(function () {
        workspaceConfigurationRef.current = workspaceConfiguration;
    }, [workspaceConfiguration]);
    var toolboxConfigurationRef = React.useRef(toolboxConfiguration);
    React.useEffect(function () {
        toolboxConfigurationRef.current = toolboxConfiguration;
        if (toolboxConfiguration && workspace && !(workspaceConfiguration === null || workspaceConfiguration === void 0 ? void 0 : workspaceConfiguration.readOnly)) {
            workspace.updateToolbox(toolboxConfiguration);
        }
    }, [toolboxConfiguration, workspaceConfiguration]);
    var onInjectRef = React.useRef(onInject);
    var onDisposeRef = React.useRef(onDispose);
    React.useEffect(function () {
        onInjectRef.current = onInject;
    }, [onInject]);
    React.useEffect(function () {
        onDisposeRef.current = onDispose;
    }, [onDispose]);
    var handleWorkspaceChanged = React.useCallback(function (newWorkspace) {
        if (onWorkspaceChange) {
            onWorkspaceChange(newWorkspace);
        }
    }, [onWorkspaceChange]);
    // Workspace creation
    React.useEffect(function () {
        if (!ref.current) {
            return;
        }
        var newWorkspace = Blockly.inject(ref.current, __assign(__assign({}, workspaceConfigurationRef.current), { toolbox: toolboxConfigurationRef.current }));
        setWorkspace(newWorkspace);
        setDidInitialImport(false); // force a re-import if we recreate the workspace
        setDidHandleNewWorkspace(false); // Signal that a workspace change event needs to be sent.
        if (onInjectRef.current) {
            onInjectRef.current(newWorkspace);
        }
        var onDisposeFunction = onDisposeRef.current;
        // Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount)
        return function () {
            newWorkspace.dispose();
            if (onDisposeFunction) {
                onDisposeFunction(newWorkspace);
            }
        };
    }, [ref]);
    // Send a workspace change event when the workspace is created
    React.useEffect(function () {
        if (workspace && !didHandleNewWorkspace) {
            handleWorkspaceChanged(workspace);
        }
    }, [handleWorkspaceChanged, didHandleNewWorkspace, workspace]);
    // Workspace change listener
    React.useEffect(function () {
        if (workspace == null) {
            return undefined;
        }
        var listener = function () {
            handleWorkspaceChanged(workspace);
        };
        workspace.addChangeListener(listener);
        return function () {
            workspace.removeChangeListener(listener);
        };
    }, [workspace, handleWorkspaceChanged]);
    // xmlDidChange callback
    React.useEffect(function () {
        if (workspace == null) {
            return undefined;
        }
        var _a = debounce(function () {
            var newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
            if (newXml === xml) {
                return;
            }
            var newJson = Blockly.serialization.workspaces.save(workspace);
            setJson(newJson);
            setXml(newXml);
        }, 200), callback = _a[0], cancel = _a[1];
        workspace.addChangeListener(callback);
        return function () {
            workspace.removeChangeListener(callback);
            cancel();
        };
    }, [workspace, xml]);
    // Initial Xml Changes
    React.useEffect(function () {
        if (xml && workspace && !didInitialImport) {
            var success = importFromXml(xml, workspace, onImportError);
            if (!success) {
                setXml(null);
            }
            setDidInitialImport(true);
        }
        else if (json && workspace && !didInitialImport) {
            var success = importFromJson(json, workspace, onImportError);
            if (!success) {
                setJson(null);
            }
            var jsonToXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
            setXml(jsonToXml);
            setDidInitialImport(true);
        }
    }, [json, xml, workspace, didInitialImport, onImportError]);
    return { workspace: workspace, xml: xml, json: json };
};
export default useBlocklyWorkspace;
