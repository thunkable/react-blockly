import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import PropTypes from "prop-types";
import useBlocklyWorkspace from "./useBlocklyWorkspace";
var propTypes = {
    initialXml: PropTypes.string,
    initialJson: PropTypes.object,
    toolboxConfiguration: PropTypes.object,
    workspaceConfiguration: PropTypes.object,
    className: PropTypes.string,
    onWorkspaceChange: PropTypes.func,
    onImportXmlError: PropTypes.func,
    onImportError: PropTypes.func,
    onXmlChange: PropTypes.func,
    onJsonChange: PropTypes.func,
    onInject: PropTypes.func,
    onDispose: PropTypes.func,
};
var defaultProps = {
    initialXml: null,
    initialJson: null,
    toolboxConfiguration: null,
    workspaceConfiguration: null,
    className: null,
    onWorkspaceChange: null,
    onImportXmlError: null,
    onImportError: null,
    onXmlChange: null,
    onJsonChange: null,
    onInject: null,
    onDispose: null,
};
function BlocklyWorkspace(_a) {
    var initialXml = _a.initialXml, initialJson = _a.initialJson, toolboxConfiguration = _a.toolboxConfiguration, workspaceConfiguration = _a.workspaceConfiguration, className = _a.className, onWorkspaceChange = _a.onWorkspaceChange, onXmlChange = _a.onXmlChange, onJsonChange = _a.onJsonChange, onImportXmlError = _a.onImportXmlError, onImportError = _a.onImportError, onInject = _a.onInject, onDispose = _a.onDispose;
    var editorDiv = React.useRef(null);
    var _b = useBlocklyWorkspace({
        ref: editorDiv,
        initialXml: initialXml,
        initialJson: initialJson,
        toolboxConfiguration: toolboxConfiguration,
        workspaceConfiguration: workspaceConfiguration,
        onWorkspaceChange: onWorkspaceChange,
        onImportXmlError: onImportXmlError,
        onImportError: onImportError,
        onInject: onInject,
        onDispose: onDispose,
    }), xml = _b.xml, json = _b.json;
    var onXmlChangeRef = React.useRef(onXmlChange);
    React.useEffect(function () {
        onXmlChangeRef.current = onXmlChange;
    }, [onXmlChange]);
    var onJsonChangeRef = React.useRef(onJsonChange);
    React.useEffect(function () {
        onJsonChangeRef.current = onJsonChange;
    }, [onJsonChange]);
    React.useEffect(function () {
        if (onXmlChangeRef.current && xml) {
            onXmlChangeRef.current(xml);
        }
        if (onJsonChangeRef.current && json) {
            onJsonChangeRef.current(json);
        }
    }, [xml, json]);
    return _jsx("div", { className: className, ref: editorDiv });
}
BlocklyWorkspace.propTypes = propTypes;
BlocklyWorkspace.defaultProps = defaultProps;
export default BlocklyWorkspace;
