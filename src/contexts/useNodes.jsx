import { createContext, useContext, useEffect, useState } from "react";

export const NodesContext = createContext({
  nodes: {},
  reDos: {},
  setNodes: () => {},
  setRedos: () => {},
  setLastNode: () => {},
  lastNode : {},
  fontFamily : 'poppins',
  fontSize: 20,
  isBold: false,
  isItalic: false,
  textAlign: 0,
  isUnderline: false,
  setFontfamily: () => {},
  setFontfamily: () => {},
  setFontSize: () => {},
  setBold: () => {},
  setItalic: () => {},
  setUnderline: () => {},
  setDecoration: () => {},
});

export const NodesProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [reDos, setRedos] = useState([]);

  const [lastNode, setLastNode] = useState({})
  const [fontFamily, setFontfamily] = useState("rubik");

  const [fontSize, setFontSize] = useState(20);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const [textAlign, setDecoration] = useState(0);

  useEffect(()=> {
    let items = localStorage.getItem('texts')
    if(items){
      setNodes(JSON.parse(items))
    }
  }, [])

  useEffect(()=> {
    const len = nodes.length;
    if(len){
        
        localStorage.setItem('texts', JSON.stringify(nodes))
    }else{
      setLastNode({})
    }
  },[nodes])

  return (
    <NodesContext.Provider
      value={{
        nodes,
        setNodes,
        reDos,
        setRedos,
        lastNode,
        setLastNode,
        fontSize,
        isBold,
        isItalic,
        textAlign,
        isUnderline,
        fontFamily,
        setFontfamily, 
        setFontSize,
        setBold,
        setItalic,
        setUnderline,
        setDecoration
      }}
    >
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = () => useContext(NodesContext);
