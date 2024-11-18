import React, { useState, useRef } from "react";

function TextBlock({
  id,
  fontFamily,
  fontSize,
  isBold,
  isItalic,
  textAlign,
  isUnderline,
  text,
  left,
  top,
  handleOnchange,
}) {
  const blockRef = useRef();

  const handleInputChange = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const startOffset = range.startOffset; // Track cursor position
    const endOffset = range.endOffset;

    handleOnchange(e.target.innerText, id);

    // Restore the cursor position after state update
    setTimeout(() => {
      const newRange = document.createRange();
      newRange.setStart(blockRef.current.firstChild, startOffset);
      newRange.setEnd(blockRef.current.firstChild, endOffset);

      selection.removeAllRanges();
      selection.addRange(newRange);
    }, 0);
  };
  return (
    <div
      contentEditable
      ref={blockRef}
      suppressContentEditableWarning={true}
      // onClick={onSelect}  // Triggered when a user clicks on the text block
      className="textBlock"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        fontFamily,
        fontWeight: isBold ? "bold" : "normal",
        fontSize,
        fontStyle: isItalic ? "italic" : "normal",
        textDecoration: isUnderline ? "underline" : "none",
        textAlign,
      }}
      onInput={handleInputChange}
    >
      {text}
    </div>
  );
}

export default TextBlock;
