import { useEffect, useState } from 'react';
import fitTextToContainer from '@/helpers/fitTextToContainer';

export default function CanvasASCII(props) {
  const {
    asciiStrings,
    animating,
    animationFramerate,
    controlAsciiString,
    selectedFrameIndex
  } = props;

<<<<<<< Updated upstream
=======
  // expose alias 'my' to store local non-state vars within component instance
  const componentRef = useRef({});
  const { current: my } = componentRef;

  // local non-state vars


  // local state vars
  const [editing, setEditing] = useState(false);
>>>>>>> Stashed changes
  const [localFrameIndex, setLocalFrameIndex] = useState(selectedFrameIndex);
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [animationInterval, setAnimationInterval] = useState(null);

  useEffect(() => {
    if (controlAsciiString) {
      var fittedFontSize = fitTextToContainer(controlAsciiString, 'monospace', width),
          fittedLineHeight = 0.61 * fittedFontSize;

      setFontSize(fittedFontSize);
      setLineHeight(fittedLineHeight);

      // console.log("CanvasASCII got updated controlAsciiString...");
    }
  }, [controlAsciiString]);

  // run animation when 'animating' prop is true
  // stop animation when 'animating' prop is false
  useEffect(() => {
    if (animating) {
      let step = () => setLocalFrameIndex(localFrameIndex => (localFrameIndex + 1 === asciiStrings.length) ? 0 : localFrameIndex + 1);
      let interval = setInterval(step, 1000 / animationFramerate); /* 1000/fps = animation interval in milliseconds */
      step();
      setAnimationInterval(interval);
    } else {
      clearInterval(animationInterval);
      setAnimationInterval(null);
      setLocalFrameIndex(selectedFrameIndex);
    }
  }, [animating]);

  useEffect(() => {
    if (selectedFrameIndex !== localFrameIndex) {
      setLocalFrameIndex(selectedFrameIndex);
      var caretPos = rangy.getSelection().anchorOffset;
      if ('number' === typeof caretPos) {
        console.log("CARET POS", caretPos);
        setTimeout(() => focusAt(caretPos));
      }
    }
  }, [selectedFrameIndex]);
<<<<<<< Updated upstream
=======

  // persist local frame when user stops editing
  useEffect(() => {
    if (!editing) {
      onChange(my.pre.textContent, localFrameIndex);
      if (my.caretPos) setTimeout(() => focusAt(my.caretPos));
    }
  }, [editing]);

  // bind event listeners to pre input element to update state editing var
  my.editingTimout = null;
  const setPreRef = (ref) => {
    my.pre = ref;

    const listenerTypes = [
      "keydown",
      "mouseover"
    ];

    listenerTypes.forEach(listenerType => {
      my.pre.addEventListener(listenerType, () => {
        setEditing(true);
        if (my.editingTimeout) clearTimeout(my.editingTimeout);
        my.editingTimeout = setTimeout(() => setEditing(false), 2000);
      });
    });
  }
  
  // focus contenteditable pre at specified caret index
  const focusAt = (index) => {
    var range = rangy.createRange();
    var sel = rangy.getSelection();
    range.setStart(my.pre.firstChild, index);
    range.collapse(true);
    sel.setSingleRange(range);
    my.pre.focus();
  }

  // custom input functionality
  const onInput = (e) => {
    // list of all possible input event types here:
    // https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes
    const SUPPORTED_INPUT_EVENT_TYPES = [
      "insertText",
      "insertFromPaste",
      "deleteContentBackward"
    ];

    // ensure input event type is supported
    const inputType = e.nativeEvent.inputType;
    if (SUPPORTED_INPUT_EVENT_TYPES.indexOf(inputType) < 0) return;

    // clear persist local string timeout, preventing changes from bubbling up to
    // parent state until user has stopped editing text
    if (my.persistLocalStringTimeout) clearTimeout(my.persistLocalStringTimeout);
    if (my.focusTimeout) clearTimeout(my.focusTimeout);

    // string update logic dependent on input event type
    // TODO: Handle edge cases:
    //  - inserting text when anchor is last or second-to-last char in row
    //  - deleting text when anchor is first or second char in row
    var selection = rangy.getSelection(), processFrame;

    // single character inesertion
    if ("insertText" === inputType){
      processFrame = (origStr, useOffset) => {
        var newStr = replaceAt(origStr, selection.anchorOffset - 1, e.nativeEvent.data, useOffset ? 1 : null);
        my.caretPos = selection.anchorOffset;
        return newStr;
      }
    }

    // single character deletion
    if ("deleteContentBackward" === inputType) {
      processFrame = (origStr, useOffset) => {
        var newStr = replaceAt(origStr, selection.anchorOffset, " ", useOffset ? -1 : null);
        my.caretPos = selection.anchorOffset;
        return newStr;
      }
    }

    // TODO: multiple character insertion
    if ("insertFromPaste" === inputType) {
      processFrame = (origStr, useOffset) => {}
    }

    // TODO: multiple character deletion
    if ("insertFromPaste" === inputType) {
      processFrame = (origStr, useOffset) => {}
    }

    // update string locally
    my.pre.textContent = processFrame(my.pre.textContent, true);
    
    // update other frame strings if necessary
    if (propagateChangesToASCIIString !== "none") {
      var filterFrames;

      if ("all frames" === propagateChangesToASCIIString) {
        filterFrames = ({ str, i }) => i !== localFrameIndex;
      }

      if ("frames after this one" === propagateChangesToASCIIString) {
        filterFrames = ({ str, i }) => i > localFrameIndex
      }

      if ("frames before this one" === propagateChangesToASCIIString) {
        filterFrames = ({ str, i }) => i < localFrameIndex
      }

      var targetFrames = asciiStrings
        .map((str, i) => ({ str, i }))
        .filter(filterFrames);

      var changes = targetFrames
        .map(({ str, i }) => ({
          updatedAsciiString: processFrame(str),
          frameIndex: i
        }));

      onChangeBatch(changes);
    }

    // update caret position
    focusAt(my.caretPos);
  }
>>>>>>> Stashed changes

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {`Frame ${localFrameIndex + 1} `}

        {editing && (
          <i className="ri-edit-box-line ri-md"></i>
        )}
      </p>
      
      <div
        className="canvas-ascii-pre-wrap"
        ref={ref => ref && 0 == width ? setWidth(ref.getBoundingClientRect().width * 0.5) : null}
      >
<<<<<<< Updated upstream
        <pre contentEditable suppressContentEditableWarning style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}>
          <span id="ascii-string">
            { asciiStrings[localFrameIndex] }
          </span>
=======
        <pre
          ref={ref => (ref) ? setPreRef(ref) : null}
          contentEditable
          suppressContentEditableWarning
          onInput={onInput}
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}
        >
          { asciiStrings[localFrameIndex] }
>>>>>>> Stashed changes
        </pre>
      </div>
    </div>
  );
}