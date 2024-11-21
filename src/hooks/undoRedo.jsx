import { useNodes } from '../contexts/useNodes';

function useUndoRedo() {
  const { reDos, setRedos, nodes, setNodes } = useNodes();

  const handleUndo = () => {
    if (!nodes.length) return;
    const allNodes = [...nodes];
    const lastNode = allNodes.pop();
    setRedos((prevRedos) => [...prevRedos, lastNode]);
    setNodes(allNodes);
  };

  const handleRedo = () => {
    if (!reDos.length) return;
    const allNodes = [...reDos];
    const lastNode = allNodes.pop();
    setNodes((prevNodes) => [...prevNodes, lastNode]);
    setRedos(allNodes);
  };
  
  const handleClear = () => {
    setNodes([])
    localStorage.setItem('texts', '')
  }
  return { handleUndo, handleRedo,handleClear };
}

export default useUndoRedo;
