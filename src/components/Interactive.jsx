import { useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const CustomFamilyTree = () => {
  const divRef = useRef(null);

  const data = [
    {
      id: 1,
      pids: [2],
      name: "John Smith",
      gender: "male",
      photo: "../src/assets/download.jpeg",
      birthDate: "1970-05-15",
      occupation: "Engineer"
    },
    // ... more family members
  ];

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: data,
      template: "john",
      nodeBinding: {
        field_0: "name",
        field_1: "birthDate",
        field_2: "occupation",
        img_0: "photo"
      },
      nodeMenu: {
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" }
      },
      editForm: {
        buttons: {
          edit: { text: "Update" },
          share: { text: "Share" },
          pdf: { text: "Export PDF" }
        }
      }
    });

    // Custom node template
    FamilyTree.templates.john = Object.assign({}, FamilyTree.templates.tommy);
    FamilyTree.templates.john.node = 
      '<circle cx="60" cy="60" r="50" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>' +
      '<circle cx="60" cy="60" r="45" fill="#ffffff"></circle>' +
      '{val}';

    // Event handlers
    family.on('click', function(sender, args) {
      console.log('Node clicked:', args.node);
    });

    family.on('update', function(sender, args) {
      console.log('Node updated:', args.node);
    });

  }, []);

  return <div id="tree" ref={divRef} style={{ height: '100vh' }}></div>;
};

export default CustomFamilyTree;