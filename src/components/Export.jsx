/*eslint-disable*/
import { useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const ExportableFamilyTree = () => {
  const divRef = useRef(null);
  let family = null;

  // Define sample data for nodes
  const data = [
    { id: 1, name: "John Doe", gender: "male" },
    { id: 2, name: "Jane Doe", gender: "female", pid: 1 },
    // Add more nodes as needed
  ];

  useEffect(() => {
    family = new FamilyTree(divRef.current, {
      nodes: data,
      nodeBinding: {
        field_0: "name",
        field_1: "gender"
      },
      menu: {
        pdf: { text: "Export PDF" },
        png: { text: "Export PNG" },
        svg: { text: "Export SVG" }
      }
    });
  }, [data]); // Add data as a dependency

  const exportPDF = () => {
    family.exportPDF({
      format: "A4",
      header: "Family Tree",
      footer: "Page {current-page} of {total-pages}"
    });
  };

  const exportPNG = () => {
    family.exportPNG({
      scale: 2,
      header: "Family Tree"
    });
  };

  const exportSVG = () => {
    family.exportSVG({
      header: "Family Tree"
    });
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={exportPDF}>Export PDF</button>
        <button onClick={exportPNG}>Export PNG</button>
        <button onClick={exportSVG}>Export SVG</button>
      </div>
      <div id="tree" ref={divRef} style={{ height: '80vh' }}></div>
    </div>
  );
};

export default ExportableFamilyTree;
