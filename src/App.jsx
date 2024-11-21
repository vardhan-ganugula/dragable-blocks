import React, { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import { useNodes } from "./contexts/useNodes";
import useUndoRedo from "./hooks/undoRedo";

function App() {

  const {nodes, setNodes, setRedos, lastNode, setLastNode} = useNodes();

  const { handleUndo, handleRedo, handleClear} = useUndoRedo();
  const containerRef = useRef();

  const handleAddText = (
    fontFamily,
    fontSize,
    isBold,
    isItalic,
    textAlign,
    isUnderline
  ) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    let left = Math.max(10, Math.random() * containerRect.width - 200);
    let top = Math.max(10, Math.random() * containerRect.height - 200);
    console.log(fontFamily,
      fontSize,
      isBold,
      isItalic,
      textAlign,
      isUnderline);
    
    const newBlock = {
      id: Date.now(),
      content: "Edit Text",
      top,
      left,
      fontSize,
      isBold,
      isItalic,
      textAlign,
      isUnderline,
      fontFamily,
    };
    console.log(newBlock);
    
    setNodes((prev) => [...prev, newBlock]);
    setRedos([]);

  };

  const handleChangeProps = (fontFamily,
    fontSize,
    isBold,
    isItalic,
    textAlign,
    isUnderline) => {
      
    if(nodes.length && Object.keys(lastNode).length){
      
      let allNodes = nodes.map(node => node.id === lastNode.id ? {...node, fontFamily, fontSize, isBold, isItalic, textAlign, isUnderline} : node);
      setNodes(allNodes)
      
    }
    
    
  };

  const handleOnchange = (textContent, id, input) => {
    // console.log(nodes);
      let targetNode = nodes.filter(node => node.id === id)

      setLastNode(targetNode.length?targetNode[0]: lastNode)
      setNodes(prev => prev.map(node => node.id === id ? {...node, content : textContent}: node))
  }
  
  

  
 
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <Header handleRedo={handleRedo} handleUndo={handleUndo} />
        <section
          className="w-full h-full relative flex"
          
        >
          <main className="bg-gray-200 h-full w-4/5 flex-shrink-0 overflow-hidden relative overflow-x-auto" ref={containerRef}>         
            {nodes.map((node) => (
              <TextBlock
                key={node.id}
                text={node.content}
                left={node.left}
                top={node.top}
                fontSize = {node.fontSize}
                isBold = {node.isBold}
                isItalic = {node.isItalic}
                textAlign = {node.textAlign}
                isUnderline = {node.isUnderline}
                fontFamily = {node.fontFamily}
                handleOnchange={handleOnchange}
                id={node.id}
              />
            ))}
          </main>
          <aside className="h-full w-full bg-slate-100 flex-grow p-5">
            <h2 className="text-2xl font-bold">Features</h2>
            <ul className="ml-3 pl-5 mt-5 list-disc">
              <li>Add text</li>
              <li>Move text</li>
              <li>Offline storage ~ local storage</li>
              <li>Change font,style,size </li>
              <li>Undo Redo feature </li>
              <li>Delete Feature</li>
            </ul>
          </aside>
        </section>

        <Footer
          handleAddText={handleAddText}
          handleChangeProps={handleChangeProps}
          handleClear={handleClear}
        />
      </main>
    </>
  );
}

export default App;
