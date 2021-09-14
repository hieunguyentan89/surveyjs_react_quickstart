import React, { useState, useRef, useEffect } from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import * as SurveyCreator from "survey-creator-react";

const CustomStringEdit = (props) => {
    const { changed, setChanged } = useState(0);
    const [locString, setLocString] = useState(props.locStr);
    const svStringEditorRef = useRef(null);

    useEffect(
        () => {
            setLocString(props.locStr);
        },
        [props.locStr],
    );

    const EditText = (e) => {
        svStringEditorRef.current.focus();
    }

    const DoneText = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onInput = (e) => {
        DoneText(e);
        if (locString.renderedHtml == e.target.innerText) return;
        locString.text = e.target.innerText;
        setLocString(locString);
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            svStringEditorRef.current.blur();
            DoneText(e);
        }
        if (e.keyCode === 27) {
            svStringEditorRef.current.blur();
            DoneText(e);
        }
    }

    const onDelete = () => {
        props.onDelete();
    }

    const onDrag = (e) => {
        props.onDrag(e);
    }

    const rederContent = () => {
        let control = null;
        if (locString.hasHtml) {
            const htmlValue = locString.renderedHtml;
            control = (
                <span
                    ref={svStringEditorRef}
                    className="sv-string-editor"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={htmlValue}
                    onBlur={(e) => onInput(e)}
                    onKeyDown={(e) => onKeyDown(e)}
                    onClick={(e) => EditText(e)}
                />
            );
        } else {
            control = (
                <span
                    ref={svStringEditorRef}
                    className="sv-string-editor"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    // style={this.style}
                    onBlur={(e) => onInput(e)}
                    onKeyDown={(e) => onKeyDown(e)}
                    onClick={(e) => EditText(e)}
                >
                    {locString.renderedHtml}
                </span>
            );
        }
        return control;
    }

    if (!locString) {
        return null;
    }

    return (
        <span className="svc-string-editor">
            <span className="svc-string-editor__content">
                <div className="svc-string-editor__border"></div>
                {rederContent()}
                <div className="svc-string-editor__controls">
                    <SurveyReact.SvgIcon
                        className="svc-string-editor__button svc-string-editor__button--edit"
                        onClick={() => EditText()}
                        size={16}
                        iconName={"icon-pencil-alt"}
                    ></SurveyReact.SvgIcon>
                    {props.isDraggable &&
                        <span
                            className="svc-string-editor__button svc-string-editor__button--edit svc-item-value-controls__drag"
                            onPointerDown={onDrag}
                        >
                            <SurveyReact.SvgIcon size={16} iconName={"icon-actiondragelement"}></SurveyReact.SvgIcon>
                        </span>
                    }
                    <SurveyReact.SvgIcon
                        className="svc-string-editor__button svc-string-editor__button--edit"
                        onClick={() => onDelete()}
                        size={16}
                        iconName={"icon-remove-item-custom"}
                    ></SurveyReact.SvgIcon>
                    <SurveyReact.SvgIcon
                        className="svc-string-editor__button svc-string-editor__button--done"
                        onClick={() => DoneText()}
                        size={22}
                        iconName={"icon-check"}
                    ></SurveyReact.SvgIcon>
                </div>
            </span>
        </span>
    );
}


export default CustomStringEdit;