import { useState, useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const EditableFamilyTree = () => {
  const divRef = useRef(null);
  const [familyData, setFamilyData] = useState([
    { id: 1, pids: [2], name: "John Smith", gender: "male" },
    { id: 2, pids: [1], name: "Jane Doe", gender: "female" }
  ]);

  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: familyData,
      nodeBinding: {
        field_0: "name",
        field_1: "gender"
      },
      enableSearch: true,
      nodeMenu: {
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" }
      }
    });

    family.on('click', (sender, args) => {
      setSelectedNode(args.node);
    });

    family.on('update', (sender, args) => {
      const updatedData = familyData.map(node => 
        node.id === args.node.id ? args.node : node
      );
      setFamilyData(updatedData);
    });

    family.on('remove', (sender, args) => {
      const filteredData = familyData.filter(node => 
        node.id !== args.node.id
      );
      setFamilyData(filteredData);
    });

  }, [familyData]);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      name: "New Member",
      gender: "male"
    };

    if (selectedNode) {
      newNode.fid = selectedNode.id;
    }

    setFamilyData([...familyData, newNode]);
  };

  return (
    <div>
      <button onClick={addNode}>Add Family Member</button>
      <div id="tree" ref={divRef} style={{ height: '80vh' }}></div>
    </div>
  );
};

export default EditableFamilyTree;