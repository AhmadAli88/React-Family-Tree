/*eslint-disable*/
import { useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const BasicFamilyTree = () => {
  const divRef = useRef(null);

  const data = [
    { id: 1, pids: [2], name: "John Smith", gender: "male", photo: "../src/assets/download.jpeg" },
    { id: 2, pids: [1], name: "Jane Doe", gender: "female" },
    { id: 3, mid: 2, fid: 1, name: "Child One", gender: "female" },
    { id: 4, mid: 2, fid: 1, name: "Child Two", gender: "male" }
  ];

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: data,
      nodeBinding: {
        field_0: "name",
        field_1: "gender",
        img_0: "photo"
      }
    });
  }, []);

  return <div id="tree" ref={divRef} style={{ height: '100vh' }}></div>;
};

export default BasicFamilyTree;