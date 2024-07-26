import { useEffect, useRef, useState } from 'react';
import rangy from 'rangy';
import fitTextToContainer from '@/helpers/fitTextToContainer';
import replaceAt from '@/helpers/replaceAt';

export default function CanvasASCII(props) {
  const {
    asciiStrings,
    animating,
    animationFramerate,
    controlAsciiString,
    selectedFrameIndex,
    propagateChangesToASCIIString,
    onChange,
    onChangeBatch
  } = props;

  // expose alias 'my' to store local non-state vars within component instance
  const componentRef = useRef({});
  const { current: my } = componentRef;

  // local state vars
  const [editing, setEditing] = useState(false);
  const [localFrameIndex, setLocalFrameIndex] = useState(selectedFrameIndex);
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [animationInterval, setAnimationInterval] = useState(null);

  // determine canvas sizing by a control string
  // (set by parent to the first string in the list of frames)
  useEffect(() => {
    if (controlAsciiString) {
      var fittedFontSize = fitTextToContainer(controlAsciiString, 'monospace', width),
          fittedLineHeight = 0.61 * fittedFontSize;
      setFontSize(fittedFontSize);
      setLineHeight(fittedLineHeight);
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

  // track selected frame index locally
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
  
  // focus contenteditable pre at specified caret index
  const focusAt = (index) => {
    var range = rangy.createRange();
    var sel = rangy.getSelection();
    range.setStart(my.pre.firstChild, index);
    range.collapse(true);
    sel.setSingleRange(range);
    my.pre.focus();
  }

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
        filterFrames = ({ str, i }) => i > localFrameIndex;
      }

      if ("frames before this one" === propagateChangesToASCIIString) {
        filterFrames = ({ str, i }) => i < localFrameIndex;
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
        ref={ref => (ref && 0 === width) ? setWidth(ref.getBoundingClientRect().width * 0.5) : null}
      >
        <pre
          ref={ref => (ref) ? setPreRef(ref) : null}
          contentEditable
          suppressContentEditableWarning
          onInput={onInput}
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}
        >
          { asciiStrings[localFrameIndex] }
        </pre>
      </div>
    </div>
  );
}