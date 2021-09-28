import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SurveyReact from 'survey-react-ui';

const CustomStringEdit = (props) => {
  const [locString, setLocString] = useState(props.locStr);
  const svStringEditorRef = useRef(null);
  useEffect(
    () => {
      setLocString(props.locStr);
    },
    [props.locStr],
  );

  const EditText = () => {
    svStringEditorRef.current.focus();
  };

  const DoneText = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onInput = (e) => {
    DoneText(e);
    if (locString.renderedHtml === e.target.innerText) {
      return;
    }
    locString.text = e.target.innerText;
    setLocString(locString);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      svStringEditorRef.current.blur();
      DoneText(e);
    }
    if (e.keyCode === 27) {
      svStringEditorRef.current.blur();
      DoneText(e);
    }
  };

  const onDelete = () => {
    props.onDelete();
  };

  const onDrag = (e) => {
    props.onDrag(e);
  };

  const rederContent = () => {
    let control = null;
    if (locString.hasHtml) {
      const htmlValue = locString.renderedHtml;
      control = (
        <span
          ref={svStringEditorRef}
          className="sv-string-editor"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={htmlValue}
          onBlur={e => onInput(e)}
          onKeyDown={e => onKeyDown(e)}
          onClick={() => EditText()}
          role="button"
          tabIndex="0"
        />
      );
    } else {
      control = (
        <span
          ref={svStringEditorRef}
          className="sv-string-editor"
          contentEditable
          suppressContentEditableWarning
          onBlur={e => onInput(e)}
          onKeyDown={e => onKeyDown(e)}
          onClick={() => EditText()}
          role="button"
          tabIndex="0"
        >
          {locString.renderedHtml}
        </span>
      );
    }
    return control;
  };

  if (!locString) {
    return null;
  }

  return (
    <span className="svc-string-editor">
      <span className="svc-string-editor__content">
        <div className="svc-string-editor__border" />
        {rederContent()}
        <div className="svc-string-editor__controls">
          <SurveyReact.SvgIcon
            className="svc-string-editor__button svc-string-editor__button--edit"
            onClick={() => EditText()}
            size={16}
            iconName={'icon-pencil-alt'}
          />
          {props.isDraggable &&
            <span
              className="svc-string-editor__button svc-string-editor__button--edit svc-item-value-controls__drag"
              onPointerDown={onDrag}
            >
              <SurveyReact.SvgIcon size={16} iconName={'icon-actiondragelement'} />
            </span>
          }
          <SurveyReact.SvgIcon
            className="svc-string-editor__button svc-string-editor__button--edit"
            onClick={() => onDelete()}
            size={16}
            iconName={'icon-remove-item-custom'}
          />
          <SurveyReact.SvgIcon
            className="svc-string-editor__button svc-string-editor__button--done"
            onClick={() => DoneText()}
            size={22}
            iconName={'icon-check'}
          />
        </div>
      </span>
    </span>
  );
};

CustomStringEdit.propTypes = {
  isDraggable: PropTypes.bool,
  onDrag: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  locStr: PropTypes.shape({}),
};

CustomStringEdit.defaultProps = {
  isDraggable: false,
  locStr: {},
};

export default CustomStringEdit;
