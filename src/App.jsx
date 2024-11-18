import React, { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TextBlock from "./components/TextBlock";

function App() {
  const [nodes, setNodes] = useState([]);
  const [reDos, setRedos] = useState([]);

  const handleUndo = (e) => {
    if (!nodes.length) return;
    let allNodes = [...nodes];
    let lastNode = allNodes.pop();
    setRedos((redos) => [...redos, lastNode]);
    setNodes([...allNodes]);
  };

  const handleRedo = (e) => {
    if (!reDos.length) return;
    let allNodes = [...reDos];
    let lastNode = allNodes.pop();
    setNodes((prev) => [...prev, lastNode]);
    setRedos([...allNodes]);

  };

  const handleAddText = (
    fontFamily,
    fontSize,
    isBold,
    isItalic,
    textAlign,
    isUnderline
  ) => {
    // console.log(fontSize, isBold, isItalic, textAlign, isUnderline);
    const containerRect = containerRef.current.getBoundingClientRect();
    let left = Math.max(10, Math.random() * containerRect.width - 200);
    let top = Math.max(10, Math.random() * containerRect.height - 200);

    const decorationTypes = [
      "center",
      "justify",
      "left",
      "right",
    ];
    const newBlock = {
      id: Date.now(),
      content: "Edit Text",
      top,
      left,
      fontSize,
      isBold,
      isItalic,
      textAlign: decorationTypes[textAlign],
      isUnderline,
      fontFamily,
    };
    setNodes((prev) => [...prev, newBlock]);
    setRedos([]);

    console.log(nodes)
  };
  const containerRef = useRef();

  const handleChangeProps = (
    fontSize,
    isBold,
    isItalic,
    textDecoration,
    isUnderline
  ) => {
    console.log(fontSize, isBold, isItalic, textDecoration, isUnderline);
  };

  const handleOnchange = (textContent, id, input) => {

    // console.log(nodes);
    
    setNodes(prev => prev.map(node => node.id === id ? {...node, content : textContent}: node))


  }
  const handleClear = () => {
    setNodes([])
    localStorage.setItem('texts', '')
  }
  useEffect(()=> {
    let items = localStorage.getItem('texts')
    if(items){
      setNodes(JSON.parse(items))
    }
  }, [])

  useEffect(() => {
    if(nodes.length)
      localStorage.setItem("texts", JSON.stringify(nodes));
    console.log('nodes updating');
    console.log(nodes);
 }, [nodes]);
 
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <Header handleRedo={handleRedo} handleUndo={handleUndo} />
        <section
          className="w-full h-full bg-gray-200 relative"
          ref={containerRef}
        >
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
