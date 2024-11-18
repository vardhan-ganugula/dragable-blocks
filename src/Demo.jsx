import React, { useRef, useState } from 'react'
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";


function Demo() {
  const [nodes, setNodes] = useState([])
  const [reDos, setRedos] = useState([])
  let sectionRef = useRef();


  const handleUpdateNode = (id, content) => {
    setNodes(prev => (
      prev.map(node => (
        node.id === id ? {...node, content} : node
      ))
    ))
  }
  const handleCreateNode = (e) => {
    const targetNode = e.target
   
    if(targetNode.tagName === 'SECTION'){
      
      const newNode = {
        id : Date.now(),
        content: 'Edit me',
        top : e.clientY - sectionRef.current.getBoundingClientRect().top,
        left : e.clientX
      }
      setNodes(prev => [...prev, newNode])
    }else if(targetNode.tagName === 'INPUT'){
      targetNode.current?.focus()
      console.log(targetNode);
      
    }
    
    
  }
  const handleUndo = (e) => {
    if(!nodes.length) return;
    let allNodes = [...nodes]
    let lastNode = allNodes.pop()
    setRedos(redos => [...redos, lastNode])
  
    setNodes([...allNodes])
  }

  const handleRedo = (e) => {
    if(!reDos.length) return;
    let allNodes = [...reDos]
    let lastNode = allNodes.pop()
    setNodes(prev => [...prev, lastNode])
    setRedos([...allNodes])
  }

  return (
    <>
    <main className='flex flex-col h-screen'>
      <header className='w-full h-28 bg-white flex items-center justify-center'>
        <div className='flex gap-5 text-zinc-600'>
          <GrUndo size={25} className='cursor-pointer' onClick={handleUndo} />
          <GrRedo size={25} className='cursor-pointer' onClick={handleRedo}/>
        </div>
      </header>
      <section ref={sectionRef} className='relative flex-shrink-0 flex-grow bg-zinc-200 w-full' onClick={handleCreateNode}>
        {
          nodes.map(node => (
            <div
              key={node.id}
              className='textBlock'
              contentEditable
              suppressContentEditableWarning
              style={{
                top : node.top + 'px',
                left: node.left + 'px'
              }}
              onInput={(e) => handleUpdateNode(e.id, e.target.innerText)}
            >
              {node.content}
            </div>
          ))
        }
      </section>
      <footer className='w-full bg-white py-5 flex items-center justify-center'>
          <div>
            controls
          </div>
      </footer>
      </main>
    </>
  )
}

export default Demo