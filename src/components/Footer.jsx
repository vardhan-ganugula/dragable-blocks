import React, { useEffect, useRef, useState } from "react";
import { CiText } from "react-icons/ci";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { FaItalic, FaBold, FaUnderline } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import { useNodes } from "../contexts/useNodes";

function Footer({ handleAddText, handleClear, handleChangeProps }) {
  const {fontSize,
    isBold,
    isItalic,
    textAlign,
    isUnderline, fontFamily,setFontfamily, 
    setFontSize,
    setBold,
    setItalic,
    setUnderline,
    setDecoration} = useNodes();
  const icons = [
    <CiTextAlignCenter size={20} />,
    <CiTextAlignJustify size={20} />,
    <CiTextAlignLeft size={20} />,
    <CiTextAlignRight size={20} />,
  ];
  const handleFontfamily = (e) => {
    setFontfamily(e.target.value);
  };
  useEffect(()=>{
    handleChangeProps(fontFamily,
      fontSize,
      isBold,
      isItalic,
      textAlign,
      isUnderline)
  }, [fontFamily,
    fontSize,
    isBold,
    isItalic,
    textAlign,
    isUnderline])

  return (
    <footer
      style={{
        userSelect: "none",
      }}
      className="w-full bg-white py-5 flex items-center justify-center flex-col gap-3"
    >
      <div className="flex gap-4 ">
        <select
          className="border-1 shadow outline-none px-3 py-2 rounded"
          onChange={handleFontfamily}
          value={fontFamily}
        >
          <option value="poppins">Poppins</option>
          <option value="Rubik">Rubik</option>
          <option value="Edu AU VIC WA NT Pre">Edu AU VIC WA NT Pre</option>
          <option value="Doto">Doto</option>
        </select>
        <div className="flex gap-3 border shadow rounded items-center justify-center">
          <div
            className="p-2  cursor-pointer"
            onClick={() => setFontSize((prev) => (prev > 1 ? prev - 1 : 0))}
          >
            
            <TfiMinus size={20} />
          </div>
          <div className="text-xl py-1">{fontSize}</div>
          <div
            className="p-2 cursor-pointer "
            onClick={() => setFontSize((prev) => (prev > 1 ? prev + 1 : 50))}
          >
            
            <TfiPlus size={20} />
          </div>
        </div>
        <div
          className={`p-3 cursor-pointer rounded border shadow ${
            isBold ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setBold((prev) => !prev)}
        >
          <FaBold />
        </div>
        <div
          className={`p-3 cursor-pointer rounded border shadow ${
            isItalic ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setItalic((prev) => !prev)}
        >
          <FaItalic />
        </div>
        <div
          className={`p-3 cursor-pointer rounded border shadow`}
          onClick={() => setDecoration((prev) => (prev + 1) % 4)}
        >
          {icons[textAlign]}
        </div>
        <div
          className={`p-3 cursor-pointer rounded border shadow ${
            isUnderline ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setUnderline((prev) => !prev)}
        >
          <FaUnderline size={20} />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="bg-gray-200 rounded-full shadow px-3 py-2 flex gap-2 items-center border" onClick={() =>
              handleAddText(
                fontFamily,
                fontSize,
                isBold,
                isItalic,
                textAlign,
                isUnderline
              )
            }>
          <CiText size={20} />
          <button
            className="text-black"
            
          >
            
            Add Text
          </button>
        </div>
        <div className="bg-red-100 rounded-full shadow px-3 py-2 flex gap-2 items-center border text-red-500">
          <RiDeleteBin6Fill size={20} />
          <button
            className="text-black"
            onClick={handleClear
            }
          >
            Clear
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
