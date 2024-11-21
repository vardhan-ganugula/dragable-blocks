import React, { useRef, useState } from "react";
import { useNodes } from "../contexts/useNodes";

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
  const {
    setLastNode,
    nodes,
    lastNode,
    setBold,
    setItalic,
    setFontfamily,
    setDecoration,
    setFontSize,
    setUnderline,
    setNodes
  } = useNodes();
  const [position, setPosition] = useState({left, top})
  const handleInputChange = (e) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    handleOnchange(e.target.innerText, id);

    setTimeout(() => {
      if (blockRef.current?.firstChild) {
        const newRange = document.createRange();
        newRange.setStart(blockRef.current.firstChild, startOffset);
        newRange.setEnd(blockRef.current.firstChild, endOffset);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }, 0);
  };

  const handleLastnode = (id) => {
    const targetNode = nodes.find((node) => node.id === id);
    setLastNode(targetNode || lastNode);

    setBold(isBold);
    setItalic(isItalic);
    setUnderline(isUnderline);
    setFontSize(fontSize);
    setFontfamily(fontFamily);
    setDecoration(textAlign);
  };

  const handleMouseDown = (event)=>{
    let startX = event.clientX;
    let startY = event.clientY;
    let startLeft = position.left;
    let startTop = position.top;
    const handleMouseMove = (e) => {
      event.target.style.cursor = 'move'
      
      let deltaX = e.clientX - startX;
      let deltaY = e.clientY - startY;
      let changeLeft = startLeft + deltaX;
      let changeTop = startTop + deltaY
      setPosition({
        left : changeLeft,
        top: changeTop
      });
      setNodes(prevNodes => 
        prevNodes.map(node=> node.id === id ? {...node, left : changeLeft, top : changeTop} : node)
      )
    }
    const handleMouseUp = (e) => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      event.target.style.cursor = 'auto'
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const types = ["center", "justify", "left", "right"];
  return (
    <div
      contentEditable
      ref={blockRef}
      suppressContentEditableWarning={true}
      className="textBlock"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        fontFamily,
        fontWeight: isBold ? "bold" : "normal",
        fontSize,
        fontStyle: isItalic ? "italic" : "normal",
        textDecoration: isUnderline ? "underline" : "none",
        textAlign: types[textAlign],
      }}
      onInput={handleInputChange}
      onClick={(e) => handleLastnode(id)}
      onMouseDown={handleMouseDown}
    >
      {text}
    </div>
  );
}

export default TextBlock;
